# Ka0s Formación — Semana 4, Día 5

## Tema
Planka (tareas humanas): coordinación con automatización sin mezclar responsabilidades.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar cuándo usar Planka y cuándo iTop.
*   Diseñar una regla de webhooks Planka → n8n → iTop.
*   Definir un tablero mínimo útil para operación.

## Por qué esto importa (explicación directa)
Si mezclas tareas humanas con incidentes automáticos:
*   se pierde trazabilidad,
*   se duplican acciones,
*   el equipo deja de confiar en el sistema.

Planka organiza trabajo humano; iTop registra y gobierna incidentes.

## Dónde verlo en el repo
*   Prompt:
    *   [prompt_planka.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_planka.md)
*   n8n (para webhooks):
    *   [prompt_n8n.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_n8n.md)
*   iTop (para cierre/estado):
    *   [prompt_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_itop.md)

## Paso a paso (muy detallado)

### Paso 1 — Reglas de uso
1.  Abre [prompt_planka.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_planka.md).
2.  Escribe las 3 reglas:
    *   qué vive en Planka,
    *   qué vive en iTop,
    *   qué se integra con n8n.

### Paso 2 — Diseña un tablero mínimo
Columnas recomendadas:
*   Backlog → To Do → In Progress → Review → Done.

Define etiquetas:
*   Critical/High/Medium/Low.

### Paso 3 — Diseña el webhook
Define el evento:
*   “Tarjeta movida a Done”.

Define el payload mínimo:
*   `card_id`, `board`, `list`, `title`, `description`, `labels`.

### Paso 4 — Diseño de automatización
Flujo:
*   Planka webhook → n8n normaliza → iTop cierra ticket.

Regla clave:
*   El ticket a cerrar debe estar referenciado en la tarjeta (ID en descripción/campo).

## Preguntas para comprobar que lo entendiste
1.  ¿Qué riesgo hay si usas Planka como ITSM?
2.  ¿Cómo aseguras trazabilidad entre tarjeta y ticket?
3.  ¿Cómo evitas que un webhook cierre el ticket equivocado?

## Resultado final (entregable)
*   Política escrita de 1 página: “cuándo usar Planka vs iTop” + “regla de webhook”.

