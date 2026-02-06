# Ka0s Formación — Semana 5, Día 4

## Tema
Proyecto final (implementación): orquestar auditoría y guardar evidencia.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Reutilizar patrones de scripts existentes.
*   Entender cómo un workflow orquesta scripts.
*   Definir claramente la ruta de salida de evidencia.

## Por qué esto importa (explicación directa)
En Ka0s, el valor no es solo ejecutar el check, sino:
*   automatizarlo,
*   versionarlo,
*   y dejar evidencia.

## Dónde verlo en el repo
*   Workflow de auditoría de estado:
    *   [audit-cluster-status.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/audit-cluster-status.yml)
*   Scripts K8s (referencias):
    *   [devops/core/k8s](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/)
*   Evidencia:
    *   [audit](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/)

## Paso a paso (muy detallado)

### Paso 1 — Entiende el workflow orquestador
1.  Abre [audit-cluster-status.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/audit-cluster-status.yml).
2.  Identifica:
    *   qué scripts invoca,
    *   cómo obtiene credenciales,
    *   dónde guarda output,
    *   cómo falla.

### Paso 2 — Selecciona patrones reutilizables
1.  Entra en [devops/core/k8s](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/).
2.  Elige 2 scripts como referencia de estilo:
    *   uno de auditoría,
    *   uno de seguridad.

### Paso 3 — Define ruta de evidencia
Define una ruta estándar:
*   `audit/compliance/` (si no existe, se crea) y archivos con run id.

### Paso 4 — Define salida mínima
Salida JSON mínima:
*   `metadata` + `controls`.

## Preguntas para comprobar que lo entendiste
1.  ¿Por qué el workflow debería guardar la evidencia en el repo?
2.  ¿Qué naming convention usarías para los archivos?
3.  ¿Qué parte es mejor en Bash y cuál en Python?

## Resultado final (entregable)
*   Especificación de salida: ruta + nombres de archivos + JSON mínimo.

