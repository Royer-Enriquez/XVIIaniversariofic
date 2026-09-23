# XVII Aniversario FIC UNCP · web actualizada

## Abrir esta entrega corregida

Extrae este ZIP en una carpeta nueva. Abre `FIC-2026-AGENDA-SIN-DESCARGAS/index.html` de esta entrega.

Cada una de las 37 actividades incluye «Añadir a Google Calendar». Se eliminaron las descargas de calendario; el participante abre el evento y confirma «Guardar» en Google, una actividad a la vez.

En la cabecera debe aparecer **Google Maps** y en la portada **Ver ubicación en Google Maps**. Esta versión no tiene botones de inscripción ni enlaces a Google Forms.

Si la web ya está publicada, reemplaza la página `index.html` junto con los demás archivos y actualiza con Ctrl+F5. Los recursos CSS y JavaScript incluyen un identificador de versión para solicitar la copia nueva.

## Qué reemplazar

Reemplaza por completo los archivos de esta página independiente: `index.html`, `estilos.css`, `datos.js`, `interfaz.js` y `preparar-publicacion.py`. Copia también la carpeta `assets/` completa, conservando los nombres. Se mantiene la estructura de la entrega anterior y la separación entre HTML, CSS y JavaScript.

Utiliza únicamente los archivos de esta entrega al publicarla. Si habías subido `fuentes.html`, elimínalo del alojamiento: ya no forma parte de la página. No reemplaces archivos homónimos de otros módulos del proyecto.

## Publicar

1. Extrae el ZIP completo.
2. Abre `FIC-2026-AGENDA-SIN-DESCARGAS/index.html` para revisar la página. No la abras dentro del ZIP.
3. Sube el contenido de `FIC-2026-AGENDA-SIN-DESCARGAS/` al proyecto de Vercel de esta página. `index.html` debe estar junto a los archivos CSS, JavaScript y la carpeta `assets/`. Retira el antiguo `assets/programa.ics` si se conserva en el proyecto.
4. Comprueba la web publicada desde una computadora y un celular, incluyendo Google Maps y «Añadir a Google Calendar». En Google, revisa los datos antes de guardar.

No requiere compilación, npm, base de datos ni claves. Esta actualización todavía no se ha desplegado en la web pública. No modifica autenticación, servicios compartidos, SQL ni RLS.

## Fotografías de esta entrega

Se añadió la fotografía de Ronald Santana proporcionada por el usuario y se corrigió su nombre de «Ronal» a «Ronald» en el programa y el calendario.

Se conservan las fotos de Mikhail Dmitrusenko, Rodolfo Ribbeck Hurtado, Edwin Lovón Sánchez y Adolfo Lazo Hospinal. Las 16 tarjetas con fotografía se muestran al entrar a la sección Ponentes. El botón amplía la lista a los 24 participantes.

Los originales se conservan en `assets/`; los encuadres de archivo se ajustan en `estilos.css`. No se añadieron conexiones ni dependencias.

## Cambios principales

- Se retiraron el apartado de inscripción, todos sus botones, las referencias al formulario y los enlaces a Google Forms.
- El botón de la portada abre la ubicación de la UNCP en Google Maps. También hay accesos en la cabecera, el cierre, el pie y la barra inferior para celulares.
- Portada renovada con la fotografía real del campus, identidad guinda y dorado, fechas más visibles y mejor distribución de los contenidos.
- Nueva sección de ubicación con dirección, fotografía del ingreso, ruta en Google Maps, mapa opcional y copia de dirección.
- Accesos rápidos al programa, los ponentes y las indicaciones de llegada.
- Programa con tarjetas más legibles, señalización de favoritos, filtros que se pueden limpiar y un botón para volver a la jornada actual.
- Acceso directo a «Mi agenda» en celulares, con contador sincronizado e instrucciones para guardar actividades sin descargar archivos.
- Botón «Añadir a Google Calendar» en cada actividad, disponible también sin JavaScript, con fecha, hora de inicio, título y ubicación preparados.
- Tarjetas de ponentes y galería renovadas. El visor admite botones, teclado y gestos horizontales en pantallas táctiles.
- Menú adaptable, tamaños de texto revisados, estados de foco visibles y respeto de la preferencia de movimiento reducido.
- Se mantienen las 37 actividades, las 24 participaciones académicas, los 16 retratos y las cuatro fotografías del encuentro de 2024.

## Dirección y Google Maps

Universidad Nacional del Centro del Perú.

Av. Mariscal Castilla N.º 3909, El Tambo, Huancayo, Junín, Perú.

La dirección se contrastó con el portal institucional: https://uncp.edu.pe/mapa-uncp/

Los botones de ubicación buscan el campus por su nombre y dirección. «Cómo llegar» abre la opción de rutas de Google Maps; el visitante puede elegir su punto de partida allí. La página no solicita geolocalización.

El mapa integrado se carga solo cuando el visitante pulsa su botón. Requiere conexión; siempre queda disponible un enlace para abrir Google Maps aparte. El acto solemne tiene como ambiente el Paraninfo N.º 2. Los ambientes de las ponencias del 23 al 25 deben confirmarse con la organización.

«Copiar dirección» usa el portapapeles cuando el navegador lo permite. Si no está disponible, selecciona el texto y muestra cómo copiarlo manualmente; esto también permite utilizar la página abierta desde una carpeta local.

## Programa y agenda

La jornada inicial se calcula con la fecha de Perú (`America/Lima`). Antes del aniversario muestra el primer día; durante el evento, el día correspondiente; después, todas las actividades.

El aviso de próxima actividad se actualiza cada 30 segundos y al regresar a la pestaña. En el minuto de inicio muestra «Comienza ahora». No se atribuyen duraciones ni estados de actividad en curso. Después del último inicio, el aviso desaparece.

Los filtros elegidos manualmente se respetan durante la visita. «Volver a la jornada actual» reactiva la selección automática y limpia los filtros. «Limpiar filtros» permite consultar todo el programa.

Los marcadores de «Mi agenda» se guardan en este navegador y dispositivo. Se conserva la selección de la versión anterior. No se sincronizan con una cuenta ni entre dispositivos. Si el navegador bloquea el almacenamiento, funcionan durante la visita y se avisa al usuario.

«Añadir a Google Calendar» abre una pestaña con un borrador de esa actividad. El visitante inicia sesión si Google se lo solicita, revisa el evento, ajusta sus avisos y confirma «Guardar». Necesita conexión y una cuenta de Google; no necesita descargar un archivo ni instalar una aplicación de calendario. La página no recibe acceso a su cuenta ni confirma si guardó el evento.

Los enlaces usan la hora de inicio de Perú, convertida a UTC, y la zona `America/Lima`. El programa no publica horas de fin. Por ello el enlace transmite el mismo instante como inicio y fin, sin asignar una duración ficticia. El texto visible y la descripción del borrador indican que el participante debe revisar la hora de fin y sus avisos antes de guardar.

Se añade una actividad cada vez. Marcar un favorito no lo añade automáticamente a Google. Las copias guardadas en Google Calendar no se sincronizan con los cambios del programa; su descripción enlaza a la web para consultar las actualizaciones.

Se ha utilizado el formato de enlace documentado por Google: https://developers.google.com/workspace/calendar/api/concepts/inviting-attendees-to-events#provide_a_link_for_users_to_add_the_event

## Mantener el contenido

- `index.html`: estructura, textos, preguntas frecuentes y ubicación.
- `estilos.css`: diseño y adaptación a distintos tamaños de pantalla.
- `datos.js`: actividades, ponentes, fotografías, galería, ubicación y enlaces de Google Calendar generados.
- `interfaz.js`: filtros, agenda, calendario, menú, visor, reloj, mapa y copia de dirección.
- `assets/`: imágenes de la página.
- `BUSQUEDA-FOTOS.md`: fotografías encontradas y retratos pendientes.
- `VERIFICACION.md`: comprobaciones realizadas y alcance.

Después de editar el programa, las fotos, la galería o los enlaces de ubicación en `datos.js`, ejecuta `python preparar-publicacion.py` desde esta carpeta, con Python 3.9 o posterior. Regenera el contenido disponible sin JavaScript, los accesos de Google Maps y los enlaces de Google Calendar en `datos.js` y `index.html`. No edites manualmente `calendarioGoogle`: ese campo se calcula a partir de los datos de cada actividad.

La configuración `ubicacion.mapa` corresponde a la búsqueda de la ubicación y `ubicacion.ruta` al enlace de indicaciones. Si cambias la dirección, actualiza también el texto visible de `index.html` y `ubicacion.direccion`.

Las cuatro fotos de la galería corresponden al encuentro de Ingeniería Civil de 2024. No se presentan como imágenes de 2026. La procedencia de las fotografías se conserva en `datos.js`; no hay página de créditos ni fuentes visible en la web.

## Información pendiente de la organización

- Ambientes de las jornadas académicas y posibles cambios de programación.
- Requisitos y condiciones de certificación.
- Detalle de los bloques «Hidráulica» (23, 19:15) y «Geotecnia» (24, 19:15).
- Variaciones de nombres y título completo de la ponencia de interlayers.
- Fotografías de las siete personas cuyos retratos no se pudieron verificar. PMO Francia figura como entidad.

Sin JavaScript permanecen accesibles el programa completo, los retratos incluidos, las fotos de la galería, las preguntas, los enlaces de Google Maps y los botones de Google Calendar. Los filtros, la agenda, el visor, el menú desplegable y el reloj requieren JavaScript.
