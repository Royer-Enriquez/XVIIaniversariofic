# Verificación de la agenda sin descargas

Fecha: 23 de setiembre de 2026.

## Comprobado

- El HTML de la versión pública consultada coincidía exactamente con la entrega anterior `FIC-2026-CON-RONALD-SANTANA`. Esta actualización parte de esa misma versión.
- Las 37 actividades tienen un enlace individual de Google Calendar en la página estática y en la interfaz con JavaScript.
- Los enlaces contienen el título, el ponente y el detalle disponibles, la fecha, la hora de inicio, la dirección del campus y las indicaciones sobre el ambiente de cada jornada.
- Los horarios de Perú se convierten correctamente a UTC; los enlaces indican la zona `America/Lima` y conservan tildes y caracteres especiales.
- Al no publicarse una hora de fin, se transmite el mismo instante como inicio y fin. La ayuda y la descripción piden revisar la duración y los avisos antes de guardar.
- Cada enlace abre una pestaña con `noopener noreferrer`. No descarga archivos ni cambia los favoritos, ni presenta una confirmación de guardado en Google.
- Se retiraron los controles de descarga, el código de exportación y el archivo de calendario del paquete.
- Se actualizaron la ayuda de «Mi agenda» y las preguntas frecuentes. Se explica el guardado de una actividad a la vez y que las copias en Google no se actualizan automáticamente.
- La selección anterior se conserva usando la misma clave de almacenamiento. Se verificaron añadir y retirar favoritos, agenda vacía, recuperación de favoritos al abrir de nuevo, acceso móvil, almacenamiento bloqueado y datos guardados inválidos.
- Se comprobaron los enlaces al filtrar por día, buscar un ponente, seleccionar un área y abrir «Mi agenda».
- Se mantienen todos los datos anteriores del programa, las 24 participaciones, los 16 retratos iniciales, las cuatro fotos de la galería y los enlaces de Google Maps. Los 27 archivos gráficos conservan sus bytes originales.
- No hay formularios ni controles de inscripción.
- Sintaxis JavaScript y análisis CSS correctos; identificadores únicos, anclas internas resueltas y recursos locales presentes.
- La regeneración con `preparar-publicacion.py` es reproducible: una segunda ejecución no altera el resultado.
- Los recursos CSS y JavaScript llevan la versión `20260923-google-calendar` para solicitar los archivos actualizados.
- La integridad del ZIP y la igualdad de sus archivos con la carpeta de entrega se comprobaron antes de guardarlo. Se repitieron las comprobaciones funcionales sobre la copia extraída del ZIP.

## Alcance

Las interacciones se comprobaron en un DOM simulado con jsdom. La revisión visual en un navegador real continúa pendiente porque el navegador disponible bloquea las páginas locales por su política de URL.

Se verificó la estructura y el contenido de los enlaces según el formato documentado por Google. No se inició sesión ni se guardó un evento en una cuenta de Google; esa prueba debe realizarse en el navegador del participante, revisando especialmente la hora de fin y los avisos. Google puede mostrar las horas en la zona horaria de su cuenta.

Esta actualización no se ha desplegado en Vercel. El ZIP contiene la carpeta `FIC-2026-AGENDA-SIN-DESCARGAS`, lista para reemplazar los archivos de esta página independiente.
