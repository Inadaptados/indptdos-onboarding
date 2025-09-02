---
id: checklist-owasp
title: Checklist OWASP para PR
sidebar_position: 1
---

# ✅ Checklist OWASP para Pull Requests

> **Uso**: Copiar este checklist en cada PR que contenga cambios de backend, APIs o funcionalidades que manejen datos de usuarios.

## 🔒 A01 - Broken Access Control

### Autenticación

- [ ] **Endpoints protegidos** tienen middleware de autenticación (`authenticateToken`)
- [ ] **Tokens JWT** se validan correctamente (signature, expiration, issuer)
- [ ] **Session management** usa tokens seguros (httpOnly, secure, sameSite)
- [ ] **Logout** invalida tokens del lado servidor (blacklist/database)

### Autorización

- [ ] **Permisos granulares** validados por endpoint (no solo roles generales)
- [ ] **Resource ownership** verificada (users can only access their own data)
- [ ] **Admin functions** restringidas apropiadamente
- [ ] **Client-side authorization** NO es la única validación

#### ✅ Ejemplo válido

```javascript
// BIEN: Doble validación (auth + ownership)
app.get("/api/users/:id/profile", authenticateToken, async (req, res) => {
  if (req.user.role !== "admin" && req.user.id !== req.params.id) {
    return res.status(403).json({ error: "Access denied" });
  }
  // ... rest of handler
});
```

## 🔐 A02 - Cryptographic Failures

### Password Security

- [ ] **Passwords hasheadas** con bcrypt (saltRounds &gt;= 10)
- [ ] **Plain text passwords** nunca almacenadas o logged
- [ ] **Password requirements** enforced (length, complexity)
- [ ] **Password reset** usa tokens criptográficamente seguros

### Data Encryption

- [ ] **PII/sensitive data** encrypted at rest
- [ ] **Secrets/API keys** almacenados en variables de entorno o vault
- [ ] **HTTPS enforced** (redirect HTTP → HTTPS)
- [ ] **Database connections** usan SSL/TLS

#### ✅ Ejemplo válido

```javascript
// BIEN: Password hashing seguro
const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

// BIEN: Secrets desde environment
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}
```

## 💉 A03 - Injection

### SQL Injection Prevention

- [ ] **Prepared statements** o ORM usado (nunca string concatenation)
- [ ] **Input validation** en todos los parámetros de DB
- [ ] **Stored procedures** usados donde sea apropiado
- [ ] **Database permissions** mínimos necesarios

### NoSQL Injection Prevention

- [ ] **Object validation** antes de queries a MongoDB
- [ ] **Query operators** ($ne, $gt, etc.) sanitizados
- [ ] **Input type validation** (no permitir objects donde se espera string)

### Command Injection Prevention

- [ ] **User input** nunca pasado directamente a system commands
- [ ] **File paths** validados (no path traversal: `../../../etc/passwd`)
- [ ] **Shell commands** evitados (usar libraries específicas)

#### ❌ Vulnerable

```javascript
// MAL: SQL injection vulnerable
const query = `SELECT * FROM users WHERE id = ${userId}`;

// MAL: NoSQL injection vulnerable
const user = await User.findOne({ email: req.body.email });
```

#### ✅ Ejemplo válido

```javascript
// BIEN: Prepared statement
const query = "SELECT * FROM users WHERE id = $1";
const result = await db.query(query, [userId]);

// BIEN: Input validation antes de query
const email = validator.isEmail(req.body.email) ? req.body.email : null;
if (!email) return res.status(400).json({ error: "Invalid email" });
const user = await User.findOne({ email });
```

## 🏗️ A04 - Insecure Design

### Security by Design

- [ ] **Threat modeling** realizado para nuevas funcionalidades
- [ ] **Security controls** implementados desde el diseño
- [ ] **Business logic abuse** considerado y prevenido
- [ ] **Rate limiting** implementado en endpoints críticos

### Validation & Business Rules

- [ ] **Business logic** validada del lado servidor
- [ ] **Multi-step processes** protegidos contra bypass
- [ ] **State transitions** validadas correctamente
- [ ] **Resource limits** establecidos (file size, request size, etc.)

#### ✅ Ejemplo válido

```javascript
// BIEN: Rate limiting en endpoints sensibles
const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos
  skipSuccessfulRequests: true,
});

app.post("/api/auth/login", loginRateLimit, loginHandler);
```

## ⚙️ A05 - Security Misconfiguration

### Server Configuration

- [ ] **Security headers** configurados (HSTS, CSP, X-Frame-Options, etc.)
- [ ] **CORS policy** restrictiva (no wildcard `*` en production)
- [ ] **Error messages** no exponen stack traces en production
- [ ] **Debug mode** deshabilitado en production

### Dependencies & Updates

- [ ] **npm audit** ejecutado sin vulnerabilidades critical/high
- [ ] **Dependencies** actualizadas a versiones seguras
- [ ] **Unused dependencies** removidas
- [ ] **Dev dependencies** no incluidas en production build

#### ✅ Ejemplo válido

```javascript
// BIEN: Security headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// BIEN: CORS restrictivo
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
```

## 🔍 A06 - Vulnerable Components

### Dependency Management

- [ ] **`npm audit`** passing (no critical/high vulnerabilities)
- [ ] **Dependencies** from trusted sources only
- [ ] **Version pinning** for critical dependencies
- [ ] **Regular updates** scheduled and tested

### Third-party Integrations

- [ ] **API keys** for third-party services rotated regularly
- [ ] **Third-party data** validated before processing
- [ ] **Vendor security** posture evaluated
- [ ] **Fallback mechanisms** in case third-party fails

## 🔐 A07 - Identification & Authentication Failures

### Authentication Implementation

- [ ] **Multi-factor authentication** available for admin accounts
- [ ] **Account lockout** after failed attempts
- [ ] **Password recovery** process secure (time-limited tokens)
- [ ] **Session timeout** implemented appropriately

### Token Security

- [ ] **JWT tokens** have appropriate expiration times
- [ ] **Refresh tokens** properly implemented and secured
- [ ] **Token revocation** mechanism in place
- [ ] **Concurrent sessions** limited where appropriate

#### ✅ Ejemplo válido

```javascript
// BIEN: Account lockout después de 5 intentos fallidos
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 horas

const checkAccountLockout = async (email) => {
  const user = await User.findOne({ email });

  if (user && user.lockUntil && user.lockUntil > Date.now()) {
    throw new AuthError("Account temporarily locked");
  }

  return user;
};
```

## 🔍 A08 - Software & Data Integrity Failures

### Code Integrity

- [ ] **CI/CD pipeline** has integrity checks
- [ ] **Code signing** implemented for releases
- [ ] **Dependency integrity** verified (package-lock.json committed)
- [ ] **Build reproducibility** ensured

### Data Integrity

- [ ] **Database transactions** used for multi-step operations
- [ ] **Data validation** at database level (constraints, triggers)
- [ ] **Backup integrity** verified regularly
- [ ] **Data migration** scripts tested and reversible

## 📊 A09 - Security Logging & Monitoring

### Logging Implementation

- [ ] **Security events** logged (login attempts, permission changes, etc.)
- [ ] **Sensitive data** NOT logged (passwords, tokens, PII)
- [ ] **Log tampering** prevented (log rotation, centralized logging)
- [ ] **Log monitoring** automated (alerts for suspicious patterns)

### Monitoring & Alerting

- [ ] **Failed authentication** alerts configured
- [ ] **Unusual access patterns** detected
- [ ] **Error rate monitoring** in place
- [ ] **Performance degradation** monitoring active

#### ✅ Ejemplo válido

```javascript
// BIEN: Security logging sin exponer datos sensibles
const logSecurityEvent = (event, req, additionalData = {}) => {
  logger.info("SECURITY_EVENT", {
    event,
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    userId: req.user?.id,
    endpoint: req.path,
    method: req.method,
    ...additionalData,
  });
};

// Uso
logSecurityEvent("LOGIN_ATTEMPT", req, { email: user.email });
logSecurityEvent("PERMISSION_DENIED", req, { requiredPermission: "admin" });
```

## 🔧 A10 - Server-Side Request Forgery (SSRF)

### Input Validation for URLs

- [ ] **URL validation** implemented for user-provided URLs
- [ ] **Allowlist approach** for external API calls
- [ ] **Internal network access** blocked from user input
- [ ] **Redirect validation** prevents malicious redirects

### Network Security

- [ ] **Network segmentation** prevents internal service access
- [ ] **Firewall rules** restrict outbound connections
- [ ] **DNS resolution** controlled and monitored
- [ ] **Timeout controls** for external requests

#### ✅ Ejemplo válido

```javascript
// BIEN: URL validation y allowlist
const ALLOWED_DOMAINS = ["api.trusted-service.com", "cdn.example.com"];

const validateExternalUrl = (url) => {
  try {
    const parsed = new URL(url);

    // Bloquear IPs privadas
    if (
      parsed.hostname.match(/^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.)/)
    ) {
      throw new Error("Private IP addresses not allowed");
    }

    // Bloquear localhost
    if (["localhost", "127.0.0.1", "::1"].includes(parsed.hostname)) {
      throw new Error("Localhost access not allowed");
    }

    // Verificar allowlist
    if (!ALLOWED_DOMAINS.includes(parsed.hostname)) {
      throw new Error("Domain not in allowlist");
    }

    return true;
  } catch (error) {
    return false;
  }
};
```

---

## 🎯 Security Testing

### Automated Testing

- [ ] **Unit tests** incluyen security scenarios
- [ ] **Integration tests** validan autenticación/autorización
- [ ] **OWASP ZAP** baseline scan ejecutado
- [ ] **Dependency scanning** en CI/CD pipeline

### Manual Testing

- [ ] **Code review** con enfoque en seguridad completado
- [ ] **Permission boundaries** tested manually
- [ ] **Error handling** behavior verificado
- [ ] **Input edge cases** tested

---

## ✅ Final Security Review

### Pre-merge Checklist

- [ ] Todos los ítems anteriores verificados
- [ ] **Security tests** passing
- [ ] **Peer review** completado por developer con conocimiento de seguridad
- [ ] **Documentation** actualizada con cambios de seguridad
- [ ] **Deployment security** considerations documented

### Post-deploy Monitoring

- [ ] **Security alerts** configuradas para nuevas funcionalidades
- [ ] **Metrics baseline** establecido para detección de anomalías
- [ ] **Incident response** plan updated if needed

---

## 🚨 Escalación

Si encuentras alguna vulnerabilidad durante el review:

1. **Critical/High**: Bloquear merge inmediatamente, notificar a @security-team
2. **Medium**: Crear issue de seguridad, fix antes de próximo release
3. **Low**: Crear issue, fix en próximos sprints
4. **Questions**: Preguntar en #security channel

---

_Este checklist es una guía, no una lista exhaustiva. Usa tu juicio y cuando tengas dudas, pregunta al equipo de seguridad._

**Recursos adicionales**:

- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
