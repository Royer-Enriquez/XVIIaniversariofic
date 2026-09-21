# Verificación de la versión actualizada

Fecha: 21 de setiembre de 2026.

## Comprobado

- Sintaxis de JavaScript y análisis del CSS sin errores.
- Ausencia de apartado, botones y enlaces de inscripción o Google Forms en la web.
- Ausencia de referencias al material informativo retirado y de enlaces a una página de créditos.
- Todos los accesos de ubicación apuntan a la misma búsqueda de la UNCP en Google Maps; los de ruta usan el destino correspondiente. Se conservan aperturas seguras en una pestaña nueva.
- Dirección contrastada con el portal institucional https://uncp.edu.pe/mapa-uncp/.
- Archivos locales e imágenes referenciados presentes; anclas internas resueltas, identificadores únicos y textos alternativos en las imágenes.
- Se mantienen las 37 actividades del programa y sus datos, las 24 participaciones académicas, los 16 retratos y las cuatro fotos de 2024.
- Filtros por los cuatro días y por área, búsqueda sin tildes, resultados vacíos y limpieza de filtros.
- Selección de jornada con hora de Perú: antes, durante y después del evento, cambio a medianoche y regreso a la pestaña.
- Aviso de próxima actividad, minuto exacto de comienzo, salto al programa y conservación de los filtros manuales. Reactivación de la jornada automática.
- Guardado y retirada de favoritos, selección previa conservada, almacenamiento bloqueado y datos guardados inválidos.
- Acceso móvil a la agenda y sincronización del contador con el del programa.
- Calendario descargable con las actividades elegidas, horas UTC correctas y líneas UTF-8 plegadas a un máximo de 75 octetos.
- Galería con navegación circular, botones, flechas, Escape, restauración del foco y alternativa al fallar una imagen.
- Deslizamiento horizontal entre fotos y conservación de los desplazamientos verticales.
- Copia de dirección al portapapeles y selección manual alternativa.
- Menú y cierre con Escape; creación del mapa solo después de pulsar su botón.
- Contenido estático y enlaces útiles disponibles sin JavaScript.
- Regeneración de la página y del programa de calendario mediante `preparar-publicacion.py`.

## Alcance

Las interacciones se comprobaron en un entorno DOM simulado con jsdom, incluidos el diálogo y los eventos táctiles. También se revisaron la estructura, las referencias locales y las reglas de adaptación de la hoja de estilos.

La revisión visual en un navegador real continúa pendiente: el navegador disponible bloquea las páginas locales por su política de URL. No se obtuvo una captura ni se verificó visualmente la disposición final en dispositivos reales. No se ha publicado la web.

No se siguió una ruta real, no se consultó la ubicación del visitante y no se enviaron formularios. El contenido interactivo externo de Google Maps requiere una conexión y queda sujeto a su disponibilidad.

## Entrega con nombre independiente

Se creó un ZIP y una carpeta nuevos: `FIC-2026-CON-RONALD-SANTANA`. Se comprobó el HTML extraído de este paquete: cabecera «Google Maps», portada «Ver ubicación en Google Maps» y ausencia de controles de inscripción o enlaces a Google Forms. Los recursos locales incluyen un identificador de versión en sus URL.

## Fotografías añadidas

Se revisaron visualmente los cuatro archivos nuevos y la leyenda de la publicación de origen cuando correspondía. Se conservan sus bytes originales; los ajustes de encuadre pertenecen al CSS. La sección muestra 16 fotografías inicialmente y 24 participantes al ampliar.

## Foto de Ronald Santana

Se revisó la imagen aportada por el usuario y se conservó el archivo PNG original. Se comprobó la referencia local de su tarjeta, su aparición entre las 16 fotos iniciales y en el HTML sin JavaScript, y el nombre corregido en el programa y el calendario.
