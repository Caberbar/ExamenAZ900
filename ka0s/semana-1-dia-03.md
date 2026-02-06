# Ka0s Formación — Semana 1, Día 3

## Tema
Auditoría e “Inspector”: cómo Ka0s convierte ejecuciones en evidencia consultable.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar qué es el **Inspector** y qué problema resuelve.
*   Identificar qué información produce y dónde la guarda.
*   Abrir una evidencia real en `audit/` y entender su estructura.
*   Definir una rutina de debug: “primero miro X, luego Y”.

## Por qué esto importa (explicación directa)
Ka0s está diseñado para operar con trazabilidad. En producción, lo que mata tiempo es:
*   no saber qué se ejecutó,
*   no saber con qué inputs,
*   no poder reconstruir una ejecución pasada.

El Inspector existe para que el sistema tenga una **memoria objetiva**: evidencia versionada en el repo.

## Dónde verlo en el repo
*   Documentación del módulo inspector:
    *   [ka0s_inspector.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_inspector/ka0s_inspector.md)
*   Workflow del inspector:
    *   [inspector.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/inspector.yml)
*   Evidencias generadas:
    *   [audit/inspector](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/inspector/)
*   (Contexto) Orquestador que lo dispara al final:
    *   [kaos.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/kaos.yml)

## Qué es el Inspector (explicación sencilla)
*   Es el “módulo de cierre” que resume y registra lo ocurrido.
*   Su output está pensado para:
    *   operación diaria,
    *   auditoría,
    *   análisis post-mortem,
    *   y automatizaciones posteriores.

## Paso a paso (muy detallado)

### Paso 1 — Lee qué promete el módulo
1.  Abre [ka0s_inspector.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_inspector/ka0s_inspector.md).
2.  Localiza: propósito, tipo de reportes, y dónde queda la evidencia.

Checkpoint:
*   En una frase: “Inspector sirve para ______ y deja evidencia en ______”.

### Paso 2 — Lee el workflow como si fuera un contrato
1.  Abre [inspector.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/inspector.yml).
2.  Identifica:
    *   Cómo se dispara (`on:`).
    *   Qué variables de entorno/inputs consume.
    *   Qué artefactos genera (json/log/reportes).
    *   En qué ruta del repo los guarda.

Checkpoint:
*   Puedes señalar el step exacto donde escribe en `audit/`.

### Paso 3 — Abre evidencia real (no teoría)
1.  Entra en [audit/inspector](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/inspector/).
2.  Abre:
    *   un `.json` y
    *   un `.log`.
3.  Responde mirando el contenido:
    *   ¿Qué campos identifican la ejecución?
    *   ¿Cómo se representa éxito/fallo?
    *   ¿Hay timestamps?

Checkpoint:
*   Puedes explicar “qué me dice este JSON” sin mirar el workflow.

### Paso 4 — Define tu “rutina de depuración Ka0s”
Escribe tu checklist de 5 pasos para cuando un workflow falle. Ejemplo recomendado:
1.  Identificar `run_id` (KAOS_CODE) en el comentario/issue o en evidencia.
2.  Mirar `audit/inspector` para resumen.
3.  Mirar `audit/kaos` para ver archivos implicados.
4.  Mirar `audit/kube` / `audit/deploy` según el tipo de fallo.
5.  Si es remoto: revisar módulo SSH y scripts invocados.

## Errores típicos (y cómo detectarlos)
*   **No aparece evidencia nueva**: revisar step de `git add/commit/push` en workflows.
*   **Evidencia incompleta**: revisar qué inputs/env se pasan al inspector.
*   **Datos difíciles de leer**: revisar si el output está en JSON o en logs parseables.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué ventaja tiene versionar evidencias en el repo en lugar de depender solo del log del run?
2.  ¿Qué carpeta mirarías primero si alguien te dice “Ka0s falló anoche”?
3.  ¿Qué evidencia mínima exigirías a cualquier módulo nuevo?

## Resultado final (entregable)
*   Tu rutina de depuración (5 pasos) escrita y lista para pegar en un runbook.

