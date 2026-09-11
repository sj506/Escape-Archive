(function(){
  let returnFocus=null,toastTimer;
  const $=s=>document.querySelector(s);
  window.GameKit={
    read(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}},
    write(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}},
    toast(message){const el=$('#toast');if(!el)return;el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4500)},
    open(title,html){const d=$('#dialog');if(d.open)d.close();returnFocus=document.activeElement;$('#dialogTitle').textContent=title;$('#dialogBody').innerHTML=html;d.showModal()},
    close(){ $('#dialog').close() },
    escape(text){return String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))},
    export(key,data){const blob=new Blob([JSON.stringify({game:key,data},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=key+'-save.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)},
    import(file,key,callback){if(!file)return;if(file.size>150000){this.toast('진행 파일의 크기가 너무 큽니다.');return}const reader=new FileReader();reader.onload=()=>{try{const value=JSON.parse(reader.result);if(value.game!==key||!value.data||typeof value.data!=='object')throw Error();callback(value.data)}catch{this.toast('이 게임의 진행 파일을 선택해 주세요.')}};reader.onerror=()=>this.toast('파일을 읽을 수 없습니다.');reader.readAsText(file)}
  };
  document.addEventListener('click',e=>{if(e.target.closest('[data-close-dialog]'))GameKit.close()});
  $('#dialog').addEventListener('close',()=>{if(returnFocus?.isConnected)returnFocus.focus()});
  $('#dialog').addEventListener('click',e=>{if(e.target===$('#dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)GameKit.close()}});
})();
