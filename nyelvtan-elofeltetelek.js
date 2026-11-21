/*
 * Ellenőrzött A1→A2 előismereti térkép. A már mentett eredménykulcsokat
 * nem módosítja; az összekötő hivatkozások a tényleges tanulási sorrendet
 * magyarázzák el a megjelenítésben.
 */
(() => {
  'use strict';
  const prerequisites = {
    'Tárgyrag: -t': ['Ki cselekszik? Alany, ige és tárgy', 'Többes szám és a névelők'],
    'Határozott és határozatlan ragozás': ['Határozatlan igeragozás – jelen idő', 'Ki cselekszik? Alany, ige és tárgy'],
    'Hová? Hol? Honnan?': ['Magánhangzó-harmónia: -ban/-ben'],
    'A múlt idő alapjai': ['Határozatlan igeragozás – jelen idő'],
    'Az -ik végű igék: lakik, dolgozik': ['Igeragozás I. – én, te, ő, mi, ti, ők'],
    'Határozott igeragozás – teljes jelen idejű sor': ['Határozott és határozatlan ragozás'],
    'Melyik ragozás? Egy könyvet vagy a könyvet?': ['Ki cselekszik? Alany, ige és tárgy', 'Határozott és határozatlan ragozás'],
    'Múlt idő: -t/-tt és személyragok': ['A múlt idő alapjai', 'Szótő és toldalék: hogyan épül fel egy szó?'],
    'Felszólító mód I. – kérés és utasítás': ['Igeragozás I. – én, te, ő, mi, ti, ők'],
    'Felszólító mód II. – határozott tárggyal': ['Felszólító mód I. – kérés és utasítás', 'Határozott igeragozás – teljes jelen idejű sor'],
    'Felszólító mód III. – hangváltozások és helyesírás': ['Felszólító mód I. – kérés és utasítás'],
    'Felszólító mód IV. – ne és az igekötő': ['Tagadás és főnévi igenév: nem, -ni', 'Felszólító mód I. – kérés és utasítás'],
    'Jel vagy rag? – múlt idő, mód, személy': ['Szótő és toldalék: hogyan épül fel egy szó?', 'Múlt idő: -t/-tt és személyragok'],
    'Igekötős igék – állítás, tagadás, felszólítás': ['Tagadás és főnévi igenév: nem, -ni', 'Felszólító mód I. – kérés és utasítás'],
    'Rendhagyó felszólítás – egyél vagy edd?': ['Felszólító mód I. – kérés és utasítás', 'Felszólító mód II. – határozott tárggyal'],
    'Múlt idő – határozott és határozatlan tárgy': ['Múlt idő: -t/-tt és személyragok', 'Határozott igeragozás – teljes jelen idejű sor'],
    'Jövő idő – fog + főnévi igenév': ['Tagadás és főnévi igenév: nem, -ni', 'Határozott igeragozás – teljes jelen idejű sor'],
    'Kell és a személyragos főnévi igenév': ['Tagadás és főnévi igenév: nem, -ni', 'Igeragozás I. – én, te, ő, mi, ti, ők'],
    'Birtokos személyjelek – könyvem, könyved, könyve': ['Szótő és toldalék: hogyan épül fel egy szó?', 'Igeragozás I. – én, te, ő, mi, ti, ők'],
    'Birtoklás: van könyvem, nincs autóm': ['A létige: vagyok, vagy, van', 'Birtokos személyjelek – könyvem, könyved, könyve'],
    'Részes eset: -nak/-nek – kinek?': ['Magánhangzó-harmónia: -ban/-ben', 'Ki cselekszik? Alany, ige és tárgy'],
    'Helyragok II.: -ra/-re, -on/-en/-ön, -ról/-ről': ['Magánhangzó-harmónia: -ban/-ben', 'Hová? Hol? Honnan?']
  };
  const topics = window.GRAMMAR_TOPICS;
  if (!Array.isArray(topics)) throw new Error('Hiányzik a nyelvtani témalista.');
  const all = new Map(topics.map(topic => [topic.title, topic]));
  const a2 = topics.filter(topic => topic.level === 'A2');
  for (const topic of a2) {
    const needs = prerequisites[topic.title];
    if (!needs?.length) throw new Error('A2-es előismereti kapcsolat nélkül: ' + topic.title);
    topic.prerequisites = needs.map(title => {
      const source = all.get(title);
      if (!source || !['A1', 'A2'].includes(source.level)) {
        throw new Error('Hiányzó A1–A2 előfeltétel: ' + title);
      }
      if (source.level === 'A2' && a2.indexOf(source) >= a2.indexOf(topic)) {
        throw new Error('Körkörös vagy későbbi A2 előfeltétel: ' + topic.title + ' → ' + title);
      }
      return {title: source.title, titleRu: source.titleRu, level: source.level};
    });
  }
  window.GRAMMAR_PREREQUISITES_INFO = Object.freeze({
    a2Topics: a2.length,
    links: a2.reduce((n, topic) => n + topic.prerequisites.length, 0)
  });
})();
