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
  const payload={format:'tanmuhely-progress-backup',version:1,exportedAt:new Date().toISOString(),data};
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
  if(payload?.format!=='tanmuhely-progress-backup'||payload.version!==1||!payload.data||Array.isArray(payload.data)||typeof payload.data!=='object')throw Error('format');
  const entries=Object.entries(payload.data);
  if(!entries.length||entries.length>100||entries.some(([k,v])=>!valid(k,v)))throw Error('entries');
  // All progress snapshots produced by the application are JSON structures.
  for(const [,v] of entries){const parsed=JSON.parse(v);if(parsed===null||typeof parsed!=='object')throw Error('json');}
  if(!confirm('Восстановить '+entries.length+' записей? Текущие данные с теми же именами будут заменены. Перед импортом лучше сохранить текущий прогресс. / Visszaállítsuk a mentést? Az azonos nevű helyi adatok felülíródnak.')){
   show('Восстановление отменено. / Visszaállítás megszakítva.');return;
  }
  // Verify storage capacity before changing existing data.
  const before=new Map(entries.map(([k])=>[k,localStorage.getItem(k)]));
  try{for(const [k,v] of entries)localStorage.setItem(k,v);}catch(error){for(const [k,v] of before){if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v);}throw error;}
  show('Прогресс восстановлен. Обновляем страницу… / Haladás visszaállítva.');location.reload();
 }catch(e){show('Неверный файл или недостаточно места. Ничего не импортировано. / Hibás mentés vagy nincs elég hely.');}
 finally{file.value='';}
});
})();
