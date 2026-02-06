# Ka0s Formación — Semana 3, Día 2

## Tema
Auditoría de estado del clúster (Bash): cómo Ka0s observa con `kubectl`.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Leer scripts de auditoría en Bash (patrón Ka0s).
*   Identificar inputs, outputs y exit codes.
*   Saber qué evidencia generan (y dónde debería guardarse).

## Por qué esto importa (explicación directa)
Antes de remediar, se observa. Estos scripts son “sensores activos” que transforman estado del clúster en datos.

## Dónde verlo en el repo
*   Documentación de auditoría:
    *   [kube-audit.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/kube-audit.md)
*   Scripts:
    *   [kube-audit.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/kube-audit.sh)
    *   [audit-services-status.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/audit-services-status.sh)
*   Evidencia:
    *   [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/)

## Paso a paso (muy detallado)

### Paso 1 — Lee la intención del script
1.  Abre [kube-audit.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/kube-audit.md).
2.  Responde:
    *   ¿qué audita?,
    *   ¿con qué periodicidad se usa?,
    *   ¿qué salida espera?

### Paso 2 — Lee `kube-audit.sh`
1.  Abre [kube-audit.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/kube-audit.sh).
2.  Identifica:
    *   `set -euo pipefail` (robustez),
    *   validación de variables/argumentos,
    *   comandos `kubectl` (idealmente con `-o json`),
    *   qué guarda como archivos,
    *   cómo marca fallo.

Checkpoint:
*   Puedes decir qué parte es “recolección” y qué parte es “formateo”.

### Paso 3 — Lee `audit-services-status.sh`
1.  Abre [audit-services-status.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/audit-services-status.sh).
2.  Haz una tabla simple: qué consulta y qué significa.

### Paso 4 — Relación con evidencia
1.  Entra en [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/).
2.  Abre 2 reportes.
3.  Responde:
    *   ¿qué recursos aparecen?,
    *   ¿qué formato es más útil: JSON o texto?,
    *   ¿qué te falta para que sea accionable?

## Preguntas para comprobar que lo entendiste
1.  ¿Qué salida mínima debería producir un script de auditoría para ser consumida por ELK?
2.  ¿Qué diferencia hay entre “estado de services” y “estado de pods”?
3.  ¿Cómo detectarías rápido un clúster degradado solo con un reporte?

## Resultado final (entregable)
*   Lista de 10 señales de salud que quieres ver siempre (nodes/pods/services/events/pvc).

