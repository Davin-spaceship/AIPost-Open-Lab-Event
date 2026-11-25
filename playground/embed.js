(()=>{
 const frame=document.getElementById('playground-frame'),origin='https://openlab-playground.davincwc.workers.dev';
 const source=new URL('/book',origin);source.searchParams.set('embedded','1');for(const key of ['desk','slot']){const value=new URLSearchParams(location.search).get(key);if(value)source.searchParams.set(key,value);}source.hash=location.hash;frame.src=source.href;
 const viewport=()=>frame.contentWindow.postMessage({source:'openlab-playground-host',type:'viewport',top:Math.max(0,-frame.getBoundingClientRect().top),height:window.innerHeight},origin);frame.addEventListener('load',viewport);window.addEventListener('scroll',viewport,{passive:true});window.addEventListener('resize',viewport);
 window.addEventListener('message',event=>{
  if(event.origin!==origin||event.source!==frame.contentWindow||event.data?.source!=='openlab-playground')return;
  const d=event.data;
  if(d.type==='resize'&&Number.isFinite(d.height)&&d.height>=0&&d.height<=100000)frame.style.height=Math.max(900,Math.ceil(d.height))+'px';
  if(d.type==='scroll'&&Number.isFinite(d.top)&&d.top>=0&&d.top<=100000)window.scrollTo({top:frame.getBoundingClientRect().top+window.scrollY+d.top,behavior:'smooth'});
  if(d.type==='hash'&&typeof d.hash==='string'&&/^#[a-z-]+$/.test(d.hash))history.replaceState(null,'',location.pathname+location.search+d.hash);
 });
})();
