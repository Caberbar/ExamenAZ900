# Ka0s Formación — Semana 2, Día 2

## Tema
CD de `core-services`: despliegue automatizado y auditable en Kubernetes.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Entender el flujo de CD y qué cambia en el clúster.
*   Identificar el workflow de despliegue.
*   Ver dónde queda la evidencia del despliegue.
*   Explicar cómo “CD” se apoya en “CI”.

## Por qué esto importa (explicación directa)
CI te dice “esto debería funcionar”. CD hace que “funcione en el mundo real”.
Si CD no es controlado, el clúster termina con:
*   cambios manuales,
*   drift,
*   y despliegues imposibles de reconstruir.

## Dónde verlo en el repo
*   Workflow de despliegue:
    *   [cd-core-services.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/cd-core-services.yml)
*   Documentación:
    *   [02_usage_validation.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ci_cd_k8s/02_usage_validation.md)
*   Evidencias:
    *   [audit/deploy](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/deploy/)
    *   [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/)

## Paso a paso (muy detallado)

### Paso 1 — Lee el objetivo operativo del CD
1.  Abre [02_usage_validation.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ci_cd_k8s/02_usage_validation.md).
2.  Identifica:
    *   cuándo se considera que CD se debe ejecutar,
    *   cómo valida que el despliegue terminó bien,
    *   qué hace cuando falla.

### Paso 2 — Lee el workflow `cd-core-services.yml`
1.  Abre [cd-core-services.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/cd-core-services.yml).
2.  Marca:
    *   qué credenciales usa,
    *   qué comando aplica manifests (kubectl/kustomize),
    *   qué espera como verificación,
    *   cómo produce evidencia.

Checkpoint:
*   Puedes contestar: “si el CD falla, ¿dónde miro primero?”.

### Paso 3 — Revisa evidencias
1.  Abre [audit/deploy](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/deploy/) y localiza un reporte.
2.  Abre [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/) y localiza un reporte cercano en fecha.
3.  Relaciona evidencia con ejecución (run id).

### Paso 4 — Define tu criterio de éxito
Escribe tu “Definition of Done” de un despliegue:
*   Pods Ready.
*   Services con endpoints.
*   Ingress responde.
*   No hay CrashLoop.
*   Evidencia guardada.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué cosas pertenecen a CD y por qué no deberían ser parte de CI?
2.  ¿Cómo demuestras que un despliegue se hizo sin entrar al clúster?
3.  ¿Qué información mínima debe contener un reporte de despliegue?

## Resultado final (entregable)
*   Tu “Definition of Done” de despliegue (lista de checks) para Ka0s.

