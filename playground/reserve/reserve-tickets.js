'use strict';
// Shared presentation only: never includes contact data or management credentials.
function makeReservationTicket(booking,deskNames){
 const element=(tag,text)=>{const node=document.createElement(tag);node.textContent=text;return node;};
 const dateTime=seconds=>new Date(seconds*1000).toLocaleString('zh-TW',{timeZone:'Asia/Taipei',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false});
 const clock=seconds=>new Date(seconds*1000).toLocaleTimeString('zh-TW',{timeZone:'Asia/Taipei',hour:'2-digit',minute:'2-digit',hour12:false});
 const states={reserved:'已預約・請準時報到',checked_in:'已報到',active:'體驗中',completed:'已完成',cancelled:'已取消',no_show:'未報到',waiting:'現場候補中',ineligible:'資格待確認，請洽工作人員'};
 const queue=booking.kind==='waitlist';const valid=['reserved','checked_in','active','waiting'].includes(booking.status);
 const article=element('article','');article.className='reservation-ticket'+(valid?'':' ticket-inactive');article.dataset.reference=booking.reference||'';
 const header=element('div','');header.className='ticket-heading';header.append(element('span','OPEN LAB 2026 · AI PLAYGROUND'),element('strong',queue?'現場候補':'預約憑證'));article.append(header);
 const reference=element('p',booking.reference||(booking.sequence?(queue?'W-':'PG-')+String(booking.sequence).padStart(6,'0'):'—'));reference.className='ticket-reference';article.append(reference);
 const status=element('p',states[booking.status]||booking.status);status.className='ticket-status';article.append(status);
 const details=document.createElement('dl');
 const field=(label,value)=>{const row=element('div','');row.append(element('dt',label),element('dd',value));details.append(row);};
 field('主題桌',deskNames[booking.desk_id]||booking.desk_id);
 if(!queue&&booking.starts_at){field('體驗時間',dateTime(booking.starts_at)+'–'+clock(booking.ends_at||booking.starts_at+900));field('報到時間',dateTime(booking.check_in_by||booking.starts_at-300)+' 前');}
 else field('體驗安排','依現場叫號與空位安排');
 field('活動地點','台北瓶蓋工廠 F 棟 · AI Playground');article.append(details);
 const note=element('p',queue?'候補序號不代表已保留名額，請留意工作人員叫號。':valid?'請截圖保存，現場出示此畫面或手機截圖。未於開始前 5 分鐘到場，名額將釋出給替補。':'請以此紀錄目前顯示的狀態為準，如有疑問請洽工作人員。');note.className='ticket-note';article.append(note);return article;
}
