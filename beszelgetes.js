/* Guided spoken dialogue trainer, shared across A1–B2 pages.
   Honest limitation: dialogue follows existing lesson; no open-domain AI. */
window.TanuloSpokenDialogue = (() => {
  'use strict';
  function mount({lessons,getIndex,exactModel=false}) {
    if (!Array.isArray(lessons) || !document.querySelector('main') || document.getElementById('spokenDialogue')) return;
    const panel=document.createElement('section');
    panel.id='spokenDialogue';panel.className='panel';
    panel.innerHTML=`<style>
#spokenDialogue{max-width:1040px;margin:16px auto}
#spokenDialogue .voice-bar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin:12px 0}
#spokenDialogue button,#spokenDialogue select,#spokenDialogue input{font:inherit;padding:10px 13px;border-radius:10px;border:1px solid #bed1c8}
#spokenDialogue button{min-height:46px;background:#e8f4ed;color:#164d43;cursor:pointer}
#spokenDialogue button:disabled{opacity:.5;cursor:not-allowed}
#spokenDialogue .voice-main{background:#196455;color:white}
#spokenDialogue .voice-message{background:#f1f7f3;border-radius:12px;padding:17px;margin:12px 0;font-size:1.15rem;line-height:1.65}
#spokenDialogue .voice-tip{font-size:.9rem;color:#536961}
#spokenDialogue .voice-input{width:100%;min-height:46px}
#spokenDialogue .voice-status{min-height:2em;color:#225e55}
</style>
<h2>Разговор по-венгерски</h2>
<p class="voice-tip">Выберите роль. Программа произнесёт реплики собеседника, а вы отвечайте вслух по-венгерски. Это управляемый диалог по теме урока, а не свободный разговор с ИИ.</p>
<div class="voice-bar"><label for="voiceRole">Ваша роль:</label><select id="voiceRole"></select><button id="voiceBegin" class="voice-main" type="button">Начать разговор</button></div>
<p id="voiceStep" class="voice-tip"></p>
<div id="voiceLine" class="voice-message" aria-live="polite">Выберите роль и начните диалог.</div>
<div class="voice-bar"><button id="voiceListen" type="button" disabled>🔊 Прослушать ещё раз</button><button id="voiceMic" class="voice-main" type="button" disabled>🎙️ Ответить голосом</button><button id="voiceHint" type="button" disabled>Показать пример</button></div>
<label for="voiceTyped" class="voice-tip">Если микрофон недоступен, напишите ответ:</label>
<input id="voiceTyped" class="voice-input" autocomplete="off" lang="hu" placeholder="Írjon magyarul...">
<div class="voice-bar"><button id="voiceSend" type="button" disabled>Отправить ответ</button><button id="voiceNext" type="button" disabled>Продолжить →</button><button id="voiceStop" type="button">Остановить</button></div>
<p id="voiceStatus" class="voice-status" role="status" aria-live="polite"></p><div id="voiceFeedback" class="voice-message" role="status" aria-live="polite" hidden></div><p id="voiceProgress" class="voice-tip"></p>`;
    document.querySelector('main').append(panel);
    const $=id=>panel.querySelector('#'+id);
    const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;
    let rec=null, session=null, token=0;
    const practiceKey="magyarorosz.spoken-practice.v1";
    function feedback(message){const box=$("voiceFeedback");box.textContent=message;box.hidden=!message}
    function storeSession(data){try{const old=JSON.parse(localStorage.getItem(practiceKey)||"[]");const history=Array.isArray(old)?old:[];history.push({...data,date:new Date().toISOString()});localStorage.setItem(practiceKey,JSON.stringify(history.slice(-100)))}catch(_){}}
    function progress(){if(session)$("voiceProgress").textContent="Успешные ответы: "+session.correct+" / "+session.attempts+" · Реплика "+(session.index+1)+" / "+session.lines.length}

    function status(msg){$('voiceStatus').textContent=msg}
    function stopSpeech(){token++;try{rec?.abort()}catch(_){}rec=null;try{window.TanuloTTS?.cancel()}catch(_){}}
    function lesson(){return lessons[Number(getIndex())]}
    function reset(){
      stopSpeech();session=null;
      const lines=lesson()?.lines||[];
      const roles=[...new Set(lines.map(line=>line[0]))];
      $('voiceRole').replaceChildren();
      for(const role of roles){const option=document.createElement('option');option.textContent=role;option.value=role;$('voiceRole').append(option)}
      $('voiceLine').textContent='Выберите роль и начните диалог.';
      $('voiceStep').textContent='';
      $('voiceTyped').value='';feedback('');$('voiceProgress').textContent='';$('voiceNext').disabled=true;
      for(const id of ['voiceListen','voiceMic','voiceHint','voiceSend']) $(id).disabled=true;
      status(!Recognition?'Распознавание речи недоступно в этом браузере. Можно отвечать письменно или повторять вслух.':'');
    }
    function speak(text,done){
      stopSpeech();const id=token;
      if(!window.TanuloTTS){status('Воспроизведение недоступно. Прочитайте реплику.');return}
      const utter=window.SpeechSynthesisUtterance?new SpeechSynthesisUtterance(text):{text};
      utter.lang='hu-HU';utter.rate=.85;
      utter.onend=()=>{if(id===token && done)done()};
      utter.onerror=()=>{if(id===token)status('Звук недоступен. Реплика показана на экране.')};
      window.TanuloTTS.speak(utter);
    }
    function normalize(s){return String(s).toLocaleLowerCase('hu-HU').normalize('NFC').replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim()}
    function evaluate(text,target){
      const a=normalize(text),b=normalize(target);
      if(!a)return false;
      if(a===b)return true;
      if(exactModel)return false;
      const x=new Set(a.split(' ').filter(w=>w.length>1)),y=new Set(b.split(' ').filter(w=>w.length>1));
      const common=[...x].filter(w=>y.has(w)).length;
      return common>=Math.max(2,Math.ceil(y.size*.65)) && common/Math.max(x.size,y.size)>=.55;
    }
    function proceed(){
      if(!session)return;
      const lines=session.lines;
      if(session.index>=lines.length){const finished=session;storeSession({lesson:lesson()?.t||'',correct:finished.correct,attempts:finished.attempts});feedback('Разговор завершён. Успешных ответов: '+finished.correct+' из '+finished.attempts+'. Попробуйте поменять роль и повторить трудные фразы.');session=null;$('voiceLine').textContent='Разговор завершён. Отличная практика!';
        $('voiceStep').textContent='Готово';$('voiceMic').disabled=true;$('voiceSend').disabled=true;$('voiceHint').disabled=true;
        $('voiceListen').disabled=true;status('Повторите диалог, поменяв роль.');return}
      const [speaker,line]=lines[session.index];
      const yours=speaker===session.role;
      $('voiceStep').textContent=(session.index+1)+' / '+lines.length+' · '+(yours?'Ваша очередь':'Собеседник говорит');
      $('voiceLine').textContent=yours?'Ваша очередь. Ответьте по-венгерски.':'🔊 '+line;
      $('voiceListen').disabled=false;$('voiceMic').disabled=!yours||!Recognition;$('voiceSend').disabled=!yours;$('voiceNext').disabled=yours;session.ready=!yours;
      $('voiceHint').disabled=!yours;
      $('voiceTyped').value='';
      progress();
      if(!yours){status('Прослушайте реплику собеседника. Если звук не работает, нажмите «Продолжить».');speak(line,()=>{if(session){session.ready=false;session.index++;proceed()}})}
      else status(Recognition?'Нажмите на микрофон и произнесите ответ.':'Произнесите ответ вслух, затем введите текст для проверки.');
    }
    function send(text){
      if(!session)return;
      const expected=session.lines[session.index]?.[1]||'';
      if(!expected||!text.trim()){status('Сначала произнесите или напишите ответ по-венгерски.');return}
      session.attempts++;
      if(evaluate(text,expected)){session.correct++;feedback('✓ Хорошо! Вы сказали или написали: «'+text+'». Ответ близок к образцу. Это не оценка произношения.');status('Нажмите «Продолжить», когда будете готовы.');$('voiceMic').disabled=true;$('voiceSend').disabled=true;}
      else {feedback('Распознано или введено: «'+text+'». Образец: «'+expected+'». Сравните слова и окончания, затем повторите. Другие правильные формулировки пока не оцениваются.');status('Повторите ответ или продолжите разговор.');}
      $('voiceNext').disabled=false;session.ready=true;progress();
    }
    $('voiceBegin').addEventListener('click',()=>{
      const lines=lesson()?.lines||[];
      if(!lines.length){status('Для этого урока пока нет диалога.');return}
      stopSpeech();session={role:$('voiceRole').value,lines,index:0,correct:0,attempts:0,ready:false};feedback('');proceed();
    });
    $('voiceListen').addEventListener('click',()=>{
      if(!session)return;
      const [speaker,line]=session.lines[session.index]||[];
      if(speaker===session.role)speak(line);
      else speak(line,()=>{if(session){session.index++;proceed()}});
    });
    $('voiceHint').addEventListener('click',()=>{
      if(!session)return;
      $('voiceLine').textContent='Пример ответа: '+session.lines[session.index][1];
      status('Прослушайте пример и попробуйте произнести самостоятельно.');
    });
    $('voiceMic').addEventListener('click',()=>{
      if(!session||!Recognition)return;
      try{
        stopSpeech();rec=new Recognition();rec.lang='hu-HU';rec.interimResults=false;rec.maxAlternatives=1;
        rec.onresult=e=>{const heard=e.results?.[0]?.[0]?.transcript||'';$('voiceTyped').value=heard;status('Распознано: '+heard);rec=null;send(heard)};
        rec.onerror=e=>{status(e.error==='not-allowed'?'Разрешите доступ к микрофону в браузере.':'Не удалось распознать речь. Попробуйте снова или введите ответ.');rec=null};
        rec.start();status('Слушаю... говорите по-венгерски.');
      }catch(_){status('Не удалось включить микрофон. Можно ввести ответ вручную.')}
    });
    $('voiceSend').addEventListener('click',()=>send($('voiceTyped').value));
    $('voiceNext').addEventListener('click',()=>{if(session&&session.ready){stopSpeech();session.ready=false;session.index++;feedback('');proceed()}});
    $('voiceTyped').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();if(!$('voiceSend').disabled)send($('voiceTyped').value)}});
    $('voiceStop').addEventListener('click',reset);
    document.getElementById('lesson')?.addEventListener('change',reset);
    for(const id of ['prev','next','nextLessonBottom'])document.getElementById(id)?.addEventListener('click',()=>setTimeout(reset,0));
    window.addEventListener('pagehide',stopSpeech);
    reset();
    if (window.location.hash === '#spokenDialogue') {
      window.requestAnimationFrame?.(() => panel.scrollIntoView({block:'start'}));
    }
  }
  return {mount};
})();
