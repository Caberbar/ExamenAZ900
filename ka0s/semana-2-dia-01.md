# Ka0s Formación — Semana 2, Día 1

## Tema
CI de Kubernetes: validación de manifests antes de desplegar.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar qué valida el pipeline de CI y por qué.
*   Identificar qué workflow lo implementa.
*   Enumerar fallos típicos que CI debe bloquear.
*   Entender qué evidencias/artefactos quedan tras una validación.

## Por qué esto importa (explicación directa)
CI es el “filtro” DevSecOps:
*   Evita desplegar YAMLs inválidos.
*   Evita desplegar configuraciones inseguras.
*   Reduce incidentes en producción.

## Dónde verlo en el repo
*   Documentación del módulo CI/CD:
    *   [ka0s_ci_cd_k8s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ci_cd_k8s/ka0s_ci_cd_k8s.md)
    *   [01_concept.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ci_cd_k8s/01_concept.md)
*   Workflow de validación:
    *   [ci-k8s-validate.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/ci-k8s-validate.yml)
*   Servicios validados:
    *   [core-services](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/)

## Paso a paso (muy detallado)

### Paso 1 — Entiende el objetivo del módulo
1.  Abre [ka0s_ci_cd_k8s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ci_cd_k8s/ka0s_ci_cd_k8s.md).
2.  Localiza la tabla de componentes: ahí verás qué workflow hace qué.

Checkpoint:
*   Puedes diferenciar “CI validate” vs “CD deploy”.

### Paso 2 — Lee el workflow de CI
1.  Abre [ci-k8s-validate.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/ci-k8s-validate.yml).
2.  Identifica:
    *   cuándo se ejecuta (triggers),
    *   sobre qué paths,
    *   qué herramientas corre (lint, security scan, etc.),
    *   cómo falla (condición de error).

Checkpoint:
*   Puedes listar 3 checks que ocurren en CI (aunque sea a nivel conceptual).

### Paso 3 — Traduce “validación” a fallos reales
Haz una lista de fallos típicos que CI debe detectar (mínimo 8). Ejemplos:
*   YAML inválido.
*   Recurso referenciado pero no existe (namespace/secret/configmap).
*   Imagen `:latest`.
*   Contenedor privilegiado.
*   Sin `resources` (puede canibalizar nodos).
*   Sin `readinessProbe` en servicios críticos.
*   Ingress sin TLS.
*   NetworkPolicy inexistente (si tu baseline es deny-all).

### Paso 4 — Define la evidencia que te gustaría ver
Aunque el workflow ya produzca logs, en Ka0s la evidencia ideal debería:
*   ser estructurada (JSON),
*   quedar accesible (en `audit/` cuando aplique),
*   tener run id y referencia a commit.

Escribe qué campos tendría tu reporte CI mínimo:
*   `run_id`, `commit_sha`, `changed_files`, `checks_passed`, `checks_failed`.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué es lo peor que puede pasar si no tienes CI de validación de manifests?
2.  ¿Qué tipo de check pertenece a CI y cuál pertenece a CD?
3.  ¿Qué check de seguridad pondrías sí o sí para evitar errores de configuración peligrosos?

## Resultado final (entregable)
*   Lista de 8–12 “controles CI” (en texto) que quieres que el pipeline haga siempre.

