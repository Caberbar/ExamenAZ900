# Ka0s Formación — Semana 4, Día 2

## Tema
Zabbix (Sentidos): alertas accionables y su integración con Ka0s.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar la filosofía “Actionability” en Zabbix.
*   Identificar templates y manifests de Zabbix en el repo.
*   Entender cómo se podría integrar una alerta con iTop/n8n.

## Por qué esto importa (explicación directa)
Monitorear no es coleccionar métricas. En Ka0s:
*   una alerta buena dispara acción,
*   una alerta mala es ruido.

## Dónde verlo en el repo
*   Prompt:
    *   [prompt_zabbix.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_zabbix.md)
*   Manifests y templates:
    *   [core-services/zabbix](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/zabbix/)

## Paso a paso (muy detallado)

### Paso 1 — Aprende las reglas de alertas
1.  Abre [prompt_zabbix.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_zabbix.md).
2.  Extrae:
    *   severidades,
    *   qué es accionable,
    *   cómo integrar con iTop/n8n.

### Paso 2 — Revisa el despliegue
1.  Entra a [core-services/zabbix](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/zabbix/).
2.  Abre:
    *   `zabbix-server-deployment.yaml`,
    *   `zabbix-agent-daemonset.yaml`,
    *   `zabbix-k8s-rbac.yaml`.
3.  Explica:
    *   qué corre en cada uno,
    *   qué permisos requiere,
    *   qué datos recolecta.

### Paso 3 — Revisa templates
1.  Abre un template XML (por ejemplo uno específico de servicio).
2.  Identifica:
    *   items,
    *   triggers,
    *   severidad.

### Paso 4 — Diseña el flujo alerta → ticket
Escribe un flujo ideal:
1.  Trigger (High/Disaster).
2.  Acción (webhook).
3.  n8n normaliza payload.
4.  iTop crea/actualiza ticket.
5.  Si se recupera, cierre automático.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué diferencia hay entre “Warning” y “Disaster” en tu operación?
2.  ¿Qué alerta eliminarías por ser ruido?
3.  ¿Qué datos mínimos necesita iTop para deduplicar?

## Resultado final (entregable)
*   Definición de 5 alertas “accionables” para tu clúster y qué acción disparan.

