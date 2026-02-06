# Ka0s Formación — Semana 1, Día 2

## Tema
Orquestador: cómo se dispara Ka0s, cómo clasifica cambios y cómo deja evidencia.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar qué activa Ka0s y qué no.
*   Seguir el workflow principal de principio a fin sin perderte.
*   Identificar qué evidencia se genera y en qué ruta.
*   Entender la lógica de “delegación modular” (módulos por tipo de archivo).

## Por qué esto importa (explicación directa)
Si no entiendes el orquestador, tu operación se convierte en prueba-error:
*   No sabrás por qué un cambio disparó (o no) automatizaciones.
*   No sabrás dónde mirar cuando algo falla.
*   Perderás el patrón Ka0s: “evento → decisión → ejecución → evidencia”.

El orquestador es la pieza que transforma un commit en una ejecución auditable.

## Dónde verlo en el repo (archivos exactos)
*   Concepto del orquestador: [01_concept.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s/01_concept.md)
*   Workflow principal: [kaos.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/kaos.yml)
*   Evidencia típica de ejecución: [audit/kaos](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kaos/)

## Paso a paso (muy detallado)

### Paso 1 — Entiende los disparadores (triggers)
Abre [kaos.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/kaos.yml) y ve al bloque `on:`.

Qué debes aprender aquí:
*   **Qué eventos** escucha (por ejemplo `push`).
*   **Qué filtros** aplica (`paths`, `branches`).
*   Traducción operativa: “solo cuando cambien estos tipos de archivo y en estas ramas se ejecuta”.

Checkpoint:
*   Puedes responder: “¿Si cambio un `.txt` se ejecuta Ka0s?” (mirando `paths`).

### Paso 2 — Entiende permisos y variables globales
En el mismo [kaos.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/kaos.yml), revisa:
*   `permissions:`
*   `env:`

Qué debes aprender aquí:
*   Los permisos explican qué puede hacer el workflow (por ejemplo escribir en issues o en el repo).
*   Las variables `KAOS_*` son “metadatos” que viajan por el sistema:
    *   `KAOS_CODE` suele ser el `run_id`.
    *   `KAOS_MODULE` etiqueta el módulo.
    *   `KAOS_PATH_RESUME` define dónde se guarda evidencia.

Checkpoint:
*   Puedes ubicar `KAOS_PATH_RESUME` y decir: “aquí se escriben los artefactos”.

### Paso 3 — Sigue el job principal como una historia
En `jobs:` busca `job-core` y recorre los steps.

#### 3.1 Checkout
El repo se clona para poder leer diffs y generar archivos.

#### 3.2 Validación de extensiones
Ubica el step que valida extensiones.
Qué significa:
*   Ka0s solo procesa cierto conjunto de extensiones.
*   Evita que el pipeline intente operar cosas no soportadas.

Checkpoint:
*   Encuentra de dónde salen las extensiones permitidas (secrets/variables) y cómo se compara.

#### 3.3 Creación del JSON del evento
Ubica el step que genera JSON (usa `toJSON(github.event)` y `jq`).
Qué significa:
*   Se guarda “qué pasó” (evento GitHub) para auditoría.
*   Se evita depender solo del log del job.

Checkpoint:
*   Identifica la ruta de salida (usa `KAOS_PATH_RESUME` + `KAOS_CODE`).

#### 3.4 Lista de archivos implicados
Ubica el step que guarda `files-in-commit`.
Qué significa:
*   Evidencia explícita de qué archivos causaron la ejecución.

#### 3.5 Subida de evidencias al repo
Ubica el step que hace `git add/commit/push` sobre `audit/`.
Qué significa:
*   La evidencia queda versionada y accesible sin entrar a GitHub Actions.

Checkpoint:
*   Explica por qué esto ayuda cuando necesitas auditoría y trazabilidad.

#### 3.6 Selección de módulos
Ubica el step que calcula el módulo según extensión (p.ej. `yaml` → `yamllint.yml`).
Qué significa:
*   Ka0s actúa como dispatcher: elige el “subworkflow” o “módulo” adecuado.

Checkpoint:
*   Describe el algoritmo con tus palabras: “por cada archivo → extraigo extensión → construyo nombre de módulo → si coincide → ejecuto”.

### Paso 4 — Verifica la evidencia generada
Ve a la carpeta [audit/kaos](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/kaos/) y busca:
*   Un archivo `{KAOS_CODE}.json` (evento)
*   Un archivo `{KAOS_CODE}-files-in-commit.txt` (lista de archivos)

Si no hay una ejecución reciente:
*   Igual aprende el patrón leyendo ejemplos existentes en esa carpeta.

## Errores típicos (y cómo detectarlos)
*   **No se ejecuta Ka0s**: revisa `on.paths` y `on.branches`.
*   **No hay evidencia**: revisa el step de commit/push y `KAOS_PATH_RESUME`.
*   **Módulo incorrecto**: revisa cómo calcula `file_module` y el mapeo extensión → workflow.

## Preguntas para comprobar que lo entendiste
Responde por escrito:
1.  ¿Qué tres condiciones pueden impedir que Ka0s se ejecute aunque hayas hecho push?
2.  ¿Qué evidencia exacta se genera en `audit/kaos/`?
3.  ¿Cómo decide Ka0s qué módulo ejecutar para un archivo `.md`?
4.  ¿Qué ventaja tiene guardar el JSON del evento en el repo?

## Resultado final (entregable)
Entrega mínima:
*   Un mini-documento (10 líneas) explicando el flujo:
    *   trigger → validate → evidence → dispatch.

