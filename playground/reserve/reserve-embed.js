'use strict';
if(window.parent!==window){
 const parentOrigin='https://openlab.aiposthub.com';
 const send=data=>window.parent.postMessage({source:'openlab-playground',...data},parentOrigin);
 let viewportTop=0,viewportHeight=800;
 const positionDialog=()=>{const dialog=document.querySelector('dialog[open]');if(dialog){dialog.style.margin='0 auto';dialog.style.top=(viewportTop+Math.min(80,viewportHeight*.12))+'px';dialog.style.maxHeight=Math.max(180,viewportHeight*.76)+'px';}};
 window.addEventListener('message',event=>{if(event.origin!==parentOrigin||event.source!==window.parent||event.data?.source!=='openlab-playground-host'||event.data.type!=='viewport')return;const {top,height}=event.data;if(Number.isFinite(top)&&top>=0&&top<=100000&&Number.isFinite(height)&&height>0&&height<10000){viewportTop=top;viewportHeight=height;positionDialog();}});
 const dialog=document.querySelector('dialog');if(dialog)new MutationObserver(positionDialog).observe(dialog,{attributes:true,attributeFilter:['open']});
 const resize=()=>send({type:'resize',height:Math.ceil(document.body.getBoundingClientRect().height)});
 const anchor=hash=>{const target=document.getElementById(hash.slice(1));if(target)send({type:'scroll',top:target.getBoundingClientRect().top+window.scrollY});};
 new ResizeObserver(resize).observe(document.body);
 document.addEventListener('click',event=>{
  const a=event.target.closest?.('a');if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.target==='_blank')return;
  const url=new URL(a.href,location.href);
  if(url.origin==='https://openlab.aiposthub.com'){a.target='_top';return;}
  if(url.origin===location.origin&&url.pathname===location.pathname&&url.hash){event.preventDefault();history.replaceState(null,'',url.hash);send({type:'hash',hash:url.hash});anchor(url.hash);}
 });
 document.fonts.ready.then(()=>{resize();if(location.hash)anchor(location.hash);});resize();
}
