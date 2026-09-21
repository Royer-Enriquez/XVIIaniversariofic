# XVII Aniversario FIC UNCP · web actualizada

## Abrir esta entrega corregida

Extrae este ZIP en una carpeta nueva. Abre `FIC-2026-CON-RONALD-SANTANA/index.html` de esta entrega.

En la cabecera debe aparecer **Google Maps** y en la portada **Ver ubicación en Google Maps**. Esta versión no tiene botones de inscripción ni enlaces a Google Forms.

Si la web ya está publicada, reemplaza la página `index.html` junto con los demás archivos y actualiza con Ctrl+F5. Los recursos CSS y JavaScript incluyen un identificador de versión para solicitar la copia nueva.

## Qué reemplazar

Reemplaza por completo los archivos de esta página independiente: `index.html`, `estilos.css`, `datos.js`, `interfaz.js` y `preparar-publicacion.py`. Copia también la carpeta `assets/` completa, conservando los nombres. Se mantiene la estructura de la entrega anterior y la separación entre HTML, CSS y JavaScript.

Utiliza únicamente los archivos de esta entrega al publicarla. Si habías subido `fuentes.html`, elimínalo del alojamiento: ya no forma parte de la página. No reemplaces archivos homónimos de otros módulos del proyecto.

## Publicar

1. Extrae el ZIP completo.
2. Abre `FIC-2026-CON-RONALD-SANTANA/index.html` para revisar la página. No la abras dentro del ZIP.
3. Sube el contenido de `FIC-2026-CON-RONALD-SANTANA/` a la carpeta pública del alojamiento. `index.html` debe estar junto a los archivos CSS, JavaScript y la carpeta `assets/`.
4. Comprueba la web publicada desde una computadora y un celular, incluyendo los enlaces a Google Maps.

No requiere compilación, npm, base de datos ni claves. La entrega no se ha desplegado en un dominio. No modifica autenticación, servicios compartidos, SQL ni RLS.

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
- Acceso directo a «Mi agenda» en celulares, con contador sincronizado e instrucciones de descarga.
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

«Descargar mi agenda» crea `mi-agenda-fic-2026.ics` con las actividades seleccionadas. Puede importarse en una aplicación de calendario. Los horarios de Perú se convierten a UTC y no se inventan duraciones. También se puede descargar el programa completo.

## Mantener el contenido

- `index.html`: estructura, textos, preguntas frecuentes y ubicación.
- `estilos.css`: diseño y adaptación a distintos tamaños de pantalla.
- `datos.js`: actividades, ponentes, fotografías, galería y enlaces de ubicación.
- `interfaz.js`: filtros, agenda, calendario, menú, visor, reloj, mapa y copia de dirección.
- `assets/`: imágenes y programa completo en formato de calendario.
- `BUSQUEDA-FOTOS.md`: fotografías encontradas y retratos pendientes.
- `VERIFICACION.md`: comprobaciones realizadas y alcance.

Después de editar el programa, las fotos, la galería o los enlaces de ubicación en `datos.js`, ejecuta `python preparar-publicacion.py` desde esta carpeta, con Python 3.9 o posterior. Regenera el contenido disponible sin JavaScript, los accesos de Google Maps y `assets/programa.ics`.

La configuración `ubicacion.mapa` corresponde a la búsqueda de la ubicación y `ubicacion.ruta` al enlace de indicaciones. Si cambias la dirección, actualiza también el texto visible de `index.html` y `ubicacion.direccion`.

Las cuatro fotos de la galería corresponden al encuentro de Ingeniería Civil de 2024. No se presentan como imágenes de 2026. La procedencia de las fotografías se conserva en `datos.js`; no hay página de créditos ni fuentes visible en la web.

## Información pendiente de la organización

- Ambientes de las jornadas académicas y posibles cambios de programación.
- Requisitos y condiciones de certificación.
- Detalle de los bloques «Hidráulica» (23, 19:15) y «Geotecnia» (24, 19:15).
- Variaciones de nombres y título completo de la ponencia de interlayers.
- Fotografías de las siete personas cuyos retratos no se pudieron verificar. PMO Francia figura como entidad.

Sin JavaScript permanecen accesibles el programa completo, los retratos incluidos, las fotos de la galería, las preguntas, los enlaces de Google Maps y el calendario completo. Los filtros, la agenda, el visor, el menú desplegable y el reloj requieren JavaScript.
