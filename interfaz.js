/* Interfaz local del aniversario. Sin conexión a Supabase ni manejo de sesión. */
(() => {
'use strict';
const d=window.FIC_DATA;if(!d||!Array.isArray(d.actividades))return;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=(v='')=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon=n=>`<svg class="icon" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const hora=h=>{let[a,b]=h.split(':');return {h:`${+a%12||12}:${b}`,p:+a<12?'a. m.':'p. m.'}};
const key='fic-uncp-2026-agenda-v1',ids=new Set(d.actividades.map(a=>a.id));
let saved=new Set(),storage=true,timer;
try{const x=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(x))saved=new Set(x.filter(id=>ids.has(id)))}catch{storage=false}
const peruDateFormat=new Intl.DateTimeFormat('en',{timeZone:d.zonaHoraria||'America/Lima',year:'numeric',month:'2-digit',day:'2-digit'});
const programmeDays=d.dias.map(day=>day.fecha).sort();
const scheduled=d.actividades.map(activity=>({activity,start:Date.parse(`${activity.dia}T${activity.hora}:00-05:00`)})).sort((a,b)=>a.start-b.start);
function peruDate(now){const parts=Object.fromEntries(peruDateFormat.formatToParts(now).map(part=>[part.type,part.value]));return `${parts.year}-${parts.month}-${parts.day}`}
function defaultDay(now){const today=peruDate(now);return programmeDays.find(day=>day>=today)||'all'}
const state={day:defaultDay(Date.now()),autoDay:true,topic:'all',q:'',saved:false};
let nextActivity=null,nextLabel='Próxima actividad',nextSignature='';
function notify(message){clearTimeout(timer);$('#aviso').textContent=message;$('#aviso').hidden=false;timer=setTimeout(()=>$('#aviso').hidden=true,4200)}
function render(){
 const list=d.actividades.filter(a=>(state.day==='all'||a.dia===state.day)&&(state.topic==='all'||a.tema===state.topic)&&(!state.saved||saved.has(a.id))&&norm([a.titulo,a.ponente,a.tema,a.detalle].join(' ')).includes(norm(state.q)));
 $('#lista-programa').innerHTML=d.dias.map(day=>{const rows=list.filter(a=>a.dia===day.fecha);if(!rows.length)return '';
 return `<section class="day-group" aria-labelledby="dia-${day.fecha}"><div class="day-label"><h3 id="dia-${day.fecha}">${day.nombre} ${+day.fecha.slice(-2)} de setiembre</h3><span>${esc(day.lugar)}</span></div>${rows.map(a=>{const h=hora(a.hora),s=saved.has(a.id);return `<article class="event-row" id="actividad-${a.id}"><time class="time" datetime="${a.dia}T${a.hora}:00-05:00">${h.h}<small>${h.p}</small></time><div><span class="topic-tag" data-topic="${esc(a.tema)}">${esc(a.tema)}</span><h4>${esc(a.titulo)}</h4>${a.ponente?`<p class="event-speaker">${esc(a.ponente)}</p>`:''}${a.detalle?`<p class="event-detail">${esc(a.detalle)}</p>`:''}</div><button class="save-event" data-save="${a.id}" type="button" aria-pressed="${s}" aria-label="${s?'Quitar de':'Guardar en'} mi agenda: ${esc(a.titulo)}" title="${s?'Quitar de':'Guardar en'} mi agenda">${icon('bookmark')}</button></article>`}).join('')}</section>`}).join('');
 $('#sin-resultados').hidden=list.length>0;$('#resultados').textContent=`${list.length} ${list.length===1?'actividad':'actividades'}${state.saved?' en tu selección':' en el programa'}`;
 $('#sin-resultados h3').textContent=state.saved&&!saved.size?'Tu agenda empieza con una actividad':'No hay actividades con estos filtros';
 $('#sin-resultados p').textContent=state.saved&&!saved.size?'Explora el programa y pulsa el marcador de las actividades que te interesan.':'Prueba otro nombre, tema o día.';
 $('#agenda-count').textContent=saved.size;$('#agenda-count-mobile').textContent=saved.size;$('#mi-agenda').setAttribute('aria-pressed',state.saved);
 $('#limpiar-filtros').hidden=!(state.q||state.topic!=='all'||state.saved);
 $('#jornada-auto').hidden=state.autoDay;
 $$('#lista-programa .event-row').forEach(row=>row.classList.toggle('is-saved',saved.has(row.id.replace('actividad-',''))));
 $('#exportar-agenda').textContent=saved.size?`Descargar mi agenda (${saved.size}) ↓`:'Selecciona actividades para exportar';$('#exportar-agenda').disabled=!saved.size;
 $$('[data-day]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.day===state.day));
 markNextActivity();
}
function markNextActivity(){
 $$('#lista-programa .event-row').forEach(row=>{
  const isNext=!!nextActivity&&row.id===`actividad-${nextActivity.id}`;
  row.classList.toggle('is-next',isNext);
  let badge=row.querySelector('.next-event-badge');
  if(!isNext){if(badge)badge.remove();return}
  if(!badge){badge=document.createElement('span');badge.className='next-event-badge';row.querySelector('.topic-tag').before(badge)}
  badge.textContent=nextLabel;
 });
}
function refreshProgramme(now){
 const today=peruDate(now),day=defaultDay(now),changeDay=state.autoDay&&state.day!==day;
 if(changeDay)state.day=day;
 // La programación tiene precisión de minutos; no se deducen duraciones.
 const minute=Math.floor(now/60000)*60000;
 const upcoming=scheduled.find(item=>item.start>=minute);
 nextActivity=upcoming?.activity||null;
 nextLabel=upcoming?.start===minute?'Comienza ahora':'Próxima actividad';
 const signature=[nextActivity?.id||'',nextLabel,today].join('|');
 if(signature!==nextSignature){
  nextSignature=signature;
  $('#proxima-actividad').hidden=!nextActivity;
  if(nextActivity){
   const a=nextActivity,dayInfo=d.dias.find(item=>item.fecha===a.dia),h=hora(a.hora);
   $('#next-label').textContent=nextLabel;
   $('#next-title').textContent=a.titulo;
   $('#next-time').dateTime=`${a.dia}T${a.hora}:00-05:00`;
   $('#next-time').textContent=`${a.dia===today?'Hoy · ':''}${dayInfo.nombre} ${+a.dia.slice(-2)} de setiembre · ${h.h} ${h.p}`;
   $('#next-speaker').textContent=a.ponente;$('#next-speaker').hidden=!a.ponente;
   $('#ver-proxima').setAttribute('aria-label',`Ver en el programa: ${a.titulo}`);
  }
 }
 if(changeDay)render();else markNextActivity();
}
function reset(){state.autoDay=false;state.day='all';state.topic='all';state.q='';state.saved=false;$('#busqueda').value='';$('#tema').value='all'}
[...new Set(d.actividades.map(a=>a.tema))].sort((a,b)=>a.localeCompare(b,'es')).forEach(t=>$('#tema').add(new Option(t,t)));
$$('[data-day]').forEach(b=>b.addEventListener('click',()=>{state.autoDay=false;state.day=b.dataset.day;render()}));
$('#busqueda').addEventListener('input',e=>{state.autoDay=false;state.q=e.target.value.trim();render()});
$('#tema').addEventListener('change',e=>{state.autoDay=false;state.topic=e.target.value;render()});
$('#mi-agenda').addEventListener('click',()=>{const next=!state.saved;reset();state.saved=next;render()});
$('#restablecer').addEventListener('click',()=>{reset();render();$('#busqueda').focus({preventScroll:true})});
$('#limpiar-filtros').addEventListener('click',()=>{reset();render();$('#busqueda').focus({preventScroll:true})});
$('#jornada-auto').addEventListener('click',()=>{
 reset();state.autoDay=true;state.day=defaultDay(Date.now());render();refreshProgramme(Date.now());
 $('#busqueda').focus({preventScroll:true});notify('Programa ajustado a la fecha actual de Perú.');
});
$('#agenda-mobile').addEventListener('click',()=>{
 reset();state.saved=true;render();
 $('#mi-agenda').focus({preventScroll:true});$('#programa').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});
});
$('#ver-proxima').addEventListener('click',()=>{
 refreshProgramme(Date.now());if(!nextActivity)return;
 reset();state.day=nextActivity.dia;render();
 const row=document.getElementById(`actividad-${nextActivity.id}`);
 if(row){row.tabIndex=-1;row.focus({preventScroll:true});row.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'})}
});
$('#lista-programa').addEventListener('click',e=>{const b=e.target.closest('[data-save]');if(!b||!ids.has(b.dataset.save))return;
 const id=b.dataset.save,was=saved.has(id);if(was)saved.delete(id);else saved.add(id);
 try{localStorage.setItem(key,JSON.stringify([...saved]));storage=true}catch{storage=false}
 render();($(`[data-save="${id}"]`)||$('#mi-agenda')).focus({preventScroll:true});notify((was?'Actividad retirada de tu agenda.':'Actividad guardada en tu agenda.')+(storage?'':' El navegador no permite conservarla al cerrar.'));
});
window.addEventListener('storage',e=>{if(e.key!==key&&e.key!==null)return;try{const x=JSON.parse(e.newValue||'[]');saved=new Set(Array.isArray(x)?x.filter(id=>ids.has(id)):[]);render()}catch{}});
// iCalendar: UTC y líneas de hasta 75 octetos UTF-8; no se inventan duraciones.
const escICS=s=>String(s).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;');
const dateICS=s=>new Date(s).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
function fold(line){const encoder=new TextEncoder();let out='',part='',bytes=0;for(const c of line){let size=encoder.encode(c).length;if(bytes+size>75){out+=part+'\r\n';part=' ';bytes=1}part+=c;bytes+=size}return out+part}
$('#exportar-agenda').addEventListener('click',()=>{const list=d.actividades.filter(a=>saved.has(a.id));if(!list.length)return;
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//FIC UNCP//Aniversario 2026//ES','CALSCALE:GREGORIAN','X-WR-CALNAME:Mi agenda FIC UNCP 2026'];
 list.forEach(a=>{const day=d.dias.find(x=>x.fecha===a.dia);lines.push('BEGIN:VEVENT',`UID:fic2026-${a.id}@aniversario.local`,`DTSTAMP:${dateICS(new Date())}`,`DTSTART:${dateICS(`${a.dia}T${a.hora}:00-05:00`)}`,`SUMMARY:${escICS(a.titulo)}`,`DESCRIPTION:${escICS([a.ponente,a.detalle,'Recordatorio personal del XVII Aniversario FIC UNCP.'].filter(Boolean).join('\n'))}`,`LOCATION:${escICS(day.lugar)}`,'END:VEVENT')});
 lines.push('END:VCALENDAR');const url=URL.createObjectURL(new Blob([lines.map(fold).join('\r\n')+'\r\n'],{type:'text/calendar;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='mi-agenda-fic-2026.ics';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);notify('Agenda descargada. Ábrela con tu aplicación de calendario.');
});
const talks=d.actividades.filter(a=>a.charla),featured=talks.filter(a=>a.foto).map(a=>a.id);
const speakers=[...featured.map(id=>talks.find(a=>a.id===id)).filter(Boolean),...talks.filter(a=>!featured.includes(a.id))];
function renderSpeakers(all=false){
 $('#speakers-grid').innerHTML=(all?speakers:speakers.slice(0,featured.length)).map(a=>{
  const n=a.ponente.replace(/^(?:(?:Dr\.|Dra\.|Ing\.|Mg\.|MSc\.|PhD\.|MBA|PMP)\s*)+/,''),letters=a.ponente==='PMO Francia'?'PMO':n.split(/\s+/).slice(0,2).map(x=>x[0]).join(''),h=hora(a.hora),f=a.foto,framed=f&&['conferencia','circular'].includes(f.encuadre);
  const picture=f?`<img src="assets/${esc(f.archivo)}" width="${f.ancho}" height="${f.alto}" alt="${esc(f.alt)}" loading="lazy" decoding="async">`:'';
  const visual=f?`<div class="speaker-picture${framed?' photo-conference':''}"><span class="portrait-fallback" aria-hidden="true">${esc(letters)}</span>${framed?`<div class="conference-crop">${picture}</div>`:picture}</div>`:`<div class="speaker-letter" aria-hidden="true">${esc(letters)}</div>`;
  return `<article class="speaker-card${f?' has-portrait':' text-profile'}">${visual}<div class="speaker-content"><div class="speaker-top"><div><h3>${esc(a.ponente)}</h3><small>${esc(a.tema)}</small></div></div><p>${esc(a.titulo)}</p><div class="speaker-bottom"><span>${+a.dia.slice(-2)} SET · ${h.h} ${h.p}</span><a href="#programa" data-event="${a.id}" aria-label="Ver en el programa: ${esc(a.ponente)}">→</a></div></div></article>`;
 }).join('');
 $$('.speaker-picture img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true},{once:true}));
 $('#ver-ponentes').setAttribute('aria-expanded',all);$('#ver-ponentes').textContent=all?'Mostrar ponentes con fotografía −':`Ver los ${talks.length} participantes +`;
}
$('#ver-ponentes').addEventListener('click',()=>{const all=$('#ver-ponentes').getAttribute('aria-expanded')!=='true';renderSpeakers(all);if(!all)$('#ponentes').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'})});
$('#speakers-grid').addEventListener('click',e=>{
 const a=e.target.closest('[data-event]');if(!a)return;
 const item=talks.find(x=>x.id===a.dataset.event);if(!item)return;
 e.preventDefault();reset();state.day=item.dia;state.q=item.ponente;$('#busqueda').value=item.ponente;render();
 const row=document.getElementById(`actividad-${item.id}`);
 if(row){row.tabIndex=-1;row.focus({preventScroll:true});row.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'center'})}
});
$('#total-charlas').textContent=talks.length;
// Las miniaturas siguen siendo enlaces a las fotos cuando el visor no está disponible.
const gallery=Array.isArray(d.galeria?.fotos)?d.galeria.fotos:[];
const viewer=$('#gallery-viewer'),galleryGrid=$('#gallery-grid');
if(viewer&&galleryGrid&&gallery.length&&typeof viewer.showModal==='function'){
 let photoIndex=0,galleryTrigger=null,previousOverflow='';
 galleryGrid.querySelectorAll('[data-gallery-id]').forEach(link=>{link.setAttribute('aria-haspopup','dialog');link.setAttribute('aria-controls','gallery-viewer')});
 const photo=$('#gallery-photo'),error=$('#gallery-error');
 const updatePhoto=index=>{
  photoIndex=(index+gallery.length)%gallery.length;
  const item=gallery[photoIndex];
  error.hidden=true;photo.hidden=false;
  photo.alt=item.alt;photo.width=item.ancho;photo.height=item.alto;
  photo.src=`assets/${item.archivo}`;
  $('#gallery-photo-title').textContent=item.titulo;
  $('#gallery-photo-description').textContent=item.descripcion;
  $('#gallery-counter').textContent=`${photoIndex+1} de ${gallery.length} · ${item.anio}`;
 };
 galleryGrid.addEventListener('click',event=>{
  const link=event.target.closest('[data-gallery-id]');
  if(!link||event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
  const index=gallery.findIndex(item=>item.id===link.dataset.galleryId);if(index<0)return;
  event.preventDefault();galleryTrigger=link;updatePhoto(index);
  previousOverflow=document.body.style.overflow;
  viewer.showModal();document.body.style.overflow='hidden';
  $('#gallery-close').focus();
 });
 $('#gallery-close').addEventListener('click',()=>viewer.close());
 $('#gallery-prev').addEventListener('click',()=>updatePhoto(photoIndex-1));
 $('#gallery-next').addEventListener('click',()=>updatePhoto(photoIndex+1));
 viewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
   event.preventDefault();updatePhoto(photoIndex+(event.key==='ArrowRight'?1:-1));
  }else if(event.key==='Escape'){event.preventDefault();viewer.close()}
 });
 viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
 viewer.addEventListener('close',()=>{
  document.body.style.overflow=previousOverflow;
  if(galleryTrigger?.isConnected)galleryTrigger.focus();
 });
 photo.addEventListener('error',()=>{photo.hidden=true;error.hidden=false});
 let touchStart=null;
 const photoWrap=$('.viewer-photo-wrap');
 photoWrap.addEventListener('touchstart',event=>{
  if(event.touches.length!==1){touchStart=null;return}
  touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};
 },{passive:true});
 photoWrap.addEventListener('touchend',event=>{
  if(!touchStart||!event.changedTouches.length)return;
  const dx=event.changedTouches[0].clientX-touchStart.x,dy=event.changedTouches[0].clientY-touchStart.y;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)updatePhoto(photoIndex+(dx<0?1:-1));
  touchStart=null;
 },{passive:true});
 photoWrap.addEventListener('touchcancel',()=>{touchStart=null},{passive:true});
 $('#gallery-prev').hidden=gallery.length<2;$('#gallery-next').hidden=gallery.length<2;
}
const menu=$('#menu-toggle'),nav=$('#navegacion');
function closeMenu(focus=false){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Abrir menú');nav.dataset.open='false';if(focus)menu.focus()}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',open);menu.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');nav.dataset.open=String(open)});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true')closeMenu(true)});matchMedia('(min-width:1051px)').addEventListener('change',()=>closeMenu());
if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)$$('#navegacion a').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}),{rootMargin:'-15% 0px -65% 0px'});['evento','programa','ponentes','galeria','ubicacion'].forEach(id=>{const section=document.getElementById(id);if(section)obs.observe(section)})}
function countdown(){const diff=new Date(d.inicio)-Date.now();if(diff<=0){$('#countdown').textContent=Date.now()<=new Date(d.ultimoInicio)?'La semana de aniversario está en marcha':'Consulta el programa de la edición 2026';return}const days=Math.floor(diff/86400000),hours=Math.floor(diff%86400000/3600000),mins=Math.floor(diff%3600000/60000);$('#countdown').innerHTML=`<strong>${String(days).padStart(2,'0')}</strong> días <strong>${String(hours).padStart(2,'0')}</strong> h <strong>${String(mins).padStart(2,'0')}</strong> min<small>para el acto solemne</small>`}
function refreshClock(){countdown();refreshProgramme(Date.now())}
setInterval(refreshClock,30000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshClock()});
window.addEventListener('focus',refreshClock);
$('#cargar-mapa').addEventListener('click',()=>{const f=document.createElement('iframe');f.title='Ubicación de la ciudad universitaria de la UNCP en Google Maps';f.src=`https://www.google.com/maps?q=${encodeURIComponent(d.ubicacion.nombre+' '+d.ubicacion.direccion)}&output=embed`;f.referrerPolicy='no-referrer-when-downgrade';f.loading='lazy';$('#map-container').append(f);$('#map-container').hidden=false;$('#map-placeholder').hidden=true});
$('#copiar-direccion').addEventListener('click',async()=>{
 const address=d.ubicacion.direccion;
 try{
  if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
  await navigator.clipboard.writeText(address);notify('Dirección copiada. Ya puedes compartirla.');
 }catch{
  const selection=window.getSelection(),range=document.createRange();range.selectNodeContents($('#direccion-campus'));
  selection.removeAllRanges();selection.addRange(range);notify('Dirección seleccionada. Mantén pulsado el texto o usa Ctrl+C para copiarla.');
 }
});
render();renderSpeakers();refreshClock();['#program-controls','#exportar-agenda','#ver-ponentes','#cargar-mapa','#menu-toggle','#copiar-direccion','#agenda-mobile'].forEach(s=>$(s).hidden=false);document.documentElement.classList.add('js-ready');
})();
