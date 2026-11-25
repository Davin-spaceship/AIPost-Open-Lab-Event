'use strict';
// Presentation preview only. No network requests, cookies, or attendee storage.
const deskNames={a:'影像／影片',b:'Coding & Agent',c:'Workflow & Agent',music:'和 AI 一起編曲',e:'AI 資安桌'};
const durations={a:'15 分鐘',b:'15 分鐘',c:'15 分鐘',music:'15 分鐘',e:'15 分鐘'};
const timeOptions=document.getElementById('time-options');
let renderedDesk='';
const queryDesk=new URLSearchParams(location.search).get('desk');
if(Object.hasOwn(deskNames,queryDesk))document.querySelector(`input[name="desk"][value="${queryDesk}"]`).checked=true;
function renderTimes(desk){
 const previous=document.querySelector('input[name="time"]:checked')?.value;
 timeOptions.replaceChildren();
 for(let minutes=13*60+30;minutes<=18*60+30;minutes+=15){
  const value=String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0');
  const label=document.createElement('label');label.className='time-choice';
  const input=document.createElement('input');input.type='radio';input.name='time';input.value=value;input.checked=value===previous;
  const text=document.createElement('span');text.textContent=value;
  label.append(input,text);timeOptions.append(label);
 }
 renderedDesk=desk;
 for(const detail of document.querySelectorAll('.desk-task-details'))detail.open=detail.dataset.desk===desk;
}
function updateSummary(){
 const desk=document.querySelector('input[name="desk"]:checked').value;
 if(renderedDesk!==desk)renderTimes(desk);
 const time=document.querySelector('input[name="time"]:checked')?.value;
 document.getElementById('selected-desk').textContent=deskNames[desk];
 document.getElementById('selected-duration').textContent=durations[desk];
 document.getElementById('selected-capacity').textContent=desk==='e'?'1 個名額':'2 個名額';
 document.getElementById('selected-time').textContent=time?time+'（試排）':'尚未選擇';
}
document.getElementById('reservation-form').addEventListener('change',updateSummary);
document.getElementById('reservation-form').addEventListener('submit',event=>event.preventDefault());
updateSummary();
