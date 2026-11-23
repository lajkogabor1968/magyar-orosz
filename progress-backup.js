/* Tanműhely: offline progress backup. No server upload; never reads credentials. */
(()=>{'use strict';
const keys=()=>Object.keys(localStorage).filter(k=>/^magyarorosz[.:-]/i.test(k)).sort();
const status=document.getElementById('progressBackupStatus');
const file=document.getElementById('progressBackupFile');
const show=msg=>{if(status)status.textContent=msg;};
const MAX=2*1024*1024;
const valid=(key,value)=>/^magyarorosz[.:-]/i.test(key)&&typeof value==='string'&&value.length<=MAX;
const download=document.getElementById('progressBackupDownload');
download?.addEventListener('click',()=>{
 try{
  const data={};for(const k of keys()){const value=localStorage.getItem(k);if(value!==null){if(!valid(k,value))throw Error('invalid data');data[k]=value;}}
  const payload={format:'tanmuhely-progress-backup',version:2,exportedAt:new Date().toISOString(),data};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob),anchor=document.createElement('a');
  anchor.href=url;anchor.download='tanmuhely-haladas-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),5000);
  show('Резервная копия подготовлена. Храните файл в надёжном месте. / A mentés elkészült.');
 }catch(e){show('Не удалось создать резервную копию. / Nem sikerült a mentés.');}
});
file?.addEventListener('change',async()=>{
 const chosen=file.files?.[0];if(!chosen)return;
 try{
  if(chosen.size>MAX)throw Error('size');
  const payload=JSON.parse(await chosen.text());
  if(payload?.format!=='tanmuhely-progress-backup'||![1,2].includes(payload.version)||!payload.data||Array.isArray(payload.data)||typeof payload.data!=='object')throw Error('format');
  if(typeof payload.exportedAt!=='string'||!Number.isFinite(Date.parse(payload.exportedAt))||Date.parse(payload.exportedAt)>Date.now()+86400000)throw Error('date');
  const entries=Object.entries(payload.data);
  if(!entries.length||entries.length>100||entries.some(([k,v])=>!valid(k,v)))throw Error('entries');
  // All progress snapshots produced by the application are JSON structures.
  for(const [,v] of entries){const parsed=JSON.parse(v);if(parsed===null||typeof parsed!=='object')throw Error('json');}
  // Non-destructive by default: old exports must never silently replace
  // newer practice results, lesson checkpoints or completed assessments.
  // We cannot reliably order arbitrary browser records by modification time.
  const missing=entries.filter(([k])=>localStorage.getItem(k)===null);
  const existing=entries.length-missing.length;
  if(!missing.length){
   show('Всё уже сохранено на этом устройстве. '+existing+' существующих записей не заменены. / A meglévő haladást nem írtuk felül.');
   return;
  }
  if(!confirm('Добавить '+missing.length+' отсутствующих записей из резервной копии от '+payload.exportedAt.slice(0,10)+'? '+(existing?'Существующие записи ('+existing+') НЕ будут заменены. ':'')+' / Csak a hiányzó adatok kerülnek visszaállításra.')){
   show('Восстановление отменено. / Visszaállítás megszakítva.');return;
  }
  const inserted=[];
  try{
   for(const [k,v] of missing){localStorage.setItem(k,v);inserted.push(k);}
  }catch(error){for(const k of inserted)localStorage.removeItem(k);throw error;}
  show('Добавлено записей: '+missing.length+'. Сохранено без изменений: '+existing+'. Обновляем страницу…');
  location.reload();
 }catch(e){show('Неверный файл или недостаточно места. Ничего не импортировано. / Hibás mentés vagy nincs elég hely.');}
 finally{file.value='';}
});
})();
