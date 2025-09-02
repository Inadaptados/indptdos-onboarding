---
id: plantillas-frameworks
title: "Plantillas y Frameworks Reutilizables"
slug: /99-recursos/plantillas
sidebar_position: 2
description: "Plantillas profesionales y frameworks probados para acelerar desarrollo, mantener consistencia y asegurar calidad en todos los proyectos del equipo."
keywords:
  [
    "plantillas-desarrollo",
    "frameworks-agiles",
    "templates-código",
    "checklists-qa",
    "documentación-técnica",
  ]
---

# 🎯 Plantillas y Frameworks Reutilizables

> **Propósito**: Acelerar desarrollo, mantener consistencia, asegurar calidad
> **Mantenimiento**: Actualizadas mensualmente basadas en feedback del equipo
> **Uso**: Copia, adapta, mejora y comparte de vuelta

---

## 📖 Índice de Plantillas

### **🏗️ Gestión de Proyectos**

- [User Stories & Epics](#user-stories--epics)
- [Definition of Ready/Done](#definition-of-readydone)
- [Sprint Planning](#sprint-planning--retrospectives)
- [Retrospectivas](#retrospectives-templates)

### **💻 Desarrollo & Código**

- [Pull Request Templates](#pull-request-templates)
- [Code Review Guidelines](#code-review-guidelines)
- [Git Workflow](#git-workflow-templates)
- [Component Documentation](#component-documentation)

### **🔒 Seguridad & Calidad**

- [Security Checklists](#security-checklists)
- [Testing Templates](#testing-templates)
- [Performance Audit](#performance-audit)
- [Accessibility Review](#accessibility-review)

### **📊 Monitoreo & Analytics**

- [Feature Metrics](#feature-metrics-tracking)
- [Error Tracking](#error-tracking-templates)
- [Performance Monitoring](#performance-monitoring)

---

## 🏗️ User Stories & Epics

### **User Story Template Estándar**

```markdown
## [US-XXX] Como [tipo de usuario], quiero [objetivo] para [razón/beneficio]

### 📊 Business Context

- **Stakeholder**: [Product Owner / Business Analyst]
- **Priority**: High / Medium / Low (con justificación)
- **Business Value**: [Metric específico que mejora]
- **User Persona**: [Primary persona affected]

### 🎯 Acceptance Criteria

- [ ] **Given** [contexto inicial] **when** [acción] **then** [resultado esperado]
- [ ] **Given** [contexto específico] **when** [condición] **then** [comportamiento esperado]
- [ ] **Given** [caso edge] **when** [situación específica] **then** [manejo apropiado]

### 🔧 Technical Requirements

- **API Endpoints**: [GET/POST/PUT/DELETE endpoints needed]
- **Database Changes**: [New tables/fields/indexes required]
- **Third-party Integrations**: [External services needed]
- **Performance SLA**: [Response time / throughput requirements]

### 🎨 UI/UX Requirements

- **Mockups**: [Link to Figma/design files]
- **Responsive Behavior**: [Mobile/tablet/desktop specifications]
- **Accessibility**: [WCAG compliance level required]
- **Browser Support**: [IE11+, Chrome, Firefox, Safari]

### ✅ Definition of Done

- [ ] Code implemented and peer reviewed
- [ ] Unit tests written and passing (>80% coverage)
- [ ] Integration tests passing
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Deployed to staging and tested
- [ ] Acceptance criteria validated by PO
- [ ] Accessibility tested with screen reader
- [ ] Performance requirements met

### 🧪 Testing Notes

- **Test Data**: [Specific data requirements]
- **Test Environment**: [Special environment needs]
- **Edge Cases**: [Specific scenarios to test]
- **Browser Testing**: [Which browsers/devices to verify]

### 📋 Dependencies & Blockers

- **Depends On**: [Other stories that must be completed first]
- **Blocks**: [Stories that are waiting on this one]
- **External Dependencies**: [Third-party services, legal approval, etc.]

### � Related Links

- **Epic**: [Link to parent epic]
- **Issue Tracker**: [Jira/GitHub issue]
- **Design**: [Figma/Sketch files]
- **Documentation**: [Confluence/Wiki pages]
```

### **Epic Template Avanzado**

```markdown
# [EPIC-XX] [Epic Name]: [Brief Description]

## 🎯 Vision Statement

Como [stakeholder], quiero [outcome de alto nivel] para [business value measurable].

## 📊 Success Metrics & KPIs

| Métrica         | Baseline    | Target        | Timeframe | Owner       |
| --------------- | ----------- | ------------- | --------- | ----------- |
| User Engagement | 45% monthly | 65% monthly   | 3 months  | Product     |
| Task Completion | 60%         | 85%           | 2 months  | UX          |
| Response Time   | 800ms avg   | &lt;300ms avg | 1 month   | Engineering |

## 📋 User Stories Breakdown

### Phase 1: Foundation (Sprint 1-2)

- [ ] [US-001] Core functionality - **Size: 8pts** - _Must Have_
- [ ] [US-002] Basic validation - **Size: 5pts** - _Must Have_

### Phase 2: Enhancement (Sprint 3-4)

- [ ] [US-004] Advanced features - **Size: 13pts** - _Should Have_

## 🚫 Out of Scope

- Feature X (deferred to Epic-YY)
- Integration Z (requires legal approval)

## ⚠️ Risks & Mitigation

| Risk            | Impact | Probability | Mitigation                | Owner     |
| --------------- | ------ | ----------- | ------------------------- | --------- |
| API performance | High   | Medium      | Load testing + caching    | Tech Lead |
| User adoption   | High   | Low         | Phased rollout + training | Product   |
```

---

## ✅ Definition of Ready/Done

### **Definition of Ready Checklist**

```markdown
## 📋 Definition of Ready - Una story está "Ready" cuando:

### 🎯 Business Requirements

- [ ] **Value Proposition**: Business case claro
- [ ] **Acceptance Criteria**: Específicos y testeables
- [ ] **Priority**: Asignada por Product Owner
- [ ] **Size Estimate**: Story points por consenso
- [ ] **Dependencies**: Identificadas y resueltas

### 🔧 Technical Requirements

- [ ] **Architecture**: Approach técnico definido
- [ ] **API Design**: Endpoints documentados
- [ ] **Database**: Schema changes identificados
- [ ] **Performance**: SLA definidos

### 🎨 Design & UX

- [ ] **Wireframes**: Disponibles para UI features
- [ ] **User Flow**: Documentado
- [ ] **Accessibility**: Requirements específicos
- [ ] **Responsive**: Mobile/tablet/desktop definido

### 👥 Team Understanding

- [ ] **Clarity**: Preguntas importantes resueltas
- [ ] **Capacity**: Team tiene skills necesarios
- [ ] **PO Available**: Para aclaraciones durante sprint
```

### **Definition of Done Checklist**

```markdown
## ✅ Definition of Done - Una story está "Done" cuando:

### 💻 Development

- [ ] **Code Complete**: Funcionalidad según AC
- [ ] **Code Review**: Peer review por 2+ developers
- [ ] **Standards**: Lint passa, consistent style
- [ ] **Clean Code**: No debug code, maintainable

### 🧪 Testing

- [ ] **Unit Tests**: >80% code coverage
- [ ] **Integration Tests**: Critical paths tested
- [ ] **Manual Testing**: Happy path + edge cases
- [ ] **Performance**: Cumple SLAs definidos

### 🔒 Security & Quality

- [ ] **Security Review**: OWASP checklist
- [ ] **Input Validation**: Server-side validation
- [ ] **Error Handling**: Graceful error handling
- [ ] **Authentication**: Proper auth donde necesario

### 🚀 Deployment & Documentation

- [ ] **Deployed Staging**: Funcionando en staging
- [ ] **Documentation**: Docs actualizados
- [ ] **Monitoring**: Error/performance tracking
- [ ] **PO Sign-off**: Acceptance criteria validados
```

---

## 🚀 Sprint Planning & Retrospectives

### **Sprint Planning Template**

```markdown
# Sprint X Planning - [Date Range]

## 🎯 Sprint Goal

[Objetivo principal en una frase]

## 👥 Team Capacity

- **Development Days**: [Total días disponibles]
- **Planned Velocity**: [Story points basado en capacity]
- **Time Off**: [Miembros no disponibles]

## 📊 Previous Sprint Review

- **Committed/Completed**: X/Y story points
- **Velocity Trend**: ↑/↓/→
- **Key Learnings**: [Insights principales]

## 🎯 Stories Selected

### High Priority (Must Complete)

| Story                 | Points | Owner | Dependencies |
| --------------------- | ------ | ----- | ------------ |
| [US-001] Core feature | 8      | Dev A | None         |
| [US-002] Bug fix      | 3      | Dev B | None         |

### Medium Priority (Stretch Goals)

| Story                | Points | Owner | Dependencies |
| -------------------- | ------ | ----- | ------------ |
| [US-003] Enhancement | 5      | Dev C | US-001       |

## ⚠️ Risks & Mitigation

| Risk         | Impact | Mitigation    | Owner     |
| ------------ | ------ | ------------- | --------- |
| External API | High   | Fallback plan | Tech Lead |

## 📋 Sprint Commitments

- [ ] Daily standups 9 AM
- [ ] Sprint review [Date/Time]
- [ ] Sprint retrospective [Date/Time]
- [ ] DoD applied consistently
```

---

## 🔄 Retrospectives Templates

### **Start/Stop/Continue Template**

```markdown
# Sprint X Retrospective

## ⭐ START (What should we start doing?)

| Item             | Votes | Owner | Action              | Success Metric               |
| ---------------- | ----- | ----- | ------------------- | ---------------------------- |
| Pair programming | 4     | Team  | 2h sessions 2x/week | >90% complex stories on time |

## 🛑 STOP (What should we stop doing?)

| Item                | Votes | Owner | Action                | Success Metric     |
| ------------------- | ----- | ----- | --------------------- | ------------------ |
| Last-minute commits | 5     | Team  | 4h freeze before demo | Zero demo failures |

## ➡️ CONTINUE (What's working well?)

| Item                  | Votes | Why It Works      |
| --------------------- | ----- | ----------------- |
| Clear PR descriptions | 5     | Saves review time |

## 🎯 Action Items for Next Sprint

1. **[Owner]** [Action] - Due: [Date] - Success: [Metric]
2. **[Owner]** [Action] - Due: [Date] - Success: [Metric]

## 📈 Metrics Review

- **Velocity**: X points (target: Y)
- **Team Satisfaction**: X/10
```

---

## 💻 Pull Request Templates

### **Standard PR Template**

```markdown
## 📝 What does this PR do?

[Description and why it's needed]

Fixes #[issue-number]

## 🔧 Type of Change

- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 💥 Breaking change
- [ ] 📚 Documentation
- [ ] 🔨 Refactoring
- [ ] ⚡ Performance improvement

## 🧪 How Has This Been Tested?

- [ ] Unit tests pass (`npm run test`)
- [ ] Manual testing completed
- [ ] Performance tested (if applicable)

## 📋 Checklist

### 🔍 Code Quality

- [ ] Self-review completed
- [ ] Code follows style guidelines
- [ ] No linting errors
- [ ] No console.log/debugger statements

### 🧪 Testing

- [ ] Tests added for new functionality
- [ ] All tests pass locally
- [ ] Test coverage >80%

### 🔒 Security

- [ ] No sensitive data exposed
- [ ] Input validation implemented
- [ ] Authorization checks in place

### ♿ Accessibility

- [ ] Semantic HTML used
- [ ] Keyboard navigation works
- [ ] Screen reader tested

### 📚 Documentation

- [ ] Documentation updated
- [ ] API docs updated (if applicable)
- [ ] Changelog updated

## 🤔 Questions for Reviewers

1. [Specific implementation question]
2. [Architecture decision question]

## 📝 Notes

[Context reviewers should know]
```

---

## 🔒 Security Checklists

### **OWASP Top 10 Checklist**

````markdown
# 🔒 Security Review - [Feature Name]

## 1️⃣ Injection Prevention

- [ ] **SQL Injection**: Parameterized queries used
- [ ] **NoSQL Injection**: Input sanitization implemented
- [ ] **Command Injection**: System commands avoided

```javascript
// Example context
const userId = "12345";

// ❌ Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Secure
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);
```
````

## 2️⃣ Authentication & Authorization

- [ ] **Password Hashing**: bcrypt/Argon2 used (never MD5)
- [ ] **Session Management**: Secure cookies, proper timeout
- [ ] **Access Control**: Authorization on every endpoint
- [ ] **JWT Security**: Proper secret management

## 3️⃣ Data Protection

- [ ] **Encryption at Rest**: Sensitive data encrypted
- [ ] **HTTPS**: All communications over TLS
- [ ] **Data Minimization**: Only necessary PII collected
- [ ] **Secure Headers**: HSTS, CSP configured

## 4️⃣ Input/Output Security

- [ ] **Input Validation**: All inputs validated server-side
- [ ] **XSS Prevention**: Output encoding implemented
- [ ] **CSRF Protection**: CSRF tokens used
- [ ] **File Upload**: Restrictions implemented

### Security Sign-off

- **Reviewer**: [Name] - [Date]
- **Risk Rating**: Low / Medium / High
- **Approved**: ✅ Yes / ❌ No (with conditions)

````

---

## 🧪 Testing Templates

### **Test Case Template**

```markdown
# Test Case: [TC-XXX] - [Test Name]

**Priority**: High/Medium/Low
**Type**: Functional/UI/API/Performance/Security

## 🎯 Test Objective

[What this test verifies]

## 🔧 Pre-conditions

- [ ] User account with appropriate permissions
- [ ] Test data prepared
- [ ] Environment in stable state

## 📝 Test Steps

| Step | Action               | Expected Result     | Status |
| ---- | -------------------- | ------------------- | ------ |
| 1    | Navigate to login    | Login page displays |        |
| 2    | Enter credentials    | User logged in      |        |
| 3    | Click feature button | Feature activates   |        |

## ✅ Expected Results

[Primary and secondary expected outcomes]

## 🐛 Defects Found

- [Bug ID]: [Description] - Severity: [Level]

## 📋 Test Variations

**Edge Cases**:

- [ ] Invalid input handling
- [ ] Network connectivity issues
- [ ] Browser compatibility

**Success Criteria**:

- All steps execute successfully
- No critical defects found
- Performance within limits
````

---

## 📊 Feature Metrics Tracking

### **Feature Success Metrics**

````markdown
# Metrics Dashboard: [Feature Name]

## 🎯 Primary KPIs

| Metric            | Baseline | Target        | Current | Status    |
| ----------------- | -------- | ------------- | ------- | --------- |
| Adoption Rate     | 0%       | 75% (30 days) | 45%     | On Track  |
| Completion Rate   | 60%      | 85%           | 78%     | On Track  |
| Response Time     | 800ms    | &lt;300ms     | 350ms   | Improving |
| User Satisfaction | 3.2/5    | 4.5/5         | 4.1/5   | On Track  |

## 📈 Analytics Implementation

```javascript
// Event tracking
const userId = "12345"; // Example user ID

analytics.track("feature_used", {
  user_id: userId,
  feature: "qr_scan",
  success: true,
  response_time: 250,
  timestamp: new Date(),
});

analytics.track("feature_error", {
  user_id: userId,
  error_type: "network_timeout",
  retry_count: 2,
});
```
````

## 🔍 User Behavior Analysis

**Conversion Funnel**:

1. Feature Discovery: 95%
2. First Use Attempt: 78% (-17%)
3. Successful Completion: 83% (+5%)
4. Repeat Usage: 67% (-16%)

**Key Insights**:

- Discovery rate high due to prominent placement
- Drop-off at first use suggests UX friction
- Good completion rate once users start
- Repeat usage indicates value delivery

## 🐛 Error Tracking

```javascript
const errorCategories = {
  NETWORK_TIMEOUT: { count: 45, impact: "High" },
  VALIDATION_ERROR: { count: 32, impact: "Medium" },
  USER_ERROR: { count: 28, impact: "Low" },
};
```

## 🎯 Success Celebration

- ✅ 50% adoption (Week 3)
- ⏳ 75% adoption target (Week 4)
- ⏳ 4.5/5 satisfaction (Week 6)

```

---

## 🎯 Cómo Usar Estas Plantillas

### **Getting Started**

1. **Elige la Plantilla Correcta**: Basado en tu fase actual del proyecto
2. **Copia y Personaliza**: Adapta al contexto específico
3. **Comparte con el Equipo**: Asegúrate de que todos usen formatos consistentes
4. **Itera y Mejora**: Actualiza plantillas basado en feedback del equipo

### **Best Practices**

- **Plantillas Vivas**: Actualiza mensualmente basado en aprendizajes
- **Foco en Valor**: Plantillas deben acelerar trabajo, no crear burocracia
- **Entrenamiento**: Asegúrate de que todos sepan usar plantillas efectivamente
- **Mide Impacto**: Rastrea si plantillas mejoran calidad y velocidad

### **Integración con Herramientas**

- **GitHub**: Usa como issue templates y PR templates
- **Jira**: Integra checklists en story templates
- **Confluence**: Crea biblioteca de plantillas para documentación
- **Slack**: Pin plantillas comúnmente usadas en canales de proyecto

---

## 📚 Recursos Adicionales

### **Bibliotecas de Plantillas**

- **GitHub Template Repository**: [Link a repositorio de plantillas del equipo]
- **Figma Design Templates**: [Link a plantillas del design system]
- **Postman API Collections**: [Link a plantillas de testing de APIs]
- **Notion Template Gallery**: [Link a plantillas de gestión de proyectos]

### **Lectura Recomendada**

- 📖 "User Story Mapping" - Jeff Patton
- 📖 "The DevOps Handbook" - Gene Kim
- 📖 "Continuous Delivery" - Jez Humble
- 📖 "Site Reliability Engineering" - Google

¡Estas plantillas están diseñadas para evolucionar con tu equipo! 🚀

**Remember**: Las mejores plantillas son las que tu equipo realmente usa y mejora continuamente. ¡Empiecen con las básicas y agreguen complejidad según la necesidad!

---

_Última actualización: Septiembre 2025 | Próxima revisión: Octubre 2025_

### 🔗 Related Links

- **Epic**: [Link to parent epic]
- **Issue Tracker**: [Jira/GitHub issue]
- **Design**: [Figma/Sketch files]
- **Documentation**: [Confluence/Wiki pages]

```

## 🎯 User Stories y Requirements

### User Story Template

```markdown
Como <rol específico>
quiero <objetivo concreto>
para <beneficio claro>

**Contexto**: [Situación en la que surge la necesidad]
**Trigger**: [Qué desencadena esta acción]
**Frecuencia**: [Qué tan seguido ocurre]

**Criterios de Aceptación**:

- [ ] Escenario positivo: Dado... Cuando... Entonces...
- [ ] Escenario de error: Dado... Cuando... Entonces...
- [ ] Escenario edge case: Dado... Cuando... Entonces...
```

**Ejemplo aplicado**:

```markdown
Como estudiante que combina trabajo y estudio
quiero marcar asistencia escaneando un QR en 10 segundos
para poder entrar a clase rápido y no perder contenido

**Contexto**: Llegando corriendo del trabajo, con poco tiempo
**Trigger**: Al llegar al aula y ver el QR en pantalla
**Frecuencia**: 3-4 veces por semana

**Criterios de Aceptación**:

- [ ] Happy path: Dado QR válido, cuando escaneo, entonces registro exitoso &lt;10s
- [ ] QR expirado: Dado QR &gt;15min, cuando escaneo, entonces error claro + opción manual
- [ ] Sin conexión: Dado no internet, cuando escaneo, entonces guarda local + sync después
```

### Epic Template

```markdown
# [EPIC-XX] Nombre del Epic

## Vision Statement

Como [stakeholder] quiero [outcome de alto nivel] para [business value].

## Success Metrics

- Metric 1: baseline → target (timeframe)
- Metric 2: baseline → target (timeframe)

## User Personas Impactadas

- **Primary**: [persona principal]
- **Secondary**: [personas secundarias]

## User Journey Mapping

[Before] → [Trigger] → [During] → [After] → [Long-term]

## Stories Incluidas

- [ ] Story 1 - Priority: High
- [ ] Story 2 - Priority: Medium
- [ ] Story 3 - Priority: Low

## Out of Scope

- Feature X (defer to Epic-YY)
- Integration Y (not MVP)

## Dependencies

- External: [APIs, services, teams]
- Internal: [other epics, tech debt]

## Assumptions & Risks

**Assumptions**:

- Users have smartphones with camera
- Network connectivity available in classrooms

**Risks**:

- Adoption: professors may resist change
- Technical: QR scanning accuracy in low light
```

## 🧪 Testing y QA

### Criteria de Aceptación (Gherkin)

```gherkin
Feature: [Nombre de la funcionalidad]

Background:
  Given [contexto común para todos los scenarios]
  And [condición inicial común]

Scenario: [Caso de uso positivo]
  Given [estado inicial específico]
  When [acción del usuario]
  Then [resultado esperado]
  And [efecto secundario esperado]

Scenario: [Caso de error]
  Given [estado que causa error]
  When [acción que falla]
  Then [manejo de error apropiado]
  And [sistema queda en estado consistente]

Scenario Outline: [Casos con múltiples datos]
  Given [contexto con <variable>]
  When [acción con <input>]
  Then [resultado con <output>]

Examples:
  | variable | input | output |
  | valor1   | data1 | result1|
  | valor2   | data2 | result2|
```

**Ejemplo aplicado**:

```gherkin
Feature: Registro de asistencia con QR

Background:
  Given un estudiante autenticado en la app
  And hay una sesión de clase activa "Programación Web - Grupo A"

Scenario: Escaneo exitoso dentro del horario
  Given el estudiante está dentro del rango geográfico del aula
  And el QR fue generado hace menos de 15 minutos
  When escanea el código QR de la sesión
  Then el sistema registra la asistencia con timestamp actual
  And muestra mensaje "Asistencia registrada ✓ 14:05"
  And actualiza el contador personal del estudiante

Scenario: Escaneo con QR expirado
  Given el QR fue generado hace más de 15 minutos
  When intenta escanear el código QR
  Then el sistema muestra "Código expirado. Solicita nuevo QR al profesor"
  And no registra ninguna asistencia
  And ofrece botón "Reportar problema"

Scenario Outline: Validación de ubicación
  Given el estudiante está a <distancia> metros del aula
  When intenta escanear el QR válido
  Then el sistema <accion>

Examples:
  | distancia | accion                                    |
  | 10        | permite registro normal                   |
  | 50        | permite con warning "Estás lejos del aula"|
  | 200       | rechaza "Debes estar cerca del aula"      |
```

### Test Case Template

```markdown
## TC-XXX: [Título descriptivo del test case]

**Módulo**: [Feature/Epic]
**Priority**: High/Medium/Low
**Type**: Functional/UI/API/Performance/Security

**Pre-conditions**:

- [ ] Condición 1
- [ ] Condición 2

**Test Data**:

- User: valid_student@indaptados.com
- Session: "Web Programming - Group A"
- QR: generated &lt;15 minutes ago

**Test Steps**:

1. Step 1 with expected result
2. Step 2 with expected result
3. Step 3 with expected result

**Expected Result**:
[Overall expected outcome]

**Actual Result**:
[To be filled during execution]

**Status**: Pass/Fail/Blocked
**Notes**: [Any observations or issues]

**Post-conditions**:

- [ ] System state after test
- [ ] Data cleanup required
```

## 🔒 Seguridad y OWASP

### Threat Model (STRIDE)

| Amenaza                | Descripción           | Probabilidad | Impacto | Mitigación                        |
| ---------------------- | --------------------- | ------------ | ------- | --------------------------------- |
| Spoofing               | QR falsificado        | Medium       | High    | Firmar payload + expirar tokens   |
| Tampering              | Modificar request     | High         | High    | HTTPS + validaciones server-side  |
| Repudiation            | Negar acción          | Low          | Medium  | Logs con trazabilidad             |
| Information Disclosure | Filtrado de datos     | Medium       | High    | Minimizar datos en QR + RBAC      |
| DoS                    | Bombardeo de requests | High         | Medium  | Rate limiting + captcha selectivo |
| Elevation of Privilege | Escalar permisos      | Low          | High    | Reglas de autorización por rol    |

### Security Checklist (OWASP Top 10)

#### 1. Injection

- [ ] **Input Validation**: Todos los inputs validados (whitelist approach)
- [ ] **Parameterized Queries**: No string concatenation en SQL
- [ ] **ORM Usage**: Usar ORM en lugar de SQL directo cuando sea posible
- [ ] **Command Injection**: Validar inputs para system commands

```javascript
// Example context
const userId = "12345";

// ❌ Vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// ✅ Secure
const query = "SELECT * FROM users WHERE id = ?";
db.query(query, [userId]);
```

#### 2. Broken Authentication

- [ ] **Password Policy**: Min 8 chars, complejidad, no passwords comunes
- [ ] **Multi-Factor Auth**: Implementado para admin users
- [ ] **Session Management**: Secure cookies, proper timeout
- [ ] **Brute Force Protection**: Rate limiting en login

#### 3. Sensitive Data Exposure

- [ ] **Encryption at Rest**: Datos sensibles encriptados en DB
- [ ] **Encryption in Transit**: HTTPS obligatorio, no HTTP
- [ ] **PII Minimization**: No almacenar datos innecesarios
- [ ] **Secure Headers**: HSTS, CSP, X-Frame-Options

#### 4. Security Misconfiguration

- [ ] **Default Passwords**: Cambiados todos los defaults
- [ ] **Error Messages**: No exponen información de sistema
- [ ] **Security Headers**: Configurados apropiadamente
- [ ] **Unused Features**: Deshabilitadas o removidas

### Security Code Review Checklist

```markdown
## Security Review - [Feature Name]

### Authentication & Authorization

- [ ] User identity verified before sensitive operations
- [ ] Authorization checks on every protected endpoint
- [ ] Session management secure (timeout, invalidation)
- [ ] No privilege escalation possible

### Input Validation & Sanitization

- [ ] All inputs validated on server-side
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (output encoding, CSP)
- [ ] File upload restrictions (if applicable)

### Data Protection

- [ ] Sensitive data encrypted at rest
- [ ] HTTPS enforced for all communications
- [ ] No secrets in logs or error messages
- [ ] Personal data handling complies with privacy laws

### Infrastructure Security

- [ ] Environment variables for all secrets
- [ ] Rate limiting implemented
- [ ] Proper error handling (no stack traces to users)
- [ ] Security headers configured

### Logging & Monitoring

- [ ] Security events logged (login attempts, access violations)
- [ ] No sensitive data in logs
- [ ] Log tampering prevention
- [ ] Alerting for suspicious activities
```

## 🚀 Pull Request Templates

### PR Checklist Template

```markdown
## ¿Qué incluye este PR?

[Descripción breve del cambio y por qué es necesario]

## Tipo de cambio

- [ ] Bug fix (non-breaking change que arregla un issue)
- [ ] New feature (non-breaking change que agrega funcionalidad)
- [ ] Breaking change (fix o feature que causaría que funcionalidad existente no funcione como se espera)
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Performance improvement

## ¿Cómo se probó?

- [ ] Tests unitarios incluidos y pasan
- [ ] Tests de integración incluidos y pasan
- [ ] Probado manualmente en desarrollo
- [ ] Probado en diferentes browsers/devices (si aplica)

## Screenshots/Videos

[Si hay cambios de UI, incluir capturas o videos]

## Checklist Final

### Funcionalidad

- [ ] Cumple todos los criterios de aceptación
- [ ] Maneja casos de error apropiadamente
- [ ] Performance es aceptable (&lt;3s load time)
- [ ] Funciona sin JavaScript habilitado (si es crítico)

### Calidad de Código

- [ ] Lint pasa sin warnings críticos (`npm run lint`)
- [ ] Tests pasan (`npm run test`)
- [ ] Code coverage >80% para nueva funcionalidad
- [ ] No hay `console.log` o `debugger` statements
- [ ] Code review self-completado

### Seguridad (OWASP)

- [ ] Input validation en cliente Y servidor
- [ ] No secrets hardcoded en el código
- [ ] Error handling no expone información sensible
- [ ] Rate limiting aplicado donde corresponde
- [ ] HTTPS endpoints únicamente

### Accesibilidad

- [ ] Labels apropiados en form elements
- [ ] Contraste de colores adecuado (>4.5:1)
- [ ] Navegación por teclado funciona
- [ ] Screen reader friendly

### Documentación

- [ ] README actualizado si es necesario
- [ ] API documentation actualizada (Swagger/Postman)
- [ ] Changelog actualizado
- [ ] Breaking changes documentados

## Notas adicionales

[Cualquier información adicional que reviewers deberían saber]

## Questions for Reviewers

1. [Pregunta específica sobre implementación]
2. [Pregunta sobre approach técnico]
3. [Pregunta sobre trade-offs realizados]
```

### Code Review Guidelines Template

```markdown
# Code Review Guidelines

## Como Author del PR

### Antes de crear el PR

- [ ] Self-review: revisa tu propio código línea por línea
- [ ] Tests: asegúrate de que todos los tests pasan
- [ ] Documentation: actualiza docs relevantes
- [ ] Size: mantén PRs &lt;300 líneas cuando sea posible

### Al crear el PR

- [ ] Título descriptivo que explique qué cambia
- [ ] Descripción clara del problema resuelto
- [ ] Screenshots para cambios de UI
- [ ] Questions específicas para reviewers
- [ ] Link a issue/ticket relacionado

## Como Reviewer

### Qué revisar

1. **Correctness**: ¿El código hace lo que debe hacer?
2. **Clarity**: ¿Es fácil de entender?
3. **Consistency**: ¿Sigue convenciones del proyecto?
4. **Performance**: ¿Hay optimizaciones obvias?
5. **Security**: ¿Hay vulnerabilidades evidentes?
6. **Testability**: ¿El código es fácil de probar?

### Tipos de comentarios

- **Must Fix** 🚨: Blocking issues (bugs, security, breaking changes)
- **Should Fix** ⚠️: Importante pero no blocking (performance, maintainability)
- **Could Fix** 💡: Sugerencias nice-to-have
- **Praise** 👏: Reconoce buen código o approach clevero

### Template de comentario
```

[CATEGORY: Must Fix/Should Fix/Could Fix/Question/Praise]

[Descripción específica del issue o sugerencia]

**Reasoning**: [Por qué es importante este cambio]

**Suggestion**: [Propuesta concreta de mejora]

**Example**: [Código de ejemplo si es útil]

```

```

## 📊 Retrospective Templates

### Start/Stop/Continue Template

```markdown
# Sprint X Retrospective - [Date]

## Participants

- [Team member 1]
- [Team member 2]
- [Team member 3]

## ⭐ Start (What should we start doing?)

| Item                                 | Votes | Owner  | Action                           |
| ------------------------------------ | ----- | ------ | -------------------------------- |
| Pair programming on complex features | 3     | Team   | Schedule 2h pair sessions weekly |
| API documentation reviews            | 2     | [Name] | Add OpenAPI spec to DoD          |

## 🛑 Stop (What should we stop doing?)

| Item                            | Votes | Owner | Action                      |
| ------------------------------- | ----- | ----- | --------------------------- |
| Last-minute commits before demo | 4     | Team  | Code freeze 2h before demo  |
| Skipping daily standups         | 2     | SM    | Mandatory attendance policy |

## ➡️ Continue (What's working well?)

| Item                  | Votes | Why it works                       |
| --------------------- | ----- | ---------------------------------- |
| Clear PR descriptions | 5     | Saves review time, fewer questions |
| Friday demo format    | 3     | Good stakeholder engagement        |

## Action Items for Next Sprint

1. [ ] [Owner] [Specific action] [Due date]
2. [ ] [Owner] [Specific action] [Due date]
3. [ ] [Owner] [Specific action] [Due date]

## Metrics Review

- **Velocity**: X story points (target: Y)
- **Cycle Time**: X days average (target: Y)
- **Defect Rate**: X% (target: &lt;5%)
- **Team Satisfaction**: X/10 (target: >8)
```

## 📋 Definition of Ready Templates

### User Story DoR Checklist

```markdown
## Definition of Ready Checklist

Una user story está "Ready" cuando cumple todos estos criterios:

### Business Requirements

- [ ] **Value Statement**: Claro por qué es valioso para usuarios/negocio
- [ ] **Acceptance Criteria**: Específicos, medibles y testeable
- [ ] **Priority**: Asignada y justificada por PO
- [ ] **Dependencies**: Identificadas y resueltas/priorizadas

### Technical Requirements

- [ ] **Architecture**: Approach técnico definido y revisado
- [ ] **API Design**: Endpoints, payloads y responses definidos
- [ ] **Database**: Schema changes identificados
- [ ] **Third-party**: Integraciones externas documentadas

### Design & UX

- [ ] **Wireframes**: Disponibles para features de UI
- [ ] **User Flow**: Documentado para funcionalidades complejas
- [ ] **Accessibility**: Requirements específicos identificados
- [ ] **Responsive**: Comportamiento en mobile/desktop definido

### Quality Assurance

- [ ] **Test Cases**: Casos de prueba principales identificados
- [ ] **Test Data**: Requirements de datos para testing
- [ ] **Performance**: SLA definidos (response time, throughput)
- [ ] **Security**: Threat model básico completado

### Team Understanding

- [ ] **Estimation**: Story points asignados por consenso
- [ ] **Questions**: Todas las dudas importantes resueltas
- [ ] **Clarifications**: PO disponible para aclaraciones durante sprint
- [ ] **Capacity**: Team tiene capacity y skills necesarios
```

---

## 🎯 ¿Cómo usar estas plantillas?

1. **Copia y adapta**: Estas plantillas son puntos de partida, personalízalas
2. **Mantén consistencia**: Una vez que adoptes un formato, úsalo consistentemente
3. **Itera y mejora**: Basado en feedback del equipo, evoluciona las plantillas
4. **Automatiza cuando sea posible**: Usa GitHub templates, Jira workflows, etc.

## 📚 Recursos Adicionales

- **Confluence Templates**: Para documentación técnica detallada
- **Figma Component Libraries**: Para elementos de UI reutilizables
- **Postman Collections**: Para API testing y documentation
- **GitHub Issue Templates**: Para bug reports y feature requests estandarizados

¡Recuerda: Las plantillas son herramientas para acelerar el trabajo, no burocracias! Úsalas cuando agreguen valor. 🚀
