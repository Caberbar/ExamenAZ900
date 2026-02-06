# Ka0s Formación — Semana 3, Día 5

## Tema
Autocuración (diseño): convertir auditorías en tickets idempotentes y cierre automático.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Diseñar el ciclo: detectar → reconciliar (buscar) → crear/actualizar → cerrar.
*   Entender qué es idempotencia en incidentes.
*   Definir una “firma” para deduplicar tickets.

## Por qué esto importa (explicación directa)
Operación sin idempotencia = ruido:
*   el mismo fallo crea 20 tickets,
*   la gente deja de confiar en la herramienta.

Ka0s busca “memoria activa”: iTop evita duplicados y permite cierre automático cuando el problema desaparece.

## Dónde verlo en el repo
*   Prompt de iTop:
    *   [prompt_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_itop.md)
*   Guía de API:
    *   [ITOP_API_GUIDE.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ITOP_API_GUIDE.md)

## Paso a paso (muy detallado)

### Paso 1 — Aprende las 4 operaciones base
En [prompt_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_itop.md) ubica:
*   `core/get` (buscar)
*   `core/create` (crear)
*   `core/update` (actualizar)
*   `core/apply_stimulus` (cambiar estado, resolver/cerrar)

Checkpoint:
*   Puedes decir qué operación usas para evitar duplicados.

### Paso 2 — Define la firma del incidente (idempotencia)
Necesitas una clave estable. Ejemplos:
*   Para pods: `cluster + namespace + workload + reason`.
*   Para compliance: `cluster + control_id + scope`.

### Paso 3 — Diseña el algoritmo de reconciliación
Escribe en pseudopasos:
1.  Construir firma.
2.  Buscar ticket abierto por firma.
3.  Si existe: update (añadir evidencia nueva).
4.  Si no existe: create.
5.  Si el control pasa o el fallo desaparece: apply_stimulus (resolve/close).

### Paso 4 — Define qué evidencia adjuntas
Siempre adjunta:
*   run id,
*   enlace/ruta a `audit/`,
*   resumen del hallazgo,
*   recomendación.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué datos mínimos necesitas para deduplicar correctamente?
2.  ¿Qué pasa si iTop está caído? (degradación elegante)
3.  ¿Cómo decides el momento de cierre automático sin cerrar falsos positivos?

## Resultado final (entregable)
*   Un flujo escrito (10–15 líneas) para un caso real: “pod en CrashLoopBackOff”.

