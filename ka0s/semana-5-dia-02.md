# Ka0s Formación — Semana 5, Día 2

## Tema
ELK orientado a acción: logs estructurados, búsqueda y dashboards útiles.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar el flujo: ingesta → storage → visualización → acción.
*   Identificar manifests de ELK en el repo.
*   Definir 3 dashboards/consultas operativas.

## Por qué esto importa (explicación directa)
Los logs sin estructura no escalan. ELK es útil cuando:
*   buscas rápido,
*   correlacionas,
*   y conviertes eventos en acciones.

## Dónde verlo en el repo
*   Prompt ELK:
    *   [prompt_elk.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_elk.md)
*   Manifests:
    *   [core-services/elk](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/elk/)

## Paso a paso (muy detallado)

### Paso 1 — Lee el prompt y extrae objetivos
1.  Abre [prompt_elk.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_elk.md).
2.  Apunta:
    *   ECS/JSON,
    *   parseo (Logstash/grok),
    *   dashboards,
    *   alertas.

### Paso 2 — Revisa el despliegue
1.  Entra en [elk](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/elk/).
2.  Abre:
    *   `elasticsearch-statefulset.yaml`,
    *   `kibana-deployment.yaml`,
    *   `logstash-deployment.yaml`.
3.  Identifica:
    *   persistencia,
    *   exposición (services),
    *   configuración (configmaps).

### Paso 3 — Define 3 casos de uso operativos
Ejemplos:
*   Errores 5xx por servicio.
*   Intentos de login fallidos.
*   Pods reiniciándose frecuentemente.

Para cada caso, escribe:
*   fuente,
*   filtro,
*   métrica,
*   acción.

## Preguntas para comprobar que lo entendiste
1.  ¿Por qué JSON/ECS reduce trabajo en dashboards?
2.  ¿Qué dato te falta hoy en logs para operar más rápido?
3.  ¿Qué alerta de logs convertirías en ticket automáticamente?

## Resultado final (entregable)
*   3 definiciones de dashboards/queries con acción asociada.

