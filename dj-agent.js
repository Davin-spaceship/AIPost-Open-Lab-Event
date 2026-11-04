(() => {
  const tracks = [
    {title:'Cipher', file:'cipher.mp3', mood:'靈感運算中。這首適合腦洞大開。'},
    {title:'Digital Lemonade', file:'digital-lemonade.mp3', mood:'偵測到好奇心。補充一點電子維他命。'},
    {title:'Wallpaper', file:'wallpaper.mp3', mood:'切換到心流模式。讓點子慢慢長出來。'}
  ];
  const root = document.createElement('aside');
  root.className = 'dj-agent'; root.setAttribute('aria-label','OPEN LAB DJ Agent 音樂播放器');
  root.innerHTML = `<button class="dj-toggle" aria-expanded="false" aria-controls="dj-panel"><span class="dj-face" aria-hidden="true">[•ᴗ•]</span><span>DJ AGENT <span class="dj-indicator">待命中</span></span><span aria-hidden="true">♫</span></button>
  <div id="dj-panel" hidden><div class="dj-heading"><span>OPEN LAB / SOUND EXPERIMENT</span><button class="dj-close" aria-label="收合音樂播放器">−</button></div><h2>你的靈感，我來配樂。</h2><p class="dj-message" role="status" aria-live="polite">耳機戴好了嗎？啟動我，隨機來點靈感。</p><p class="dj-track">等待第一首實驗配樂</p><div class="dj-controls"><button class="dj-play">▶ 啟動 Agent</button><button class="dj-next" aria-label="隨機播放下一首">下一首 ↗</button></div><label class="dj-volume">音量 <input type="range" min="0" max="100" value="25" aria-label="音樂音量"></label><p class="dj-note">模擬 DJ Agent · 隨機選曲，靈感自由發生。</p><details class="dj-credits"><summary>音樂來源與授權 ↗</summary><p>“Cipher”, “Digital Lemonade”, “Wallpaper”<br>Kevin MacLeod (<a href="https://incompetech.com/music/royalty-free/music.html" target="_blank" rel="noopener">incompetech.com</a>)<br>Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">Creative Commons: By Attribution 4.0</a>。原曲未修改。</p></details></div>`;
  document.body.append(root);
  const get = s => root.querySelector(s);
  const audio = new Audio(); audio.preload = 'none'; audio.volume = .25;
  let current = -1, request = 0;
  const panel = get('#dj-panel'), play = get('.dj-play'), message = get('.dj-message');
  function expand(open) { panel.hidden = !open; get('.dj-toggle').setAttribute('aria-expanded', String(open)); }
  get('.dj-toggle').onclick = () => expand(panel.hidden);
  get('.dj-close').onclick = () => { expand(false); get('.dj-toggle').focus(); };
  root.addEventListener('keydown', e => { if(e.key === 'Escape') { expand(false); get('.dj-toggle').focus(); } });
  function state(playing) {
    root.classList.toggle('is-playing', playing);
    play.textContent = playing ? 'Ⅱ 暫停' : current < 0 ? '▶ 啟動 Agent' : '▶ 繼續播放';
    get('.dj-indicator').textContent = playing ? '配樂中' : '待命中';
  }
  async function start(next = false) {
    const id = ++request;
    if (current < 0 || next) {
      const choices = tracks.map((_,i)=>i).filter(i=>i!==current);
      current = choices[Math.floor(Math.random()*choices.length)];
      audio.src = new URL('music/' + tracks[current].file, document.baseURI).href;
      get('.dj-track').textContent = tracks[current].title + ' — Kevin MacLeod';
    }
    message.textContent = 'Agent 正在把靈感接上音軌⋯';
    try { await audio.play(); if (id === request) message.textContent = tracks[current].mood; }
    catch(e) { if(id !== request || e.name === 'AbortError') return; state(false); message.textContent = '音軌暫時沒接上，點播放或下一首再試一次。'; }
  }
  play.onclick = () => { if(!audio.paused) { ++request; audio.pause(); message.textContent='暫停運算。靈感也需要深呼吸。'; } else start(); };
  get('.dj-next').onclick = () => start(true);
  get('.dj-volume').oninput = e => { audio.volume = Number(e.target.value)/100; };
  audio.addEventListener('playing',()=>state(true));
  audio.addEventListener('pause',()=>state(false));
  audio.addEventListener('ended',()=>start(true));
  audio.addEventListener('error',()=>{ state(false); message.textContent='音軌暫時沒接上，點下一首換個靈感。'; });
})();
