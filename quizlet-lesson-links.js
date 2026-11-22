/* A1–A2 Quizlet-szókincs → integrált tankönyvi leckék, bővítés a meglévő sorrend megőrzésével. */
(()=>{'use strict';
const links={"A1":{"1":["ön","Ön orosz?","Mi az ön neve?","Honnan jött?"],"2":["anyukám","apukám","bátyám","Van családom.","Nincs családom."],"3":["kanapé"],"4":["főzni"],"5":["reggelente","reggelizni","ebédelni","pihenni"],"6":["Hány éves ön?","hiba","lassan"],"7":["osztály"]},"A2":{"0":["Készen állsz a beszélgetésre?","Kezdhetjük.","beszélgetni","találkozni","megérteni"],"1":["otthonos","Egyidősek vagyunk.","egészséges életmód"],"2":["jobban","próbálkozni","szokás"]}};
window.TANMUHELY_QUIZLET_LESSON_LINKS=links;
window.TanmuhelyLinkQuizletLessons=function(courses){
 const db=window.MAGYAR_OROSZ_DATA||{};
 const normalize=s=>String(s||'').normalize('NFC').trim().toLocaleLowerCase('hu-HU').replace(/\s+/g,' ');
 const report={linked:[],alreadyPresent:[],missing:[]};
 for(const [level,units] of Object.entries(links))for(const [indexText,words] of Object.entries(units)){
  const index=Number(indexText),lesson=courses[level]?.[index];
  if(!lesson){report.missing.push({level,index,reason:'lesson missing'});continue;}
  const known=new Set(lesson.words.map(normalize));
  for(const word of words){
   const normalized=normalize(word);
   if(known.has(normalized)){report.alreadyPresent.push({level,index,word});continue;}
   const exists=[...(db[level]||[]),...(level==='A2'?(db.A1||[]):[])].some(row=>normalize(row[0])===normalized);
   if(!exists){report.missing.push({level,index,word});continue;}
   lesson.words.push(word);known.add(normalized);
   report.linked.push({level,index,word});
  }
 }
 window.TANMUHELY_QUIZLET_LESSON_REPORT=report;
 return report;
};
})();
