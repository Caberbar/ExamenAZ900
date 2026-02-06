# Plan de Formación Ka0s (DevSecOps)

Este plan está diseñado para aprender Ka0s usando **el propio repositorio como laboratorio**. Está organizado por **semanas** y **días**. Cada día incluye:
*   **Objetivo**: qué debes ser capaz de explicar o ejecutar al final.
*   **Por qué importa**: cómo encaja en Ka0s (DevSecOps/AIOps).
*   **Dónde verlo**: rutas exactas dentro del repo (con enlaces).
*   **Resultado esperado**: evidencia o entregable verificable.

## Cómo usar este plan
*   Duración recomendada: **60–90 minutos por día**.
*   Regla Ka0s: intenta que cada día termine con una evidencia en `audit/` o un entregable corto (resumen, diagrama, checklist).
*   Forma de estudio: **leer -> buscar en código -> explicar con tus palabras -> validar con evidencia**.

## Convenciones
*   **Lectura**: documentación (Markdown) que explica el concepto.
*   **Código**: workflows/actions/scripts/manifests que materializan el concepto.
*   **Evidencia**: dónde quedan artefactos y reportes generados (carpeta `audit/`).

## Semana 1 — Fundamentos de Ka0s (arquitectura, workspace y auditoría)

### Día 1 — Mapa mental del sistema (qué es Ka0s)
**Objetivo**: entender el “organismo Ka0s” (quién orquesta, quién ejecuta, quién observa, quién registra).

**Por qué importa**: si no dominas el modelo mental, Ka0s se siente como “muchos workflows sueltos”. Con el modelo, entiendes la razón de `audit/`, la modularidad y el “SSH First”.

**Dónde verlo**
*   Lectura:
    *   [core/docs/README.md](../README.md)
    *   [core/docs/ka0s/ka0s.md](./ka0s.md)
*   Código/guía operativa:
    *   [core/ai/prompt_ka0s.md](../../ai/prompt_ka0s.md)

**Resultado esperado**
*   Un resumen (1 página) con tus definiciones de: “Cerebro / Músculo / Memoria / Sentidos / Sistema nervioso” y ejemplos del repo.

### Día 2 — Orquestador: cómo se dispara Ka0s
**Objetivo**: poder explicar “qué eventos entran”, “cómo se clasifica el cambio” y “qué evidencia se genera”.

**Por qué importa**: el orquestador es el punto de entrada. Si lo entiendes, diagnosticas rápido por qué algo se ejecutó (o no) y dónde buscar el rastro.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s/01_concept.md](./01_concept.md)
*   Código:
    *   [.github/workflows/kaos.yml](../../../.github/workflows/kaos.yml)

**Qué debes identificar en el workflow**
*   Validación de extensiones permitidas.
*   Generación del JSON del evento.
*   Guardado de evidencia en `audit/`.
*   Lógica de selección/activación de módulos.

**Resultado esperado**
*   Un diagrama simple (caja y flechas) de “push -> kaos.yml -> módulos -> audit/”.
*   Saber dónde cae la evidencia: [audit/kaos](../../../audit/kaos/).

### Día 3 — Auditoría e “Inspector”: la verdad del sistema
**Objetivo**: entender el propósito del inspector: consolidar señales de ejecución y dejar trazabilidad para operación.

**Por qué importa**: en Ka0s, “si no queda evidencia, no ocurrió”. El inspector permite análisis post-mortem y operación basada en datos.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_inspector/ka0s_inspector.md](../ka0s_inspector/ka0s_inspector.md)
*   Código:
    *   [.github/workflows/inspector.yml](../../../.github/workflows/inspector.yml)
*   Evidencia:
    *   [audit/inspector](../../../audit/inspector/)

**Resultado esperado**
*   Poder responder: “¿qué genera el inspector?”, “¿dónde lo guarda?”, “¿cómo lo usaría para depurar?”

### Día 4 — SSH First: ejecución remota y acciones reutilizables
**Objetivo**: entender por qué Ka0s prefiere ejecutar en infraestructura real (y no solo en el runner) y cómo se estandariza.

**Por qué importa**: esto es clave DevSecOps: reduces drift, actúas sobre el entorno real y mantienes trazabilidad central.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ssh_connect/ka0s_ssh_connect.md](../ka0s_ssh_connect/ka0s_ssh_connect.md)
*   Código:
    *   [.github/workflows/ssh-connect.yml](../../../.github/workflows/ssh-connect.yml)
    *   [.github/actions/ssh-exec/action.yml](../../../.github/actions/ssh-exec/action.yml)

**Resultado esperado**
*   Saber explicar inputs/outputs típicos (host, usuario, comando/script) y cómo se asegura que sea no-interactivo.

### Día 5 — Estructura de servicios en Kubernetes (`core-services`)
**Objetivo**: entender cómo Ka0s modela servicios: namespaces, manifests, kustomize y patrones repetibles.

**Por qué importa**: tus productos viven en K8s. Si dominas `core/b2b/core-services`, puedes añadir/estandarizar servicios (p.ej. Metabase) sin romper el sistema.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/ka0s_ci_cd_k8s.md](../ka0s_ci_cd_k8s/ka0s_ci_cd_k8s.md)
*   Código:
    *   [core/b2b/core-services](../../b2b/core-services/)

**Resultado esperado**
*   Elegir un servicio (p.ej. `itop` o `zabbix`) y listar: `namespace.yaml`, `kustomization.yaml`, `service.yaml`, `ingress.yaml`, PVC/PV si aplica.

## Semana 2 — CI/CD en GitHub para Kubernetes (validación, despliegue y verificación)

### Día 1 — Validación (CI) de manifests
**Objetivo**: entender qué valida Ka0s antes de desplegar y cómo se detiene un cambio inseguro.

**Por qué importa**: “shift-left”. Evitas que configuraciones peligrosas lleguen a producción.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/01_concept.md](../ka0s_ci_cd_k8s/01_concept.md)
*   Código:
    *   [.github/workflows/ci-k8s-validate.yml](../../../.github/workflows/ci-k8s-validate.yml)

**Resultado esperado**
*   Ser capaz de contestar: “¿qué valida?”, “¿qué bloquea?”, “¿qué evidencia deja?”

### Día 2 — Despliegue automatizado (CD) de `core-services`
**Objetivo**: entender el flujo de CD y cómo Ka0s despliega en K8s dejando evidencia.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/02_usage_validation.md](../ka0s_ci_cd_k8s/02_usage_validation.md)
*   Código:
    *   [.github/workflows/cd-core-services.yml](../../../.github/workflows/cd-core-services.yml)
*   Evidencia:
    *   [audit/deploy](../../../audit/deploy/) y [audit/kube](../../../audit/kube/)

**Resultado esperado**
*   Explicar qué diferencia CI vs CD dentro del repo y dónde se ve cada rastro.

### Día 3 — Verificación post-despliegue (salud de pods/servicios)
**Objetivo**: entender cómo Ka0s decide si el despliegue “quedó bien” después de aplicar manifests.

**Por qué importa**: CD sin verificación genera falsos éxitos. Ka0s incorpora chequeos de salud.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/03_integration.md](../ka0s_ci_cd_k8s/03_integration.md)
*   Código:
    *   [.github/scripts/k8s-verify-deployment.sh](../../../.github/scripts/k8s-verify-deployment.sh)
    *   [core/b2b/core-services/kube/cluster-health-check.sh](../../b2b/core-services/kube/cluster-health-check.sh)

**Resultado esperado**
*   Identificar al menos 3 checks (pods Ready, servicios, errores comunes) y cómo reportan.

### Día 4 — Gestión de evidencias y trazabilidad (`audit/`)
**Objetivo**: entender la política de evidencia: qué se guarda, con qué formato y por qué.

**Por qué importa**: esto convierte Ka0s en una plataforma operable: auditoría, compliance y post-mortems.

**Dónde verlo**
*   Lectura:
    *   [audit/README.md](../../../audit/README.md)
*   Evidencia:
    *   [audit/kube](../../../audit/kube/)
    *   [audit/kaos](../../../audit/kaos/)

**Resultado esperado**
*   Definir tu “fuente de verdad”: qué carpetas consultar para estado, errores, y ejecuciones.

### Día 5 — Estándares del repo (prompts y control files)
**Objetivo**: entender cómo Ka0s “documenta su forma de operar” en prompts y control-files.

**Por qué importa**: asegura consistencia entre módulos y acelera el onboarding.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_devops.md](../../ai/prompt_devops.md)
    *   [core/ai/prompt_kubernetes.md](../../ai/prompt_kubernetes.md)
*   Código/config:
    *   [core/config/control-file.yaml](../../config/control-file.yaml)
    *   [core/config/control-file.json](../../config/control-file.json)

**Resultado esperado**
*   Extraer 5 reglas “no negociables” (secrets, runners, evidencia, no-interactivo, etc.).

## Semana 3 — Kubernetes operativo + Compliance as Code

### Día 1 — Requerimientos mínimos del clúster
**Objetivo**: convertir requisitos en una checklist operativa (auditable).

**Por qué importa**: es la base de “Compliance as Code”: el estándar vive en el repo y se puede verificar.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/cluster-requirements.md](../../../devops/core/k8s/cluster-requirements.md)

**Resultado esperado**
*   Checklist con: CPU/RAM, versión K8s, StorageClass, Ingress, metrics-server, puertos, CNI.

### Día 2 — Auditoría de estado del clúster (Bash)
**Objetivo**: entender el patrón de scripts Ka0s: ejecución, salida y evidencia.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/kube-audit.md](../../../devops/core/k8s/kube-audit.md)
*   Código:
    *   [devops/core/k8s/kube-audit.sh](../../../devops/core/k8s/kube-audit.sh)
    *   [devops/core/k8s/audit-services-status.sh](../../../devops/core/k8s/audit-services-status.sh)

**Resultado esperado**
*   Saber describir: inputs, comandos `kubectl` clave y salida esperada.

### Día 3 — Pods fallando: detección y procesamiento (Bash + Python)
**Objetivo**: entender el flujo “detectar -> estructurar -> procesar”.

**Por qué importa**: aquí se ve el enfoque AIOps: convertir señales (pods fallando) en datos accionables.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/audit-failed-pods.md](../../../devops/core/k8s/audit-failed-pods.md)
    *   [devops/core/k8s/process-failed-pods.md](../../../devops/core/k8s/process-failed-pods.md)
*   Código:
    *   [devops/core/k8s/audit-failed-pods.sh](../../../devops/core/k8s/audit-failed-pods.sh)
    *   [devops/core/k8s/process-failed-pods.py](../../../devops/core/k8s/process-failed-pods.py)
*   Evidencia:
    *   [audit/kube](../../../audit/kube/) y [audit/issues](../../../audit/issues/)

**Resultado esperado**
*   Explicar por qué Bash detecta y Python procesa (separación “glue vs lógica”).

### Día 4 — Auditoría de seguridad en Kubernetes
**Objetivo**: entender qué se audita (workloads, RBAC, red, imágenes) y cómo se reporta.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_security/ka0s_security.md](../ka0s_security/ka0s_security.md)
*   Código:
    *   [devops/core/k8s/security-audit-workloads.sh](../../../devops/core/k8s/security-audit-workloads.sh)
    *   [devops/core/k8s/security-audit-rbac-net.sh](../../../devops/core/k8s/security-audit-rbac-net.sh)
    *   [devops/core/k8s/security-audit-trivy.sh](../../../devops/core/k8s/security-audit-trivy.sh)

**Resultado esperado**
*   Lista de hallazgos típicos y “qué harías” con cada uno (bloquear, mitigar, ticket, ignorar).

### Día 5 — Traducir auditorías a acciones (autocuración con iTop)
**Objetivo**: diseñar el ciclo de vida de incidentes (idempotencia y cierre automático).

**Por qué importa**: Ka0s no es solo detección: busca reducir ruido y evitar tickets duplicados.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_itop.md](../../ai/prompt_itop.md)

**Resultado esperado**
*   Un flujo escrito: “detectar -> buscar ticket -> crear/actualizar -> aplicar stimulus -> cerrar cuando desaparezca”.

## Semana 4 — Integraciones operativas: iTop, Zabbix, Wazuh, n8n, Planka

### Día 1 — iTop como CMDB/ITSM (fuente de verdad)
**Objetivo**: entender cómo Ka0s integra ITSM (iTop) con automatización (GitHub Actions).

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_itop/ka0s_itop.md](../ka0s_itop/ka0s_itop.md)
    *   [core/docs/ka0s_itop/ITOP_API_GUIDE.md](../ka0s_itop/ITOP_API_GUIDE.md)
*   Código:
    *   [.github/workflows/itop-audit-export.yml](../../../.github/workflows/itop-audit-export.yml)
    *   [.github/actions/itop-export/action.yml](../../../.github/actions/itop-export/action.yml)

**Resultado esperado**
*   Explicar la diferencia entre “incidente” y “evidencia” y cómo se relacionan.

### Día 2 — Zabbix (sentidos): plantillas y automatización
**Objetivo**: entender el enfoque “Actionability”: alertas útiles, no ruido.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_zabbix.md](../../ai/prompt_zabbix.md)
*   Código:
    *   [core/b2b/core-services/zabbix](../../b2b/core-services/zabbix/)

**Resultado esperado**
*   Elegir un template y explicar qué monitoriza y qué acción dispararía.

### Día 3 — Wazuh (seguridad): agentes y verificación
**Objetivo**: entender cómo Ka0s despliega/valida componentes de seguridad y qué señales esperar.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_wazuh.md](../../ai/prompt_wazuh.md)
*   Código:
    *   [core/b2b/core-services/soc](../../b2b/core-services/soc/)

**Resultado esperado**
*   Checklist de “servicios Wazuh OK” y cómo lo verificarías con script.

### Día 4 — n8n (sistema nervioso): automatización resiliente
**Objetivo**: aprender patrones n8n: idempotencia, error trigger y normalización de payload.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_n8n.md](../../ai/prompt_n8n.md)

**Resultado esperado**
*   Un diseño de workflow: alerta (Zabbix/Wazuh) -> normalizar JSON -> crear/actualizar ticket iTop.

### Día 5 — Planka (tareas humanas): coordinación con automatización
**Objetivo**: separar claramente trabajo humano (Planka) vs incidentes automáticos (iTop).

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_planka.md](../../ai/prompt_planka.md)

**Resultado esperado**
*   Regla definida: cuándo crear tarjeta, cuándo cerrar ticket, y qué evento lo dispara.

## Semana 5 — Analítica y BI: Metabase + proyecto final

### Día 1 — Metabase en Ka0s: despliegue, seguridad y gobernanza
**Objetivo**: entender cómo introducir BI sin romper seguridad (mínimo privilegio, TLS/SSO, separación de entornos).

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_metabase.md](../../ai/prompt_metabase.md)

**Resultado esperado**
*   Decisión documentada: DB interna (Postgres), estrategia SSO, roles/grupos, y cuentas read-only para fuentes.

### Día 2 — Observabilidad orientada a acción (ELK)
**Objetivo**: entender el flujo de datos: ingesta -> búsqueda -> dashboard -> acción.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_elk.md](../../ai/prompt_elk.md)
*   Código:
    *   [core/b2b/core-services/elk](../../b2b/core-services/elk/)

**Resultado esperado**
*   3 queries/visualizaciones que serían útiles para operación (errores, latencia, autenticación).

### Día 3 — Proyecto final (diseño): compliance del clúster como pipeline
**Objetivo**: diseñar una verificación repetible que compare “requisitos” vs “estado real” y deje evidencia.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/cluster-requirements.md](../../../devops/core/k8s/cluster-requirements.md)
    *   [core/docs/ka0s_security/ka0s_security.md](../ka0s_security/ka0s_security.md)

**Resultado esperado**
*   Documento breve: checks, output JSON, dónde se guarda (`audit/compliance/`), y criterio de “pass/fail”.

### Día 4 — Proyecto final (implementación): auditoría + evidencia
**Objetivo**: implementar el pipeline con el mismo patrón de Ka0s (scripts + evidencia).

**Dónde verlo (referencias)**
*   Código:
    *   [devops/core/k8s](../../../devops/core/k8s/)
    *   [.github/workflows/audit-cluster-status.yml](../../../.github/workflows/audit-cluster-status.yml)

**Resultado esperado**
*   Reporte consolidado en `audit/compliance/` (aunque sea “mock” inicialmente).

### Día 5 — Proyecto final (integración): tickets y cierre automático
**Objetivo**: cerrar el loop DevSecOps: detección -> decisión -> acción -> cierre.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_itop.md](../../ai/prompt_itop.md)
    *   [core/docs/ka0s_itop/ITOP_API_GUIDE.md](../ka0s_itop/ITOP_API_GUIDE.md)

**Resultado esperado**
*   Política escrita: “si persiste -> update, si desaparece -> close” y campos mínimos para idempotencia.
