# Ka0s Formación — Semana 1, Día 5

## Tema
Estructura de servicios en Kubernetes: cómo Ka0s organiza manifests y despliegues.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Navegar un servicio de `core/b2b/core-services` y entender su estructura.
*   Explicar el flujo: namespace → deployment/statefulset → service → ingress.
*   Identificar dónde se define persistencia (PVC/PV) y por qué.
*   Entender cómo Kustomize compone recursos.

## Por qué esto importa (explicación directa)
Tu plataforma despliega productos en Kubernetes. Ka0s busca que cada servicio:
*   tenga una estructura consistente,
*   se despliegue de forma declarativa,
*   y sea auditable.

Si entiendes esto, puedes añadir servicios nuevos (por ejemplo Metabase) sin inventar un patrón nuevo.

## Dónde verlo en el repo
*   Carpeta de servicios:
    *   [core/b2b/core-services](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/)
*   Documentación CI/CD K8s:
    *   [ka0s_ci_cd_k8s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ci_cd_k8s/ka0s_ci_cd_k8s.md)
*   Ejemplo recomendado (servicio completo):
    *   [core-services/itop](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/itop/)

## Paso a paso (muy detallado)

### Paso 1 — Elige un servicio “bien armado”
Recomendación para este día:
*   iTop: [itop](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/itop/)

Checkpoint:
*   La carpeta tiene `kustomization.yaml` y `namespace.yaml`.

### Paso 2 — Entiende `kustomization.yaml`
1.  Abre `kustomization.yaml` del servicio.
2.  Identifica:
    *   recursos incluidos,
    *   orden lógico,
    *   si hay patches/overlays.

Checkpoint:
*   Puedes enumerar qué YAMLs conforman “el servicio”.

### Paso 3 — Entiende el namespace
1.  Abre `namespace.yaml`.
2.  Explica:
    *   qué aisla,
    *   cómo afecta a RBAC,
    *   cómo evita colisiones.

### Paso 4 — Entiende workloads (Deployment/StatefulSet)
1.  Abre el `*-deployment.yaml` o `*-statefulset.yaml`.
2.  Localiza:
    *   imagen,
    *   puertos,
    *   env vars,
    *   volumenes,
    *   probes (si existen),
    *   requests/limits (si existen).

Checkpoint:
*   Puedes describir “qué corre” y “cómo se configura”.

### Paso 5 — Entiende red (Service e Ingress)
1.  Abre `*-service.yaml`.
2.  Abre `ingress.yaml`.
3.  Explica el flujo:
    *   Cliente → Ingress → Service → Pod

Checkpoint:
*   Puedes decir qué parte expone hacia fuera y qué parte es interna.

### Paso 6 — Entiende persistencia
1.  Busca archivos `*pvc.yaml` y `*pv.yaml`.
2.  Responde:
    *   ¿qué datos guarda?
    *   ¿qué pasa si el pod muere?
    *   ¿hay riesgo si no hay backups?

## Errores típicos (y cómo detectarlos)
*   **Pods Pending**: casi siempre por PVC sin provisionar.
*   **CrashLoopBackOff**: env vars faltantes, conexión DB, permisos.
*   **Ingress 404/503**: service selector mal, endpoints vacíos.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué archivos mínimos debería tener un servicio “estándar” en Ka0s?
2.  ¿Cuándo usarías StatefulSet en lugar de Deployment?
3.  ¿Por qué separar namespace por servicio?

## Resultado final (entregable)
*   Un mini-runbook del servicio elegido (10–15 líneas):
    *   qué despliega,
    *   qué persiste,
    *   cómo se accede,
    *   cómo lo verificarías.

