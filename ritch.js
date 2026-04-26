const USERS = {
  "admin": "123456",
  "Abood@gmail.com": "Ritch2026",
  "ritch": "vip2026"
};

// Demo videos - you can replace these links with your own
let VIDEOS = [
  { title: "XAUUSD Analysis Today", url: "https://www.youtube.com/watch?v=jfKfPfyJRdk", date: "2026-04-25" },
  { title: "BTCUSD Live Trade Setup", url: "https://www.youtube.com/watch?v=DWcJFNfaw9c", date: "2026-04-24" }
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
              <div><strong>XAUUSD</strong> <span class="buy">BUY</span></div>
              <div>Entry: 2650.50</div>
              <div>TP: 2675.00 | SL: 2640.00</div>
            </div>
            <div class="signal">
              <div><strong>BTCUSD</strong> <span class="sell">SELL</span></div>
              <div>Entry: 65200</div>
              <div>TP: 63500 | SL: 66100</div>
            </div>
          </div>

          <div class="card">
            <h3><i class="fas fa-broadcast-tower"></i> Live Stream</h3>
            <p>Status: <span style="color:#00ff88">Online Now</span></p>
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>
            <button class="btn" onclick="window.open('https://t.me/', '_blank')">Join Telegram Group</button>
          </div>

          <div class="card">
            <h3><i class="fas fa-video"></i> Videos</h3>
            <div id="videos-list"></div>
            ${isAdmin? `<button class="btn" onclick="addVideo()">+ Post New Video</button>` : ''}
          </div>

          <div class="card">
            <h3><i class="fas fa-chart-line"></i> Market Analysis</h3>
            <p><strong>Trend:</strong> Bullish</p>
            <p><strong>Strength:</strong> 89%</p>
            <button class="btn" onclick="alert('Analysis Updated')">Refresh Analysis</button>
          </div>

          <div class="card">
            <h3><i class="fas fa-gem"></i> VIP Status</h3>
            <p><strong>Plan:</strong> Platinum</p>
            <p><strong>Status:</strong> Active</p>
            <button class="btn" onclick="alert('Contact Admin')">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  `;
  renderVideos();
}

function renderVideos() {
  const list = document.getElementById('videos-list');
  if (!list) return;
  list.innerHTML = VIDEOS.map(v => `
    <div style="margin:10px 0;padding:10px;background:#0a0a15;border-radius:8px">
      <p><strong>${v.title}</strong></p>
      <small>${v.date}</small><br>
      <button class="btn" style="margin-top:5px" onclick="window.open('${v.url}', '_blank')">Watch</button>
    </div>
  `).join('');
}

function addVideo() {
  const title = prompt("Video Title:");
  const url = prompt("YouTube URL - paste normal link:");
  if (title && url) {
    // Convert normal YouTube URL to embed
    let embedUrl = url;
    if(url.includes("watch?v=")) {
      embedUrl = url.replace("watch?v=", "embed/");
    }
    VIDEOS.unshift({ title, url: embedUrl, date: new Date().toISOString().split('T')[0] });
    renderVideos();
    alert("Posted - Note: Will reset on page refresh because site is static");
  }
}

setTimeout(function() {
  if (localStorage.getItem('logged_in') === 'true') {
    showApp();
  } else {
    showLogin();
  }
}, 500);
