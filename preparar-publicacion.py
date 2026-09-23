"""Regenera programa, retratos, galería y enlaces de Google Calendar.
Uso (opcional): python preparar-publicacion.py
No instala paquetes ni modifica servicios o módulos del proyecto.
"""
from pathlib import Path
from html import escape
from urllib.parse import urlencode
import json,re,datetime
base=Path(__file__).resolve().parent
s=(base/'datos.js').read_text(encoding='utf-8')
data=json.loads(s.split('window.FIC_DATA =',1)[1].strip().removesuffix(';'))

def calendario_google(a):
 day=next(x for x in data['dias'] if x['fecha']==a['dia'])
 start=datetime.datetime.fromisoformat(a['dia']+'T'+a['hora']+':00-05:00').astimezone(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
 details='\n'.join(x for x in [
  'XVII Aniversario de la Facultad de Ingeniería Civil · UNCP 2026',
  ('Ponente: '+a['ponente']) if a['ponente'] else '',
  a['detalle'],
  f"Hora de inicio: {a['hora']} · Perú (UTC−5).",
  'Hora de finalización no publicada. Revisa la duración y tus avisos antes de guardar.',
  day['lugar'],
  'Consulta las actualizaciones del programa: https://xvi-ianiversariofic.vercel.app/#programa',
 ] if x)
 # El programa solo publica inicios. Se envía ese instante, sin inventar un final.
 # El participante revisa la duración del borrador y confirma Guardar en Google.
 return 'https://calendar.google.com/calendar/r/eventedit?'+urlencode({
  'action':'TEMPLATE',
  'text':a['titulo'],
  'dates':start+'/'+start,
  'stz':data['zonaHoraria'],
  'etz':data['zonaHoraria'],
  'details':details,
  'location':data['ubicacion']['nombre']+' · '+data['ubicacion']['direccion'],
 })

for activity in data['actividades']:
 activity['calendarioGoogle']=calendario_google(activity)
# La interfaz y el respaldo sin JavaScript usan exactamente los mismos enlaces.
(base/'datos.js').write_text('window.FIC_DATA = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')

def hora(h):
 h,m=map(int,h.split(':'));return f'{h%12 or 12}:{m:02d}', 'a. m.' if h<12 else 'p. m.'
blocks=[]
for day in data['dias']:
 blocks.append(f'<section class="day-group"><div class="day-label"><h3>{day["nombre"]} {int(day["fecha"][-2:])} de setiembre</h3><span>{escape(day["lugar"])}</span></div>')
 for a in data['actividades']:
  if a['dia']!=day['fecha']:continue
  h,p=hora(a['hora'])
  blocks.append(f'<article class="event-row" id="actividad-{a["id"]}"><time class="time" datetime="{a["dia"]}T{a["hora"]}:00-05:00">{h}<small>{p}</small></time><div class="event-content"><span class="topic-tag" data-topic="{escape(a["tema"],quote=True)}">{escape(a["tema"])}</span><h4>{escape(a["titulo"])}</h4>')
  if a['ponente']:blocks.append(f'<p class="event-speaker">{escape(a["ponente"])}</p>')
  if a['detalle']:blocks.append(f'<p class="event-detail">{escape(a["detalle"])}</p>')
  blocks.append(f'<a class="event-calendar" href="{escape(a["calendarioGoogle"],quote=True)}" target="_blank" rel="noopener noreferrer" aria-label="Añadir a Google Calendar: {escape(a["titulo"],quote=True)} (se abre en una pestaña nueva)"><svg class="icon" aria-hidden="true"><use href="#i-calendar"></use></svg><span>Añadir a Google Calendar</span><span class="calendar-arrow" aria-hidden="true">↗</span></a>')
  blocks.append('</div></article>')
 blocks.append('</section>')
page=(base/'index.html').read_text(encoding='utf-8')
page=re.sub(r'<!-- PROGRAMA ESTATICO -->.*?<!-- FIN PROGRAMA ESTATICO -->','<!-- PROGRAMA ESTATICO -->'+''.join(blocks)+'<!-- FIN PROGRAMA ESTATICO -->',page,flags=re.S)
# Retratos también disponibles sin JavaScript.
cards=[]
for a in data['actividades']:
 if not a.get('foto'):continue
 f=a['foto'];h,p=hora(a['hora'])
 picture=f'''<img src="assets/{escape(f['archivo'])}" width="{f['ancho']}" height="{f['alto']}" alt="{escape(f['alt'])}" loading="lazy" decoding="async">'''
 photo_class=' photo-conference' if f.get('encuadre') in ('conferencia','circular') else ''
 if photo_class:picture=f'<div class="conference-crop">{picture}</div>'
 cards.append(f'''<article class="speaker-card has-portrait"><div class="speaker-picture{photo_class}">{picture}</div><div class="speaker-content"><div class="speaker-top"><div><h3>{escape(a['ponente'])}</h3><small>{escape(a['tema'])}</small></div></div><p>{escape(a['titulo'])}</p><div class="speaker-bottom"><span>{int(a['dia'][-2:])} SET · {h} {p}</span><a href="#programa" aria-label="Ver en el programa: {escape(a['ponente'])}">→</a></div></div></article>''')
page=re.sub(r'<!-- PONENTES ESTATICOS -->.*?<!-- FIN PONENTES ESTATICOS -->','<!-- PONENTES ESTATICOS -->'+''.join(cards)+'<!-- FIN PONENTES ESTATICOS -->',page,flags=re.S)
# Galería: enlaces locales que también funcionan sin JavaScript.
gallery=[]
for i,f in enumerate(data.get('galeria',{}).get('fotos',[]),1):
 gallery.append(f'''<a class="gallery-card" href="assets/{escape(f['archivo'])}" target="_blank" rel="noopener noreferrer" data-gallery-id="{escape(f['id'])}" aria-label="Ampliar fotografía: {escape(f['titulo'])}, {f['anio']}"><figure><div class="gallery-image-wrap"><img class="gallery-image" src="assets/{escape(f['archivo'])}" width="{f['ancho']}" height="{f['alto']}" alt="{escape(f['alt'])}" loading="lazy" decoding="async"><span class="gallery-expand" aria-hidden="true">↗</span></div><figcaption><span class="gallery-number" aria-hidden="true">{i:02d}</span><span><strong>{escape(f['titulo'])}</strong><span class="gallery-caption">{escape(f['descripcion'])}</span></span></figcaption></figure></a>''')
page=re.sub(r'<!-- GALERIA ESTATICA -->.*?<!-- FIN GALERIA ESTATICA -->','<!-- GALERIA ESTATICA -->'+''.join(gallery)+'<!-- FIN GALERIA ESTATICA -->',page,flags=re.S)
# Ubicación única para todos los accesos, incluidos los enlaces sin JavaScript.
for kind in ('mapa','ruta'):
 url=data['ubicacion'][kind]
 if not url.startswith('https://www.google.com/maps/'):raise ValueError('La ubicación requiere un enlace HTTPS de Google Maps.')
 page=re.sub(r'(<a\b[^>]*\bdata-maps="'+kind+r'"[^>]*\bhref=")[^"]*(")',lambda m:m[1]+escape(url,quote=True)+m[2],page)
(base/'index.html').write_text(page,encoding='utf-8')
print(f'Entrega actualizada: {len(data["actividades"])} actividades con Google Calendar; {len(cards)} retratos; {len(gallery)} fotos en la galería.')
