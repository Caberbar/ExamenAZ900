# Ka0s Formación — Semana 3, Día 3

## Tema
Pods fallando: detección (Bash) + procesamiento (Python) y salida accionable.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Entender el pipeline “detecta → estructura → clasifica”.
*   Ver por qué Ka0s separa Bash (recolección) de Python (lógica).
*   Reconocer estados típicos de fallo y su causa probable.

## Por qué esto importa (explicación directa)
Los pods fallando son el síntoma más común. Ka0s busca:
*   convertir el síntoma en datos estructurados,
*   y dejarlo listo para automatizar (ticket/remediación).

## Dónde verlo en el repo
*   Documentación:
    *   [audit-failed-pods.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/audit-failed-pods.md)
    *   [process-failed-pods.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/process-failed-pods.md)
*   Scripts:
    *   [audit-failed-pods.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/audit-failed-pods.sh)
    *   [process-failed-pods.py](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/process-failed-pods.py)
*   Evidencia:
    *   [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/)

## Paso a paso (muy detallado)

### Paso 1 — Comprende qué es “failed” para Ka0s
1.  Abre [audit-failed-pods.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/audit-failed-pods.md).
2.  Enumera los estados objetivo (ej.: CrashLoopBackOff, ImagePullBackOff, Pending, Error).

### Paso 2 — Lee el script de detección (Bash)
1.  Abre [audit-failed-pods.sh](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/audit-failed-pods.sh).
2.  Identifica:
    *   qué query hace a Kubernetes,
    *   cómo filtra,
    *   cómo construye la salida.

Checkpoint:
*   Puedes explicar qué hace Bash: “consulta, filtra, serializa”.

### Paso 3 — Lee el procesador (Python)
1.  Abre [process-failed-pods.py](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/process-failed-pods.py).
2.  Identifica:
    *   forma de entrada,
    *   reglas de clasificación,
    *   salida final.

Checkpoint:
*   Puedes decir qué valor aporta Python sobre Bash.

### Paso 4 — Haz la tabla causa probable → acción
Crea una tabla con mínimo 8 filas:
*   Estado: `ImagePullBackOff` → causa: credenciales/imagen → acción: revisar secret/policy.
*   Estado: `Pending` → causa: PVC/recursos → acción: storageclass/requests.

### Paso 5 — Conecta con evidencia
1.  Abre un reporte en [audit/kube](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kube/).
2.  Identifica un pod con fallo y describe:
    *   namespace,
    *   nombre,
    *   estado,
    *   causa probable.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué parte del pipeline cambiarías si quisieras añadir “recomendación automática”?
2.  ¿Qué información mínima necesitas para abrir un ticket sin duplicados?
3.  ¿Qué salida sería ideal para alimentar ELK?

## Resultado final (entregable)
*   Tabla “estado → causa probable → acción” (mínimo 8 entradas).

