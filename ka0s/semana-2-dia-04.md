# Ka0s Formación — Semana 2, Día 4

## Tema
Evidencias en `audit/`: cómo leer reportes para operar el sistema sin “adivinar”.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar qué es evidencia y qué no.
*   Saber qué subcarpetas mirar según el problema.
*   Abrir reportes reales y extraer conclusiones.
*   Diseñar tu “árbol de decisión” de dónde mirar primero.

## Por qué esto importa (explicación directa)
Ka0s opera por datos. `audit/` te permite:
*   operar sin acceso directo al clúster,
*   reconstruir ejecuciones,
*   auditar decisiones,
*   y evitar repetir diagnósticos.

## Dónde verlo en el repo
*   Índice de auditoría:
    *   [audit/README.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/README.md)
*   Evidencia de ejecuciones:
    *   [audit/kaos](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kaos/)
    *   [audit/inspector](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/inspector/)
*   Evidencia K8s:
    *   [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/)
*   Evidencia despliegue:
    *   [audit/deploy](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/deploy/)

## Paso a paso (muy detallado)

### Paso 1 — Lee el “contrato” de audit
1.  Abre [audit/README.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/README.md).
2.  Identifica qué carpetas existen y qué guarda cada una.

### Paso 2 — Aprende a correlacionar un run
Objetivo: correlacionar `run_id` → evidencia.

1.  Abre un archivo en [audit/kaos](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kaos/) y ubica el `run_id` (en el nombre del archivo).
2.  Busca el mismo `run_id` en [audit/inspector](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/inspector/) (si existe).
3.  Si la ejecución es de K8s, busca reportes cercanos en [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/).

Checkpoint:
*   Puedes explicar cómo saltas de “run id” a “qué pasó”.

### Paso 3 — Haz tu árbol de decisión
Escribe un árbol simple:
*   “Falló Ka0s” → mirar inspector.
*   “Falló despliegue” → mirar deploy + kube.
*   “Pods fallando” → mirar kube + scripts de failed pods.

### Paso 4 — Qué campos buscar en reportes
Cuando abras un JSON/log, busca siempre:
*   timestamp,
*   run id,
*   recurso afectado,
*   severidad,
*   recomendación/acción.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué evidencia usarías para demostrar que un despliegue se ejecutó?
2.  ¿Cómo diferencias “fallo de pipeline” vs “fallo de clúster” leyendo `audit/`?
3.  ¿Qué falta en `audit/` hoy que te gustaría añadir para operar mejor?

## Resultado final (entregable)
*   Tu árbol de decisión “dónde mirar primero” (mínimo 8 ramas).

