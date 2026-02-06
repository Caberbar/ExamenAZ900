# Ka0s Formación — Semana 5, Día 5

## Tema
Proyecto final (integración): tickets y cierre automático para compliance.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Mapear un hallazgo de compliance a un ticket en iTop.
*   Definir idempotencia (firma del control).
*   Definir cierre automático cuando el control vuelve a OK.

## Por qué esto importa (explicación directa)
Compliance sin loop de acción se vuelve “reporte muerto”.
Ka0s busca que el compliance:
*   cree trabajo solo cuando es necesario,
*   se mantenga actualizado,
*   y se cierre cuando se resuelve.

## Dónde verlo en el repo
*   Prompt iTop:
    *   [prompt_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_itop.md)
*   API guide:
    *   [ITOP_API_GUIDE.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ITOP_API_GUIDE.md)
*   Evidencia:
    *   [audit](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/)

## Paso a paso (muy detallado)

### Paso 1 — Define firma idempotente de un control
Ejemplo:
*   `cluster + control_id + scope`.

### Paso 2 — Define campos del ticket
Mínimos recomendados:
*   título: incluye `control_id` y cluster.
*   descripción: evidencia (`audit/compliance/...`).
*   severidad: mapeada desde control.
*   estado.

### Paso 3 — Define el algoritmo
1.  `core/get` por firma.
2.  si existe → `core/update`.
3.  si no existe → `core/create`.
4.  si control OK → `apply_stimulus` (resolve/close).

### Paso 4 — Define el cierre
Define condición de cierre:
*   control pasa en N ejecuciones seguidas (para evitar flapping), o
*   pasa y evidencia lo confirma.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué riesgo hay si cierras tickets con un solo “OK”?
2.  ¿Qué evidencia adjuntas para justificar el cierre?
3.  ¿Qué harías si iTop está caído durante la ejecución?

## Resultado final (entregable)
*   Política de 1 página: “apertura/actualización/cierre de tickets de compliance”.

