---
id: plantillas
title: Plantillas útiles
slug: /99-recursos/plantillas
---

# Plantillas y Templates 📝

Colección de plantillas reutilizables para acelerar tu trabajo durante el onboarding y proyectos futuros.

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
- QR: generated <15 minutes ago

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
- [ ] Performance es aceptable (<3s load time)
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
- [ ] Size: mantén PRs <300 líneas cuando sea posible

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
- **Defect Rate**: X% (target: <5%)
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
