(function(root){
 const eventIds=['lure','lock','spark','escape','message','read','deny','deleted','last','alarm','found'];
 const answers=['flood','fire','elevator','fall','ignored','road','broadcast'];
 const pages=['home','memorial','wish','album','archive','messages','finale','ending','badEnding','partialEnding','journal'];
 const fresh=()=>({version:2,name:'',stage:0,read:[],wishSolved:false,albumSolved:false,timelineSolved:false,messageSolved:false,teacherRead:false,messageRead:[],truthFaced:false,ending:null,elapsed:0,past:false,page:'home',wishChoices:Array(7).fill(''),timelineOrder:[],apology:'',notes:'',hintLevels:{},hintUses:0});
 function stage(s){if(s.ending)return 6;if(s.messageSolved&&s.truthFaced)return 5;if(s.timelineSolved&&s.teacherRead)return 4;if(s.albumSolved)return 3;if(s.wishSolved)return 2;if(s.read.length===7)return 1;return 0}
 function restore(raw){const s=fresh();if(!raw||typeof raw!=='object')return s;
  s.name=typeof raw.name==='string'?raw.name.trim().slice(0,12):'';
  s.read=Array.isArray(raw.read)?[...new Set(raw.read.filter(i=>Number.isInteger(i)&&i>=0&&i<7))]:[];
  for(const k of ['wishSolved','albumSolved','timelineSolved','messageSolved','teacherRead','truthFaced','past'])s[k]=raw[k]===true;
  const legacy=raw.version!==2;
  if(legacy){s.teacherRead=s.timelineSolved;s.truthFaced=raw.stage>=5;s.messageRead=s.messageSolved?[0,1]:[];s.elapsed=0;}else{s.elapsed=Number.isFinite(raw.elapsed)?Math.max(0,raw.elapsed):0;s.messageRead=Array.isArray(raw.messageRead)?[...new Set(raw.messageRead.filter(i=>i===0||i===1))]:[];}
  // Keep completed milestones from older saves and rebuild the missing prerequisites.
  if(s.messageSolved){s.timelineSolved=true;s.teacherRead=true}if(s.timelineSolved)s.albumSolved=true;if(s.albumSolved)s.wishSolved=true;if(s.wishSolved)s.read=[0,1,2,3,4,5,6];
  s.apology=typeof raw.apology==='string'?raw.apology.slice(0,4000):'';s.notes=typeof raw.notes==='string'?raw.notes.slice(0,4000):'';
  if(['truth','partial','repeat'].includes(raw.ending)&&s.messageSolved&&s.truthFaced)s.ending=raw.ending;
  // The old build did not store which ending was selected: return to the final choice.
  if(legacy&&raw.stage>=6){s.truthFaced=true;s.messageSolved=true;s.timelineSolved=true;s.teacherRead=true;s.albumSolved=true;s.wishSolved=true;s.read=[0,1,2,3,4,5,6];s.messageRead=[0,1];s.page='finale'}
  if(pages.includes(raw.page))s.page=raw.page;
  s.wishChoices=s.wishSolved?[...answers]:answers.map((_,i)=>answers.includes(raw.wishChoices?.[i])?raw.wishChoices[i]:'');
  s.timelineOrder=s.timelineSolved?[...eventIds]:Array.isArray(raw.timelineOrder)?[...new Set(raw.timelineOrder.filter(id=>eventIds.includes(id)))]:[];
  if(raw.hintLevels&&typeof raw.hintLevels==='object')for(let i=0;i<6;i++)s.hintLevels[i]=Math.min(2,Math.max(0,Number(raw.hintLevels[i])||0));
  s.hintUses=Number.isFinite(raw.hintUses)?Math.max(0,raw.hintUses):0;s.stage=stage(s);s.past=s.past||s.elapsed>=2700;return s;
 }
 const canOpen=(s,page)=>({wish:1,album:2,archive:3,messages:4,finale:5,ending:6,badEnding:6,partialEnding:6}[page]||0)<=stage(s);
 const checkWishes=values=>answers.map((v,i)=>values[i]===v);
 const checkTimeline=order=>order.length===eventIds.length&&order.every((x,i)=>x===eventIds[i]);
 function chooseEnding(s,choice){if(stage(s)!==5||s.messageRead.length<2||!['truth','partial','repeat'].includes(choice))return false;s.ending=choice;s.stage=6;return true}
 root.Haewon={fresh,restore,stage,canOpen,checkWishes,checkTimeline,chooseEnding,eventIds,answers};if(typeof module!=='undefined')module.exports=root.Haewon;
})(typeof window!=='undefined'?window:globalThis);
