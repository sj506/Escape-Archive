/* Original procedural scores. No external audio or network requests. */
(() => {
  'use strict';
  const theme = document.currentScript.dataset.theme || 'archive';
  const game = theme !== 'archive';
  const scores = {
    archive: {title:'기록의 입구', step:8, chords:[[48,55,62],[45,52,59],[41,48,55],[43,50,57]], melody:[74,71,67,69], pulse:false},
    school: {title:'빈 교실의 약속', step:10, chords:[[50,57,65],[46,53,60],[43,50,58],[45,52,61]], melody:[77,76,69,74,72,69,65,69], pulse:false},
    missing: {title:'02:17 · 남겨진 신호', step:8, chords:[[38,45,53],[38,48,55],[34,41,50],[36,43,51]], melody:[69,65,72,67], pulse:true}
  };
  const score = scores[theme] || scores.archive;
  const key = 'escape-music-' + theme;
  let volume = 25, muted = false;
  try { const saved=JSON.parse(localStorage.getItem(key)); if(saved){if(Number.isFinite(saved.volume))volume=Math.max(0,Math.min(100,saved.volume));muted=saved.muted===true;} } catch {}
  const bar=document.createElement('aside');
  bar.className='escape-music'; bar.setAttribute('aria-label','배경음악');
  bar.innerHTML='<button type="button" aria-pressed="false">음악 켜기</button><div><span class="escape-music-title"></span><label>음량 <input type="range" min="0" max="100" step="1" aria-label="배경음악 음량"></label></div><span class="escape-music-status" role="status"></span>';
  document.body.append(bar); document.body.classList.add('has-escape-music');
  const button=bar.querySelector('button'), slider=bar.querySelector('input'), status=bar.querySelector('[role="status"]');
  bar.querySelector('.escape-music-title').textContent=score.title;
  slider.value=volume;
  if(game)status.textContent=muted?'음악 꺼짐':'게임 시작 시 잔잔하게 재생';
  let ctx=null, master=null, timer=null, playing=false, generation=0, chord=0;
  const voices=new Set();
  const remember=()=>{try{localStorage.setItem(key,JSON.stringify({volume,muted}));}catch{}};
  const paint=()=>{button.textContent=playing?'음악 끄기':'음악 켜기';button.setAttribute('aria-pressed',String(playing));};
  const hz=n=>440*Math.pow(2,(n-69)/12);
  function note(n,when,duration,gain,type='sine'){
    const osc=ctx.createOscillator(), envelope=ctx.createGain();
    osc.type=type; osc.frequency.value=hz(n);
    envelope.gain.setValueAtTime(0,when);
    envelope.gain.linearRampToValueAtTime(gain,when+Math.min(1.5,duration/5));
    envelope.gain.exponentialRampToValueAtTime(.0001,when+duration);
    osc.connect(envelope); envelope.connect(master); voices.add(osc);
    osc.onended=()=>{voices.delete(osc);osc.disconnect();envelope.disconnect();};
    osc.start(when);osc.stop(when+duration+.05);
  }
  function phrase(){
    if(!playing)return;
    const t=ctx.currentTime+.05, notes=score.chords[chord%score.chords.length];
    notes.forEach(n=>note(n,t,score.step+2,.055));
    for(let i=0;i<2;i++)note(score.melody[(chord*2+i)%score.melody.length],t+1+i*score.step/2,4,.05);
    if(score.pulse)for(let i=0;i<8;i++)note(26,t+i, .45,i%2?.035:.06);
    chord++;timer=setTimeout(phrase,score.step*1000);
  }
  function stop(message='음악 꺼짐'){
    generation++; playing=false; clearTimeout(timer);timer=null;
    if(ctx){
      const old=ctx;ctx=null;master=null;
      // Closing releases every oscillator, including future scheduled notes.
      old.close().catch(()=>{});voices.clear();
    }
    paint();status.textContent=message;
  }
  async function start(){
    if(muted||playing)return;
    const Audio=window.AudioContext||window.webkitAudioContext;
    if(!Audio){status.textContent='이 브라우저에서는 음악을 지원하지 않아요.';return;}
    const attempt=++generation;
    try{
      if(!ctx){ctx=new Audio();master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);}
      const current=ctx;
      await current.resume();
      if(attempt!==generation)return;
      if(current.state!=='running')throw new Error('Audio suspended');
      playing=true;chord=0;master.gain.setTargetAtTime(volume/100*.65,current.currentTime,.6);
      current.onstatechange=()=>{if(current===ctx&&playing&&current.state!=='running')stop('음악 켜기를 눌러 다시 재생');};
      phrase();paint();status.textContent='재생 중';
    }catch{if(attempt===generation)stop('음악 켜기를 눌러 재생해 주세요.');}
  }
  button.addEventListener('click',()=>{if(playing){muted=true;stop();}else{muted=false;start();}remember();});
  slider.addEventListener('input',()=>{volume=Number(slider.value);if(master)master.gain.setTargetAtTime(volume/100*.65,ctx.currentTime,.1);remember();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop('음악 켜기를 눌러 다시 재생');});
  window.addEventListener('pagehide',()=>stop());
  if(!game)document.addEventListener('click',e=>{const link=e.target.closest('a[href]');if(link&&/play\.html|\/games\//.test(link.getAttribute('href')))stop();});
  window.EscapeMusic={start,stop};
})();
