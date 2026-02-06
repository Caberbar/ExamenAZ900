# Ka0s Formación — Semana 3, Día 1

## Tema
Requerimientos del clúster: convertir “estándares” en controles verificables.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Leer requisitos de clúster como una lista de controles (pass/fail).
*   Definir para cada control: comando de verificación, evidencia y severidad.
*   Priorizar controles (bloqueante vs recomendado).

## Por qué esto importa (explicación directa)
Esto es el corazón de “Compliance as Code”:
*   un documento describe el estándar,
*   un script lo verifica,
*   y `audit/` guarda la evidencia.

Sin esto, cada clúster “se valida a ojo” y aparecen sorpresas en producción.

## Dónde verlo en el repo
*   Requisitos del clúster:
    *   [cluster-requirements.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/cluster-requirements.md)
*   Scripts de auditoría para inspirarte:
    *   [devops/core/k8s](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/)
*   Evidencias K8s:
    *   [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/)

## Paso a paso (muy detallado)

### Paso 1 — Lee el documento y separa por dominios
1.  Abre [cluster-requirements.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/cluster-requirements.md).
2.  Divide los requisitos en:
    *   Infra (CPU/RAM/Storage),
    *   Software base (OS/runtime/version),
    *   Red (puertos/CNI),
    *   Persistencia (StorageClass/PVC),
    *   Servicios core (Ingress, cert-manager, metrics-server).

Checkpoint:
*   Puedes listar 3 requisitos por cada dominio.

### Paso 2 — Convierte requisitos a controles “sí/no”
Ejemplo de traducción:
*   Requisito: “Kubernetes v1.28+”
*   Control: “¿La versión del API server es >= 1.28?”

Haz mínimo 12 controles.

### Paso 3 — Define cómo se mide cada control
Para cada control define:
*   **Comando** (ej.: `kubectl version -o json`, `kubectl get storageclass -o json`).
*   **Evidencia** (qué output guardarías, ruta en `audit/`).
*   **Severidad**:
    *   `blocker`: no se puede desplegar.
    *   `high`: se puede desplegar con riesgo.
    *   `medium/low`: recomendación.

### Paso 4 — Diseña el JSON de salida
Define un formato objetivo para un reporte futuro:
*   `cluster`, `timestamp`, `controls[]`.
*   cada control: `id`, `title`, `status`, `severity`, `evidence`, `recommendation`.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué controles son bloqueantes para tus servicios (Zabbix, Wazuh, iTop)?
2.  ¿Qué control falla primero en un clúster "nuevo" típicamente?
3.  ¿Por qué separar severidad es clave para evitar ruido?

## Resultado final (entregable)
*   Lista de 12–20 controles con comando + evidencia + severidad.

