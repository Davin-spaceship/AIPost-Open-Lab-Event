(() => {
  'use strict';
  const data=window.OPENLAB;
  const $=(s)=>document.querySelector(s);
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  const validUrl=(url)=>{if(!url)return '';try{const u=new URL(url,location.href);return ['http:','https:'].includes(u.protocol)?u.href:'';}catch{return '';}};
  data.announcements.forEach(a=>{
    const n=el('a','update');n.href=a.href;n.dataset.label=a.label;n.append(el('span','mono',a.label));const copy=el('div');copy.append(el('h3','',a.title),el('p','',a.description));n.append(copy,el('span','update-arrow','↗'));$('#updates-list').append(n);
  });
  data.programs.forEach(p=>{
    const n=el('article','program-card');n.dataset.category=p.category;const top=el('div','card-top');top.append(el('span','',p.number),el('span','',p.tag));const symbol=el('span','card-symbol',p.symbol);symbol.setAttribute('aria-hidden','true');n.append(top,symbol,el('h3','',p.name),el('p','program-title',p.title),el('p','',p.description));if(p.href){const more=el('a','text-link','看看體驗內容 ↓');more.href=p.href;n.append(more);}$('#program-grid').append(n);
  });
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
    document.querySelectorAll('.program-card').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
  }));
  data.challenges.forEach(c=>{
    const n=el('article','challenge-card');n.append(el('span','mono',c.name),el('span','challenge-icon',c.id==='useless'?'?':'↗'),el('h3','',c.title),el('p','',c.description));const list=el('ul');c.examples.forEach(x=>list.append(el('li','',x)));n.append(list,el('p','fine-print',c.note));
    const url=validUrl(c.rulesUrl);const state=el(c.open&&url?'a':'div','challenge-status');if(c.open&&url){state.href=url;state.target='_blank';state.rel='noopener';}const label=el('span');label.append(el('i'),el('span','',c.status));state.append(label,el('span','',c.open&&url?'↗':'COMING SOON'));n.append(state);$('#challenge-grid').append(n);
  });
  function renderPartners(filter='all') {
    const grid=$('#partner-grid');grid.replaceChildren();const items=data.partners.filter(p=>p.published&&(filter==='all'||p.category===filter));
    items.forEach(p=>{const url=validUrl(p.url);const n=el(url?'a':'article','partner-card');if(url){n.href=url;n.target='_blank';n.rel='noopener';n.setAttribute('aria-label',p.name+' 官網（另開分頁）');}if(p.logo){const img=el('img');img.src=p.logo;img.alt=p.name;img.loading='lazy';n.append(img);}else n.append(el('strong','partner-name',p.name));grid.append(n);});
    const pending=el('div','partner-pending');pending.append(el('strong','','更多夥伴，陸續解鎖。'),el('span','mono',filter==='community'?'COMMUNITY / COMING SOON':filter==='media'?'MEDIA / COMING SOON':'NEXT UP / COMING SOON'));grid.append(pending);
  }
  renderPartners();document.querySelectorAll('[data-partner-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-partner-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderPartners(button.dataset.partnerFilter);}));
  const speakers=data.speakers.filter(s=>s.published);
  if(!speakers.length){const n=el('div','speaker-pending');const copy=el('div');copy.append(el('strong','','各行各業的 AI 實踐者，正在加入。'),el('p','','講者與分享主題將陸續公布，敬請期待。'));n.append(copy,el('span','','↗'));$('#speaker-grid').append(n);}
  speakers.forEach(s=>{const n=el('article','speaker-card');if(s.photo){const img=el('img');img.src=s.photo;img.alt=s.name;img.loading='lazy';n.append(img);}n.append(el('h4','',s.name),el('p','',s.role),el('p','',s.topic));$('#speaker-grid').append(n);});
  data.schedule.forEach(s=>{const n=el('article');const time=el('time','',s.time);time.dateTime=s.time;const copy=el('div');copy.append(el('h3','',s.title),el('p','',s.description));n.append(time,copy);$('#schedule').append(n);});
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
      if(a.closest('.hero-actions'))a.innerHTML=`NT$${phase.price.toLocaleString('en-US')} · 先把位置留好 <span>↗</span>`;
      else if(!a.closest('.mobile-booking'))a.innerHTML=`${phase.price===data.event.earlyPrice?'取得早鳥票':'前往報名'} <span>↗</span>`;
    });
  }
  const invite=$('.partner-invite p');invite.textContent=invite.textContent.replace('带','帶');
  const syncAnnouncement=()=>{const phase=ticketPhase();if(phase.price!==data.event.earlyPrice){const n=document.querySelector('.update[data-label="EARLY BIRD"]');if(n){n.querySelector('.mono').textContent='TICKETS';n.querySelector('h3').textContent=phase.name+'開放中，12/5 現場見';n.querySelector('p').textContent=`${phase.name} NT$${phase.price.toLocaleString('en-US')}，一票參與整場。票券供應依 Luma 即時資訊為準。`;}}};
  updateTickets();syncAnnouncement();setInterval(()=>{updateTickets();syncAnnouncement();},60000);
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}});},{threshold:.08});document.querySelectorAll('.heading-row,.program-grid,.challenge-grid,.survey-main,.partner-grid,.info-grid,.tickets-grid').forEach(n=>{n.classList.add('reveal-ready');observer.observe(n);});}
})();
