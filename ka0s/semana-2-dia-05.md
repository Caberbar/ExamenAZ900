# Ka0s Formación — Semana 2, Día 5

## Tema
Estándares Ka0s: prompts, control-files y reglas no negociables.

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar para qué sirven los prompts en `core/ai/`.
*   Identificar qué reglas son “no negociables” en Ka0s.
*   Entender el rol de `control-file.yaml/json` como contrato.
*   Escribir tu lista de 10 reglas “de operación”.

## Por qué esto importa (explicación directa)
Sin estándares, Ka0s se fragmenta: cada módulo se comporta distinto.
Los prompts y control-files evitan que el sistema se vuelva inconsistente.

## Dónde verlo en el repo
*   Prompts:
    *   [core/ai](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/)
    *   [prompt_ka0s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_ka0s.md)
    *   [prompt_devops.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_devops.md)
    *   [prompt_kubernetes.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_kubernetes.md)
*   Control files:
    *   [control-file.yaml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/config/control-file.yaml)
    *   [control-file.json](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/config/control-file.json)

## Paso a paso (muy detallado)

### Paso 1 — Entiende qué es un prompt en Ka0s
1.  Abre [prompt_ka0s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_ka0s.md).
2.  Localiza reglas clave: evidencia, SSH first, formatos, autocuración.

Checkpoint:
*   Puedes decir: “un prompt define ______ y evita ______”.

### Paso 2 — Lee el prompt DevOps y K8s buscando decisiones
1.  Abre [prompt_devops.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_devops.md).
2.  Abre [prompt_kubernetes.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_kubernetes.md).
3.  Saca una lista de decisiones “siempre”:
    *   secrets fuera del código,
    *   hardening,
    *   evidence,
    *   validación,
    *   mínimos privilegios.

### Paso 3 — Revisa los control-files como contrato
1.  Abre [control-file.yaml](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/config/control-file.yaml).
2.  Abre [control-file.json](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/config/control-file.json).
3.  Identifica:
    *   qué parámetros existen,
    *   qué parte del sistema los usa,
    *   qué restricciones imponen.

Checkpoint:
*   Puedes decir: “el control-file existe para ______”.

### Paso 4 — Escribe tus 10 reglas no negociables
Formato recomendado:
*   Regla → dónde se ve en el repo → por qué.

Ejemplo:
*   “Todo deja evidencia en `audit/` → prompt_ka0s → sin evidencia no hay operación”.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué pasa si un módulo no respeta el contrato de salida (JSON/log parseable)?
2.  ¿Por qué Ka0s necesita prompts versionados dentro del repo?
3.  ¿Qué regla te parece más importante para evitar incidentes?

## Resultado final (entregable)
*   Documento con tus 10 reglas no negociables (con referencias a archivos del repo).

