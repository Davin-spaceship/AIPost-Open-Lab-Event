(() => {
  const tracks = [
  {
    "title": "Cipher",
    "file": "cipher.mp3",
    "mood": "靈感運算中。這首適合腦洞大開。",
    "duration": 231.26205
  },
  {
    "title": "Digital Lemonade",
    "file": "digital-lemonade.mp3",
    "mood": "偵測到好奇心。補充一點電子維他命。",
    "duration": 180.062062
  },
  {
    "title": "Wallpaper",
    "file": "wallpaper.mp3",
    "mood": "切換到心流模式。讓點子慢慢長出來。",
    "duration": 220.055525
  },
  {
    "title": "Space Jazz",
    "file": "space-jazz.mp3",
    "mood": "把腦洞開到外太空。爵士訊號接收中。",
    "duration": 369.50205
  },
  {
    "title": "Voxel Revolution",
    "file": "voxel-revolution.mp3",
    "mood": "像素宇宙已載入。準備做點好玩的事。",
    "duration": 129.90695
  },
  {
    "title": "Laser Groove",
    "file": "laser-groove.mp3",
    "mood": "雷射節奏校準完成。靈感開始發光。",
    "duration": 168.071844
  },
  {
    "title": "Chill Wave",
    "file": "chill-wave.mp3",
    "mood": "降溫運算中。讓腦袋跟著聲波散步。",
    "duration": 240.065313
  },
  {
    "title": "Bit Shift",
    "file": "bit-shift.mp3",
    "mood": "位元正在跳舞。下一個點子即將編譯。",
    "duration": 192.05225
  },
  {
    "title": "Bit Quest",
    "file": "bit-quest.mp3",
    "mood": "支線任務開啟。帶著好奇心去冒險。",
    "duration": 192.05225
  },
  {
    "title": "EDM Detection Mode",
    "file": "edm-detection-mode.mp3",
    "mood": "偵測到節奏。實驗室能量補給中。",
    "duration": 365.688187
  },
  {
    "title": "Dream Culture",
    "file": "dream-culture.mp3",
    "mood": "進入白日夢模式。先讓想像力自由跑。",
    "duration": 214.360825
  },
  {
    "title": "Mining by Moonlight",
    "file": "mining-by-moonlight.mp3",
    "mood": "月光挖礦中。這次挖的是好點子。",
    "duration": 203.664
  },
  {
    "title": "RetroFuture Clean",
    "file": "retrofuture-clean.mp3",
    "mood": "回到未來。替你的點子加一點復古濾鏡。",
    "duration": 206.208
  },
  {
    "title": "Hackbeat",
    "file": "hackbeat.mp3",
    "mood": "Bug 先等等。讓節拍接管實驗室。",
    "duration": 242.285725
  },
  {
    "title": "Ether Disco",
    "file": "ether-disco.mp3",
    "mood": "雲端舞池已開放。靈感不用排隊。",
    "duration": 176.065313
  }
];
  const total = tracks.reduce((sum, t) => sum + t.duration, 0);
  const epoch = Date.UTC(2026, 10, 4);
  function orderFor(cycle) {
    const order = tracks.map((_, i) => i);
    let seed = (cycle + 12052026) >>> 0;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  }
  function broadcastAt(now = Date.now()) {
    const elapsed = (now - epoch) / 1000;
    const cycle = Math.floor(elapsed / total);
    let offset = ((elapsed % total) + total) % total;
    const order = orderFor(cycle), previous = orderFor(cycle - 1);
    if (order[0] === previous[previous.length - 1]) [order[0], order[1]] = [order[1], order[0]];
    let slot = 0;
    while (slot < order.length - 1 && offset >= tracks[order[slot]].duration) offset -= tracks[order[slot++]].duration;
    return {index:order[slot], offset, key:cycle + ':' + slot, next:order[slot + 1] ?? (() => {
      const next = orderFor(cycle + 1);
      if (next[0] === order[order.length - 1]) [next[0], next[1]] = [next[1], next[0]];
      return next[0];
    })()};
  }
  const root = document.createElement('aside');
  root.className = 'dj-agent'; root.setAttribute('aria-label','OPEN LAB RADIO DJ Agent 模擬直播電台');
  root.innerHTML = `<button class="dj-toggle" aria-label="開啟 OPEN LAB RADIO 電台" title="OPEN LAB RADIO" aria-expanded="false" aria-controls="dj-panel"><span class="dj-face" aria-hidden="true">[•ᴗ•]</span><span>OPEN LAB RADIO<span class="dj-indicator">DJ AGENT · ON AIR</span></span><span class="dj-live">● LIVE</span></button>
  <div id="dj-panel" hidden>
    <div class="dj-heading"><span class="dj-live">● LIVE STREAM</span><span class="dj-clock"></span><button class="dj-close" aria-label="收合電台">−</button></div>
    <h2>OPEN LAB RADIO<span>HOSTED BY DJ AGENT</span></h2>
    <div class="dj-studio"><span class="dj-robot" aria-hidden="true">[•ᴗ•]<small>DJ / 001</small></span><div class="dj-wave" aria-hidden="true">${'<i></i>'.repeat(17)}</div><span class="dj-onair">ON AIR</span></div>
    <p class="dj-message" role="status" aria-live="polite"></p>
    <div class="dj-now"><span class="dj-label">NOW ON AIR</span><strong class="dj-track"></strong><span class="dj-artist">Kevin MacLeod</span><div class="dj-progress" role="progressbar" aria-label="本曲播送進度" aria-valuemin="0" aria-valuemax="100"><span></span></div><div class="dj-time"><span class="dj-elapsed"></span><span class="dj-duration"></span></div></div>
    <div class="dj-upnext"><span>UP NEXT</span><span class="dj-next-title"></span></div>
    <div class="dj-controls"><button class="dj-play">▶ 收聽直播</button><button class="dj-sync" aria-label="回到直播進度">↗ 回到 LIVE</button></div>
    <label class="dj-volume">音量 <input type="range" min="0" max="100" value="25" aria-label="電台音量"></label>
    <p class="dj-connection" role="status">訊號已就緒 · 點擊加入當下的音樂</p>
    <p class="dj-note">模擬直播電台 · 預錄音樂排播 / Agent 角色演出</p>
    <details class="dj-credits"><summary>曲庫與音樂授權 ↗</summary><p><span class="dj-library"></span><br>Kevin MacLeod (<a href="https://incompetech.com/music/royalty-free/music.html" target="_blank" rel="noopener">incompetech.com</a>)<br>Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Creative Commons: By Attribution 4.0</a>。原曲未修改。</p></details>
  </div>`;
  document.body.append(root);
  const get = s => root.querySelector(s), audio = new Audio();
  audio.preload = 'none'; audio.volume = .25;
  let listening = false, current = -1, activeKey = '', displayedKey = '', request = 0;
  const panel = get('#dj-panel'), play = get('.dj-play'), connection = get('.dj-connection');
  const format = seconds => Math.floor(seconds / 60) + ':' + String(Math.floor(seconds % 60)).padStart(2,'0');
  get('.dj-library').textContent = tracks.map(t => '“' + t.title + '”').join(', ');
  function expand(open) { panel.hidden = !open; get('.dj-toggle').setAttribute('aria-expanded',String(open)); get('.dj-toggle').setAttribute('aria-label', (open ? '收合' : '開啟') + ' OPEN LAB RADIO 電台'); }
  get('.dj-toggle').onclick = () => expand(panel.hidden);
  get('.dj-close').onclick = () => { expand(false); get('.dj-toggle').focus(); };
  root.addEventListener('keydown',e => { if(e.key === 'Escape') { expand(false); get('.dj-toggle').focus(); } });
  function seekLive() {
    const live = broadcastAt();
    if(live.index === current && Number.isFinite(audio.duration)) audio.currentTime = Math.min(live.offset, Math.max(0,audio.duration - .1));
  }
  async function tune(force = false) {
    if (!listening) return;
    const live = broadcastAt(), id = ++request;
    if(current !== live.index || activeKey !== live.key) {
      current = live.index; activeKey = live.key;
      audio.src = new URL('music/' + tracks[current].file,document.baseURI).href;
    } else if(force) seekLive();
    connection.textContent = '正在接通直播訊號⋯';
    try { await audio.play(); if(id === request && listening) connection.textContent = '已接通 · 正在收聽直播進度'; }
    catch(e) { if(id !== request || e.name === 'AbortError') return; stop('訊號暫時中斷 · 點收聽直播重新連線'); }
  }
  function stop(text = '已停止收聽 · 電台持續播送中') {
    listening = false; ++request; audio.pause(); root.classList.remove('is-playing');
    play.textContent = '▶ 收聽直播'; connection.textContent = text;
    get('.dj-indicator').textContent = 'DJ AGENT · ON AIR';
  }
  play.onclick = () => { if(listening) stop(); else { listening = true; play.textContent = '■ 停止收聽'; tune(true); } };
  get('.dj-sync').onclick = () => { listening = true; play.textContent = '■ 停止收聽'; tune(true); };
  get('.dj-volume').oninput = e => { audio.volume = Number(e.target.value)/100; };
  audio.addEventListener('loadedmetadata',seekLive);
  audio.addEventListener('playing',()=>{ if(!listening) { audio.pause(); return; } root.classList.add('is-playing'); get('.dj-indicator').textContent = 'DJ AGENT · 收聽中'; });
  audio.addEventListener('waiting',()=>{ if(listening) connection.textContent = '訊號緩衝中⋯'; });
  audio.addEventListener('ended',()=>{ if(listening) { activeKey = ''; tune(true); } });
  audio.addEventListener('error',()=>{ if(listening) stop('訊號暫時中斷 · 點收聽直播重新連線'); });
  function tick() {
    const live = broadcastAt(), track = tracks[live.index];
    get('.dj-clock').textContent = new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Taipei',hour12:false}) + ' TAIPEI';
    if(displayedKey !== live.key) {
      displayedKey = live.key;
      get('.dj-track').textContent = track.title;
      get('.dj-message').textContent = 'DJ AGENT › ' + track.mood;
      get('.dj-next-title').textContent = tracks[live.next].title;
      get('.dj-duration').textContent = format(track.duration);
    }
    const progress = Math.floor(live.offset / track.duration * 100);
    get('.dj-progress span').style.width = progress + '%';
    get('.dj-progress').setAttribute('aria-valuenow',String(progress));
    get('.dj-elapsed').textContent = format(live.offset);
    if(listening && activeKey !== live.key) tune();
  }
  document.addEventListener('visibilitychange',()=>{ if(!document.hidden) { tick(); if(listening) tune(true); } });
  tick(); setInterval(tick,1000);
})();
