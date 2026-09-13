(function(root){
'use strict';
const D=typeof module!=='undefined'&&module.exports?require('./data.js'):root.WIND_DATA;
const FORMAT='wind-post-office-save';
const STORAGE='escape-archive:wind-post-office:v1';
const EXPECTED={
 1:{person:'haejun',receipt:'09:50',bread:'무화과빵',quantity:'2'},
 2:{oldCell:'마2',cell:'B1',address:'솔바람길 18'},
 3:{bus:'village2',departure:'14:18',delivery:'14:58',back:'15:15'},
 4:{order:'BACD',token:'푸른단추',person:'yunseul',place:'종탑계단'},
 5:{cell:'D5',gate:'서문',time:'18:40'}
};
const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
const str=(value,max=300)=>typeof value==='string'?value.slice(0,max):'';
const norm=value=>String(value??'').normalize('NFKC').toLowerCase().replace(/[\s,·:：.\-–→\/]/g,'');
function timeNorm(v){const match=String(v??'').trim().match(/^(\d{1,2})[:：](\d{2})$/);return match?match[1].padStart(2,'0')+match[2]:norm(v);}
function validateAnswer(id,answer){
 const expected=EXPECTED[id]; if(!expected||!answer||typeof answer!=='object'||Array.isArray(answer))return false;
 return Object.entries(expected).every(([key,value])=>{
  const got=answer[key];if(typeof got!=='string'&&typeof got!=='number')return false;
  if(['receipt','departure','delivery','back','time'].includes(key))return timeNorm(got)===timeNorm(value);
  return norm(got)===norm(value);
 });
}
function initial(){return {format:FORMAT,version:1,started:false,name:'여행자',completed:[],answers:{},drafts:{},read:[],pins:[],notes:'',connections:[],hints:[0,0,0,0,0],attempts:[0,0,0,0,0],playSeconds:0,music:true,volume:.26,createdAt:new Date().toISOString(),savedAt:null};}
function stage(state){return Math.min(state.completed.length+1,5);}
function availableDocuments(state){return D.documents.filter(d=>d.stage<=stage(state));}
function cleanAnswer(id,raw){const result={};for(const f of D.letters[id-1].fields){if(raw&&own(raw,f.key))result[f.key]=String(raw[f.key]??'').slice(0,140);}return result;}
function submit(state,id,answer){
 if(!Number.isInteger(id)||id<1||id>5||id>stage(state))return {ok:false,reason:'locked',state};
 if(state.completed.includes(id))return {ok:true,already:true,state};
 const next={...state,drafts:{...state.drafts,[id]:cleanAnswer(id,answer)},attempts:[...state.attempts]};
 next.attempts[id-1]++;
 if(!validateAnswer(id,answer))return {ok:false,reason:'incorrect',state:next};
 next.completed=[...state.completed,id];next.answers={...state.answers,[id]:cleanAnswer(id,answer)};
 return {ok:true,state:next};
}
function restore(raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.format!==FORMAT||raw.version!==1)throw new Error('format');
 const s=initial();s.started=raw.started===true;s.name=str(raw.name,30).trim()||'여행자';
 if(!Array.isArray(raw.completed)||raw.completed.length>5)throw new Error('progress');
 for(let i=0;i<raw.completed.length;i++){
  const id=i+1;if(raw.completed[i]!==id||!validateAnswer(id,raw.answers&&raw.answers[id]))throw new Error('progress');
  s.completed.push(id);s.answers[id]=cleanAnswer(id,raw.answers[id]);
 }
 if(s.completed.length&&!s.started)throw new Error('progress');
 for(let id=1;id<=stage(s);id++)s.drafts[id]=cleanAnswer(id,raw.drafts&&raw.drafts[id]);
 const ids=new Set(availableDocuments(s).map(d=>d.id));
 for(const key of ['read','pins'])s[key]=Array.isArray(raw[key])?[...new Set(raw[key].filter(v=>typeof v==='string'&&ids.has(v)))]:[];
 s.notes=str(raw.notes,20000);
 s.connections=Array.isArray(raw.connections)?raw.connections.slice(0,100).filter(c=>c&&ids.has(c.from)&&ids.has(c.to)&&c.from!==c.to).map((c,i)=>({id:`link-${i}`,from:c.from,to:c.to,note:str(c.note,700)})):[];
 for(const key of ['hints','attempts'])s[key]=[0,1,2,3,4].map(i=>{const v=raw[key]&&raw[key][i];return Number.isInteger(v)&&v>=0?Math.min(v,key==='hints'?3:99999):0;});
 s.playSeconds=typeof raw.playSeconds==='number'&&Number.isFinite(raw.playSeconds)?Math.max(0,Math.min(Math.floor(raw.playSeconds),31536000)):0;
 s.music=typeof raw.music==='boolean'?raw.music:true;
 s.volume=typeof raw.volume==='number'&&Number.isFinite(raw.volume)?Math.max(0,Math.min(raw.volume,1)):.26;
 s.createdAt=typeof raw.createdAt==='string'&&!Number.isNaN(Date.parse(raw.createdAt))?raw.createdAt:s.createdAt;
 s.savedAt=typeof raw.savedAt==='string'&&!Number.isNaN(Date.parse(raw.savedAt))?raw.savedAt:null;
 return s;
}
function oldToNew(old){const m=String(old).match(/^([가나다라마])([1-5])$/);if(!m)return null;return String.fromCharCode(64+Number(m[2]))+(5-'가나다라마'.indexOf(m[1]));}
function newToOld(cell){const m=String(cell).toUpperCase().match(/^([A-E])([1-5])$/);if(!m)return null;return '가나다라마'[5-Number(m[2])]+(m[1].charCodeAt(0)-64);}
const E={FORMAT,STORAGE,initial,stage,availableDocuments,validateAnswer,submit,restore,oldToNew,newToOld,cleanAnswer};
if(typeof module!=='undefined'&&module.exports)module.exports=E;else root.WIND_ENGINE=E;
})(typeof window!=='undefined'?window:this);
