'use strict';
const $=id=>document.getElementById(id);
const names={a:'影像／影片',b:'Coding & Agent',c:'Workflow & Agent',music:'和 AI 一起編曲',e:'AI 資安桌'};
const durations={a:'15 分鐘',b:'15 分鐘',c:'15 分鐘',music:'15 分鐘',e:'15 分鐘'};
const labels={reserved:'已預約',waiting:'候補中',checked_in:'已報到',active:'體驗中',completed:'已完成',cancelled:'已取消',no_show:'未到'};
const params=new URLSearchParams(location.search);const verificationToken=null;if(location.hash.startsWith('#token='))history.replaceState(null,'',location.pathname+location.search);
let slots=[],opened=false,me={authenticated:false,bookings:[]},busy=false,describedDesk="";
const button=document.querySelector('.reserve-button');const notification=document.createElement('p');notification.role='status';notification.setAttribute('aria-live','polite');notification.className='booking-feedback';notification.hidden=true;document.querySelector('.preview-notice').remove();button.before(notification);
const registrationDialog=$('registration-dialog');
$('registration-close').onclick=()=>registrationDialog.close();
registrationDialog.addEventListener('close',()=>{$('email').focus();$('email').select();});
const manage=document.createElement('section');manage.className='form-section';$('reservation-form').append(manage);
const title=document.createElement('h2');title.textContent='我的預約與候補';manage.append(title);const personal=document.createElement('div');manage.append(personal);
const controls=document.createElement('div');manage.append(controls);
function say(text){notification.textContent=text;notification.hidden=!text;}
function el(tag,text){const node=document.createElement(tag);node.textContent=text;return node;}
async function api(path,data){const response=await fetch(path,data===undefined?{cache:'no-store'}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const result=await response.json();if(!response.ok){const error=Error(result.error||'服務暫時無法使用');error.code=result.code;error.status=response.status;throw error;}return result;}
function currentDesk(){return document.querySelector('input[name="desk"]:checked').value;}
function currentSlot(){return document.querySelector('input[name="time"]:checked')?.value;}
const format=t=>new Date(t*1000).toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false});
function update(){const desk=currentDesk(),id=currentSlot(),slot=slots.find(s=>s.id===id);$('selected-desk').textContent=names[desk];$('selected-duration').textContent=durations[desk];$('selected-capacity').textContent=desk==='e'?'1 個名額':'2 個名額';$('selected-time').textContent=slot?format(slot.starts_at):'尚未選擇';const active=(me.reservationCount??me.bookings?.filter(b=>b.kind==='reservation'&&['reserved','checked_in','active'].includes(b.status)).length??0)>=2;button.textContent=busy?'處理中…':!opened?'預約尚未開放':active?'已達 2 場預約上限':'確認預約';button.disabled=busy||!opened||(!verificationToken&&(active||!slot));$('email').readOnly=me.authenticated;if(me.authenticated)$('email').value=me.email;}
function renderSlots(preferred){$('time-options').replaceChildren();const desk=currentDesk();if(describedDesk!==desk){for(const detail of document.querySelectorAll('.desk-task-details'))detail.open=detail.dataset.desk===desk;describedDesk=desk;}const ownTimes=new Set((me.bookings||[]).filter(b=>b.kind==='reservation'&&['reserved','checked_in','active'].includes(b.status)).map(b=>b.starts_at));const options=slots.filter(s=>s.desk_id===desk&&s.remaining>0&&!ownTimes.has(s.starts_at));for(const slot of options){const label=el('label','');label.className='time-choice';const input=el('input','');input.type='radio';input.name='time';input.value=slot.id;input.checked=slot.id===preferred;const span=el('span',new Date(slot.starts_at*1000).toLocaleTimeString('zh-TW',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false}));const remaining=el('small','剩餘 '+slot.remaining+' 個名額');span.append(remaining);label.append(input,span);$('time-options').append(label);}$('time-note').textContent=!opened?'預約尚未開放。':options.length?'以下為可預約的體驗開始時間，請提前 5 分鐘報到；名額以確認預約時為準。':'此桌目前沒有可預約的時段，可換一桌看看或到現場詢問候補。';update();}
function renderPersonal(){
 personal.replaceChildren();controls.replaceChildren();manage.hidden=!me.authenticated;if(!me.authenticated)return;
 for(const booking of me.bookings){
  const row=makeReservationTicket(booking,names);
  if(['reserved','waiting','checked_in'].includes(booking.status)){
   const cancel=el('button','取消這筆預約／候補');cancel.type='button';cancel.onclick=()=>{if(confirm('確定取消？'))run(async()=>{const r=await api('/api/cancel',{id:booking.id});if(!r.ok)throw Error('狀態已變更，請更新後再確認。');await load();say('已取消，可重新預約。');});};row.append(cancel);
  }
  personal.append(row);
 }
 if(!me.bookings.length)personal.append(el('p','尚無預約或候補。'));
 const refresh=el('button','更新狀態');refresh.type='button';refresh.onclick=()=>run(load);
 const logout=el('button','切換報名 Email');logout.type='button';logout.onclick=()=>{if(confirm('切換後仍可用 Email 查詢預約；如需取消原有預約，請洽工作人員協助。確定切換？'))run(async()=>{await api('/api/logout',{});location.replace('/book');});};controls.append(refresh,logout);
}
async function load(){const previous=currentSlot()||params.get('slot');const [availability,account]=await Promise.all([api('/api/availability'),api('/api/me')]);opened=availability.open;slots=availability.slots;me=account;if(me.authenticated&&!$('lookup-email').value)$('lookup-email').value=me.email;renderSlots(previous);renderPersonal();update();}
async function run(fn){if(busy)return;busy=true;say('');notification.dataset.state='';update();try{await fn();}catch(e){notification.dataset.state='error';say(e.message);if(e.code==='REGISTRATION_REQUIRED'){if(typeof registrationDialog.showModal==='function'){if(!registrationDialog.open)registrationDialog.showModal();}else window.alert('請先完成 OPEN LAB 2026 的 Luma 報名，再回來預約體驗。');}else notification.scrollIntoView({block:'nearest',behavior:'smooth'});}finally{busy=false;update();}}
const desk=params.get('desk');if(Object.hasOwn(names,desk))document.querySelector(`input[name="desk"][value="${desk}"]`).checked=true;
$('reservation-form').addEventListener('change',event=>{if(event.target.name==='desk')renderSlots();else update();});$('reservation-form').addEventListener('submit',event=>{event.preventDefault();button.click();});
button.type='button';button.onclick=()=>run(async()=>{
 const slot=currentSlot();if(!slot)throw Error('請先選擇報到時間。');
 if(!$('phone').value||!$('phone').reportValidity())throw Error('請填寫可聯繫的手機號碼。');
 if(!me.authenticated){if(!$('email').value||!$('email').reportValidity())throw Error('請輸入有效的報名 Email。');await api('/api/login/request',{email:$('email').value});me=await api('/api/me');if(!me.authenticated)throw Error('資格核對未完成，請重試。');}
 const reserved=await api('/api/book',{slot,phone:$('phone').value});await load();say('預約成功！你的序號是 '+reserved.reference+'。請將下方預約憑證截圖，於體驗開始前 5 分鐘到桌邊報到並出示。');const receipt=personal.querySelector('[data-reference="'+reserved.reference+'"]');if(receipt)receipt.scrollIntoView({block:'start',behavior:'smooth'});
});
$('email').required=true;
$('email-title').parentElement.querySelector('h2+p').textContent='輸入 Luma 報名時的 Email 核對資格，並留下聯絡手機。不另外寄送驗證信，確認預約成功後才會保留名額。';
const privacy=document.querySelector('#email-title').parentElement.querySelector('.time-note');privacy.replaceChildren(el('span','Email 用於比對活動報名資格，手機供工作人員於活動當天聯繫。資料儲存在主辦方的 Cloudflare 預約系統，僅工作人員可查看聯絡資料。需要更正或刪除，請聯繫 '));const contact=el('a','info@aiposthub.com');contact.href='mailto:info@aiposthub.com';privacy.append(contact,el('span','。剛完成報名卻無法預約？請洽工作人員協助。'));
const walkin=document.querySelector('.walk-in-status');const waitButton=el('button','加入目前所選桌別的現場候補');waitButton.type='button';waitButton.className='button';waitButton.onclick=()=>run(async()=>{if(!$('phone').value||!$('phone').reportValidity())throw Error('請填寫聯絡手機。');if(!me.authenticated){if(!$('email').value||!$('email').reportValidity())throw Error('請填寫報名 Email。');await api('/api/login/request',{email:$('email').value});me=await api('/api/me');}if(!confirm('已在現場？確認加入 '+names[currentDesk()]+' 候補，請留意桌邊叫號。'))return;await api('/api/waitlist',{desk:currentDesk(),phone:$('phone').value});await load();say('已加入候補，請留意桌邊叫號。');});walkin.replaceWith(waitButton);document.querySelector('.summary-note').textContent='預約的是體驗時段，請於開始前 5 分鐘到桌邊報到；未準時到場，名額將釋出給替補。';
let lookupBusy=false;
$('lookup-form').addEventListener('submit',async event=>{
 event.preventDefault();if(lookupBusy||!$('lookup-form').reportValidity())return;
 lookupBusy=true;const lookupButton=$('lookup-submit');lookupButton.disabled=true;lookupButton.textContent='查詢中…';$('lookup-results').replaceChildren();$('lookup-message').textContent='正在查詢預約紀錄…';
 try{
  const result=await api('/api/reservations/lookup',{email:$('lookup-email').value});
  if(!result.bookings.length){$('lookup-message').textContent='查無體驗預約紀錄。請確認輸入的是預約時填寫的 Email，或確認是否已完成 Playground 預約。';}
  else{$('lookup-message').textContent='找到 '+result.bookings.length+' 筆預約紀錄。請確認場次狀態，並截圖保存有效的預約憑證。';for(const booking of result.bookings)$('lookup-results').append(makeReservationTicket(booking,names));}
 }catch(error){$('lookup-message').textContent=error.message||'查詢暫時無法使用，請稍後再試。';}
 finally{lookupBusy=false;lookupButton.disabled=false;lookupButton.textContent='查詢預約場次';}
});
run(load);
