(() => {
 const frame=document.getElementById('challenge-frame');
 const origin='https://openlab-ai-build-challenge.davincwc.workers.dev';
 const childPath=document.body.dataset.childPath||'/';
 const source=new URL(childPath,origin);source.searchParams.set('embedded','1');source.hash=location.hash;
 frame.src=source.href;
 window.addEventListener('message',event=>{
  if(event.origin!==origin||event.source!==frame.contentWindow||event.data?.source!=='openlab-challenge')return;
  const data=event.data;
  if(data.type==='resize'&&Number.isFinite(data.height)&&data.height>=0&&data.height<=100000){const height=Math.max(720,Math.ceil(data.height));if(frame.style.height!==height+'px')frame.style.height=height+'px';}
  if(data.type==='scroll'&&Number.isFinite(data.top)&&data.top>=0&&data.top<=100000){requestAnimationFrame(()=>window.scrollTo({top:frame.getBoundingClientRect().top+window.scrollY+data.top,behavior:'auto'}));}
  if(data.type==='navigate'&&typeof data.path==='string'){
   const destination=new URL(data.path,location.origin);
   if(destination.origin===location.origin&&['/challenge/','/challenge/rules/'].includes(destination.pathname))location.assign(destination.href);
  }
 });
})();
