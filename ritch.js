import time
import random
import pickle
import os
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from io import BytesIO
from PIL import Image
import pytesseract

EMAIL = "alihezem8@gmail.com"
PASSWORD = "B5*WLbHJyrWuJ2P"

LOGIN_URL = "https://2captcha.com/login"
TRAINING_URL = "https://2captcha.com/play-and-earn/training"
BASE_URL = "https://2captcha.com"

MAX_TASKS = 0
WAIT_BETWEEN_TASKS = (2, 5)
USE_OCR = True

options = Options()
options.add_argument("--headless=new")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-gpu")
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
options.binary_location = "/usr/bin/chromium-browser"

service = Service("/usr/bin/chromedriver")
driver = webdriver.Chrome(service=service, options=options)

def load_cookies():
    try:
        with open("cookies.pkl", "rb") as f:
            cookies = pickle.load(f)
            for cookie in cookies:
                driver.add_cookie(cookie)
            print("[+] Cookies loaded")
    except FileNotFoundError:
        pass

def save_cookies():
    with open("cookies.pkl", "wb") as f:
        pickle.dump(driver.get_cookies(), f)
    print("[+] Cookies saved")

def login():
    driver.get(LOGIN_URL)
    time.sleep(3)
    try:
        email_field = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "email"))
        )
        password_field = driver.find_element(By.NAME, "password")
        email_field.send_keys(EMAIL)
        password_field.send_keys(PASSWORD)
        login_btn = driver.find_element(By.XPATH, "//button[@type='submit']")
        login_btn.click()
        time.sleep(5)
        save_cookies()
        print("[+] Login successful")
        return True
    except Exception as e:
        print("[-] Login failed:", e)
        return False

def solve_captcha_ocr():
    if not USE_OCR:
        return None
    try:
        img_elem = driver.find_element(By.XPATH, "//img[contains(@src,'captcha') or contains(@id,'captcha') or contains(@class,'captcha')]")
        img_url = img_elem.get_attribute("src")
        resp = requests.get(img_url)
        img = Image.open(BytesIO(resp.content))
        img = img.convert('L')
        img = img.point(lambda x: 0 if x < 128 else 255, '1')
        text = pytesseract.image_to_string(img, config='--psm 7')
        return text.strip()
    except:
        return None

def complete_training_task():
    driver.get(TRAINING_URL)
    time.sleep(3)

    captcha_text = solve_captcha_ocr()
    if captcha_text:
        try:
            input_field = driver.find_element(By.XPATH, "//input[@type='text'] | //textarea")
            input_field.send_keys(captcha_text)
            print(f"[+] Entered answer: {captcha_text}")
        except:
            pass

    try:
        submit_btn = WebDriverWait(driver, 8).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'submit') or contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'check') or contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'verify') or contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'answer')]"))
        )
        submit_btn.click()
        print("[+] Submitted")
        time.sleep(2)
        return True
    except:
        print("[-] Submit button not found")
        return False

def main():
    driver.get(BASE_URL)
    load_cookies()
    if not driver.get_cookies():
        if not login():
            return

    done_count = 0
    while True:
        print(f"\n[+] Starting new training task (completed: {done_count})")
        success = complete_training_task()
        if success:
            done_count += 1
            print(f"[+] Total completed: {done_count}")
        sleep_time = random.uniform(*WAIT_BETWEEN_TASKS)
        print(f"[*] Sleeping {sleep_time:.1f} seconds before next")
        time.sleep(sleep_time)

        if MAX_TASKS and done_count >= MAX_TASKS:
            print("[+] Reached maximum tasks limit")
            save_cookies()
            driver.quit()
            return

if __name__ == "__main__":
    main()
