# Ka0s Formación — Semana 4, Día 3

## Tema
Wazuh (Seguridad): despliegue, verificación y señales esperadas.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar el rol de Wazuh dentro de Ka0s.
*   Identificar manifests del stack Wazuh en Kubernetes.
*   Usar scripts de verificación para comprobar estado.
*   Proponer integración de alertas críticas a iTop.

## Por qué esto importa (explicación directa)
Wazuh es parte del “sistema inmune”: detección y respuesta.
En Ka0s, las alertas críticas no se quedan en dashboard: se convierten en incidentes.

## Dónde verlo en el repo
*   Prompt:
    *   [prompt_wazuh.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_wazuh.md)
*   Manifests Wazuh:
    *   [core-services/soc](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/soc/)
*   Script de verificación:
    *   [wazuh-check-services.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/soc/wazuh-check-services.sh)

## Paso a paso (muy detallado)

### Paso 1 — Entiende qué hace Wazuh en Ka0s
1.  Abre [prompt_wazuh.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_wazuh.md).
2.  Extrae 3 objetivos:
    *   detección,
    *   respuesta,
    *   integración.

### Paso 2 — Revisa el despliegue en K8s
1.  Entra en [soc](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/soc/).
2.  Ubica los componentes:
    *   namespace,
    *   manager,
    *   indexer,
    *   dashboard,
    *   agents.
3.  Abre los YAML principales y entiende qué expone y qué persiste.

### Paso 3 — Verificación operativa
1.  Abre [wazuh-check-services.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/soc/wazuh-check-services.sh).
2.  Identifica:
    *   qué servicios valida,
    *   qué considera OK,
    *   qué salida produce.

### Paso 4 — Diseño de integración
Define una regla:
*   Alertas “críticas” deben crear ticket.
*   Alertas repetidas deben actualizar, no duplicar.
*   Cuando desaparecen, se cierra.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué diferencia hay entre Wazuh y ELK en Ka0s?
2.  ¿Qué señales te aseguran que Wazuh “está reportando” y no solo “está desplegado”?
3.  ¿Qué tipo de alerta sería “blocker”?

## Resultado final (entregable)
*   Checklist de 10 puntos “Wazuh OK” (despliegue, estado, reporting, evidencia).

