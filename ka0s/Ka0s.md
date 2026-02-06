# Ka0s Formación — Semana 1, Día 1

## Tema
Mapa mental del sistema: ¿qué es Ka0s y cómo “piensa”?

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar Ka0s en 2–3 minutos como un “organismo” (cerebro, músculo, memoria, sentidos, sistema nervioso).
*   Señalar en el repositorio dónde vive cada parte (rutas concretas).
*   Entender por qué `audit/` es central y cómo se usa como “verdad del sistema”.

## Por qué esto importa (explicación directa)
Ka0s no es un conjunto de scripts sueltos. Es una plataforma con una idea fuerte:
*   El repositorio es **código + operaciones + seguridad + evidencia**.
*   Si una automatización no deja evidencia, operativamente “no existe”.
*   La modularidad existe para que puedas reutilizar y escalar: un patrón funciona una vez → Ka0s lo vuelve estándar.

Piensa Ka0s como un organismo:
*   **Cerebro (GitHub Actions)**: decide qué hacer y orquesta el flujo.
*   **Músculo (Kubernetes + scripts)**: ejecuta despliegues y auditorías en el entorno real.
*   **Sentidos (Zabbix / Wazuh / ELK)**: observan disponibilidad, seguridad y logs.
*   **Memoria (iTop + `audit/`)**: registra el estado operacional (tickets) y la evidencia de ejecuciones.
*   **Sistema nervioso (n8n)**: conecta señales y acciones (alerta -> normalización -> ticket -> cierre).

## Dónde verlo en el repo (lectura guiada)
Lee en este orden, sin saltarte el 1:
1.  Visión general y terminología: [core/docs/README.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/README.md)
2.  Índice del módulo principal: [ka0s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s/ka0s.md)
3.  Constitución técnica (reglas del sistema): [prompt_ka0s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_ka0s.md)

## Mapa del repositorio (qué carpeta corresponde a qué parte)
Usa esto como “tabla de conversión”:
*   **Cerebro**: workflows y actions reutilizables
    *   [workflows](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/workflows/)
    *   [actions](file:///c:/Users/JhonathanChaves/Desktop/ka0s/.github/actions/)
*   **Músculo**: scripts operativos y manifests
    *   [devops/core/k8s](file:///c:/Users/JhonathanChaves/Desktop/ka0s/devops/core/k8s/)
    *   [core-services](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/b2b/core-services/)
*   **Sentidos**: definición/operación de observabilidad y seguridad
    *   [prompt_wazuh.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_wazuh.md)
    *   [prompt_zabbix.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_zabbix.md)
    *   [prompt_elk.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_elk.md)
*   **Memoria**:
    *   iTop (guía): [ITOP_API_GUIDE.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s_itop/ITOP_API_GUIDE.md)
    *   Evidencia: [audit](file:///c:/Users/JhonathanChaves/Desktop/ka0s/audit/)
*   **Sistema nervioso**:
    *   [prompt_n8n.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_n8n.md)

## Paso a paso (muy detallado)

### Paso 1 — Aprende el vocabulario que usa Ka0s
Abre [core/docs/README.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/README.md) y entiende estas palabras (no te las saltes):
*   **Atómicos**: automatismos de una acción, combinables.
*   **Efímeros**: acciones muy cortas.
*   **Inspector**: sistema de auditoría/resultado.
*   **Número Aureo (3)**: conseguir resultado en menos de 3 pasos.
*   **Reusar / Reutilizar**: patrón core vs adaptaciones.
*   **Agnóstico**: modular por variables/secretos.

Checkpoint (si lo entiendes):
*   Puedes dar un ejemplo real del repo para “Inspector” (carpeta `audit/`).

### Paso 2 — Ubica la documentación base
Abre [ka0s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/docs/ka0s/ka0s.md) y entra en:
*   “Concepto y Arquitectura” → esto te explica qué hace el orquestador.

Checkpoint:
*   Puedes decir en una frase qué hace el “Core Orchestrator”.

### Paso 3 — Lee la Constitución (cómo se trabaja “bien” en Ka0s)
Abre [prompt_ka0s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_ka0s.md) y busca estas reglas:
*   **Evidencia**: todo deja rastro en `audit/`.
*   **SSH First**: se opera en el entorno real.
*   **JSON por defecto**: salidas estructuradas.
*   **Autocuración**: detectar → reconciliar con iTop → actuar → cerrar.

Checkpoint:
*   Puedes explicar por qué “JSON por defecto” facilita ELK y auditoría.

### Paso 4 — Haz tu mapa mental (en el mismo repo)
Crea un diagrama simple (papel o digital). Debe tener:
*   5 cajas: Cerebro / Músculo / Sentidos / Memoria / Sistema nervioso.
*   2–3 ejemplos por caja con ruta concreta.

Ejemplo de cómo escribir un ejemplo (formato recomendado):
*   “Cerebro → `.github/workflows/kaos.yml` decide módulos y genera evidencia”

Checkpoint final del día:
*   Si alguien te pregunta “¿dónde está la verdad del sistema?”, respondes: `audit/`.

## Preguntas para comprobar que lo entendiste
Responde por escrito (corto):
1.  ¿Por qué Ka0s necesita `audit/` si ya existe el log del workflow?
2.  ¿Qué problema operativo resuelve “SSH First”?
3.  ¿Cuál es la diferencia entre “Sentidos” y “Memoria” en Ka0s?
4.  ¿Qué significa que Ka0s sea “agnóstico”?

## Resultado final (entregable)
Entrega mínima (recomendado guardarlo como nota interna):
*   1 página con tu mapa mental y rutas del repo.

