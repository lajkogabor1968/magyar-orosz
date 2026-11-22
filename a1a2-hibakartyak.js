/* Recurrent learner error cards for Russian speakers: original concise examples. */
(()=>{'use strict';
const cards=[
{id:'article',level:'A1',lessons:[0,1,4],title:'Артикль a/az и egy — névelő',wrong:'Ez telefon.',right:'Ez egy telefon.',why:'Перед исчисляемым существительным в этом образце нужен артикль egy. В русском языке артикля нет.'},
{id:'vowels',level:'A1',lessons:[0,3,5],title:'Долгие гласные — hosszú magánhangzók',wrong:'Vizet kérek. (a víz szó ékezete nélkül: viz)',right:'Kérek egy pohár vizet. (víz → vizet)',why:'В словарной форме víz пишется с í. В форме vizet гласная становится краткой; это не опечатка.'},
{id:'place',level:'A1',lessons:[3,7],title:'Где? — Hol?',wrong:'A kulcs az asztalban van. (если ключ лежит сверху)',right:'A kulcs az asztalon van.',why:'-on: на поверхности; -ban/-ben: внутри предмета или помещения.'},
{id:'harmony',level:'A1',lessons:[3,7],title:'Гармония гласных — magánhangzó-harmónia',wrong:'A kertban vagyok.',right:'A kertben vagyok.',why:'После гласных переднего ряда здесь используется -ben, а не -ban.'},
{id:'move',level:'A2',lessons:[0,1],title:'Где? Куда? Откуда? — hol / hová / honnan',wrong:'Az iskolában megyek.',right:'Az iskolába megyek.',why:'С глаголом megyek («иду») направление обозначает -ba/-be: hová?; hely: -ban/-ben: hol?'},
{id:'past',level:'A2',lessons:[0,2],title:'Прошедшее время — múlt idő',wrong:'Tegnap tanulok.',right:'Tegnap tanultam.',why:'Для сообщения о вчерашнем завершённом действии обычно нужно прошедшее время: tanultam.'},
{id:'conjugation',level:'A2',lessons:[0,2],title:'Определённое и неопределённое спряжение',wrong:'Olvasok a könyvet.',right:'Olvasom a könyvet.',why:'Определённое прямое дополнение a könyvet требует здесь формы olvasom. Но: Olvasok egy könyvet.'}
];
const progressKey='magyarorosz.error-card-progress.v1';
function read(){try{const d=JSON.parse(localStorage.getItem(progressKey)||'{}');return d&&typeof d==='object'?d:{}}catch(_){return {}}}
function save(data){try{localStorage.setItem(progressKey,JSON.stringify(data))}catch(_){}}
function node(tag,content,cls){const el=document.createElement(tag);if(content!==undefined)el.textContent=content;if(cls)el.className=cls;return el}
window.TanmuhelyRenderErrorCards=function(level,index){
 const anchor=document.getElementById('integratedGrammarExamples');if(!anchor)return;
 document.getElementById('tanmuhelyErrorCards')?.remove();
 const matching=cards.filter(c=>c.level===level&&c.lessons.includes(index));
 if(!matching.length)return;
 const wrap=node('section',undefined,'lesson-error-cards');wrap.id='tanmuhelyErrorCards';
 wrap.append(node('h4','Частые ошибки русскоязычных учащихся · Короткое повторение'));
 wrap.append(node('p','Выберите карточку, вспомните правило и откройте правильный вариант.'));
 const saved=read();
 for(const c of matching){
  const card=node('article',undefined,'error-card');
  card.append(node('h4',c.title));
  const wrong=node('p','Проверьте: '+c.wrong);wrong.lang='hu';card.append(wrong);
  const button=node('button','Показать исправление');button.type='button';
  const answer=node('div',undefined,'error-card-answer');answer.hidden=true;
  const correct=node('strong',c.right);correct.lang='hu';
  const why=node('p',c.why);why.lang='ru';
  answer.append(correct,why);
  const done=node('small',saved[c.id]?'Повторено ранее: '+saved[c.id]+' раз':'');
  button.addEventListener('click',()=>{
   answer.hidden=!answer.hidden;
   button.textContent=answer.hidden?'Показать исправление':'Скрыть исправление';
   if(!answer.hidden){const data=read();data[c.id]=Math.min(9999,(Number(data[c.id])||0)+1);save(data);done.textContent='Повторено: '+data[c.id]+' раз';}
  });
  card.append(button,answer,done);wrap.append(card);
 }
 anchor.insertAdjacentElement('afterend',wrap);
};
})();