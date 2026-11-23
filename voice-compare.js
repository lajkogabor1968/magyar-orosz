/* A1 private pronunciation self-comparison.
 * Local-only MediaRecorder fallback: no speech recognition and no uploads.
 * The learner listens to any reference line through the existing 🔊 button,
 * records up to 12 seconds, then hears the local recording.
 */
(()=>{'use strict';
 const start=document.getElementById('integratedVoiceRecordStart');
 const stop=document.getElementById('integratedVoiceRecordStop');
 const replay=document.getElementById('integratedVoiceRecordPlayback');
 const player=document.getElementById('integratedVoiceRecordAudio');
 const feedback=document.getElementById('integratedVoiceRecordStatus');
 const phoneticsStatus=document.getElementById('phoneticsStatus');
 document.querySelectorAll('[data-pronounce]').forEach(button=>{
  button.addEventListener('click',()=>{
   const word=button.dataset.pronounce;
   if(!word)return;
   const played=window.TanuloTTS?.speak?.({text:word,lang:'hu-HU',rate:0.8});
   if(phoneticsStatus)phoneticsStatus.textContent=played
    ?'Прослушайте венгерское произношение и повторите: '+word
    :'Венгерская озвучка недоступна. Проверьте языковые настройки устройства.';
  });
 });
 if(!start||!stop||!replay||!player||!feedback)return;
 const supported=!!(navigator.mediaDevices?.getUserMedia&&window.MediaRecorder);
 let recorder=null,stream=null,chunks=[],timer=null,url=null;
 const status=text=>{feedback.textContent=text;};
 const release=()=>{
  if(timer!==null){clearTimeout(timer);timer=null;}
  if(stream){stream.getTracks().forEach(track=>track.stop());stream=null;}
  recorder=null;start.disabled=!supported;stop.disabled=true;
 };
 const stopNow=()=>{if(recorder&&recorder.state==='recording')recorder.stop();else release();};
 if(!supported){
  start.disabled=true;stop.disabled=true;replay.disabled=true;
  status('Запись голоса недоступна в этом браузере. Используйте повторение вслух без автоматической оценки.');
  return;
 }
 start.onclick=async()=>{
  if(recorder&&recorder.state==='recording')return;
  start.disabled=true;stop.disabled=true;replay.disabled=true;
  if(url){URL.revokeObjectURL(url);url=null;player.removeAttribute('src');player.load();}
  try{
   stream=await navigator.mediaDevices.getUserMedia({audio:true});
   const preferred=['audio/webm;codecs=opus','audio/mp4','audio/webm'];
   const type=preferred.find(m=>typeof MediaRecorder.isTypeSupported==='function'&&MediaRecorder.isTypeSupported(m));
   recorder=new MediaRecorder(stream,type?{mimeType:type}:undefined);
   chunks=[];
   recorder.ondataavailable=e=>{if(e.data&&e.data.size>0)chunks.push(e.data);};
   recorder.onerror=()=>{status('Ошибка записи. Попробуйте ещё раз.');release();};
   recorder.onstop=()=>{
    if(chunks.length){
     const blob=new Blob(chunks,{type:recorder?.mimeType||chunks[0].type||'audio/webm'});
     url=URL.createObjectURL(blob);player.src=url;replay.disabled=false;
     status('Запись готова. Прослушайте свой голос и сравните его с примером 🔊. Автоматической оценки нет.');
    }else{status('Запись не получилась. Проверьте доступ к микрофону.');}
    release();
   };
   recorder.start();
   stop.disabled=false;
   status('Идёт запись. Произнесите услышанную фразу. Максимум 12 секунд.');
   timer=setTimeout(stopNow,12000);
  }catch(e){release();status('Нет доступа к микрофону или запись недоступна. Разрешите микрофон в браузере либо повторите фразу вслух.');}
 };
 stop.onclick=stopNow;
 replay.onclick=()=>{if(player.src)player.play().catch(()=>status('Не удалось воспроизвести запись на этом устройстве.'));};
 window.addEventListener('pagehide',()=>{if(recorder?.state==='recording')stopNow();if(url)URL.revokeObjectURL(url);});
})();