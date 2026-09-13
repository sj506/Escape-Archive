(function(root){
'use strict';
let ctx=null,master=null,reverb=null,timer=null,step=0,next=0,wanted=false,volume=.26,noise=null;
const chords=[[48,55,60,64,67,72],[45,52,57,60,64,69],[41,48,53,57,60,65],[43,50,55,59,62,67]];
function initialize(){
 if(ctx)return;const Audio=root.AudioContext||root.webkitAudioContext;if(!Audio)throw new Error('Audio unavailable');ctx=new Audio();
 master=ctx.createGain();master.gain.value=0;master.connect(ctx.destination);
 reverb=ctx.createConvolver();const len=Math.floor(ctx.sampleRate*1.8),impulse=ctx.createBuffer(2,len,ctx.sampleRate);
 for(let c=0;c<2;c++){const a=impulse.getChannelData(c);for(let i=0;i<len;i++)a[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)*.25;}
 reverb.buffer=impulse;const wet=ctx.createGain();wet.gain.value=.25;reverb.connect(wet);wet.connect(master);
 const buff=ctx.createBuffer(1,ctx.sampleRate*8,ctx.sampleRate),data=buff.getChannelData(0);let brown=0;
 for(let i=0;i<data.length;i++){brown=(brown+(Math.random()*2-1)*.02)/1.02;data[i]=brown*2.5;}
 noise=ctx.createBufferSource();noise.buffer=buff;noise.loop=true;
 const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=600;const quiet=ctx.createGain();quiet.gain.value=.023;
 const swell=ctx.createOscillator();swell.frequency.value=.065;const swellDepth=ctx.createGain();swellDepth.gain.value=.013;swell.connect(swellDepth);swellDepth.connect(quiet.gain);
 noise.connect(filter);filter.connect(quiet);quiet.connect(master);noise.start();swell.start();
}
function pluck(note,when,gain=.16){
 const f=440*Math.pow(2,(note-69)/12);const env=ctx.createGain();env.gain.setValueAtTime(0,when);env.gain.linearRampToValueAtTime(gain,when+.018);env.gain.exponentialRampToValueAtTime(.0001,when+2.8);
 const filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.setValueAtTime(2200,when);filter.frequency.exponentialRampToValueAtTime(480,when+1.6);filter.connect(env);env.connect(master);env.connect(reverb);
 [1,2,3].forEach((harmonic,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f*harmonic;g.gain.value=[1,.22,.06][i];o.connect(g);g.connect(filter);o.start(when);o.stop(when+3);});
}
function schedule(){
 if(!ctx||!wanted||document.hidden)return;
 while(next<ctx.currentTime+.4){const chord=chords[Math.floor(step/8)%4];const pattern=[0,2,3,4,1,3,5,4];pluck(chord[pattern[step%8]],next,step%8===0?.19:.12);
  if(step%8===0)pluck(chord[0]-12,next,.09);
  step++;next+=.72;
 }
}
async function setEnabled(on,v){
 wanted=!!on;if(typeof v==='number')volume=v;
 if(!wanted){if(timer)clearInterval(timer);timer=null;if(ctx&&master){master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(0,ctx.currentTime,.12);}return false;}
 try{initialize();await ctx.resume();if(!wanted)return false;next=ctx.currentTime+.1;master.gain.setTargetAtTime(volume*.65,ctx.currentTime,.4);if(timer)clearInterval(timer);timer=setInterval(schedule,120);schedule();return true;}
 catch(e){wanted=false;return false;}
}
function setVolume(v){volume=Math.max(0,Math.min(1,v));if(ctx&&master&&wanted)master.gain.setTargetAtTime(volume*.65,ctx.currentTime,.05);}
document.addEventListener('visibilitychange',()=>{if(!ctx)return;if(document.hidden){ctx.suspend().catch(()=>{});}else if(wanted){next=ctx.currentTime+.1;ctx.resume().then(schedule).catch(()=>{});}});
root.WIND_MUSIC={setEnabled,setVolume};
})(window);
