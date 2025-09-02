---
id: reto-brief-ux
title: Reto — Brief UX (Asistencias por QR)
---

# 🎯 Reto 1: Brief UX Completo - Sistema de Asistencias por QR

**Duración estimada**: 45-60 minutos
**Objetivo**: Aplicar metodología centrada en el usuario para diseñar una solución de asistencias digitales

## 📋 Contexto del Reto

Imagina que **Indaptados** está expandiendo sus servicios educativos y necesita un sistema eficiente para tomar asistencia en clases presenciales. Actualmente, los profesores pierden 5-10 minutos por clase pasando lista manualmente, y algunos estudiantes reportan frustración por llegar tarde y no poder registrar su asistencia.

Tu rol es **Product Owner/UX Researcher** y debes crear un brief completo que justifique y direccione el desarrollo de una solución basada en códigos QR.

## 🎯 Entregables Requeridos

### 1. **Investigación de Usuarios** (15 min)

#### A. Definir el Job-to-be-Done Principal

Usa el template:

```
Cuando [SITUACIÓN/CONTEXTO],
quiero [OBJETIVO/MOTIVACIÓN],
para poder [RESULTADO/BENEFICIO].
```

**Investiga al menos 3 jobs diferentes**:

- **Estudiante**: Su perspectiva y necesidades
- **Profesor**: Su flujo de trabajo actual
- **Administrador**: Reportes y métricas

#### B. Identificar Pain Points Actuales

Crea una tabla con:
| Stakeholder | Pain Point | Impacto (1-5) | Frecuencia |
|-------------|------------|---------------|------------|
| Estudiante | ... | 4 | Diario |
| Profesor | ... | 3 | Por clase |

#### C. Suposiciones vs. Hechos

**Suposiciones** (necesitan validarse):

- [ ] Los estudiantes prefieren métodos digitales
- [ ] QR es más rápido que lista manual
- [ ] Profesores están dispuestos a adoptar nueva tecnología

**Hechos conocidos** (datos existentes):

- [ ] Tiempo promedio actual: X minutos por clase
- [ ] Número de estudiantes por clase: Y personas
- [ ] Dispositivos disponibles: smartphones, tablets, etc.

### 2. **Definición del Problema** (10 min)

#### Point of View Statement

```
[USUARIO ESPECÍFICO] necesita [NECESIDAD CLARA]
porque [INSIGHT PROFUNDO SOBRE MOTIVACIÓN].
```

**Ejemplo**:

```
Los estudiantes que combinan trabajo y estudio necesitan
confirmar su asistencia de forma inmediata y sin fricciones
porque llegar tarde ya genera estrés y no pueden permitirse
perder tiempo adicional en procesos administrativos.
```

#### How Might We (HMW) Statements

Genera al menos 5 preguntas HMW:

- HMW reducir el tiempo de registro de asistencia?
- HMW hacer que el proceso sea intuitivo para profesores no-técnicos?
- HMW...

### 3. **Diseño de la Solución** (15 min)

#### A. User Stories Principales

Escribe 3-5 user stories usando formato INVEST:

**Ejemplo**:

```
Como estudiante autenticado,
quiero escanear un QR al llegar a clase,
para registrar mi asistencia en menos de 10 segundos.

Criterios de Aceptación:
✅ El QR es único por sesión de clase
✅ El escaneo funciona con cualquier app de QR estándar
✅ Muestra confirmación visual inmediata
✅ Registra timestamp automáticamente
✅ Funciona sin conexión (sincroniza después)
```

#### B. Flujo de Usuario (User Flow)

Crea un diagrama de flujo en texto/ASCII:

```
[Estudiante llega] → [Ve QR en pantalla] → [Escanea con app]
         ↓
[Redirect a sistema] → [Confirma identidad] → [Asistencia guardada]
         ↓
[Recibe confirmación] → [Puede sentarse]
```

**Incluye flujos de error**:

- QR expirado
- Estudiante no registrado
- Problemas técnicos

#### C. Wireframes Básicos (texto)

Describe las pantallas principales:

**Pantalla 1: Dashboard Profesor**

```
┌─────────────────────────────────┐
│ Programación Web - Grupo A      │
│ Lunes 14:00 - Sala 301         │
├─────────────────────────────────┤
│                                 │
│         [QR CODE]               │
│                                 │
│ Válido hasta: 14:15             │
├─────────────────────────────────┤
│ Asistencias: 12/25              │
│ □ Nuevo código  □ Ver lista     │
└─────────────────────────────────┘
```

### 4. **Validación y Métricas** (10 min)

#### A. Hipótesis Principal a Validar

```
Creemos que un sistema de QR para registro de asistencia
para estudiantes y profesores de Indaptados
resultará en una reducción del 70% en tiempo de registro
lo sabremos cuando midamos tiempo promedio &lt;30 segundos
vs. 5-10 minutos del método actual.
```

#### B. Criterios de Éxito (OKRs)

**Objetivo**: Optimizar proceso de asistencias

**Key Results**:

1. **Eficiencia**: Reducir tiempo de registro de 5-10 min a &lt;1 min por clase
2. **Adopción**: 80% de estudiantes usan QR vs. método tradicional en 4 semanas
3. **Satisfacción**: NPS &gt;8 entre profesores y estudiantes
4. **Técnico**: 99.5% uptime del sistema durante horarios de clase

#### C. Métricas de Seguimiento

**Acquisition**:

- Tasa de primer uso exitoso
- Tiempo hasta completar primer registro

**Engagement**:

- Frecuencia de uso por usuario
- Tiempo promedio de registro
- Tasa de error/reintento

**Retention**:

- Usuarios activos diarios (profesores)
- Estudiantes que prefieren QR vs. manual
- Reducción en reportes de problemas

### 5. **Plan de Experimentación** (5 min)

#### Experimento MVP

**Duración**: 1 semana
**Scope**: 1 clase piloto (25 estudiantes)
**Setup**:

- QR simple generado manualmente
- Formulario web básico para registro
- Cronómetro para medir tiempos

**Success Criteria**:

- [ ] 90% de estudiantes logran registrarse
- [ ] Tiempo promedio &lt;60 segundos
- [ ] 0 problemas técnicos críticos
- [ ] Profesor reporta proceso "fácil de usar"

#### Métricas del Experimento

**Quantitativas**:

- Tiempo de registro (antes vs. después)
- Tasa de éxito de escaneo
- Errores reportados

**Qualitativas**:

- Entrevistas post-uso (3-5 participantes)
- Survey de satisfacción (escala 1-10)
- Observaciones de comportamiento durante uso

## 📝 Template de Entrega

Crea un documento markdown con esta estructura:

```markdown
# Brief UX: Sistema de Asistencias por QR

## 1. Investigación de Usuarios

### Jobs-to-be-Done

- **Estudiante**: ...
- **Profesor**: ...
- **Administrador**: ...

### Pain Points Identificados

| Stakeholder | Pain Point | Impacto | Frecuencia |
| ----------- | ---------- | ------- | ---------- |
| ...         | ...        | ...     | ...        |

### Suposiciones vs. Hechos

**Suposiciones a validar**:

- [ ] ...

**Hechos conocidos**:

- [ ] ...

## 2. Definición del Problema

### Point of View

...

### How Might We

- HMW ...
- HMW ...

## 3. Diseño de Solución

### User Stories

...

### User Flow

...

### Wireframes

...

## 4. Validación y Métricas

### Hipótesis Principal

...

### OKRs

...

### Métricas de Seguimiento

...

## 5. Plan de Experimentación

### MVP Experiment

...

### Success Criteria

...
```

## 🎯 Criterios de Evaluación

Tu entrega será evaluada en:

### Investigación (25%)

- [ ] JTBD claros y específicos para cada stakeholder
- [ ] Pain points priorizados por impacto
- [ ] Distinción clara entre suposiciones y hechos

### Definición del Problema (25%)

- [ ] Point of View enfocado y empático
- [ ] HMW statements creativos y accionables
- [ ] Problema claramente articulado

### Diseño de Solución (25%)

- [ ] User Stories siguen formato INVEST
- [ ] Flujo de usuario completo (incluye casos de error)
- [ ] Wireframes comunican funcionalidad básica

### Validación (25%)

- [ ] Hipótesis específica y medible
- [ ] Métricas relevantes y realistas
- [ ] Plan de experimentación factible

## 💡 Tips para el Éxito

1. **Piensa como usuario real**: Considera limitaciones técnicas, contexto de uso, estrés del momento
2. **Sé específico**: "Registro rápido" vs. "Registro en &lt;30 segundos"
3. **Incluye edge cases**: ¿Qué pasa si no hay internet? ¿QR ilegible?
4. **Valida suposiciones**: No asumas que conoces las necesidades
5. **Métricas accionables**: Que te permitan tomar decisiones concretas

## 🚀 Entrega

1. **Crea una rama**: `feature/brief-ux-asistencias-qr`
2. **Archivo**: `docs/01-agil-ux/mi-brief-asistencias-qr.md`
3. **Pull Request** con:
   - Brief completo en markdown
   - 2-3 preguntas específicas para code review
   - Screenshot del wireframe (si usaste herramienta digital)

## 📚 Recursos de Apoyo

- **Jobs to be Done**: [JTBD Framework](https://jtbd.info/2-what-is-jobs-to-be-done-jtbd-796b82081cca)
- **User Story Mapping**: [Guide by Jeff Patton](https://www.jpattonassociates.com/user-story-mapping/)
- **Wireframing**: [Balsamiq Learning Resources](https://balsamiq.com/learn/)
- **UX Research**: [18F Methods](https://methods.18f.gov/)

¡Recuerda: estás resolviendo un problema real para personas reales. Piensa en la última vez que tuviste que hacer fila y cómo te sentiste! 🎯
