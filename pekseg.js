'use strict';
const items = [
  {place:'В пекарне',seller:'Mit adhatok?',order:'Попросите одну булочку с какао (kakaós csiga).',base:'kakaós csiga',object:'kakaós csigát',hint:'Слово kakaós остаётся прежним. У слова csiga конечное a удлиняется: csiga → csigát.'},
  {place:'В кафе',seller:'Mit kér?',order:'Попросите один кофе (kávé).',base:'kávé',object:'kávét',hint:'К названию напитка добавьте -t: kávé → kávét. Глагол можно поставить в начале или в конце.'},
  {place:'На следующий день',seller:'Jó reggelt! Mit adhatok?',order:'Сегодня вы хотите чай (tea). Закажите одну порцию.',base:'tea',object:'teát',hint:'Перед -t конечное a удлиняется: tea → teát.'}
];
function assess(text,item){
  const phrase=text.normalize('NFC').toLocaleLowerCase('hu-HU').replace(/[.,!?]+/g,' ').trim().replace(/\s+/g,' ');
  const polite=phrase.replace(/^(jó napot kívánok|jó napot|jó reggelt|szia) /,'').replace(/ (köszönöm szépen|köszönöm|legyen szíves|légy szíves)$/,'');
  const orders=['kérek','szeretnék','kérnék','kérek szépen','szeretnék kérni'];
  for(const noun of [item.object,'egy '+item.object]){
    if(polite===noun || orders.some(verb=>polite===verb+' '+noun || polite===noun+' '+verb))return 'ok';
  }
  if((' '+polite+' ').includes(' '+item.base+' '))return 'ending';
  return 'retry';
}
const $=id=>document.getElementById(id);
const review=new URLSearchParams(location.search).get('practice')==='tea';
let index=review?2:0;
function showTask(){
  $('model').pause();
  $('intro').hidden=true;$('end').hidden=true;$('task').hidden=false;
  const item=items[index];
  $('progress').textContent=index===2?'Повторение':'Заказ '+(index+1)+' из 2';
  $('place').textContent=item.place;$('seller').textContent=item.seller;$('order').textContent=item.order;
  $('hintText').textContent=item.hint;$('hint').open=false;$('hint').hidden=false;
  $('feedback').textContent='';$('next').hidden=true;$('form').hidden=false;$('answer').value='';
  $('place').focus();
}
$('start').onclick=showTask;
$('form').onsubmit=event=>{
  event.preventDefault();
  const item=items[index],result=assess($('answer').value,item);
  if(result==='ok'){
    $('form').hidden=true;$('hint').hidden=true;
    $('feedback').textContent='✓ Вас поняли! Например: Egy '+item.object+' kérek.';
    $('next').hidden=false;$('next').textContent=index===0?'Заказать в кафе':'Завершить';$('next').focus();
  }else{
    $('feedback').textContent=result==='ending'?item.hint:'Попробуйте фразу со словом kérek или szeretnék. Проверьте название товара и долгие гласные.';
    $('answer').focus();
  }
};
$('next').onclick=()=>{
  if(index===0){index++;showTask();return}
  $('task').hidden=true;$('end').hidden=false;
  if(index===2)$('end').querySelector('p').textContent='Вы сделали заказ чая по-венгерски.';
  $('end').querySelector('h1').focus();
};
$('restart').onclick=()=>location.assign('pekseg.html');
const clip=window.TanuloGaborReadingClips?.A1?.find(c=>c.text.startsWith('Kérek egy teát.'));
if(clip)$('model').src=clip.url;
$('model').onerror=()=>{$('audioStatus').textContent='Запись сейчас недоступна. Образец можно прочитать ниже.'};
if(review)showTask();
