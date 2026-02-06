# Ka0s Formación — Semana 4, Día 1

## Tema
iTop como CMDB/ITSM: fuente de verdad y ciclo de vida de incidentes.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar qué rol cumple iTop en Ka0s.
*   Entender el patrón de integración (buscar antes de crear).
*   Identificar workflows/actions del repo relacionados con iTop.
*   Entender el endpoint y operaciones básicas de la API.

## Por qué esto importa (explicación directa)
iTop es la “memoria activa”. Sin iTop:
*   el sistema genera ruido,
*   no hay reconciliación (tickets duplicados),
*   no hay cierre automático.

En Ka0s, iTop convierte señales y evidencias en trabajo gestionable.

## Dónde verlo en el repo
*   Documentación del módulo:
    *   [ka0s_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ka0s_itop.md)
    *   [ITOP_API_GUIDE.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ITOP_API_GUIDE.md)
*   Workflow y action:
    *   [itop-audit-export.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/itop-audit-export.yml)
    *   [itop-export/action.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/actions/itop-export/action.yml)
*   Prompt operativo:
    *   [prompt_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_itop.md)

## Paso a paso (muy detallado)

### Paso 1 — Entiende el rol de iTop
1.  Abre [ka0s_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ka0s_itop.md).
2.  Extrae en 5 bullets:
    *   qué problema resuelve,
    *   qué integra,
    *   cómo encaja con auditorías,
    *   qué tipo de objetos se crean (incidente/cambio),
    *   qué se considera “fuente de verdad”.

### Paso 2 — Aprende el patrón API mínimo
1.  Abre [ITOP_API_GUIDE.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ITOP_API_GUIDE.md).
2.  Identifica:
    *   endpoint,
    *   auth,
    *   formato JSON,
    *   operaciones.

Checkpoint:
*   Puedes explicar “cómo buscar” y “cómo crear” con iTop (sin código aún).

### Paso 3 — Revisa el workflow de export
1.  Abre [itop-audit-export.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/itop-audit-export.yml).
2.  Entiende:
    *   qué dispara este workflow,
    *   qué datos extrae,
    *   qué evidencia genera.

### Paso 4 — Revisa la action de export
1.  Abre [itop-export/action.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/actions/itop-export/action.yml).
2.  Responde:
    *   qué inputs recibe,
    *   qué ejecuta (scripts),
    *   qué outputs produce.

### Paso 5 — Diseña un ticket idempotente
Escribe el esquema mínimo de un ticket:
*   **título**: incluye firma (servicio + recurso + motivo).
*   **descripción**: evidencia (ruta a `audit/`).
*   **estado**: abierto/resuelto/cerrado.
*   **regla**: buscar antes de crear.

## Preguntas para comprobar que lo entendiste
1.  ¿Por qué iTop es mejor para incidentes que Planka?
2.  ¿Qué pasa si no buscas antes de crear?
3.  ¿Qué evidencia adjuntarías siempre al ticket?

## Resultado final (entregable)
*   Definición de “firma” de ticket para: (a) pods fallando y (b) compliance.

