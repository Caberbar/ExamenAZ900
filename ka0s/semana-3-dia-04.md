# Ka0s Formación — Semana 3, Día 4

## Tema
Auditoría de seguridad en Kubernetes: workloads, RBAC, networking e imágenes.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Entender qué controles de seguridad aplica Ka0s.
*   Saber qué scripts de seguridad existen y qué revisa cada uno.
*   Traducir hallazgos a acciones (mitigar/bloquear/ticket).

## Por qué esto importa (explicación directa)
En K8s, la mayoría de incidentes de seguridad vienen de configuración:
*   pods privilegiados,
*   permisos excesivos,
*   exposición de red,
*   supply chain (imágenes vulnerables).

Estos scripts convierten “config” en “riesgo medible”.

## Dónde verlo en el repo
*   Documentación del módulo:
    *   [ka0s_security.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_security/ka0s_security.md)
*   Scripts:
    *   [security-audit-workloads.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/security-audit-workloads.sh)
    *   [security-audit-rbac-net.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/security-audit-rbac-net.sh)
    *   [security-audit-trivy.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/security-audit-trivy.sh)

## Paso a paso (muy detallado)

### Paso 1 — Entiende el alcance
1.  Abre [ka0s_security.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_security/ka0s_security.md).
2.  Responde:
    *   qué cubre,
    *   qué deja como evidencia,
    *   cómo se interpreta.

### Paso 2 — Workloads
1.  Abre [security-audit-workloads.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/security-audit-workloads.sh).
2.  Lista 8 checks que encuentres.
3.  Para cada check define severidad (blocker/high/medium).

### Paso 3 — RBAC y red
1.  Abre [security-audit-rbac-net.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/security-audit-rbac-net.sh).
2.  Identifica:
    *   revisiones de clusterroles/roles,
    *   bindings,
    *   network policies.

### Paso 4 — Trivy (supply chain)
1.  Abre [security-audit-trivy.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/security-audit-trivy.sh).
2.  Responde:
    *   qué escanea,
    *   cómo decide severidad,
    *   qué output produce.

### Paso 5 — Traduce hallazgo → acción
Escribe 10 reglas:
*   “Privileged container” → bloquear (no se despliega).
*   “Imagen con CVE High” → mitigar (upgrade) y ticket.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué hallazgos deberían ser bloqueantes en tu entorno?
2.  ¿Qué hallazgos deberían crear ticket pero no bloquear?
3.  ¿Cómo evitarías ruido (alertas no accionables)?

## Resultado final (entregable)
*   Tabla “hallazgo → severidad → acción recomendada” (mínimo 10 filas).

