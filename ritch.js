const USERS = {
  "admin": "123456",
  "Abood@gmail.com": "Ritch2026",
  "ritch": "vip2026"
};

// Demo videos - later we can make them dynamic with Firebase
let VIDEOS = [
  { title: "XAUUSD Analysis Today", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", date: "2026-04-25" },
  { title: "BTCUSD Live Trade", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", date: "2026-04-24" }
];

function showLogin() {
  document.getElementById('app').innerHTML = `
    <div class="auth-box">
      <h1><i class="fas fa-crown"></i> RITCH VIP</h1>
      <div id="error" class="error">Wrong username or password</div>
      <input type="text" id="username" placeholder="Email or Username">
      <input type="password" id="password" placeholder="Password">
      <button onclick="login()">Login</button>
    </div>
  `;
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (USERS && pass) {
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
  const isAdmin = user === 'admin' || user === 'Abood@gmail.com';

  document.getElementById('app').innerHTML = `
    <div class="dashboard">
      <div class="header">
        <h2><i class="fas fa-crown"></i> RITCH VIP</h2>
        <div>
          <span>${user}</span>
          <button class="logout-btn" onclick="logout()">Logout</button>
        </div>
      </div>

      <div class="container">
        <div class="status">
          <span><i class="fas fa-circle" style="color:#00ff88"></i> LIVE</span>
          <span>Server: EU-1</span>
          <span>Win Rate: 89%</span>
        </div>

        <div class="grid">
          <div class="card signal-card">
            <h3><i class="fas fa-bolt"></i> Live Signals</h3>
            <div class="signal">
              <div><strong>XAUUSD</strong> <span class="
