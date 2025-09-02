---
id: index
title: Scrum en Indaptados
slug: /02-scrum/
---

# Scrum en Indaptados: Agilidad con Propósito 🏃‍♂️

En **Indaptados** aplicamos Scrum no como ritual, sino como **sistema de entrega de valor continua**. Priorizamos por valor de negocio y riesgo técnico, manteniendo ciclos cortos para maximizar aprendizaje y adaptación.

## 🎯 Nuestra Implementación de Scrum

### Estructura de Sprints

- **Duración**: 1 semana (lunes a viernes)
- **Demo**: Cada viernes 4:00 PM
- **Retrospectiva**: Viernes 5:00 PM
- **Planning**: Lunes 9:00 AM

### ¿Por qué sprints de 1 semana?

- **Feedback rápido**: Detectamos problemas temprano
- **Menor riesgo**: Menos tiempo invertido en direcciones incorrectas
- **Mayor adaptabilidad**: Pivoteamos rápido según aprendizajes
- **Energía sostenida**: Evitamos burnout de sprints largos

## 👥 Roles y Responsabilidades

### 🎪 **Product Owner (PO)**

**Responsabilidades**:

- Definir y priorizar el Product Backlog
- Escribir user stories con criterios de aceptación claros
- Estar disponible para aclarar dudas durante el sprint
- Aceptar o rechazar entregables según Definition of Done

**En el contexto de Indaptados**:

- Representa la voz del usuario final (estudiantes, profesores)
- Balancea necesidades técnicas con valor de negocio
- Mantiene vision de producto a largo plazo

**Ejemplo de interacción**:

```
Developer: "Para el QR de asistencias, ¿validamos geolocalización?"
PO: "Depende. ¿Cuál es el objetivo? Si es prevenir fraude, sí.
    Si es solo comodidad, puede ser opcional en MVP."
```

### 🛠️ **Scrum Master (SM)**

**Responsabilidades**:

- Facilitar ceremonias sin dominarlas
- Remover impedimentos que bloquean al equipo
- Proteger al equipo de interrupciones externas
- Coaching en prácticas ágiles

**No es**:

- ❌ Project Manager tradicional
- ❌ Jefe del equipo
- ❌ Único responsable de fechas

**Ejemplo de facilitación**:

```
En Daily Standup:
SM: "Juan mencionó un bloqueador con la API externa.
    ¿Necesitas ayuda inmediata o podemos hablarlo después del daily?"
```

### 👨‍💻 **Development Team**

**Características**:

- **Autoorganizado**: Deciden cómo hacer el trabajo
- **Cross-funcional**: Todas las skills necesarias están presentes
- **Tamaño optimal**: 3-9 personas
- **Empowered**: Autoridad para tomar decisiones técnicas

**Mindset esperado**:

- "Esto es **nuestro** producto, no solo código que escribimos"
- "La calidad es **responsabilidad de todos**, no solo de QA"
- "El cliente final importa más que perfección técnica"

## 📋 Artefactos Clave

### 1. **Product Backlog**

Lista priorizada de features, bugs, mejoras técnicas y experimentos.

**Estructura de nuestros backlog items**:

```markdown
### [EPIC] Sistema de Asistencias QR

**Valor de Negocio**: Alto (reduce 10 min/clase \* 20 clases/día = 200 min/día)
**Complejidad Técnica**: Media
**Riesgo**: Bajo (tecnología conocida)

#### User Stories:

1. Como estudiante quiero escanear QR para registrar asistencia
2. Como profesor quiero generar QR único por sesión
3. Como admin quiero ver reportes de asistencia por estudiante

#### Definition of Ready:

- [ ] Criterios de aceptación definidos
- [ ] Mockups/wireframes disponibles
- [ ] Dependencies identificadas
- [ ] Estimación completada
- [ ] Questions respondidas por PO
```

### 2. **Sprint Backlog**

Subset del Product Backlog seleccionado para el sprint actual + plan de ejecución.

**Ejemplo visual**:

```
Sprint 12 - Del 4 al 8 de Noviembre
┌─────────────────────────────────────────────────────────┐
│ OBJETIVO: MVP de asistencias QR funcional para 1 clase  │
├─────────────────────────────────────────────────────────┤
│ TODO        │ IN PROGRESS │ REVIEW      │ DONE          │
├─────────────────────────────────────────────────────────┤
│ □ API QR    │ ⚡Auth setup │ □ Frontend  │ ✅ Mockups    │
│   generation│              │   QR scan   │ ✅ DB schema  │
│ □ Error     │              │             │ ✅ Tests      │
│   handling  │              │             │   setup       │
└─────────────────────────────────────────────────────────┘
```

### 3. **Incremento**

Entregable funcional al final de cada sprint que cumple la **Definition of Done**.

## 🎭 Ceremonias (Events)

### 🗓️ **Sprint Planning** (Lunes 9:00 AM - 2 horas max)

**Objetivo**: Definir qué entregar en el sprint y cómo hacerlo.

**Agenda estructurada**:

1. **Review del objetivo del sprint** (15 min)
2. **Selección de backlog items** (45 min)
3. **Task breakdown** (45 min)
4. **Capacity planning** (15 min)

**Output esperado**:

- Sprint Goal claro y medible
- Sprint Backlog definido
- Tasks asignadas (inicialmente)
- Commitment del equipo

**Ejemplo de Sprint Goal**:

```
"Al final de este sprint, un profesor puede generar un QR
único para su clase y los estudiantes pueden escanear ese QR
para registrar asistencia exitosamente en nuestra plataforma de desarrollo."
```

### 📅 **Daily Standup** (9:00 AM - 15 min max)

**Formato estricto** (2 min por persona):

1. ¿Qué completé ayer que ayudó al sprint goal?
2. ¿Qué completaré hoy para el sprint goal?
3. ¿Qué impedimentos/blockers tengo?

**Anti-patrones a evitar**:

- ❌ Status report al Scrum Master
- ❌ Discusiones técnicas detalladas
- ❌ Planificación de tareas futuras
- ❌ Excusas o justificaciones

**Ejemplo efectivo**:

```
"Ayer completé la validación de QR en backend.
Hoy integraré con el frontend de escaneo.
Necesito que me compartan el endpoint de autenticación."
```

### 🎬 **Sprint Review/Demo** (Viernes 4:00 PM - 1 hora max)

**Objetivo**: Mostrar incremento funcional y recoger feedback.

**Estructura**:

1. **Recap del Sprint Goal** (5 min)
2. **Demo del incremento** (30 min)
3. **Feedback de stakeholders** (20 min)
4. **Próximos pasos** (5 min)

**Guidelines para demos**:

- Mostrar funcionalidad funcionando **end-to-end**
- Enfocarse en **valor de usuario**, no complejidad técnica
- Incluir casos de error y edge cases
- Invitar a stakeholders reales (users, POs, management)

### 🔄 **Sprint Retrospective** (Viernes 5:00 PM - 45 min)

**Objetivo**: Mejorar procesos, herramientas y dinámicas del equipo.

**Formato "Start, Stop, Continue"**:

- ⭐ **Start**: ¿Qué deberíamos empezar a hacer?
- 🛑 **Stop**: ¿Qué deberíamos dejar de hacer?
- ➡️ **Continue**: ¿Qué funciona bien y queremos mantener?

**Ejemplo de outcome**:

```markdown
## Retrospective Sprint 12

### ⭐ Start

- Pair programming en features complejas
- Smoke tests automatizados pre-demo

### 🛑 Stop

- Commits sin mensajes descriptivos
- PRs con más de 200 líneas

### ➡️ Continue

- Daily standups puntuales
- Code reviews constructivos
```

## 📊 Priorización por Valor y Riesgo

### Framework de Priorización: **RICE**

**RICE Score = (Reach × Impact × Confidence) ÷ Effort**

- **Reach**: ¿Cuántos usuarios afecta?
- **Impact**: ¿Qué tan fuerte es el impacto? (1-5 scale)
- **Confidence**: ¿Qué tan seguros estamos? (% confidence)
- **Effort**: ¿Cuánto trabajo requiere? (person-weeks)

**Ejemplo aplicado**:

```
Feature: QR Attendance System

Reach: 500 estudiantes + 25 profesores = 525 users
Impact: 4/5 (ahorra tiempo significativo)
Confidence: 80% (tecnología probada, users validados)
Effort: 3 person-weeks

RICE Score = (525 × 4 × 0.8) ÷ 3 = 560

Feature: Push Notifications

Reach: 525 users
Impact: 2/5 (nice to have)
Confidence: 60% (no hemos validado engagement)
Effort: 2 person-weeks

RICE Score = (525 × 2 × 0.6) ÷ 2 = 315

→ QR Attendance tiene mayor prioridad
```

### Técnica MoSCoW para Backlog Refinement

- **Must have**: Crítico para el release
- **Should have**: Importante pero no crítico
- **Could have**: Deseable si hay tiempo
- **Won't have**: Fuera del scope actual

## ✅ Definition of Done (DoD)

### Nuestro DoD No Negociable

**Funcionalidad**:

- [ ] Funciona end-to-end según criterios de aceptación
- [ ] Probado en ambiente de desarrollo
- [ ] Edge cases principales considerados
- [ ] Performance aceptable (&lt;3s load time)

**Calidad de Código**:

- [ ] Tests unitarios para lógica de negocio (&gt;80% coverage)
- [ ] Tests de integración para APIs
- [ ] Linters pasan sin warnings críticos
- [ ] Code review aprobado por al menos 1 peer

**Seguridad**:

- [ ] Inputs validados en client y server
- [ ] No secrets hardcoded
- [ ] Error handling que no expone información sensible
- [ ] Checklist OWASP básico completado

**Operaciones**:

- [ ] Logs útiles sin información personal
- [ ] Monitoring/alerting configurado (si aplica)
- [ ] Rollback plan documentado
- [ ] Environment variables configuradas

**Documentación**:

- [ ] README actualizado con nuevas features
- [ ] API endpoints documentados (Swagger/Postman)
- [ ] User-facing changes comunicados a stakeholders

### Ejemplo de Checklist Aplicado

```markdown
## DoD Checklist - QR Generation API

### Funcionalidad

- [x] Endpoint POST /api/sessions/{id}/qr genera QR único
- [x] QR expira después de 15 minutos
- [x] Maneja clase no encontrada (404)
- [x] Response time &lt;500ms

### Calidad de Código

- [x] Unit tests: generación QR, validación parámetros
- [x] Integration test: full flow end-to-end
- [x] ESLint sin warnings
- [x] Code review aprobado por @juan-dev

### Seguridad

- [x] Validación sessionId es UUID válido
- [x] JWT_SECRET en variables de entorno
- [x] Errores no exponen stack traces
- [x] Rate limiting: max 10 requests/min por profesor

### Operaciones

- [x] Logs: "QR generated for session {id} by user {userId}"
- [x] Monitoring: Datadog alert si error rate &gt;5%
- [x] Rollback: revertir migration si es necesario
- [x] QR_EXPIRY_MINUTES configurado en .env

### Documentación

- [x] README: sección "QR Generation"
- [x] Postman collection actualizada
- [x] Slack notification a #profesores sobre nueva feature
```

## 📈 Métricas de Equipo

### Velocity Tracking

**Velocity** = Story points completados por sprint

```
Sprint 10: 23 points
Sprint 11: 18 points (holiday week)
Sprint 12: 25 points
Sprint 13: 24 points

Average velocity: ~22.5 points
→ Planning next sprint: 20-25 points realistic
```

### Burn-down Charts

Visualizar progreso del sprint día a día:

```
Story Points Remaining
   30 |●
   25 | ●
   20 |  ●●
   15 |    ●
   10 |     ●●
    5 |       ●
    0 |________●
      Mon Tue Wed Thu Fri

● Planned burndown
● Actual burndown
```

### Lead Time & Cycle Time

- **Lead Time**: Desde que se crea el ticket hasta que se deploya
- **Cycle Time**: Desde que se empieza a trabajar hasta que se completa

**Objetivo**: Reducir ambos sin sacrificar calidad

## 🔧 Herramientas y Setup

### Gestión de Proyecto

- **Jira/GitHub Projects**: Backlog y sprint tracking
- **Miro/Mural**: Story mapping y retrospectives
- **Slack**: Comunicación asíncrona
- **Zoom**: Ceremonias remotas

### Desarrollo

- **Git Flow**: Feature branches + PRs
- **CI/CD**: GitHub Actions para tests y deployment
- **Monitoring**: DataDog/New Relic para production
- **Documentation**: Notion/GitBook para conocimiento

### Templates Útiles

**Template de User Story**:

```markdown
## [ID] - Título descriptivo

**Como** [rol]
**Quiero** [objetivo]
**Para** [beneficio]

### Criterios de Aceptación

- [ ] Escenario 1: Dado... Cuando... Entonces...
- [ ] Escenario 2: Dado... Cuando... Entonces...

### Definition of Ready

- [ ] Mockups/wireframes
- [ ] Dependencies identificadas
- [ ] Estimación completada
- [ ] Questions respondidas

### Definition of Done

- [ ] Funciona según criterios
- [ ] Tests incluidos
- [ ] Code review aprobado
- [ ] Deployed a staging
```

## 🚨 Common Anti-Patterns y Cómo Evitarlos

### Anti-Pattern 1: "Scrum-but"

❌ **Problema**: "Hacemos Scrum but no hacemos retrospectives porque no tenemos tiempo"

✅ **Solución**: Las ceremonias no son opcionales. Si no hay tiempo, el sprint es demasiado ambicioso.

### Anti-Pattern 2: Sprint Goal Vago

❌ **Problema**: "Completar las user stories del backlog"

✅ **Solución**: "Permitir a profesores generar QR y estudiantes registrar asistencia exitosamente"

### Anti-Pattern 3: Stories Técnicas sin Valor de Usuario

❌ **Problema**: "Como developer quiero refactorizar el código..."

✅ **Solución**: "Como usuario quiero tiempos de carga &lt;2s para registrar asistencia rápidamente [TECH: requiere optimización de DB queries]"

### Anti-Pattern 4: Micro-management en Dailies

❌ **Problema**: SM asigna tareas y hace seguimiento detallado

✅ **Solución**: Equipo auto-organiza, SM solo facilita y remueve impedimentos

## 🎯 Próximo Paso: Reto de Sprint Planning

Ahora que entiendes nuestro framework Scrum, es tiempo de practicar con un **Sprint Planning** completo para el sistema de asistencias QR.

**Recuerda**: Scrum no es burocracia, es **disciplina enfocada en entregar valor**. Cada ceremonia, cada artefacto debe servirnos para construir mejores productos más rápido. 🚀
