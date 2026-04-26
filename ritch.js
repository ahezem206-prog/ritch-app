const USERS = {
  "admin": "123456",
  "ritch": "vip2026",
  "user": "pass123"
};

function showLogin() {
  document.getElementById('app').innerHTML = `
    <div class="login-box">
      <h1>RITCH VIP</h1>
      <div id="error" class="error">Wrong username or password</div>
      <input type="text" id="username" placeholder="Username">
      <input type="password" id="password" placeholder="Password">
      <button onclick="login()">Login</button>
      <p style="font-size:12px;margin-top:15px;opacity:0.6">Demo: admin / 123456</p>
    </div>
  `;
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  
  if (USERS && USERS === pass) {
    localStorage.setItem('logged_in', 'true');
    localStorage.setItem('user', user);
    showApp();
  } else {
    document.getElementById('error').style.display = 'block';
  }
}

function logout() {
  localStorage.removeItem('logged_in');
  localStorage.removeItem('user');
  showLogin();
}

function showApp() {
  const user = localStorage.getItem('user');
  document.getElementById('app').innerHTML = `
    <div class="app">
      <h1>RITCH VIP</h1>
      <h2>Welcome ${user} ✅</h2>
      <p>Status: Online | Server: EU | Version: 3.0</p>
      <br>
      <button class="logout" onclick="logout()">Logout</button>
    </div>
  `;
}

setTimeout(function() {
  if (localStorage.getItem('logged_in') === 'true') {
    showApp();
  } else {
    showLogin();
  }
}, 500);
