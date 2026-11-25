/* 更新入口：只有 published: true 的人物與夥伴會出現在公開頁。
 * logo 可填本機 assets/…；url、role、description 依正式確認內容填寫。
 * 不放洽談中的品牌，也不以歷來合作代表本次合作。
 */
window.OPENLAB = {
  event: {name:'AI郵報年會 OPEN LAB 2026 台北｜主題分享 × AI 體驗 × 社群交流',date:'2026.12.05',weekday:'SAT',city:'TAIPEI',venue:'台北瓶蓋工廠 F 棟',checkin:'13:00',start:'13:30',food:'17:40',earlyPrice:500,regularPrice:800,latePrice:1000,lateStart:'2026-11-29T00:00:00+08:00',earlyDeadline:'2026-10-31T12:00:00+08:00',earlyLabel:'10/31 中午 12:00',registration:'https://luma.com/zr1k4qa5',email:'info@aiposthub.com'},
  announcements:[
    {label:'AGENDA',title:'OPEN LAB 2026 活動議程正式公開',description:'下午看 AI 實戰與跨領域對談，17:40 接續小律的音樂與 AI 分享、Hali 現場演出、作品決賽與 DJ 音樂交流。',href:'/agenda/'},
    {label:'AI PLAYGROUND',title:'輪盤抽任務，親手完成一個 AI 作品',description:'五類主題桌、志工引導與預載工作流，帶你把好奇變成成果。體驗規劃搶先看。',href:'#playground'},
    {label:'EARLY BIRD',title:'早鳥開放中，10/31 中午截止',description:'一票參與整場。早鳥 NT$500、一般票 NT$800、晚鳥票 NT$1,000；活動內容相同。',href:'#tickets'},
    {label:'FIRST LOOK',title:'2026 AI 郵報讀者調查，活動當天首度公開',description:'由 Davin 現場剖析調查結果，分享觀點與洞察。',href:'#survey'},
    {label:'CHALLENGE',title:'AI 實作挑戰賽，把一直想做的點子做出來',description:'OPEN LAB 獎 NT$20,000＋AI 郵報報導，另有最佳創意獎、MixRoute 特別獎與 50 組 US$50 開發額度。',href:'/challenge/'}
  ],
  programs:[
    {number:'01',tag:'LISTEN',category:'share',name:'AI Talks',title:'別人，正在怎麼用 AI？',description:'邀請各行各業的 AI 專家與實踐者，聊真實案例、工作方法，以及踩過的坑。帶著你的問題來。',symbol:'↗'},
    {number:'02',tag:'WATCH',category:'try',name:'AI Demos',title:'那些「這也做得到？」的瞬間',description:'工具、Agent 工作流、影音與硬體應用，在你面前跑起來。看操作，也和團隊聊聊怎麼做到。',symbol:'▶'},
    {number:'03',tag:'TOUCH',category:'try',name:'AI Playground',support:'Powered by NVIDIA & GIGABYTE',title:'轉一道任務，帶走一個成果。',description:'輪盤抽題，跟著任務卡在志工引導下實作。影像、Agent、Coding、音樂與資安五類主題桌，等你來試。',href:'#playground',symbol:'✳'},
    {number:'04',tag:'MAKE',category:'create',name:'AI Build Challenge',support:'Supported by MixRoute & Partners',title:'把你的腦洞，做成作品。',description:'有沒有用，以後再說。網站、Agent、工作流或任何 AI 實作，帶著你的想法來參賽。',href:'/challenge/',symbol:'✎'},
    {number:'05',tag:'FEEL',category:'share',name:'AI Music & Live Coding',support:'Supported by WAT & Red Bull',title:'當程式碼，變成樂器。',description:'晚間先由小律 GreenTed 分享音樂製作與 AI 協作經驗，再由 Hali 帶來 Live Coding 聲光演出。',symbol:'≋'},
    {number:'06',tag:'CONNECT',category:'meet',name:'Open Networking',support:'Supported by WAT & Red Bull',title:'讓交流繼續發生。',description:'和講者、創作者、產品團隊與其他讀者自由交流。分享正在做的事、交換想法，也認識下一位可能一起合作的夥伴。',symbol:'↔'}
  ],
  partners:[
    {name:'NVIDIA',category:'brand',role:'AI Playground 技術支持',description:'',logo:'logos/nvidia-rtx-spark.svg',url:'',published:true},
    {name:'GIGABYTE',category:'brand',role:'AI Playground 設備支持',description:'',logo:'logos/gigabyte.png',url:'',published:true},
    {name:'xAgent ID',category:'brand',role:'',description:'',logo:'logos/xagent.svg',url:'https://xagent.id/',published:false},
    {name:'WAT',category:'brand',role:'',description:'',logo:'logos/wat.png',url:'https://www.watcocktail.com/',published:true},
    {name:'MixRoute',category:'brand',role:'品牌／技術／獎品夥伴',description:'提供 50 組 US$50 開發額度，並以 US$300／US$150／US$50 API 額度特別獎支持 AI 實作。',logo:'logos/mixroute.svg',url:'https://mixroute.ai/',published:true},
    {name:'Netron 網創',category:'brand',role:'',description:'',logo:'logos/netron.png',url:'https://www.netron.net/tw/',published:true},
    {name:'KDAN',category:'brand',role:'',description:'',logo:'logos/kdan.svg',url:'https://www.kdan.com/zh-tw/',published:true},
    {name:'AI郵報學院',category:'brand',role:'',description:'',logo:'logos/aipost-academy.png?v=20261111',url:'https://academy.aiposthub.com/',published:true},
    {name:'STONELINK',category:'brand',role:'',description:'',logo:'logos/stonelink.png',url:'',published:true},
    {name:'twin3.ai',category:'brand',role:'',description:'',logo:'logos/twin3.svg',url:'https://twin3.ai/',published:true},
    {name:'Glows AI',category:'brand',role:'',description:'',logo:'logos/glows-ai.svg',url:'',published:true},
    {name:'GEORGI AI',category:'brand',role:'',description:'',logo:'logos/georgi-logotype-slate.png',url:'',published:true},
    {name:'七點創意',category:'brand',role:'',description:'',logo:'logos/seven-point.png',url:'',published:true},
    {name:'蛋白盒子 THE PROTEIN BOX',category:'brand',role:'',description:'',logo:'logos/protein-box.png',url:'',published:true},
    {name:'SOKER',category:'brand',role:'',description:'',logo:'logos/soker.png',url:'https://www.soker.com.tw/',published:true},
    {name:'Lovable Community',category:'community',role:'社群夥伴',description:'',logo:'logos/lovable-community.png',url:'',published:true},
    {name:'The AI Collective',category:'community',role:'社群夥伴',description:'',logo:'logos/the-ai-collective.png',url:'',published:true},
    {name:'Unicorns Club 獨角獸俱樂部',category:'community',role:'社群夥伴',description:'',logo:'logos/unicorns-club.webp',url:'https://unicornsclub.xyz/',published:true},
    {name:'夢想智賦',category:'community',role:'社群夥伴',description:'',logo:'logos/dreamrich.png',url:'https://dreamrich.com.tw/',published:true},{name:"亨利溫",category:'community',role:'社群夥伴',description:'',logo:"logos/henry-wen.webp",url:"https://henrywen.tw/",published:true},{name:"每日e錠",category:'community',role:'社群夥伴',description:'',logo:"logos/daydayding.png",url:"https://daydayding.com/",published:true},{name:"PB Design Lab 設計實驗室",category:'community',role:'社群夥伴',description:'',logo:"logos/pb-design-lab.jpg",url:"https://www.instagram.com/pb_design_lab/",published:true},{name:"果豪",category:'community',role:'社群夥伴',description:'',logo:"logos/guohao.jpg",url:"https://www.instagram.com/nzl_guohao/",published:true},{name:"AI懶人報",category:'community',role:'社群夥伴',description:'',logo:"logos/ai-lanrenbao.png",url:"https://linktr.ee/ailanrenbao",published:true}],
  speakers:[],
  challenges:[
    {id:'build',name:'OPEN LAB AI Build Challenge',title:'有沒有用，以後再說。\n一直想做，這次就做。',description:'AI 實作挑戰賽｜作品形式不限，個人或團隊皆可免費參賽。讓來自企業、創投、媒體與 AI 社群的夥伴看見你的想法。',examples:['網站、App、Agent、Bot、工作流、遊戲、工具或互動裝置……','已完成或開發中皆可，投稿時須能展示核心功能。'],note:'競賽報名與 OPEN LAB 活動票分開辦理。',status:'競賽專頁・免費報名',rulesUrl:'/challenge/',open:true}
  ],
  schedule:[
    {time:'13:00',title:'報到，讓好奇心暖身',description:'出示電子票券，熟悉場地，也和身邊的 AI 同好打個招呼。'},
    {time:'13:30',title:'聽分享、看 Demo，親手玩 AI',description:'AI Talks & Demos、Playground、讀者調查與告解牆，從新觀點到動手體驗，找到你感興趣的內容。'},
    {time:'17:40 起',title:'Networking & Music Night',description:'小律的音樂與 AI 分享、Hali Live Coding 演出、作品決賽展示與頒獎，以及 DJ 音樂與自由交流；晚間節目時序、決賽形式與流程將另行公布。'},
    {time:'19:40',title:'活動結束',description:'帶著新觀點、實作靈感與新朋友，下次 OPEN LAB 見。'}
  ],
  faq:[
    {question:'沒有技術背景，也可以參加嗎？',answer:'當然可以。活動歡迎對 AI 感到好奇的人。你可以聽分享、看 Demo、體驗產品，或來認識新朋友；AI 實作挑戰賽也歡迎個人或團隊免費報名，作品形式不限。'},
    {question:'一個人來，會不會尷尬？',answer:'活動安排分享、體驗與自由交流，讓共同的 AI 興趣成為話題。從一句「你也在玩這個？」開始，就有機會認識新的夥伴。'},
    {question:'要帶電腦嗎？需要每一場都參加嗎？',answer:'AI Playground 預計提供 8–12 台筆電／桌機，依時段與名額安排體驗；若想自由創作，也可以帶自己的電腦。設備與預約方式以最終公告為準。你可以自由切換分享與體驗區，不需要從頭坐到尾。'},
    {question:'票券包含哪些內容？',answer:'早鳥、一般票與晚鳥票權益相同，一票參與至活動結束，包含分享、Demo、開放體驗、自由交流、下午飲品與點心，以及17:40起餐食、酒水與非酒精飲品。餐飲依現場供應份量提供，非無限暢飲；部分體驗需排隊或登記。'},
    {question:'競賽需要另外報名嗎？',answer:'需要。AI 實作挑戰賽免費報名，請至競賽專頁登記與提交作品；購買 OPEN LAB 活動票不代表已報名競賽，競賽報名也不包含活動票。'},
    {question:'可以退票或轉讓嗎？',answer:'請依 Luma 報名頁最新票務政策辦理。報名、退票與轉讓問題可聯繫 info@aiposthub.com。'},
    {question:'場地入口和完整節目在哪裡看？',answer:'活動地點為台北瓶蓋工廠 F 棟。完整節目與講者介紹請查看官網「活動議程」。報到入口與交通指引將於活動前更新。'}
  ]
};
