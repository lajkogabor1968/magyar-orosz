/* Premium online lessons: UI only. Scheduling remains locked until server verification exists. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const menu=$('onlineLessonsMenu'), submenu=$('onlineLessonsSubmenu');
  const schedule=$('onlineSchedulingMenu'), view=$('onlineLessonView');
  const back=$('studyBack'), hub=$('studyHub'), form=$('onlineAppointmentForm');
  if(!menu||!submenu||!schedule||!view||!back||!hub||!form)return;
  menu.addEventListener('click',()=>{
    const show=submenu.hidden;
    submenu.hidden=!show;
    menu.setAttribute('aria-expanded',String(show));
  });
  schedule.addEventListener('click',()=>{
    document.documentElement.classList.remove('study-menu','study-active','study-daily','study-exam');
    document.documentElement.classList.add('study-online');
    hub.hidden=true;view.hidden=false;back.hidden=false;
    const date=$('onlineAppointmentDate');
    if(date){const now=new Date();const local=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);date.min=local;}
    window.scrollTo(0,0);
  });
  back.addEventListener('click',()=>{
    view.hidden=true;
    document.documentElement.classList.remove('study-online');
  });
  $('landingStart')?.addEventListener('click',()=>{view.hidden=true;document.documentElement.classList.remove('study-online')});
  form.addEventListener('submit',event=>{
    event.preventDefault();
    $('onlineAppointmentStatus').textContent='Для записи сначала требуется проверка премиум-подписки. Отправка запросов пока не подключена.';
  });
  // Security: do not unlock booking via localStorage, URL params, or client-only flags.
})();
