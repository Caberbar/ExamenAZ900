# Ka0s Formación — Semana 1, Día 4

## Tema
SSH First: ejecución remota segura y estandarizada en Ka0s.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar por qué Ka0s opera “en el host real” y no solo en el runner.
*   Identificar el workflow y la action que implementan SSH.
*   Entender la diferencia entre “workflow reusable” y “action reusable”.
*   Definir reglas para scripts remotos (no interactivo, exit codes, salida estructurada).

## Por qué esto importa (explicación directa)
En DevSecOps, el error típico es operar sobre un entorno “parecido” al real. SSH First evita eso:
*   inspeccionas y actúas sobre el control plane o el nodo correcto,
*   reduces drift,
*   y mantienes trazabilidad centralizada.

## Dónde verlo en el repo
*   Documentación del módulo:
    *   [ka0s_ssh_connect.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ssh_connect/ka0s_ssh_connect.md)
*   Workflow reusable:
    *   [ssh-connect.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/ssh-connect.yml)
*   Action reusable:
    *   [ssh-exec/action.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/actions/ssh-exec/action.yml)
*   (Relacionado) Action de túnel kubectl:
    *   [kubectl-tunnel/action.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/actions/kubectl-tunnel/action.yml)

## Explicación (directa)
*   **Workflow reusable**: un workflow que otros workflows “llaman” como módulo.
*   **Action reusable**: una pieza más pequeña (composite action) que encapsula pasos.
*   En Ka0s, SSH suele ser:
    *   workflow para orquestar,
    *   action para ejecutar,
    *   scripts (bash/python) como lógica de operación.

## Paso a paso (muy detallado)

### Paso 1 — Entiende el contrato del módulo SSH
1.  Abre [ka0s_ssh_connect.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_ssh_connect/ka0s_ssh_connect.md).
2.  Identifica:
    *   Inputs típicos (host, usuario, llave, comando).
    *   Qué devuelve (outputs) y cómo se usa.

Checkpoint:
*   Puedes explicar en 2 frases cómo se ejecuta un comando remoto desde GitHub.

### Paso 2 — Lee el workflow reusable
1.  Abre [ssh-connect.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/ssh-connect.yml).
2.  Responde mirando el YAML:
    *   ¿Cómo recibe parámetros?
    *   ¿Cómo consume secretos?
    *   ¿Cómo ejecuta el comando?

Checkpoint:
*   Puedes señalar dónde se inyecta la llave SSH (sin exponerla).

### Paso 3 — Lee la action reusable
1.  Abre [ssh-exec/action.yml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/actions/ssh-exec/action.yml).
2.  Entiende:
    *   qué valida,
    *   cómo ejecuta,
    *   cómo devuelve exit code,
    *   cómo imprime logs.

Checkpoint:
*   Puedes decir qué parte es “responsabilidad de la action” vs “responsabilidad del workflow”.

### Paso 4 — Reglas de oro para scripts remotos
Escribe estas reglas (y úsalas a partir de hoy):
1.  **No interactivo**: jamás pedir input (no `read`, no prompts).
2.  **Exit codes**: 0 éxito, >0 error.
3.  **Salida estructurada**: JSON o logs parseables.
4.  **Timeouts**: evita comandos que se queden colgados.
5.  **Secretos por env**: nunca hardcode.

Referencia para estilo:
*   [prompt_bash.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_bash.md)
*   [prompt_python.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_python.md)

## Preguntas para comprobar que lo entendiste
1.  ¿Qué ventaja tiene SSH First frente a ejecutar todo en el runner?
2.  ¿Qué cosas NO deberían imprimirse nunca en logs?
3.  ¿Por qué son importantes los exit codes en GitHub Actions?

## Resultado final (entregable)
*   Tu “checklist de scripts remotos” (las 5 reglas de oro) escrita.

