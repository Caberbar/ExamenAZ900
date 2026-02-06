# Ka0s Formación — Semana 4, Día 4

## Tema
n8n (Sistema nervioso): diseñar automatizaciones resilientes e idempotentes.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Diseñar un flujo n8n robusto (con Error Trigger).
*   Definir un payload normalizado para alertas.
*   Aplicar idempotencia (dedupe) para evitar duplicados.
*   Integrar con iTop (crear/actualizar/cerrar).

## Por qué esto importa (explicación directa)
n8n conecta órganos del sistema. Si el workflow es frágil:
*   genera duplicados,
*   pierde eventos,
*   y crea caos.

La resiliencia en n8n es parte del DevSecOps operativo.

## Dónde verlo en el repo
*   Prompt:
    *   [prompt_n8n.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_n8n.md)
*   Integración iTop (referencia):
    *   [prompt_itop.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_itop.md)
    *   [ITOP_API_GUIDE.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ITOP_API_GUIDE.md)

## Paso a paso (muy detallado)

### Paso 1 — Reglas de resiliencia en n8n
1.  Abre [prompt_n8n.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_n8n.md).
2.  Subraya:
    *   Error Trigger,
    *   idempotencia,
    *   rate limit y batching,
    *   “continue on fail” con cuidado.

### Paso 2 — Define un payload normalizado
Define un JSON base para eventos:
*   `source` (zabbix/wazuh/k8s),
*   `severity`,
*   `fingerprint` (firma),
*   `title`,
*   `message`,
*   `evidence` (ruta/link a audit),
*   `timestamp`.

### Paso 3 — Diseña nodos del workflow
Escribe el flujo de nodos en texto:
1.  Webhook (entrada).
2.  Set/Code (normalización).
3.  HTTP Request (core/get iTop).
4.  IF (existe ticket?) → update/create.
5.  Error Trigger global → notifica.

### Paso 4 — Define deduplicación
Define cómo generar `fingerprint`:
*   `source + cluster + resource + reason`.

### Paso 5 — Define cierre automático
Define la condición de cierre:
*   si el evento de “recovery” llega o el control pasa.

## Preguntas para comprobar que lo entendiste
1.  ¿Dónde colocarías el Error Trigger y por qué?
2.  ¿Qué pasa si el `fingerprint` no es estable?
3.  ¿Cómo proteges una API de iTop de 5000 eventos por minuto?

## Resultado final (entregable)
*   Diseño completo del workflow (lista de nodos + payload + idempotencia + cierre).

