---
id: expectativas
title: Expectativas y Cultura de Trabajo
---

# Expectativas y Cultura de Trabajo 🎯

En **Indaptados** valoramos la autonomía, la calidad y la colaboración. Estas son nuestras expectativas claras para crear un ambiente de trabajo productivo y de crecimiento.

## 🔬 Autonomía e Iniciativa

### Principio: "Intenta primero, pregunta con contexto"

**✅ Comportamientos esperados:**

- Investiga al menos **30 minutos** antes de pedir ayuda
- Documenta lo que has intentado cuando preguntes
- Propón posibles soluciones, no solo reportes problemas
- Toma decisiones técnicas justificadas en el día a día

**❌ Evita:**

- Preguntar sin haber intentado nada
- Quedarte bloqueado más de 1 hora sin escalar
- Tomar decisiones arquitecturales sin consultar

### Ejemplo práctico

```markdown
❌ Pregunta mal formulada:
"No me funciona React, ¿qué hago?"

✅ Pregunta bien formulada:
"Estoy intentando implementar un hook personalizado para manejo de estado.
He probado usar useState y useEffect pero se está renderizando en loop infinito.
He revisado la documentación de React hooks y probé agregar dependencias
al useEffect pero sigue ocurriendo.
¿Podrían revisar mi código y darme feedback?"
```

## ✨ Calidad Mínima No Negociable

### Principio: "Linters y tests pasan, siempre"

**Estándares de código:**

- **ESLint/Prettier** configurados y sin errores
- **TypeScript** estricto (no `any` sin justificación)
- **Tests unitarios** para lógica de negocio crítica
- **Nomenclatura** clara y consistente
- **Commits** atómicos con mensajes descriptivos

### Checklist Pre-PR

```markdown
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run test` ejecuta exitosamente
- [ ] `npm run build` genera build sin warnings críticos
- [ ] Código reviewed por ti mismo al menos una vez
- [ ] README actualizado si agregaste nueva funcionalidad
- [ ] No quedan `console.log`, `debugger`, o TODOs pendientes
```

### Ejemplos de calidad en commits

```bash
✅ Buenos mensajes de commit:
feat: add QR code generation for attendance sessions
fix: prevent memory leak in WebSocket connection cleanup
refactor: extract validation logic to separate utility

❌ Malos mensajes de commit:
fix bug
update stuff
working version
```

## 🔒 Seguridad desde el Diseño

### Principio: "Valida inputs, protege secretos, maneja errores"

**Prácticas obligatorias:**

- **Validación de inputs** en frontend Y backend
- **Sanitización** de datos antes de almacenar
- **Variables de entorno** para secretos (nunca hardcoded)
- **Manejo de errores** sin exponer información sensible
- **Logging** apropiado sin datos personales

### Ejemplos de seguridad

**✅ Validación correcta:**

```javascript
// Frontend validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Backend validation
app.post("/api/users", (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters" });
  }

  // Process...
});
```

**❌ Anti-patrones de seguridad:**

```javascript
// ❌ NUNCA hacer esto:
const API_KEY = "sk-123456789abcdef"; // Hardcoded secret
const query = `SELECT * FROM users WHERE id = ${userId}`; // SQL injection
console.log("Error details:", error.stack); // Exposing stack trace
```

## 💬 Comunicación Clara y Efectiva

### Principio: "PRs pequeños, descripciones claras, tiempos acordados"

**Estándares de comunicación:**

#### Pull Requests

- **Tamaño**: Máximo 300 líneas de código modificadas
- **Descripción**: Qué, por qué, cómo (template obligatorio)
- **Screenshots**: Para cambios de UI
- **Tests**: Evidencia de que funciona
- **Breaking changes**: Claramente documentados

#### Template de PR

```markdown
## ¿Qué incluye este PR?

Breve descripción del cambio y su propósito.

## ¿Por qué es necesario?

Contexto del problema o feature request.

## ¿Cómo se probó?

- [ ] Tests unitarios pasan
- [ ] Probado manualmente en desarrollo
- [ ] Screenshots adjuntos (si aplica)

## Checklist

- [ ] Cumple requisitos del reto
- [ ] Lint/tests OK
- [ ] Validación de entrada y manejo de errores
- [ ] Revisión de seguridad básica (OWASP)
- [ ] Accesibilidad mínima (labels, contraste)
```

#### Tiempos y Disponibilidad

- **Code reviews**: Máximo 24 horas para feedback
- **Daily standup**: Puntualidad a las 9:00 AM
- **Deadlines**: Comunicar retrasos con al menos 2 horas de anticipación
- **Disponibilidad**: 9:00 AM - 6:00 PM (flexible con previo aviso)

## 🌱 Crecimiento y Aprendizaje

### Mentalidad de Crecimiento

- **Feedback**: Busca y recibe feedback constructivo
- **Errores**: Aprende de ellos y comparte lecciones
- **Conocimiento**: Comparte lo que aprendes con el equipo
- **Mejora continua**: Propón optimizaciones en procesos

### Recursos de Aprendizaje Continuo

- **Tech talks** internos (viernes 4:00 PM)
- **Code reviews** como oportunidad de aprendizaje
- **Documentación** de decisiones técnicas
- **Retrospectivas** semanales para mejorar procesos

## 🚨 Escalación de Problemas

### Niveles de Escalación

1. **Intento personal** (0-30 min)
2. **Investigación/documentación** (30-60 min)
3. **Consulta a compañero** (60+ min)
4. **Escalación a lead/mentor** (bloqueador crítico)

### ¿Cuándo escalar inmediatamente?

- **Seguridad**: Vulnerabilidad detectada
- **Producción**: Error en ambiente productivo
- **Datos**: Posible pérdida de información
- **Dependencias**: Bloqueador que afecta a otros
- **Cliente**: Issue que impacta experiencia del usuario

## 🎯 KPIs de Desempeño

Durante el onboarding mediremos:

### Técnicos

- **Calidad de código**: 0 warnings críticos en PRs
- **Tiempo de entrega**: Retos completados en tiempo esperado
- **Tests**: >80% de cobertura en lógica de negocio
- **Documentación**: README y comentarios apropiados

### Colaborativos

- **Code reviews**: Feedback constructivo y oportuno
- **Comunicación**: Participación activa en dailies
- **Autonomía**: Reducción gradual de consultas básicas
- **Proactividad**: Propuestas de mejora implementadas

## 💡 Consejos para el Éxito

1. **Haz preguntas inteligentes**: Siempre con contexto y opciones
2. **Documenta todo**: Tu yo futuro te lo agradecerá
3. **Automatiza lo repetitivo**: Scripts, linters, tests
4. **Busca feedback temprano**: No esperes a tener todo "perfecto"
5. **Celebra los pequeños logros**: El progreso diario cuenta

---

**Recuerda**: Estas expectativas no son para limitarte, sino para crear un framework que nos permita a todos crecer y entregar valor consistentemente. ¡Estamos aquí para apoyarte en el proceso! 🚀
