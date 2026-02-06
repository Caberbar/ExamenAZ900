# Ka0s Formación — Semana 2, Día 3

## Tema
Verificación post-despliegue: cómo Ka0s comprueba que los servicios quedaron saludables.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar por qué “aplicar manifests” no es suficiente.
*   Identificar scripts de verificación usados por Ka0s.
*   Enumerar checks de salud típicos (pods, servicios, ingress).
*   Saber dónde buscar evidencia de verificación.

## Por qué esto importa (explicación directa)
El fallo clásico en CI/CD es declarar éxito cuando solo se aplicó YAML.
Ka0s busca “deploy verificado”:
*   reduce incidentes,
*   detecta problemas en minutos,
*   y deja evidencia del estado posterior.

## Dónde verlo en el repo
*   Script principal de verificación:
    *   [k8s-verify-deployment.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/scripts/k8s-verify-deployment.sh)
*   Script de salud del clúster:
    *   [cluster-health-check.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/kube/cluster-health-check.sh)
*   Evidencia:
    *   [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/)

## Paso a paso (muy detallado)

### Paso 1 — Lee el script de verificación como una lista de checks
1.  Abre [k8s-verify-deployment.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/scripts/k8s-verify-deployment.sh).
2.  Identifica:
    *   qué `kubectl` usa,
    *   qué considera fallo,
    *   qué imprime.
3.  Haz una lista de checks (mínimo 6).

### Paso 2 — Compara con el chequeo de salud del clúster
1.  Abre [cluster-health-check.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/kube/cluster-health-check.sh).
2.  Identifica qué checks son “clúster” vs “servicio”.

Checkpoint:
*   Puedes explicar la diferencia: “health del clúster” vs “health del despliegue”.

### Paso 3 — Conecta los checks con fallos reales
Para cada uno, escribe el fallo típico asociado:
*   Pod no Ready → ImagePullBackOff/CrashLoop/Pending.
*   Service sin endpoints → selector incorrecto.
*   Ingress 503 → backend no responde.

### Paso 4 — Evidencia
1.  Entra en [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/).
2.  Abre un reporte y busca señales típicas (pods fallidos, servicios no OK).

## Preguntas para comprobar que lo entendiste
1.  ¿Qué check post-deploy te parece más importante y por qué?
2.  ¿Cómo sabrías si un Ingress falla por DNS vs por Service?
3.  ¿Qué evidencia mínima debe quedar después de verificar?

## Resultado final (entregable)
*   Lista de 6–10 checks post-deploy y su “fallo típico”.

