/* 更新入口：只有 published: true 的人物與夥伴會出現在公開頁。
 * logo 可填本機 assets/…；url、role、description 依正式確認內容填寫。
 * 不放洽談中的品牌，也不以歷來合作代表本次合作。
 */
window.OPENLAB = {
  event: {name:'AI郵報 OPEN LAB 2026',date:'2026.12.05',weekday:'SAT',city:'TAIPEI',venue:'台北瓶蓋工廠',checkin:'13:00',start:'13:30',food:'17:30',earlyPrice:500,regularPrice:800,latePrice:1000,lateStart:'2026-11-29T00:00:00+08:00',earlyDeadline:'2026-10-31T12:00:00+08:00',earlyLabel:'10/31 中午 12:00',registration:'https://luma.com/zr1k4qa5',email:'info@aiposthub.com'},
  announcements:[
    {label:'AI PLAYGROUND',title:'輪盤抽任務，親手完成一個 AI 作品',description:'五類主題桌、志工引導與預載工作流，帶你把好奇變成成果。體驗規劃搶先看。',href:'#playground'},
    {label:'EARLY BIRD',title:'早鳥開放中，10/31 中午截止',description:'一票參與整場。早鳥 NT$500、一般票 NT$800、晚鳥票 NT$1,000；活動內容相同。',href:'#tickets'},
    {label:'FIRST LOOK',title:'2026 AI郵報讀者調查，現場大公開',description:'從大家怎麼用 AI，到期待與焦慮。讓讀者的真實聲音成為對話的起點。',href:'#survey'},
    {label:'CHALLENGE',title:'兩個創作挑戰，預計 10/28 公布辦法',description:'Useless AI Challenge × Postcards from 2036。徵件方式、獎項與時程預計 10/28 公布。',href:'#challenges'}
  ],
  programs:[
    {number:'01',tag:'LISTEN',category:'share',name:'AI Talks',title:'別人，正在怎麼用 AI？',description:'邀請各行各業的 AI 專家與實踐者，聊真實案例、工作方法，以及踩過的坑。帶著你的問題來。',symbol:'↗'},
    {number:'02',tag:'WATCH',category:'try',name:'AI Demos',title:'那些「這也做得到？」的瞬間',description:'工具、Agent 工作流、影音與硬體應用，在你面前跑起來。看操作，也和團隊聊聊怎麼做到。',symbol:'▶'},
    {number:'03',tag:'TOUCH',category:'try',name:'AI Playground',support:'Powered by NVIDIA & GIGABYTE',title:'轉一道任務，帶走一個成果。',description:'輪盤抽題，跟著任務卡在志工引導下實作。影像、Agent、Coding、音樂與資安五類主題桌，等你來試。',href:'#playground',symbol:'✳'},
    {number:'04',tag:'MAKE',category:'create',name:'Creative Challenges',support:'Supported by MixRoute & Partners',title:'把你的腦洞，做成作品。',description:'做一個讓人想玩的 AI，或寄一張明信片給 2036。兩個挑戰，不同形式，等你來發揮。',symbol:'✎'},
    {number:'05',tag:'FEEL',category:'share',name:'AI Music & Live Coding',support:'Supported by Red Bull',title:'當程式碼，變成樂器。',description:'我們正邀請音樂創作者與 Live Coder，探索即時生成的聲音與視覺。演出安排將陸續公布。',symbol:'≋'},
    {number:'06',tag:'CONNECT',category:'meet',name:'Open Networking',support:'Supported by Red Bull',title:'吃點東西，繼續聊。',description:'專屬名牌把 AI 興趣變成開場白。17:30 起搭配餐食、酒水與非酒精飲品，讓交流繼續。',symbol:'↔'}
  ],
  partners:[
    {name:'NVIDIA',category:'brand',role:'AI Playground 技術支持',description:'',logo:'',url:'',published:true},
    {name:'GIGABYTE',category:'brand',role:'AI Playground 設備支持',description:'',logo:'',url:'',published:true},
    {name:'xAgent ID',category:'brand',role:'',description:'',logo:'',url:'https://xagent.id/',published:true},
    {name:'Red Bull',category:'brand',role:'',description:'',logo:'',url:'',published:true},
    {name:'SOKER',category:'brand',role:'',description:'',logo:'',url:'https://www.soker.com.tw/',published:true},
    {name:'MixRoute',category:'brand',role:'品牌／技術／獎品夥伴',description:'以 API 資源與品牌特別獎，支持 AI 創作挑戰。額度配置及參與辦法將另行公布。',logo:'mixroute-logo.svg',url:'https://mixroute.ai/',published:true}],
  speakers:[],
  challenges:[
    {id:'useless',name:'Useless AI Challenge',title:'沒什麼用。\n但很想玩。',description:'做一個現在看似沒用，卻讓人忍不住想分享的 AI。我們想看的是腦洞、巧思，還有「你到底怎麼想到的？」',examples:['把 PDF 變成宮鬥劇','會假裝自己很忙的 AI','隨台股漲跌變語氣的電子寵物'],note:'示例是創作靈感，不是指定題目。',status:'競賽辦法預計 10/28 公布',rulesUrl:'',open:false},
    {id:'postcards',name:'Postcards from 2036',title:'寄一張明信片，\n給十年後。',description:'2036 年，我們會怎麼生活、工作、創作與建立關係？用影片、作品或原型，把你想像中的十年後帶到大家面前。',examples:['一支未來生活短片','一件還不存在的產品','一套新的工作方式'],note:'創作形式與參賽規則將另行公布。',status:'徵件資訊預計 10/28 公布',rulesUrl:'',open:false}
  ],
  schedule:[{time:'13:00',title:'先見面，再暖身',description:'報到、拿名牌，逛逛現場。'}, {time:'13:30',title:'OPEN LAB 開始',description:'短講、Demo、產品體驗與創作互動穿插進行，留時間給你試玩與聊天。'}, {time:'17:30',title:'把沒聊完的，繼續聊',description:'餐食、酒水與非酒精飲品，自由交流。演出安排及結束時間另行公告。'}],
  faq:[
    {question:'沒有技術背景，也可以參加嗎？',answer:'當然可以。活動歡迎對 AI 感到好奇的人。你可以聽分享、看 Demo、體驗產品，或來認識新朋友；創作挑戰的參與條件將另行公告。'},
    {question:'一個人來，會不會尷尬？',answer:'每位參加者都有專屬名牌，寫上名字、關注的 AI 主題與交流意向。從一句「你也在玩這個？」開始，就有機會認識新的夥伴。'},
    {question:'要帶電腦嗎？需要每一場都參加嗎？',answer:'AI Playground 預計提供 8–12 台筆電／桌機，依時段與名額安排體驗；若想自由創作，也可以帶自己的電腦。設備與預約方式以最終公告為準。你可以自由切換分享與體驗區，不需要從頭坐到尾。'},
    {question:'票券包含哪些內容？',answer:'早鳥、一般票與晚鳥票權益相同，一票參與至活動結束，包含分享、Demo、開放體驗、專屬名牌、下午飲品與點心，以及17:30起餐食、酒水與非酒精飲品。餐飲依現場供應份量提供，非無限暢飲；部分體驗需排隊或登記。'},
    {question:'競賽需要另外報名嗎？',answer:'各挑戰的徵件方式、資格、名額、獎項與時程預計 10/28 公布。購買活動票不代表自動取得競賽參賽資格；請依正式競賽公告辦理。'},
    {question:'可以退票或轉讓嗎？',answer:'請依 Luma 報名頁最新票務政策辦理。報名、退票與轉讓問題可聯繫 info@aiposthub.com。'},
    {question:'場地入口和完整節目在哪裡看？',answer:'活動館別、報到入口、交通資訊與完整節目將在本頁和 Luma 陸續更新，並通知報名者。'}
  ]
};
