# Ka0s Formación — Semana 5, Día 1

## Tema
Metabase en Ka0s: BI segura (mínimo privilegio, TLS/SSO, gobernanza).

## Objetivo del día
Al final de este día debes ser capaz de:
*   Explicar qué aporta Metabase y qué riesgos introduce.
*   Definir un modelo de acceso a datos (roles/grupos, read-only).
*   Definir un modelo de despliegue (K8s + DB interna en Postgres/MySQL).
*   Escribir una política de seguridad para Metabase.

## Por qué esto importa (explicación directa)
Metabase es una capa de consulta y visualización. Riesgo típico:
*   convertirse en “superusuario de datos” (exposición y fuga).

En Ka0s, BI debe ser segura por diseño:
*   TLS,
*   autenticación,
*   mínimo privilegio,
*   auditoría.

## Dónde verlo en el repo
*   Prompt Metabase:
    *   [prompt_metabase.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_metabase.md)
*   Constitución Ka0s (referencia de reglas):
    *   [prompt_ka0s.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_ka0s.md)

## Paso a paso (muy detallado)

### Paso 1 — Lee el prompt y extrae requisitos
1.  Abre [prompt_metabase.md](file:///c:/Users/JhonathanChaves/Desktop/ka0s/core/ai/prompt_metabase.md).
2.  Extrae como lista:
    *   seguridad (TLS/SSO),
    *   secretos,
    *   hardening K8s,
    *   persistencia,
    *   backups,
    *   gobernanza.

### Paso 2 — Modelo de datos (acceso)
Define:
*   Qué fuentes (DBs) se conectan.
*   Qué usuario de DB usa Metabase por fuente:
    *   preferible **solo lectura**.
*   Qué grupos en Metabase ven qué (por servicio/equipo).

Checkpoint:
*   Puedes explicar por qué NO usar credenciales con escritura.

### Paso 3 — Modelo de despliegue
Define:
*   Ingress con TLS.
*   DB interna (Postgres/MySQL) para Metabase (no H2 en prod).
*   Secret management (K8s Secrets).
*   Requests/limits.

### Paso 4 — Política de seguridad
Escribe reglas (mínimo 10). Ejemplos:
*   no exponer Metabase sin auth,
*   no usar `latest`,
*   rotación de secretos,
*   backups de DB,
*   auditoría de cambios.

## Preguntas para comprobar que lo entendiste
1.  ¿Qué riesgo introduces si conectas Metabase a producción con un usuario admin?
2.  ¿Qué control pondrías para evitar exposición accidental?
3.  ¿Qué datos de auditoría te gustaría guardar en `audit/`?

## Resultado final (entregable)
*   Documento: “Política de despliegue seguro de Metabase” (10–15 bullets).

