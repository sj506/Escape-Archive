(function(root){
  const clueIds=['date','order','time','notes','photoA','photoB','photoC','record'];
  const fresh=()=>({version:2,started:false,elapsed:0,clues:[],vaultOpen:false,panel:'inbox',mail:'mail1',hintLevels:{},hintUses:0,finished:false,photoOrder:[],routeSolved:false,notes:'',report:{place:'',code:''}});
  function restore(raw){const s=fresh();if(!raw||typeof raw!=='object')return s;
    s.started=raw.started===true;s.elapsed=Number.isFinite(raw.elapsed)?Math.max(0,Math.floor(raw.elapsed)):0;
    s.clues=Array.isArray(raw.clues)?[...new Set(raw.clues.filter(x=>clueIds.includes(x)))]:[];
    s.vaultOpen=raw.vaultOpen===true;s.routeSolved=raw.routeSolved===true;
    s.finished=raw.finished===true&&s.vaultOpen&&s.routeSolved&&s.clues.includes('record');
    if(['inbox','gallery','notes','vault','report','journal'].includes(raw.panel))s.panel=raw.panel;
    if(['mail1','mail2','mail3'].includes(raw.mail))s.mail=raw.mail;
    s.notes=typeof raw.notes==='string'?raw.notes.slice(0,4000):'';
    s.photoOrder=Array.isArray(raw.photoOrder)?[...new Set(raw.photoOrder.filter(x=>['A','B','C'].includes(x)))]:[];
    s.hintUses=Number.isFinite(raw.hintUses)?Math.max(0,raw.hintUses):0;
    if(raw.hintLevels&&typeof raw.hintLevels==='object')for(const k of ['vault','photos','route','record','report'])s.hintLevels[k]=Math.min(2,Math.max(0,Number(raw.hintLevels[k])||0));
    if(raw.report&&typeof raw.report==='object')s.report={place:String(raw.report.place||'').slice(0,80),code:String(raw.report.code||'').slice(0,20)};
    return s;
  }
  const digits=v=>String(v).normalize('NFKC').replace(/[\s:：]/g,'');
  const normalize=v=>String(v).normalize('NFKC').replace(/\s/g,'');
  function submit(s,place,code){
    if(!s.vaultOpen||!s.clues.includes('record')||!s.routeSolved)return{ok:false,message:'복구 기록과 사진 배열을 먼저 확인해야 위치를 확정할 수 있습니다.'};
    if(!/^서림역(?:3번출구|삼번출구)$/.test(normalize(place)))return{ok:false,message:'역 이름과 출구를 함께 적어주세요. 사진에서 얻은 세 글자와 복구 기록을 대조하세요.'};
    if(digits(code)!=='0217')return{ok:false,message:'보관함 이름 D–14와 비밀번호는 다릅니다. 마지막 연락 시각을 네 자리로 바꿔보세요.'};
    return{ok:true};
  }
  function objective(s){if(!s.vaultOpen)return['vault','메일과 메모에서 PRIVATE의 암호 찾기'];if(!s.clues.includes('record'))return['record','PRIVATE에서 손상된 음성 기록 읽기'];if(!['photoA','photoB','photoC'].every(x=>s.clues.includes(x)))return['photos','사진 세 장의 촬영 정보 확인하기'];if(!s.routeSolved)return['route','사진을 전송 순서로 배열해 역 이름 확인하기'];return['report','역 이름·출구·보관함 비밀번호로 위치 보고하기'];}
  root.Case0217={fresh,restore,clueIds,digits,submit,objective};
  if(typeof module!=='undefined')module.exports=root.Case0217;
})(typeof window!=='undefined'?window:globalThis);
