---
id: reto-security-audit
title: "Reto: Security Audit & Fix"
sidebar_position: 2
---

# 🎯 Reto Práctico: Security Audit & Fix

> **Duración estimada**: 90-120 minutos
> **Dificultad**: Intermedia
> **Objetivo**: Identificar y corregir vulnerabilidades comunes en una aplicación web

## 📋 Contexto

Acabas de heredar una aplicación Node.js/Express que maneja información de estudiantes. El código tiene múltiples vulnerabilidades de seguridad que necesitas identificar y corregir usando las mejores prácticas de Secure SDLC.

## 🎯 Objetivos de Aprendizaje

Al completar este reto serás capaz de:

- ✅ **Identificar vulnerabilidades** del OWASP Top 10 en código real
- ✅ **Implementar controles de seguridad** apropiados
- ✅ **Aplicar input validation** y output encoding
- ✅ **Configurar authentication/authorization** robusta
- ✅ **Implementar security logging** sin exponer datos sensibles

---

## 🚩 Código Vulnerable a Auditar

### Archivo: `vulnerable-app.js`

```javascript
const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin123", // Hardcoded password
  database: "students_db",
});

const JWT_SECRET = "supersecret123"; // Hardcoded secret

// Login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // SQL query with user input
  const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.log("Database error:", err);
      return res.status(500).json({ error: err.message });
    }

    if (results.length > 0) {
      const token = jwt.sign({ userId: results[0].id }, JWT_SECRET);
      res.json({
        message: "Login successful",
        token,
        user: results[0], // Returning all user data including password
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Get student profile
app.get("/api/students/:id", (req, res) => {
  const { id } = req.params;

  // No authentication check
  const query = `SELECT * FROM students WHERE id = ${id}`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
});

// Update student profile
app.put("/api/students/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, grade } = req.body;

  // No input validation
  const query = `UPDATE students SET name = '${name}', email = '${email}', grade = ${grade} WHERE id = ${id}`;

  db.query(query, (err, results) => {
    if (err) {
      console.log("Update failed:", err);
      return res.status(500).json({ error: "Update failed" });
    }
    res.json({ message: "Student updated successfully" });
  });
});

// Delete student (admin only)
app.delete("/api/students/:id", (req, res) => {
  const { id } = req.params;

  // No authorization check
  const query = `DELETE FROM students WHERE id = ${id}`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Student deleted successfully" });
  });
});

// File upload endpoint
app.post("/api/upload", (req, res) => {
  const { filename, content } = req.body;

  // No file validation
  const fs = require("fs");
  const path = `./uploads/${filename}`;

  fs.writeFileSync(path, content);
  res.json({ message: "File uploaded", path });
});

// Search students
app.get("/api/search", (req, res) => {
  const { query } = req.query;

  // Direct query parameter usage
  const searchQuery = `SELECT * FROM students WHERE name LIKE '%${query}%'`;

  db.query(searchQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
```

### Base de datos: `schema.sql`

```sql
CREATE DATABASE students_db;
USE students_db;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255), -- Plain text passwords!
    role ENUM('student', 'teacher', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(255),
    grade DECIMAL(3,2),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Sample data with plain text passwords
INSERT INTO users (email, password, role) VALUES
('admin@school.com', 'admin123', 'admin'),
('teacher@school.com', 'teacher123', 'teacher'),
('student@school.com', 'student123', 'student');

INSERT INTO students (name, email, grade, user_id) VALUES
('Juan Pérez', 'juan@school.com', 85.5, 3),
('María García', 'maria@school.com', 92.0, 3);
```

---

## 🕵️ Parte 1: Security Audit (30 minutos)

### Instrucciones

Examina el código vulnerable y crea un reporte de auditoría identificando:

### 1. **Vulnerabilidades OWASP Top 10**

Para cada vulnerabilidad que encuentres, documenta:

````markdown
## Vulnerabilidad #X: [OWASP Category]

**Ubicación**: archivo.js:línea
**Severidad**: Critical/High/Medium/Low
**Descripción**: [Qué hace vulnerable el código]
**Impacto**: [Qué puede hacer un atacante]
**Ejemplo de exploit**: [Cómo se explotaría]

### Payload de prueba:

```javascript
// Ejemplo de cómo un atacante podría explotar esto
```
````

````

### 2. **Checklist de Auditoría**

Usa este template para tu reporte:

| Categoría | Vulnerable | Descripción | Severidad |
|-----------|------------|-------------|-----------|
| **A01 - Broken Access Control** | ❌ | | |
| **A02 - Cryptographic Failures** | ❌ | | |
| **A03 - Injection** | ❌ | | |
| **A04 - Insecure Design** | ❌ | | |
| **A05 - Security Misconfiguration** | ❌ | | |
| **A06 - Vulnerable Components** | ❌ | | |
| **A07 - Authentication Failures** | ❌ | | |
| **A08 - Software & Data Integrity** | ❌ | | |
| **A09 - Security Logging** | ❌ | | |
| **A10 - Server-Side Request Forgery** | ❌ | | |

---

## 🔧 Parte 2: Security Fix (60 minutos)

### Instrucciones
Crea una versión segura de la aplicación implementando las correcciones para cada vulnerabilidad identificada.

### 1. **Setup del proyecto seguro**

```bash
# Crear nuevo proyecto
mkdir secure-students-api
cd secure-students-api
npm init -y

# Instalar dependencias seguras
npm install express bcryptjs jsonwebtoken helmet cors express-rate-limit
npm install joi express-validator winston mysql2
npm install --save-dev nodemon eslint
````

### 2. **Estructura de archivos requerida**

```
secure-students-api/
├── src/
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── security.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── students.js
│   ├── utils/
│   │   ├── logger.js
│   │   └── database.js
│   └── app.js
├── config/
│   └── security.js
├── .env.example
└── package.json
```

### 3. **Implementaciones requeridas**

#### A. **Authentication & Authorization segura**

```javascript
// src/middleware/auth.js
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const authenticateToken = async (req, res, next) => {
  // TODO: Implementar verificación de JWT segura
  // - Validar header Authorization
  // - Verificar token con secret desde env
  // - Manejar errores apropiadamente
  // - No exponer información sensible en errores
};

const requireRole = (roles) => (req, res, next) => {
  // TODO: Implementar verificación de roles
  // - Verificar que el usuario tenga rol requerido
  // - Usar principio de least privilege
};

module.exports = { authenticateToken, requireRole };
```

#### B. **Input Validation robusta**

```javascript
// src/middleware/validation.js
const Joi = require("joi");

const validateStudentUpdate = (req, res, next) => {
  const schema = Joi.object({
    // TODO: Definir validaciones estrictas
    // - name: string, 2-50 chars, solo letras y espacios
    // - email: formato email válido
    // - grade: número 0-100
  });

  // TODO: Validar y sanitizar input
  // - Usar schema.validate()
  // - Retornar errores descriptivos pero seguros
  // - Sanitizar datos antes de continuar
};

module.exports = { validateStudentUpdate };
```

#### C. **Database queries seguras**

```javascript
// src/utils/database.js
const mysql = require("mysql2/promise");

class DatabaseManager {
  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: true },
    });
  }

  async getStudentById(id) {
    // TODO: Implementar query con prepared statements
    // - Usar parámetros en lugar de concatenación
    // - Validar input antes de query
    // - Manejar errores sin exponer detalles de DB
  }

  async updateStudent(id, data) {
    // TODO: Implementar update seguro
    // - Prepared statements
    // - Transacciones para atomicidad
    // - Validación de permisos (ownership)
  }
}

module.exports = new DatabaseManager();
```

#### D. **Security Headers y Configuración**

```javascript
// src/app.js
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// TODO: Configurar security middleware
app.use(
  helmet({
    // Configurar CSP, HSTS, etc.
  })
);

app.use(
  cors({
    // TODO: Configurar CORS restrictivo
    // - origin específicos (no wildcard)
    // - credentials solo si es necesario
  })
);

const loginRateLimit = rateLimit({
  // TODO: Configurar rate limiting
  // - windowMs: ventana de tiempo
  // - max: máximo intentos
  // - message: mensaje seguro
});
```

#### E. **Security Logging**

```javascript
// src/utils/logger.js
const winston = require("winston");

class SecurityLogger {
  constructor() {
    this.logger = winston.createLogger({
      // TODO: Configurar logger seguro
      // - Levels apropiados
      // - Formato JSON
      // - Rotation de logs
    });
  }

  logSecurityEvent(event, req, additionalData = {}) {
    // TODO: Log eventos de seguridad
    // - IP, User-Agent, timestamp
    // - NO loggar passwords, tokens, PII
    // - Usar structured logging
  }

  sanitizeLogData(data) {
    // TODO: Sanitizar datos para logs
    // - Remover campos sensibles
    // - Truncar datos largos
  }
}

module.exports = new SecurityLogger();
```

### 4. **Testing de Seguridad**

Crea tests que verifiquen:

```javascript
// tests/security.test.js
describe("Security Tests", () => {
  describe("SQL Injection Prevention", () => {
    it("should reject malicious SQL in student ID", async () => {
      const maliciousId = "1; DROP TABLE students; --";
      // TODO: Test que la query falle apropiadamente
    });

    it("should sanitize search queries", async () => {
      const maliciousQuery = "'; DROP TABLE users; --";
      // TODO: Test que el input sea sanitizado
    });
  });

  describe("Access Control", () => {
    it("should require authentication for protected endpoints", async () => {
      // TODO: Test endpoints sin token
    });

    it("should enforce role-based permissions", async () => {
      // TODO: Test que estudiante no pueda borrar otros estudiantes
    });
  });

  describe("Input Validation", () => {
    it("should reject invalid email formats", async () => {
      // TODO: Test validación de email
    });

    it("should limit input lengths", async () => {
      // TODO: Test buffer overflow protection
    });
  });
});
```

---

## 📊 Parte 3: Security Report (30 minutos)

### Instrucciones

Crea un reporte ejecutivo que incluya:

### 1. **Executive Summary**

```markdown
## Security Assessment Report

**Application**: Students Management API
**Assessment Date**: [Date]
**Assessor**: [Your Name]
**Overall Risk**: Critical/High/Medium/Low

### Key Findings

- X Critical vulnerabilities found
- X High-risk issues identified
- X Medium/Low priority items
- Security posture improved by X% after fixes

### Immediate Actions Required

1. [Most critical fix needed]
2. [Second priority]
3. [Third priority]
```

### 2. **Technical Findings**

Para cada vulnerabilidad:

````markdown
### Finding #X: SQL Injection in Login Endpoint

**Risk Level**: Critical
**OWASP Category**: A03 - Injection
**CWE**: CWE-89

**Description**: The login endpoint constructs SQL queries using string concatenation...

**Evidence**:

```javascript
// Vulnerable code snippet
const query = `SELECT * FROM users WHERE email = '${email}'...`;
```
````

**Impact**:

- Full database compromise possible
- User data extraction
- Potential for privilege escalation

**Recommendation**:

- Implement prepared statements
- Add input validation
- Use parameterized queries

**Fixed Code**:

```javascript
// Secure implementation
const query = "SELECT * FROM users WHERE email = ? AND password_hash = ?";
const results = await db.execute(query, [email, passwordHash]);
```

**Verification**: [How you tested the fix works]

```

### 3. **Security Metrics**

| Metric | Before Fix | After Fix | Improvement |
|--------|------------|-----------|-------------|
| SQL Injection Points | X | 0 | 100% |
| Authentication Bypass | X | 0 | 100% |
| Exposed Sensitive Data | X | 0 | 100% |
| OWASP Top 10 Coverage | 20% | 90% | +70% |

### 4. **Recommendations**

#### Immediate (0-30 days)
- [ ] Deploy fixed authentication system
- [ ] Implement input validation across all endpoints
- [ ] Add security headers
- [ ] Set up security monitoring

#### Short-term (1-3 months)
- [ ] Implement automated security testing in CI/CD
- [ ] Add WAF rules for common attacks
- [ ] Security training for development team
- [ ] Regular dependency auditing

#### Long-term (3-6 months)
- [ ] Annual penetration testing
- [ ] Security-focused code reviews
- [ ] Implement zero-trust architecture
- [ ] Advanced threat monitoring

---

## ✅ Criterios de Evaluación

### Excelente (90-100%)
- ✅ Identificó todas las vulnerabilidades críticas y high
- ✅ Implementó fixes seguros y robustos
- ✅ Código sigue mejores prácticas de seguridad
- ✅ Tests de seguridad comprehensivos
- ✅ Reporte técnico detallado y profesional

### Bueno (75-89%)
- ✅ Identificó la mayoría de vulnerabilidades importantes
- ✅ Fixes implementados correctamente pero no optimizados
- ✅ Algunas mejores prácticas implementadas
- ✅ Tests básicos de seguridad
- ✅ Reporte técnico completo

### Satisfactorio (60-74%)
- ✅ Identificó vulnerabilidades obvias
- ✅ Fixes básicos implementados
- ✅ Seguridad mejorada vs. versión original
- ✅ Algunos tests implementados
- ✅ Reporte con hallazgos principales

### Necesita Mejora (&lt;60%)
- ❌ No identificó vulnerabilidades críticas
- ❌ Fixes incompletos o incorrectos
- ❌ Código sigue siendo vulnerable
- ❌ Tests inadecuados o ausentes
- ❌ Reporte incompleto

---

## 🎯 Entregables

1. **Security Audit Report** (PDF/MD)
   - Vulnerabilidades identificadas
   - Risk assessment
   - Evidencia técnica

2. **Fixed Application Code**
   - Aplicación segura funcionando
   - Tests de seguridad passing
   - README con instrucciones de deploy

3. **Demo Video** (5-10 mins)
   - Mostrar vulnerabilidades originales
   - Demostrar fixes implementados
   - Explicar controles de seguridad agregados

---

## 💡 Tips para el Éxito

### Herramientas Útiles
- **OWASP ZAP**: Para testing automatizado
- **Burp Suite Community**: Para interceptar requests
- **npm audit**: Para vulnerabilidades de dependencias
- **ESLint Security Plugin**: Para análisis estático

### Methodología Recomendada
1. **Analiza primero, codea después**: Entiende todas las vulnerabilidades antes de empezar a corregir
2. **Una vulnerabilidad a la vez**: No trates de arreglar todo simultáneamente
3. **Testa cada fix**: Verifica que la vulnerabilidad esté realmente corregida
4. **Piensa como atacante**: ¿Cómo tratarías de bypassear tu fix?

### Recursos de Referencia
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

## 🎉 ¿Completaste el reto?

¡Felicidades! Has aplicado conocimientos fundamentales de Secure SDLC en un escenario realista.

**Próximos pasos**:
1. Comparte tu solución con el mentor para review
2. Participa en la sesión de code review grupal
3. Aplica estos principios en tu proyecto personal
4. Considera obtener certificaciones como OSCP, CEH, o CISSP

**¿Preguntas o necesitas ayuda?** Pregunta en #security-help en Slack.

---

*La seguridad no es un feature que se agrega al final, es una mentalidad que debe permear cada línea de código que escribes.* 🔐
```
