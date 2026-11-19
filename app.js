(() => {
  'use strict';
  const data=window.OPENLAB;
  const $=(s)=>document.querySelector(s);
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const validUrl=(url)=>{if(!url)return '';try{const u=new URL(url,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  function renderPartners() {
    const grid=$('#partner-grid'),communityGrid=$('#community-partner-grid');grid.replaceChildren();communityGrid.replaceChildren();const items=data.partners.filter(p=>p.published);
    items.forEach(p=>{const n=el('article','partner-card');if(p.logo){const img=el('img');img.src=p.logo;img.alt=p.name;img.loading='lazy';n.append(img);}else n.append(el('strong','partner-name',p.name));(p.category==='community'?communityGrid:grid).append(n);});

  }
  renderPartners();
  data.faq.forEach(f=>{const n=el('details');n.append(el('summary','',f.question),el('p','',f.answer));$('#faq-list').append(n);});
  function ticketPhase(now=Date.now()){
    if(now<Date.parse(data.event.earlyDeadline))return {name:'早鳥票',short:'早鳥',label:'EARLY BIRD / 早鳥票',price:data.event.earlyPrice};
    if(now<Date.parse(data.event.lateStart))return {name:'一般票',short:'一般票',label:'GENERAL ADMISSION / 一般票',price:data.event.regularPrice};
    return {name:'晚鳥票',short:'晚鳥票',label:'LATE ADMISSION / 晚鳥票',price:data.event.latePrice};
  }
  function updateTickets(){
    const phase=ticketPhase();
    $('#ticket-price').textContent=phase.price.toLocaleString('en-US');
    $('#mobile-price').textContent=`${phase.short} NT$${phase.price.toLocaleString('en-US')}`;
    $('.ticket-phase').textContent=phase.label;
    $('#price-next').textContent='早鳥 NT$500 ／ 一般票 NT$800 ／ 晚鳥票 NT$1,000';
    $('.early-note').textContent=phase.price===data.event.earlyPrice?`早鳥至 ${data.event.earlyLabel} · 一票參與整場`:'一票參與整場 · 票券供應依 Luma 即時資訊為準';
    document.querySelectorAll('.ticket-link').forEach(a=>{
      a.href=data.event.registration;
      if(a.closest('.hero-actions'))a.innerHTML=`NT$${phase.price.toLocaleString('en-US')} · 先把位置留好`;
      else if(!a.closest('.mobile-booking'))a.innerHTML=`${phase.price===data.event.earlyPrice?'取得早鳥票':'前往報名'}`;
    });
  }
  const syncAnnouncement=()=>{const phase=ticketPhase();if(phase.price!==data.event.earlyPrice){const n=document.querySelector('.update[data-label="EARLY BIRD"]');if(n){n.querySelector('.mono').textContent='TICKETS';n.querySelector('h3').textContent=phase.name+'開放中，12/5 現場見';n.querySelector('p').textContent=`${phase.name} NT$${phase.price.toLocaleString('en-US')}，一票參與整場。票券供應依 Luma 即時資訊為準。`;}}};
  updateTickets();syncAnnouncement();setInterval(()=>{updateTickets();syncAnnouncement();},60000);
  const requestForm=$('#partnership-form');
  requestForm.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!requestForm.reportValidity())return;
    const submit=requestForm.querySelector('button[type="submit"]'),status=$('#request-status');
    if(submit.disabled)return;
    if(requestForm.elements._honey.value)return;
    submit.disabled=true;status.dataset.error='false';status.textContent='傳送中，請稍候…';
    const payload=Object.fromEntries(new FormData(requestForm));
    payload._replyto=payload.email;
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
    try{
      const response=await fetch('https://formsubmit.co/ajax/davin@aiposthub.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload),signal:controller.signal});
      const result=await response.json();
      if(/activat|confirm/i.test(result.message||'')){
        status.dataset.error='true';status.textContent='收件服務尚待主辦方啟用，你的資料已交由服務暫存。請稍後再試，或直接聯繫 davin@aiposthub.com。';
      }else{
        if(!response.ok || (result.success!==true && result.success!=='true'))throw new Error('submission_failed');
        status.textContent='合作需求已送出，我們會透過你留下的 Email 與你聯繫。';requestForm.reset();
      }
    }catch(error){status.dataset.error='true';status.textContent=error.name==='AbortError'?'連線逾時，尚無法確認送出結果。請稍後再試，或聯繫 davin@aiposthub.com。':'目前無法送出，請稍後再試，或聯繫 davin@aiposthub.com。';}
    finally{clearTimeout(timer);submit.disabled=false;}
  });
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.08});document.querySelectorAll('.heading-row,.program-grid,.challenge-grid,.survey-main,.partner-grid,.info-grid,.tickets-grid').forEach(n=>{n.classList.add('reveal-ready');observer.observe(n);});}
})();

// Native modal provides focus containment, Escape support and background inertness.
(()=>{
 const dialog=document.querySelector('#mobile-navigation');
 const trigger=document.querySelector('.mobile-menu-trigger');
 if(!dialog||!trigger)return;
 const close=()=>dialog.close();
 trigger.addEventListener('click',()=>{dialog.showModal();trigger.setAttribute('aria-expanded','true');document.documentElement.classList.add('mobile-navigation-open');});
 dialog.querySelector('.mobile-menu-close').addEventListener('click',close);
 dialog.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',close));
 dialog.addEventListener('close',()=>{trigger.setAttribute('aria-expanded','false');document.documentElement.classList.remove('mobile-navigation-open');trigger.focus({preventScroll:true});});
 matchMedia('(min-width:1001px)').addEventListener('change',event=>{if(event.matches&&dialog.open)close();});
})();

// Deep links keep useful details discoverable after the homepage consolidation.
(()=>{
 const revealTarget=()=>{
  const id=decodeURIComponent(location.hash.slice(1));if(!id)return;
  const target=document.getElementById(id);if(!target)return;
  const disclosure=target.closest('details')||(id==='partnership-request'?target.querySelector('details'):null);
  if(disclosure)disclosure.open=true;
 };
 addEventListener('hashchange',revealTarget);revealTarget();
})();
