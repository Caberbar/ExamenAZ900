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

**Explicación (directa)**
*   Ka0s es una plataforma donde el **repositorio** no solo guarda código: también guarda **reglas**, **automatismos**, y **evidencias**.
*   Piensa en Ka0s como un organismo:
    *   **Cerebro (GitHub Actions)**: decide qué hacer según el evento y los cambios.
    *   **Músculo (Kubernetes + scripts)**: ejecuta despliegues, auditorías y verificaciones.
    *   **Sentidos (Zabbix / Wazuh / ELK)**: detectan anomalías (métricas, seguridad, logs).
    *   **Memoria (iTop + audit/)**: registra incidentes, cambios y la trazabilidad de ejecuciones.
    *   **Sistema nervioso (n8n)**: conecta señales y acciones (alerta -> normalización -> ticket -> cierre).
*   En Ka0s, el “resultado” ideal no es solo “funciona”, sino “funciona y queda evidencia” (por eso `audit/` es central).

**Dónde verlo**
*   Lectura:
    *   [core/docs/README.md](../README.md)
    *   [core/docs/ka0s/ka0s.md](./ka0s.md)
*   Código/guía operativa:
    *   [core/ai/prompt_ka0s.md](../../ai/prompt_ka0s.md)

**Paso a paso (hoy)**
1.  Lee la terminología y el enfoque general en [core/docs/README.md](../README.md).
2.  Lee el índice del módulo en [core/docs/ka0s/ka0s.md](./ka0s.md) y abre los enlaces de “Concepto/Arquitectura”.
3.  Abre [core/ai/prompt_ka0s.md](../../ai/prompt_ka0s.md) y localiza las reglas de operación (audit, SSH, formatos).
4.  Recorre el repo y ubica mentalmente: `.github/workflows/` (cerebro), `core/b2b/core-services/` (servicios), `devops/` (scripts), `audit/` (evidencia).
5.  Escribe tu mapa: 5 cajas (Cerebro/Músculo/Sentidos/Memoria/Sistema nervioso) y 2–3 ejemplos por caja.

**Resultado esperado**
*   Un resumen (1 página) con tus definiciones de: “Cerebro / Músculo / Memoria / Sentidos / Sistema nervioso” y ejemplos del repo.

### Día 2 — Orquestador: cómo se dispara Ka0s
**Objetivo**: poder explicar “qué eventos entran”, “cómo se clasifica el cambio” y “qué evidencia se genera”.

**Por qué importa**: el orquestador es el punto de entrada. Si lo entiendes, diagnosticas rápido por qué algo se ejecutó (o no) y dónde buscar el rastro.

**Explicación (directa)**
*   El orquestador vive como workflow (Ka0s Core) y actúa como “dispatcher”:
    *   Mira el evento (push/branch) y los archivos cambiados.
    *   Valida si el cambio entra en el contrato (extensiones permitidas).
    *   Genera un payload (JSON del evento) para trazabilidad.
    *   Decide qué submódulo ejecutar (por ejemplo, linters o auditorías) según la extensión/tipo.
*   La idea clave: **un commit produce una ejecución** y **una ejecución deja rastro** (archivos en `audit/`).

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

**Paso a paso (hoy)**
1.  Abre [.github/workflows/kaos.yml](../../../.github/workflows/kaos.yml) y localiza el bloque `on:` para ver qué activa Ka0s.
2.  Revisa `permissions:` y `env:` para entender qué permisos y metadatos se fijan por ejecución.
3.  Sigue el job `job-core` de arriba abajo y marca estos hitos: `checkout`, validación, creación de JSON, subida de evidencias.
4.  Identifica dónde se escriben los artefactos (variable `KAOS_PATH_RESUME`).
5.  Localiza la parte que determina el módulo a ejecutar según extensión (pattern `*lint.yml`).
6.  Relaciona todo con el texto de [core/docs/ka0s/01_concept.md](./01_concept.md).

**Resultado esperado**
*   Un diagrama simple (caja y flechas) de “push -> kaos.yml -> módulos -> audit/”.
*   Saber dónde cae la evidencia: [audit/kaos](../../../audit/kaos/).

### Día 3 — Auditoría e “Inspector”: la verdad del sistema
**Objetivo**: entender el propósito del inspector: consolidar señales de ejecución y dejar trazabilidad para operación.

**Por qué importa**: en Ka0s, “si no queda evidencia, no ocurrió”. El inspector permite análisis post-mortem y operación basada en datos.

**Explicación (directa)**
*   El inspector es el módulo que “cierra la ejecución” desde el punto de vista operativo.
*   Su trabajo es juntar señales (éxito/fallo, logs, reportes) y dejarlas en un formato que puedas consultar después.
*   Esto habilita:
    *   Debug rápido (qué job falló, con qué input).
    *   Históricos (tendencias de fallos, frecuencia de auditorías).
    *   Compliance (demostrar que se corrieron validaciones).

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_inspector/ka0s_inspector.md](../ka0s_inspector/ka0s_inspector.md)
*   Código:
    *   [.github/workflows/inspector.yml](../../../.github/workflows/inspector.yml)
*   Evidencia:
    *   [audit/inspector](../../../audit/inspector/)

**Paso a paso (hoy)**
1.  Lee el índice y propósito del inspector en [core/docs/ka0s_inspector/ka0s_inspector.md](../ka0s_inspector/ka0s_inspector.md).
2.  Abre [.github/workflows/inspector.yml](../../../.github/workflows/inspector.yml) y detecta:
    *   Qué datos consume (inputs/env).
    *   Qué archivos produce.
    *   En qué ruta del repo los guarda.
3.  Navega por [audit/inspector](../../../audit/inspector/) y abre un `.json` y un `.log` para entender el formato.
4.  Escribe 5 preguntas que puedas responder solo con evidencia (ej.: “¿qué falló?”, “¿cuándo?”, “con qué run id?”).

**Resultado esperado**
*   Poder responder: “¿qué genera el inspector?”, “¿dónde lo guarda?”, “¿cómo lo usaría para depurar?”

### Día 4 — SSH First: ejecución remota y acciones reutilizables
**Objetivo**: entender por qué Ka0s prefiere ejecutar en infraestructura real (y no solo en el runner) y cómo se estandariza.

**Por qué importa**: esto es clave DevSecOps: reduces drift, actúas sobre el entorno real y mantienes trazabilidad central.

**Explicación (directa)**
*   “SSH First” significa: cuando el objetivo es inspeccionar/operar el clúster real, Ka0s ejecuta comandos en el host correcto (control plane, bastion, etc.).
*   Ventajas:
    *   Menos dependencia del runner.
    *   Menos “simulación”: ves el estado real.
    *   Mejor control de credenciales (secretos en GitHub, sin hardcode).
*   Las actions (`ssh-exec`) encapsulan el patrón para que sea repetible y no-interactivo.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ssh_connect/ka0s_ssh_connect.md](../ka0s_ssh_connect/ka0s_ssh_connect.md)
*   Código:
    *   [.github/workflows/ssh-connect.yml](../../../.github/workflows/ssh-connect.yml)
    *   [.github/actions/ssh-exec/action.yml](../../../.github/actions/ssh-exec/action.yml)

**Paso a paso (hoy)**
1.  Lee el concepto y el flujo del módulo en [core/docs/ka0s_ssh_connect/ka0s_ssh_connect.md](../ka0s_ssh_connect/ka0s_ssh_connect.md).
2.  Abre [.github/workflows/ssh-connect.yml](../../../.github/workflows/ssh-connect.yml) y ubica:
    *   Inputs principales.
    *   Cómo se montan secretos/credenciales.
    *   Cómo se ejecuta el comando remoto.
3.  Abre [.github/actions/ssh-exec/action.yml](../../../.github/actions/ssh-exec/action.yml) y entiende qué encapsula (validación, ejecución, salida).
4.  Anota 3 reglas de oro para scripts remotos: no interactivo, códigos de salida, salida parseable.

**Resultado esperado**
*   Saber explicar inputs/outputs típicos (host, usuario, comando/script) y cómo se asegura que sea no-interactivo.

### Día 5 — Estructura de servicios en Kubernetes (`core-services`)
**Objetivo**: entender cómo Ka0s modela servicios: namespaces, manifests, kustomize y patrones repetibles.

**Por qué importa**: tus productos viven en K8s. Si dominas `core/b2b/core-services`, puedes añadir/estandarizar servicios (p.ej. Metabase) sin romper el sistema.

**Explicación (directa)**
*   Cada servicio “core” tiene una carpeta con su definición declarativa (YAML/Kustomize).
*   Patrones que verás repetidos:
    *   `namespace.yaml`: aislamiento.
    *   `kustomization.yaml`: composición y overlays.
    *   `service.yaml` / `ingress.yaml`: exposición interna/externa.
    *   PV/PVC/StatefulSet: persistencia cuando aplica (DBs, indexers).
*   La meta es que cualquier servicio sea **desplegable, auditable y mantenible** siguiendo el mismo molde.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/ka0s_ci_cd_k8s.md](../ka0s_ci_cd_k8s/ka0s_ci_cd_k8s.md)
*   Código:
    *   [core/b2b/core-services](../../b2b/core-services/)

**Paso a paso (hoy)**
1.  Entra en [core/b2b/core-services](../../b2b/core-services/) y elige un servicio “completo” (por ejemplo `itop/` o `zabbix/`).
2.  Abre `kustomization.yaml` y entiende qué recursos incluye.
3.  Abre `namespace.yaml` y explica por qué existe (aislamiento y permisos).
4.  Abre `service.yaml` y `ingress.yaml` y explica el flujo de red (cliente -> ingress -> service -> pods).
5.  Si hay persistencia, ubica PVC/PV y explica qué dato guarda.

**Resultado esperado**
*   Elegir un servicio (p.ej. `itop` o `zabbix`) y listar: `namespace.yaml`, `kustomization.yaml`, `service.yaml`, `ingress.yaml`, PVC/PV si aplica.

## Semana 2 — CI/CD en GitHub para Kubernetes (validación, despliegue y verificación)

### Día 1 — Validación (CI) de manifests
**Objetivo**: entender qué valida Ka0s antes de desplegar y cómo se detiene un cambio inseguro.

**Por qué importa**: “shift-left”. Evitas que configuraciones peligrosas lleguen a producción.

**Explicación (directa)**
*   La validación CI es el “filtro”:
    *   Detecta manifiestos inválidos o inseguros.
    *   Evita desplegar configuraciones que rompan disponibilidad o seguridad.
*   Mentalidad DevSecOps: si falla CI, el cambio no debería avanzar a CD.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/01_concept.md](../ka0s_ci_cd_k8s/01_concept.md)
*   Código:
    *   [.github/workflows/ci-k8s-validate.yml](../../../.github/workflows/ci-k8s-validate.yml)

**Paso a paso (hoy)**
1.  Lee el objetivo del módulo CI/CD en [core/docs/ka0s_ci_cd_k8s/01_concept.md](../ka0s_ci_cd_k8s/01_concept.md).
2.  Abre [.github/workflows/ci-k8s-validate.yml](../../../.github/workflows/ci-k8s-validate.yml) y marca:
    *   Qué se considera “entrada” (paths, branches, triggers).
    *   Qué herramientas se ejecutan.
    *   Qué condiciones hacen fallar el workflow.
3.  Anota qué errores típicos esperas que CI detecte (YAML inválido, imágenes vulnerables, configs inseguras).

**Resultado esperado**
*   Ser capaz de contestar: “¿qué valida?”, “¿qué bloquea?”, “¿qué evidencia deja?”

### Día 2 — Despliegue automatizado (CD) de `core-services`
**Objetivo**: entender el flujo de CD y cómo Ka0s despliega en K8s dejando evidencia.

**Explicación (directa)**
*   CD toma los manifests validados y los aplica en el clúster.
*   La diferencia clave con CI: CI “analiza”; CD “cambia el estado real del sistema”.
*   Por eso CD debe dejar evidencias (qué se aplicó, cuándo, con qué resultado).

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/02_usage_validation.md](../ka0s_ci_cd_k8s/02_usage_validation.md)
*   Código:
    *   [.github/workflows/cd-core-services.yml](../../../.github/workflows/cd-core-services.yml)
*   Evidencia:
    *   [audit/deploy](../../../audit/deploy/) y [audit/kube](../../../audit/kube/)

**Paso a paso (hoy)**
1.  Lee el flujo de CD en [core/docs/ka0s_ci_cd_k8s/02_usage_validation.md](../ka0s_ci_cd_k8s/02_usage_validation.md).
2.  Abre [.github/workflows/cd-core-services.yml](../../../.github/workflows/cd-core-services.yml) e identifica:
    *   Cómo selecciona qué desplegar.
    *   Qué credenciales usa.
    *   Qué pasos de verificación incluye.
3.  Navega por [audit/deploy](../../../audit/deploy/) y [audit/kube](../../../audit/kube/) para entender el rastro de un despliegue.

**Resultado esperado**
*   Explicar qué diferencia CI vs CD dentro del repo y dónde se ve cada rastro.

### Día 3 — Verificación post-despliegue (salud de pods/servicios)
**Objetivo**: entender cómo Ka0s decide si el despliegue “quedó bien” después de aplicar manifests.

**Por qué importa**: CD sin verificación genera falsos éxitos. Ka0s incorpora chequeos de salud.

**Explicación (directa)**
*   Después de aplicar manifests, Ka0s valida:
    *   Pods en estado Ready.
    *   Servicios resolviendo y endpoints presentes.
    *   Errores típicos (CrashLoopBackOff, ImagePullBackOff, Pending por PVC).
*   El objetivo es convertir “apply” en “deploy verificado”.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_ci_cd_k8s/03_integration.md](../ka0s_ci_cd_k8s/03_integration.md)
*   Código:
    *   [.github/scripts/k8s-verify-deployment.sh](../../../.github/scripts/k8s-verify-deployment.sh)
    *   [core/b2b/core-services/kube/cluster-health-check.sh](../../b2b/core-services/kube/cluster-health-check.sh)

**Paso a paso (hoy)**
1.  Lee la parte de verificación en [core/docs/ka0s_ci_cd_k8s/03_integration.md](../ka0s_ci_cd_k8s/03_integration.md).
2.  Abre [.github/scripts/k8s-verify-deployment.sh](../../../.github/scripts/k8s-verify-deployment.sh) y localiza:
    *   Cómo detecta pods no saludables.
    *   Qué considera éxito/fallo.
    *   Qué imprime/guarda como resultado.
3.  Abre [cluster-health-check.sh](../../b2b/core-services/kube/cluster-health-check.sh) y compara checks.
4.  Anota 3 causas de fallo post-deploy y cómo se verían en evidencia.

**Resultado esperado**
*   Identificar al menos 3 checks (pods Ready, servicios, errores comunes) y cómo reportan.

### Día 4 — Gestión de evidencias y trazabilidad (`audit/`)
**Objetivo**: entender la política de evidencia: qué se guarda, con qué formato y por qué.

**Por qué importa**: esto convierte Ka0s en una plataforma operable: auditoría, compliance y post-mortems.

**Explicación (directa)**
*   `audit/` es la carpeta de “memoria operativa” del repo.
*   Ahí se guardan resultados (JSON, logs, reportes) de validaciones, auditorías y ejecuciones.
*   Un buen hábito: cada vez que hay un fallo, primero buscar evidencia en `audit/` antes de “tocar cosas”.

**Dónde verlo**
*   Lectura:
    *   [audit/README.md](../../../audit/README.md)
*   Evidencia:
    *   [audit/kube](../../../audit/kube/)
    *   [audit/kaos](../../../audit/kaos/)

**Paso a paso (hoy)**
1.  Lee [audit/README.md](../../../audit/README.md) y entiende la intención: evidencia como “verdad”.
2.  Abre 2 reportes en [audit/kube](../../../audit/kube/) y detecta qué estructura se repite.
3.  Abre 2 evidencias en [audit/kaos](../../../audit/kaos/) y relaciona con una ejecución.
4.  Define tu rutina de operación: qué miras primero en un fallo (inspector -> kube -> deploy).

**Resultado esperado**
*   Definir tu “fuente de verdad”: qué carpetas consultar para estado, errores, y ejecuciones.

### Día 5 — Estándares del repo (prompts y control files)
**Objetivo**: entender cómo Ka0s “documenta su forma de operar” en prompts y control-files.

**Por qué importa**: asegura consistencia entre módulos y acelera el onboarding.

**Explicación (directa)**
*   Los prompts en `core/ai/` funcionan como guías operativas: definen estilo, reglas y prioridades por dominio (K8s, iTop, Wazuh, etc.).
*   Los control-files en `core/config/` son el “contrato” de configuración (estándares que usa el sistema).
*   Esto reduce ambigüedad: menos decisiones ad-hoc, más consistencia.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_devops.md](../../ai/prompt_devops.md)
    *   [core/ai/prompt_kubernetes.md](../../ai/prompt_kubernetes.md)
*   Código/config:
    *   [core/config/control-file.yaml](../../config/control-file.yaml)
    *   [core/config/control-file.json](../../config/control-file.json)

**Paso a paso (hoy)**
1.  Lee [prompt_devops.md](../../ai/prompt_devops.md) buscando reglas repetibles (secrets, hardening, auditoría).
2.  Lee [prompt_kubernetes.md](../../ai/prompt_kubernetes.md) buscando decisiones de arquitectura (ingress, policies, resources).
3.  Abre [control-file.yaml](../../config/control-file.yaml) y [control-file.json](../../config/control-file.json) y detecta:
    *   qué parametrizan,
    *   qué validan,
    *   qué restricciones imponen.
4.  Escribe tus 5 “no negociables” y enlázalos a un archivo del repo como evidencia.

**Resultado esperado**
*   Extraer 5 reglas “no negociables” (secrets, runners, evidencia, no-interactivo, etc.).

## Semana 3 — Kubernetes operativo + Compliance as Code

### Día 1 — Requerimientos mínimos del clúster
**Objetivo**: convertir requisitos en una checklist operativa (auditable).

**Por qué importa**: es la base de “Compliance as Code”: el estándar vive en el repo y se puede verificar.

**Explicación (directa)**
*   Este documento es tu “baseline” para decir: “este clúster está listo para servicio”.
*   Abarca infraestructura (CPU/RAM), versión, red/puertos, CNI, y storage.
*   La formación aquí es aprender a leer requisitos como “controles” que luego automatizas con scripts.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/cluster-requirements.md](../../../devops/core/k8s/cluster-requirements.md)

**Paso a paso (hoy)**
1.  Lee el documento y subraya requisitos medibles (CPU/RAM/version/storage/puertos/CNI).
2.  Clasifica cada requisito en: Infra, Red, Storage, Servicios Core.
3.  Convierte cada requisito en una pregunta “sí/no” (control): “¿hay StorageClass default?”, “¿K8s >= v1.28?”
4.  Define qué comando lo comprobaría (por ejemplo `kubectl get nodes`, `kubectl get storageclass`).

**Resultado esperado**
*   Checklist con: CPU/RAM, versión K8s, StorageClass, Ingress, metrics-server, puertos, CNI.

### Día 2 — Auditoría de estado del clúster (Bash)
**Objetivo**: entender el patrón de scripts Ka0s: ejecución, salida y evidencia.

**Explicación (directa)**
*   Estos scripts suelen seguir un patrón:
    *   Ejecutan `kubectl` (idealmente con salida JSON).
    *   Normalizan/filtran la información.
    *   Guardan evidencias en `audit/` para consulta posterior.
*   Esta es la base del “operar por datos”: primero observas, luego actúas.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/kube-audit.md](../../../devops/core/k8s/kube-audit.md)
*   Código:
    *   [devops/core/k8s/kube-audit.sh](../../../devops/core/k8s/kube-audit.sh)
    *   [devops/core/k8s/audit-services-status.sh](../../../devops/core/k8s/audit-services-status.sh)

**Paso a paso (hoy)**
1.  Lee [kube-audit.md](../../../devops/core/k8s/kube-audit.md) y detecta propósito + salida.
2.  Abre [kube-audit.sh](../../../devops/core/k8s/kube-audit.sh) y marca:
    *   qué `kubectl` ejecuta,
    *   qué guarda y dónde,
    *   cómo falla (exit codes).
3.  Abre [audit-services-status.sh](../../../devops/core/k8s/audit-services-status.sh) y compara enfoque.
4.  Anota qué indicadores de estado te interesan (pods, nodes, services, events).

**Resultado esperado**
*   Saber describir: inputs, comandos `kubectl` clave y salida esperada.

### Día 3 — Pods fallando: detección y procesamiento (Bash + Python)
**Objetivo**: entender el flujo “detectar -> estructurar -> procesar”.

**Por qué importa**: aquí se ve el enfoque AIOps: convertir señales (pods fallando) en datos accionables.

**Explicación (directa)**
*   Bash se usa como “pegamento” para ejecutar y recopilar.
*   Python se usa para la lógica donde necesitas:
    *   parseo robusto,
    *   agregación,
    *   decisiones (clasificación de fallos),
    *   o integraciones (APIs).
*   Tu meta es poder explicar el pipeline de datos: “de kubectl -> JSON -> reporte -> acción”.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/audit-failed-pods.md](../../../devops/core/k8s/audit-failed-pods.md)
    *   [devops/core/k8s/process-failed-pods.md](../../../devops/core/k8s/process-failed-pods.md)
*   Código:
    *   [devops/core/k8s/audit-failed-pods.sh](../../../devops/core/k8s/audit-failed-pods.sh)
    *   [devops/core/k8s/process-failed-pods.py](../../../devops/core/k8s/process-failed-pods.py)
*   Evidencia:
    *   [audit/kube](../../../audit/kube/) y [audit/issues](../../../audit/issues/)

**Paso a paso (hoy)**
1.  Lee [audit-failed-pods.md](../../../devops/core/k8s/audit-failed-pods.md) para entender criterios de “failed”.
2.  Abre [audit-failed-pods.sh](../../../devops/core/k8s/audit-failed-pods.sh) y localiza cómo construye la lista/JSON.
3.  Lee [process-failed-pods.md](../../../devops/core/k8s/process-failed-pods.md) y entiende el objetivo del procesamiento.
4.  Abre [process-failed-pods.py](../../../devops/core/k8s/process-failed-pods.py) e identifica:
    *   estructura de entrada,
    *   reglas de clasificación,
    *   salida final.
5.  Entra en [audit/kube](../../../audit/kube/) y abre un `failed_pods.json` o reporte similar.

**Resultado esperado**
*   Explicar por qué Bash detecta y Python procesa (separación “glue vs lógica”).

### Día 4 — Auditoría de seguridad en Kubernetes
**Objetivo**: entender qué se audita (workloads, RBAC, red, imágenes) y cómo se reporta.

**Explicación (directa)**
*   Seguridad en K8s no es un único control: es una combinación de:
    *   Configuración de workloads (privilegios, mounts, capabilities).
    *   Permisos (RBAC) y alcance.
    *   Red (políticas, exposición).
    *   Supply chain (imágenes y vulnerabilidades).
*   El resultado útil no es solo el “hallazgo”, sino la recomendación: mitigar, bloquear o crear ticket.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_security/ka0s_security.md](../ka0s_security/ka0s_security.md)
*   Código:
    *   [devops/core/k8s/security-audit-workloads.sh](../../../devops/core/k8s/security-audit-workloads.sh)
    *   [devops/core/k8s/security-audit-rbac-net.sh](../../../devops/core/k8s/security-audit-rbac-net.sh)
    *   [devops/core/k8s/security-audit-trivy.sh](../../../devops/core/k8s/security-audit-trivy.sh)

**Paso a paso (hoy)**
1.  Lee [ka0s_security.md](../ka0s_security/ka0s_security.md) para entender alcance y tipo de reportes.
2.  Abre `security-audit-workloads.sh` y lista 5 checks (privileged, runAsRoot, hostPath, etc.).
3.  Abre `security-audit-rbac-net.sh` y ubica qué revisa (RBAC, roles, network policies).
4.  Abre `security-audit-trivy.sh` y entiende qué escanea y qué salida produce.
5.  Escribe “hallazgo -> severidad -> acción” para 5 ejemplos.

**Resultado esperado**
*   Lista de hallazgos típicos y “qué harías” con cada uno (bloquear, mitigar, ticket, ignorar).

### Día 5 — Traducir auditorías a acciones (autocuración con iTop)
**Objetivo**: diseñar el ciclo de vida de incidentes (idempotencia y cierre automático).

**Por qué importa**: Ka0s no es solo detección: busca reducir ruido y evitar tickets duplicados.

**Explicación (directa)**
*   Idempotencia en incidentes significa: si el mismo fallo ocurre 10 veces, no creas 10 tickets.
*   Patrón:
    *   Buscar ticket abierto por “firma” (servicio/pod/cluster).
    *   Si existe: actualizar con evidencia nueva.
    *   Si no existe: crear.
    *   Si el fallo desaparece: cerrar automáticamente.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_itop.md](../../ai/prompt_itop.md)

**Paso a paso (hoy)**
1.  Lee [prompt_itop.md](../../ai/prompt_itop.md) y subraya la lógica idempotente (buscar antes de crear).
2.  Identifica qué operación API se usa en cada fase: `core/get`, `core/create`, `core/update`, `core/apply_stimulus`.
3.  Define una “firma” de incidente (p.ej. `cluster+namespace+pod+reason`).
4.  Escribe la secuencia completa para ese caso: búsqueda OQL -> create/update -> cierre.

**Resultado esperado**
*   Un flujo escrito: “detectar -> buscar ticket -> crear/actualizar -> aplicar stimulus -> cerrar cuando desaparezca”.

## Semana 4 — Integraciones operativas: iTop, Zabbix, Wazuh, n8n, Planka

### Día 1 — iTop como CMDB/ITSM (fuente de verdad)
**Objetivo**: entender cómo Ka0s integra ITSM (iTop) con automatización (GitHub Actions).

**Explicación (directa)**
*   iTop aporta el “estado de procesos” (incidentes, cambios, CIs).
*   Ka0s automatiza, pero consulta la memoria (iTop) antes de actuar para evitar duplicados y para cerrar el ciclo.

**Dónde verlo**
*   Lectura:
    *   [core/docs/ka0s_itop/ka0s_itop.md](../ka0s_itop/ka0s_itop.md)
    *   [core/docs/ka0s_itop/ITOP_API_GUIDE.md](../ka0s_itop/ITOP_API_GUIDE.md)
*   Código:
    *   [.github/workflows/itop-audit-export.yml](../../../.github/workflows/itop-audit-export.yml)
    *   [.github/actions/itop-export/action.yml](../../../.github/actions/itop-export/action.yml)

**Paso a paso (hoy)**
1.  Lee [ka0s_itop.md](../ka0s_itop/ka0s_itop.md) para ubicar el propósito del módulo.
2.  Lee [ITOP_API_GUIDE.md](../ka0s_itop/ITOP_API_GUIDE.md) y entiende el endpoint y el patrón de operaciones.
3.  Abre el workflow de export y la action y explica qué extraen y para qué se usa.
4.  Define qué campos mínimos necesitas para correlación (idempotencia) en incidentes.

**Resultado esperado**
*   Explicar la diferencia entre “incidente” y “evidencia” y cómo se relacionan.

### Día 2 — Zabbix (sentidos): plantillas y automatización
**Objetivo**: entender el enfoque “Actionability”: alertas útiles, no ruido.

**Explicación (directa)**
*   En Ka0s, una alerta buena tiene 2 propiedades:
    *   Es accionable (hay algo que hacer).
    *   Tiene ruta de remediación (automática o humana).
*   Por eso Zabbix se conecta con iTop/n8n: alerta -> acción -> registro.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_zabbix.md](../../ai/prompt_zabbix.md)
*   Código:
    *   [core/b2b/core-services/zabbix](../../b2b/core-services/zabbix/)

**Paso a paso (hoy)**
1.  Lee [prompt_zabbix.md](../../ai/prompt_zabbix.md) y extrae criterios de severidad (Disaster/High/Average).
2.  Entra en [core/b2b/core-services/zabbix](../../b2b/core-services/zabbix/) y abre:
    *   un template XML,
    *   un manifest (deployment/daemonset),
    *   `media_itop.yaml`.
3.  Relaciona: trigger -> acción -> ticket iTop.

**Resultado esperado**
*   Elegir un template y explicar qué monitoriza y qué acción dispararía.

### Día 3 — Wazuh (seguridad): agentes y verificación
**Objetivo**: entender cómo Ka0s despliega/valida componentes de seguridad y qué señales esperar.

**Explicación (directa)**
*   Wazuh es parte del sistema de seguridad/observabilidad: agentes -> manager/indexer/dashboard.
*   Tu foco es operativo: “está desplegado”, “está reportando”, “puedo auditar y responder”.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_wazuh.md](../../ai/prompt_wazuh.md)
*   Código:
    *   [core/b2b/core-services/soc](../../b2b/core-services/soc/)

**Paso a paso (hoy)**
1.  Lee [prompt_wazuh.md](../../ai/prompt_wazuh.md) y anota 3 objetivos: detección, respuesta, integración.
2.  Entra en [soc](../../b2b/core-services/soc/) y ubica: namespace, manager, indexer, dashboard, agent.
3.  Abre `wazuh-check-services.sh` y entiende qué valida.

**Resultado esperado**
*   Checklist de “servicios Wazuh OK” y cómo lo verificarías con script.

### Día 4 — n8n (sistema nervioso): automatización resiliente
**Objetivo**: aprender patrones n8n: idempotencia, error trigger y normalización de payload.

**Explicación (directa)**
*   n8n conecta sistemas que no se hablan directamente.
*   El patrón recomendado:
    *   Recibir evento (webhook).
    *   Normalizar payload (campos consistentes).
    *   Aplicar idempotencia (dedupe por clave).
    *   Ejecutar acción (crear/actualizar ticket, notificar, remediar).
    *   Manejar errores con Error Trigger.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_n8n.md](../../ai/prompt_n8n.md)

**Paso a paso (hoy)**
1.  Lee [prompt_n8n.md](../../ai/prompt_n8n.md) y subraya: Error Trigger, idempotencia, split in batches.
2.  Diseña un payload mínimo común para alertas (source, severity, fingerprint, message, evidence_link).
3.  Escribe el flujo de nodos n8n en texto (Webhook -> Set/Code -> HTTP iTop -> Error Trigger).

**Resultado esperado**
*   Un diseño de workflow: alerta (Zabbix/Wazuh) -> normalizar JSON -> crear/actualizar ticket iTop.

### Día 5 — Planka (tareas humanas): coordinación con automatización
**Objetivo**: separar claramente trabajo humano (Planka) vs incidentes automáticos (iTop).

**Explicación (directa)**
*   iTop registra incidentes operativos; Planka gestiona trabajo humano.
*   El objetivo es evitar duplicidad y asegurar que lo humano y lo automático se complementen.

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_planka.md](../../ai/prompt_planka.md)

**Paso a paso (hoy)**
1.  Lee [prompt_planka.md](../../ai/prompt_planka.md) y apunta la regla principal: Planka = humano; iTop = incidente.
2.  Define qué estados de tarjeta mapean a qué acciones (crear ticket, cerrar ticket, notificar).
3.  Diseña el evento: webhook Planka -> n8n -> iTop.

**Resultado esperado**
*   Regla definida: cuándo crear tarjeta, cuándo cerrar ticket, y qué evento lo dispara.

## Semana 5 — Analítica y BI: Metabase + proyecto final

### Día 1 — Metabase en Ka0s: despliegue, seguridad y gobernanza
**Objetivo**: entender cómo introducir BI sin romper seguridad (mínimo privilegio, TLS/SSO, separación de entornos).

**Explicación (directa)**
*   Metabase es una capa de consulta y visualización sobre tus bases.
*   Riesgo típico: convertirlo en “superusuario de datos”. Mitigación:
    *   Cuentas de solo lectura.
    *   Segmentación por entornos.
    *   Publicación detrás de TLS y autenticación (ideal SSO).
    *   DB interna en Postgres/MySQL (no H2 en producción).

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_metabase.md](../../ai/prompt_metabase.md)

**Paso a paso (hoy)**
1.  Lee [prompt_metabase.md](../../ai/prompt_metabase.md) y extrae requisitos de seguridad (TLS/SSO, read-only, no H2).
2.  Define tu “modelo de acceso”: qué grupos verán qué fuentes y con qué permisos.
3.  Define tu “modelo de despliegue”: DB interna Postgres, secret management, ingress.
4.  Escribe decisiones con rationale (2–3 líneas por decisión).

**Resultado esperado**
*   Decisión documentada: DB interna (Postgres), estrategia SSO, roles/grupos, y cuentas read-only para fuentes.

### Día 2 — Observabilidad orientada a acción (ELK)
**Objetivo**: entender el flujo de datos: ingesta -> búsqueda -> dashboard -> acción.

**Explicación (directa)**
*   ELK no es solo “guardar logs”: es convertir logs en señales.
*   Cuando lo dominas, puedes:
    *   detectar patrones,
    *   correlacionar incidentes,
    *   alimentar automatizaciones (n8n/iTop).

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_elk.md](../../ai/prompt_elk.md)
*   Código:
    *   [core/b2b/core-services/elk](../../b2b/core-services/elk/)

**Paso a paso (hoy)**
1.  Lee [prompt_elk.md](../../ai/prompt_elk.md) y apunta los conceptos: ingestión, mapping, dashboards, alertas.
2.  Entra a [elk](../../b2b/core-services/elk/) y revisa `kustomization.yaml`, `elasticsearch-statefulset.yaml` y `kibana-deployment.yaml`.
3.  Define 3 preguntas operativas que responderías con Kibana (errores 5xx, auth fallida, latencia).

**Resultado esperado**
*   3 queries/visualizaciones que serían útiles para operación (errores, latencia, autenticación).

### Día 3 — Proyecto final (diseño): compliance del clúster como pipeline
**Objetivo**: diseñar una verificación repetible que compare “requisitos” vs “estado real” y deje evidencia.

**Explicación (directa)**
*   Esto es el cierre de Ka0s como plataforma: convertir un documento (requisitos) en controles automatizados.
*   El diseño debe responder:
    *   Qué controles,
    *   cómo se miden (kubectl/APIs),
    *   formato de salida (JSON),
    *   criterio pass/fail,
    *   ubicación en `audit/`.

**Dónde verlo**
*   Lectura:
    *   [devops/core/k8s/cluster-requirements.md](../../../devops/core/k8s/cluster-requirements.md)
    *   [core/docs/ka0s_security/ka0s_security.md](../ka0s_security/ka0s_security.md)

**Paso a paso (hoy)**
1.  Lista 10 controles concretos (ej.: “StorageClass default”, “ingress controller”, “metrics-server”, “pods no privileged”).
2.  Para cada control define: comando de verificación, output esperado, severidad.
3.  Define el JSON final: `control_id`, `status`, `evidence`, `recommendation`.
4.  Define criterio global: “fail si hay X controles críticos en fail”.

**Resultado esperado**
*   Documento breve: checks, output JSON, dónde se guarda (`audit/compliance/`), y criterio de “pass/fail”.

### Día 4 — Proyecto final (implementación): auditoría + evidencia
**Objetivo**: implementar el pipeline con el mismo patrón de Ka0s (scripts + evidencia).

**Explicación (directa)**
*   La implementación ideal reaprovecha patrones existentes:
    *   script Bash para recolectar,
    *   Python si hay lógica,
    *   workflow para orquestar,
    *   evidencia en `audit/compliance/`.

**Dónde verlo (referencias)**
*   Código:
    *   [devops/core/k8s](../../../devops/core/k8s/)
    *   [.github/workflows/audit-cluster-status.yml](../../../.github/workflows/audit-cluster-status.yml)

**Paso a paso (hoy)**
1.  Revisa scripts existentes en [devops/core/k8s](../../../devops/core/k8s/) para reutilizar patrón de output.
2.  Abre [audit-cluster-status.yml](../../../.github/workflows/audit-cluster-status.yml) y entiende cómo orquesta scripts.
3.  Define dónde escribirías el nuevo reporte (ruta exacta en `audit/compliance/`).

**Resultado esperado**
*   Reporte consolidado en `audit/compliance/` (aunque sea “mock” inicialmente).

### Día 5 — Proyecto final (integración): tickets y cierre automático
**Objetivo**: cerrar el loop DevSecOps: detección -> decisión -> acción -> cierre.

**Explicación (directa)**
*   Sin integración, el compliance se vuelve reporte “muerto”.
*   Con integración, el hallazgo se convierte en:
    *   ticket (si es nuevo),
    *   actualización (si persiste),
    *   cierre automático (si se resolvió).

**Dónde verlo**
*   Lectura:
    *   [core/ai/prompt_itop.md](../../ai/prompt_itop.md)
    *   [core/docs/ka0s_itop/ITOP_API_GUIDE.md](../ka0s_itop/ITOP_API_GUIDE.md)

**Paso a paso (hoy)**
1.  Define la clave idempotente del hallazgo (control_id + cluster + scope).
2.  Define el mapeo a iTop: título, descripción, severidad, evidencia (link a `audit/`).
3.  Define el “cierre”: qué condición (control pasa) activa `apply_stimulus`.

**Resultado esperado**
*   Política escrita: “si persiste -> update, si desaparece -> close” y campos mínimos para idempotencia.
