---
id: reto-sprint-plan
title: Reto — Sprint Planning Completo
---

# 🎯 Reto 2: Sprint Planning - Sistema de Asistencias QR

**Duración estimada**: 45-60 minutos
**Objetivo**: Crear un sprint backlog realista para el desarrollo del MVP de asistencias QR

## 📋 Contexto del Sprint

**Sprint**: Sprint 13 - Semana del 4-8 Noviembre
**Team Capacity**: 3 developers × 6 horas/día × 5 días = 90 horas totales
**Sprint Goal**: "_Al final de este sprint, profesores pueden generar QRs únicos por sesión y estudiantes pueden registrar asistencia escaneando el código, con datos almacenados de forma persistente_"

**Velocity histórica del equipo**: 22-25 story points por sprint

## 🎯 Entregables Requeridos

### 1. **Product Backlog Priorizado** (15 min)

Crea 8-10 user stories priorizadas usando el framework **RICE**:

**Template de User Story**:

```markdown
### [US-XX] Título de la User Story

**Como** [rol]
**Quiero** [objetivo]
**Para que** [beneficio/valor]

**RICE Analysis**:

- Reach: X users
- Impact: X/5
- Confidence: X%
- Effort: X story points

**RICE Score**: X

**Criterios de Aceptación**:

- [ ] Escenario 1: Dado... Cuando... Entonces...
- [ ] Escenario 2: Dado... Cuando... Entonces...

**Notas Técnicas**:

- Dependencies: [otras stories/sistemas]
- Risk Level: High/Medium/Low
```

### 2. **Sprint Backlog Selection** (15 min)

De tu Product Backlog, selecciona las user stories para este sprint considerando:

- **Capacity**: No exceder 25 story points (basado en velocity)
- **Dependencies**: Stories que pueden desarrollarse en paralelo
- **Value**: Máximo valor de negocio para el Sprint Goal
- **Risk**: Balance entre features complejas y simples

**Formato esperado**:

```markdown
## Sprint 13 Backlog

**Sprint Goal**: [repetir el goal]
**Capacity**: 90 team hours = ~25 story points

### Selected Stories (Total: X points)

1. [US-01] Generación de QR por sesión - 5 points
2. [US-02] Escaneo básico de QR - 8 points
3. [US-03] Registro de asistencia en BD - 3 points
4. [US-04] Dashboard básico profesor - 5 points
5. [US-05] Validación de sesión activa - 3 points

**Total**: 24 story points (dentro de capacity)

### Stories Consideradas pero NO Seleccionadas

- [US-06] Push notifications - 8 points (fuera de capacity)
- [US-07] Reportes avanzados - 13 points (no crítico para MVP)
```

### 3. **Task Breakdown** (10 min)

Para cada user story seleccionada, desglosa en tareas técnicas con estimación en horas:

**Ejemplo**:

```markdown
### [US-01] Generación de QR por sesión (5 story points)

**Tasks**:

- [ ] Setup QR generation library (Node.js) - 2h
- [ ] Create POST /api/sessions/{id}/qr endpoint - 4h
- [ ] Generate unique QR with session data + timestamp - 3h
- [ ] Add QR expiration logic (15 min TTL) - 2h
- [ ] Unit tests for QR generation - 3h
- [ ] Integration tests - 2h
- [ ] Error handling (invalid session, expired QR) - 2h

**Total Estimated**: 18 hours
**Assignee**: [inicial - puede cambiar durante sprint]
```

### 4. **Definition of Done por Story** (5 min)

Para cada user story, especifica los criterios de DoD personalizados:

```markdown
### DoD para [US-01] Generación de QR

**Funcionalidad**:

- [ ] QR generado contiene sessionId + timestamp + hash
- [ ] QR expira automáticamente después de 15 minutos
- [ ] Endpoint responde en &lt;500ms
- [ ] Maneja correctamente sesión inexistente (404)

**Calidad**:

- [ ] Unit tests: generación, validación, expiración
- [ ] Integration test: flujo completo POST → QR válido
- [ ] Code coverage &gt;80% en nueva funcionalidad
- [ ] ESLint + TypeScript sin warnings

**Seguridad**:

- [ ] No expone información sensible en QR
- [ ] Rate limiting: max 10 requests/min por profesor
- [ ] Validación estricta de sessionId format (UUID)

**Operaciones**:

- [ ] Logging apropiado: "QR generated for session {id}"
- [ ] Environment variables para QR_SECRET y EXPIRY_TIME
- [ ] Monitoring: alert si error rate &gt;5%

**Documentación**:

- [ ] Swagger/OpenAPI doc actualizada
- [ ] README: sección QR Generation
- [ ] Postman collection con examples
```

### 5. **Calendario de Ceremonias** (5 min)

Define el calendario específico del sprint con participantes:

```markdown
## Sprint 13 - Calendar

### Sprint Planning ✅

- **Cuándo**: Lunes 4 Nov, 9:00-11:00 AM
- **Participantes**: Todo el equipo + PO
- **Outcome**: Sprint backlog definido y comprometido

### Daily Standups 📅

- **Cuándo**: Martes-Viernes, 9:00-9:15 AM
- **Participantes**: Development team + Scrum Master
- **Format**: What did you do? What will you do? Any blockers?

### Sprint Review 🎬

- **Cuándo**: Viernes 8 Nov, 4:00-5:00 PM
- **Participantes**: Equipo + Stakeholders (profesores, admin)
- **Agenda**: Demo del incremento + feedback collection

### Sprint Retrospective 🔄

- **Cuándo**: Viernes 8 Nov, 5:00-5:45 PM
- **Participantes**: Solo development team + Scrum Master
- **Format**: Start/Stop/Continue + action items

### Additional Sessions

- **Backlog Refinement**: Miércoles 6 Nov, 2:00-3:00 PM
- **Tech Spike Review**: Jueves 7 Nov, 3:00 PM (si es necesario)
```

### 6. **Risk Assessment y Mitigation** (5 min)

Identifica riesgos del sprint y planes de mitigación:

```markdown
## Sprint Risks & Mitigation

### High Risk 🔴

**Risk**: QR library compatibility con versión Node.js actual

- **Probability**: 30%
- **Impact**: 8h delay
- **Mitigation**: Tech spike Lunes por la mañana, backup library identificada

**Risk**: Integración con sistema de autenticación existente

- **Probability**: 20%
- **Impact**: 12h delay
- **Mitigation**: Pair programming con dev que conoce auth system

### Medium Risk 🟡

**Risk**: Performance issues con generación masiva de QRs

- **Probability**: 40%
- **Impact**: 4h optimization work
- **Mitigation**: Load testing mid-sprint, caching strategy ready

### Low Risk 🟢

**Risk**: UI/UX feedback requiere cambios menores

- **Probability**: 60%
- **Impact**: 2-4h adjustments
- **Mitigation**: Buffer time incluido en estimates
```

## 📝 Template de Entrega

Crea un documento markdown con esta estructura:

```markdown
# Sprint 13 Planning - Sistema Asistencias QR

## Sprint Overview

- **Sprint Goal**: [goal específico y medible]
- **Duration**: [fechas]
- **Capacity**: [hours y story points]
- **Team**: [miembros y roles]

## 1. Product Backlog (Priorizado por RICE)

### [US-01] - Story más prioritaria

[contenido completo]

### [US-02] - Segunda prioridad

[contenido completo]

[... resto de stories ...]

## 2. Sprint Backlog Selected

[listado de stories seleccionadas con justificación]

## 3. Task Breakdown

[breakdown detallado por story]

## 4. Definition of Done

[DoD específico por story]

## 5. Sprint Calendar

[calendario completo de ceremonias]

## 6. Risk Assessment

[riesgos identificados y mitigaciones]

## 7. Success Criteria

[cómo sabremos que el sprint fue exitoso]
```

## 🎯 Criterios de Evaluación

### Sprint Planning Quality (40%)

- [ ] Sprint Goal específico y alcanzable
- [ ] Stories siguen formato INVEST
- [ ] Estimaciones basadas en evidencia (velocity histórica)
- [ ] Dependencies identificadas y manejadas

### Technical Planning (30%)

- [ ] Task breakdown realista y detallado
- [ ] DoD específico y verificable por story
- [ ] Consideraciones técnicas y arquitecturales
- [ ] Performance y security requirements incluidos

### Risk Management (20%)

- [ ] Risks identificados con probability/impact
- [ ] Mitigation plans específicos y accionables
- [ ] Contingency plans para scenarios críticos

### Process Understanding (10%)

- [ ] Calendar apropiado para ceremonias
- [ ] Roles y responsabilidades claros
- [ ] Communication plan definido

## 💡 Tips para el Éxito

### 1. **Priorización Efectiva**

```
✅ Pregúntate: "Si solo pudiéramos entregar 1 cosa, ¿cuál sería?"
✅ User value &gt; technical perfection
✅ Dependencies primeiro, features después
```

### 2. **Estimación Realista**

```
✅ Base estimates en work similar anterior
✅ Include time para: testing, code review, bug fixes
✅ Add 20% buffer para lo inesperado
```

### 3. **Task Breakdown Inteligente**

```
✅ Tasks de máximo 8 horas
✅ Al menos 1 task que se puede completar el primer día
✅ Clear ownership pero allow flexibility
```

### 4. **DoD Pragmático**

```
✅ Specific y measurable criteria
✅ Automated cuando sea possible
✅ Balancear quality con delivery speed
```

## 🚀 Entrega

1. **Crea rama**: `feature/sprint-13-planning`
2. **Archivo**: `docs/02-scrum/mi-sprint-planning.md`
3. **Pull Request** con:
   - Sprint planning completo
   - 2-3 preguntas para code review sobre priorización
   - Screenshot de cualquier herramienta usada (Jira, Trello, etc.)

## 📚 Recursos de Apoyo

- **Story Point Estimation**: [Planning Poker Guide](https://www.mountaingoatsoftware.com/agile/planning-poker)
- **RICE Framework**: [Intercom's RICE Guide](https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/)
- **Sprint Planning**: [Atlassian Guide](https://www.atlassian.com/agile/scrum/sprint-planning)
- **DoD Examples**: [Scrum.org DoD Guide](https://www.scrum.org/resources/blog/walking-through-definition-done)

**Recuerda**: Un buen sprint planning no garantiza el éxito, pero un mal planning casi garantiza problemas. ¡Planifica bien para ejecutar mejor! 🎯
