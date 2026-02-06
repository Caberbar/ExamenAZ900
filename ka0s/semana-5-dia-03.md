# Ka0s Formación — Semana 5, Día 3

## Tema
Proyecto final (diseño): compliance del clúster como pipeline en Ka0s.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Diseñar un pipeline que compare requisitos vs estado real.
*   Definir formato de salida (JSON) y criterio pass/fail.
*   Definir dónde se guarda evidencia.

## Por qué esto importa (explicación directa)
Este proyecto convierte Ka0s en una plataforma “operable”:
*   los requisitos no son PDF,
*   son controles automatizados.

## Dónde verlo en el repo
*   Requisitos:
    *   [cluster-requirements.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/cluster-requirements.md)
*   Seguridad (baseline):
    *   [ka0s_security.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_security/ka0s_security.md)
*   Scripts existentes (patrones):
    *   [devops/core/k8s](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/)

## Paso a paso (muy detallado)

### Paso 1 — Lista controles
1.  Abre requisitos y selecciona 15 controles.
2.  Marca severidad y “dueño” (infra/seguridad/operación).

### Paso 2 — Define medición y evidencia
Para cada control define:
*   comando,
*   output,
*   evidencia (ruta en `audit/`).

### Paso 3 — Define el reporte JSON
Define:
*   `metadata` (cluster, timestamp, run_id, commit).
*   `controls[]` con `status` y `recommendation`.

### Paso 4 — Define criterio global
Ejemplo de criterio:
*   `fail` si cualquier `blocker` falla.
*   `warn` si fallan > N `high`.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué controles son “blocker” para que Ka0s despliegue servicios?
2.  ¿Cómo evitarías ruido (demasiados warnings)?
3.  ¿Qué evidencia te pediría un auditor?

## Resultado final (entregable)
*   Documento de diseño de 1–2 páginas: controles + JSON + pass/fail + ubicación de evidencia.

