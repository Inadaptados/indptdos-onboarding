---
id: reto-prompts
title: "Reto: Diseño de Prompts Profesionales"
sidebar_position: 2
description: "Aplica metodología SPICE para crear prompts que automaticen tareas reales de desarrollo con calidad profesional."
keywords:
  [
    "reto-prompts",
    "spice",
    "automation",
    "test-generation",
    "documentation",
    "code-review",
  ]
---

# 🎯 Reto: Diseño de Prompts Profesionales

> **Duración estimada**: 3-4 horas
> **Nivel**: Intermedio-Avanzado
> **Entregables**: 3 prompts SPICE + resultados + análisis

---

## 🚀 Objetivo del Reto

Crear **3 prompts profesionales** usando metodología SPICE que automaticen tareas reales de desarrollo y demostrar su efectividad con ejemplos concretos.

### Criterios de Éxito

- ✅ **Aplicar SPICE correctamente** en los 3 prompts
- ✅ **Generar resultados de calidad profesional** utilizables en producción
- ✅ **Documentar el proceso** con métricas y análisis
- ✅ **Demostrar ROI** (tiempo ahorrado vs tiempo invertido)

---

## 📋 Challenge 1: Generador de Test Cases

### 🎯 **Contexto del Problema**

Tu equipo necesita generar casos de prueba comprehensivos para una API de gestión de productos de un e-commerce. Los developers pasan demasiado tiempo escribiendo tests manualmente y a menudo olvidan casos edge.

### **Especificación de la API**

```javascript
// POST /api/v1/products
{
  "name": "string",           // 2-100 chars, no special chars except spaces and hyphens
  "price": "number",          // > 0, max 2 decimal places, max 999999.99
  "category": "string",       // enum: "electronics", "clothing", "books", "home", "sports"
  "sku": "string",            // format: "CAT-YYYYMMDD-XXX" (category-date-sequence)
  "stock": "integer",         // >= 0, max 10000
  "tags": "array",            // max 5 items, each 1-20 chars, alphanumeric only
  "isActive": "boolean",      // default: true
  "dimensions": {
    "weight": "number",       // > 0, in grams, max 50000
    "length": "number",       // > 0, in cm, max 500
    "width": "number",        // > 0, in cm, max 500
    "height": "number"        // > 0, in cm, max 500
  }
}

// Business Rules:
// - SKU must be unique across all products
// - Electronics category requires dimensions.weight > 100g
// - Books category: dimensions required, weight 50-2000g
// - Price must end in .99 for clothing category
// - Stock validation: electronics max 100, books max 500, others max 1000
// - Tags cannot contain duplicates
// - Products with stock = 0 must have isActive = false

// Expected Responses:
// 201: Product created successfully + product object with generated ID
// 400: Validation error with specific field errors
// 409: SKU already exists
// 422: Business rule violation
```

### **Tu Tarea**

1. **Diseña un prompt SPICE** que genere 20+ test cases cubriendo:

   - ✅ Happy paths (mínimo 3 casos)
   - ✅ Validaciones de campos (mínimo 8 casos)
   - ✅ Business rules (mínimo 5 casos)
   - ✅ Edge cases y boundaries (mínimo 4 casos)

2. **Formato de salida**: Array JSON de objetos test case ejecutables con Jest + Supertest

3. **Ejecuta el prompt** con tu LLM preferido y captura:

   - Prompt completo utilizado
   - Respuesta generada
   - Tiempo de generación
   - Tokens utilizados (si disponible)

4. **Evalúa la calidad**:
   - ¿Son ejecutables los tests sin modificación?
   - ¿Cubren todos los requisitos especificados?
   - ¿Los datos de prueba son realistas?
   - ¿Siguen convenciones de naming?

### **Criterios de Evaluación**

```javascript
// Validation criteria for generated tests
const evaluationCriteria = [
  {
    name: "valid_json_structure",
    type: "json_valid",
    weight: 20,
  },
  {
    name: "minimum_test_count",
    type: "count",
    min_value: 20,
    weight: 15,
  },
  {
    name: "happy_path_coverage",
    type: "contains",
    values: ["valid_product", "all_fields_provided", "minimal_valid"],
    weight: 15,
  },
  {
    name: "validation_coverage",
    type: "contains",
    values: [
      "invalid_name",
      "invalid_price",
      "invalid_sku",
      "invalid_category",
    ],
    weight: 20,
  },
  {
    name: "business_rules_coverage",
    type: "contains",
    values: [
      "electronics_weight",
      "books_dimension",
      "clothing_price",
      "unique_sku",
    ],
    weight: 20,
  },
  {
    name: "realistic_test_data",
    type: "llm_eval",
    description:
      "Test data should be realistic and not use placeholder values like 'test@test.com'",
    weight: 10,
  },
];
```

---

## 📝 Challenge 2: Generador de Documentación Técnica

### 🎯 **Contexto del Problema**

Tu startup está creciendo rápidamente y necesitas documentar APIs existentes para onboarding de nuevos developers y integración de clientes externos. Escribir documentación manualmente consume mucho tiempo.

### **API a Documentar**

```javascript
// users-controller.js
class UsersController {
  /**
   * Get user profile with activity metrics
   */
  async getUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const { include_metrics = false, date_range = 30 } = req.query;

      // Validate userId is valid UUID
      if (!isValidUUID(userId)) {
        return res.status(400).json({
          error: "Invalid user ID format",
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          error: "User not found",
        });
      }

      // Check if user has permission to view profile
      if (req.user.id !== userId && !req.user.isAdmin) {
        return res.status(403).json({
          error: "Insufficient permissions",
        });
      }

      const profile = {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.full_name,
        avatar: user.avatar_url,
        createdAt: user.created_at,
        lastActive: user.last_active_at,
      };

      // Include activity metrics if requested
      if (include_metrics === "true") {
        const metrics = await ActivityService.getUserMetrics(
          userId,
          parseInt(date_range)
        );
        profile.metrics = {
          totalSessions: metrics.session_count,
          avgSessionDuration: metrics.avg_duration_minutes,
          lastLoginDate: metrics.last_login,
          activityScore: metrics.activity_score,
        };
      }

      res.status(200).json({
        user: profile,
        requestedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("getUserProfile error:", error);
      res.status(500).json({
        error: "Internal server error",
        requestId: req.requestId,
      });
    }
  }

  /**
   * Update user profile information
   */
  async updateUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const updates = req.body;

      // Validate userId
      if (!isValidUUID(userId)) {
        return res.status(400).json({
          error: "Invalid user ID format",
        });
      }

      // Check permissions
      if (req.user.id !== userId && !req.user.isAdmin) {
        return res.status(403).json({
          error: "Insufficient permissions",
        });
      }

      // Validate update fields
      const allowedUpdates = ["username", "email", "full_name", "avatar_url"];
      const updateKeys = Object.keys(updates);
      const invalidKeys = updateKeys.filter(
        (key) => !allowedUpdates.includes(key)
      );

      if (invalidKeys.length > 0) {
        return res.status(400).json({
          error: "Invalid update fields",
          invalidFields: invalidKeys,
        });
      }

      // Email uniqueness check
      if (updates.email) {
        const emailExists = await User.findOne({
          email: updates.email,
          id: { $ne: userId },
        });
        if (emailExists) {
          return res.status(409).json({
            error: "Email already in use",
          });
        }
      }

      // Username validation and uniqueness
      if (updates.username) {
        if (!/^[a-zA-Z0-9_]{3,30}$/.test(updates.username)) {
          return res.status(400).json({
            error:
              "Username must be 3-30 characters, alphanumeric and underscores only",
          });
        }

        const usernameExists = await User.findOne({
          username: updates.username,
          id: { $ne: userId },
        });
        if (usernameExists) {
          return res.status(409).json({
            error: "Username already taken",
          });
        }
      }

      // Update user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          ...updates,
          updated_at: new Date(),
        },
        { new: true }
      );

      res.status(200).json({
        message: "Profile updated successfully",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
          email: updatedUser.email,
          fullName: updatedUser.full_name,
          avatar: updatedUser.avatar_url,
          updatedAt: updatedUser.updated_at,
        },
      });
    } catch (error) {
      console.error("updateUserProfile error:", error);
      res.status(500).json({
        error: "Internal server error",
        requestId: req.requestId,
      });
    }
  }
}

// Authentication middleware required for all endpoints
// Rate limiting: 100 requests per hour per user
// Base URL: https://api.yourapp.com/v1
```

### **Tu Tarea**

1. **Diseña un prompt SPICE** que genere documentación API profesional incluyendo:

   - 📖 Descripción clara de cada endpoint
   - 🔐 Requisitos de autenticación y permisos
   - 📝 Parámetros de request (path, query, body)
   - 📊 Ejemplos de response (success + error cases)
   - 💻 Ejemplos de código (curl, JavaScript, Python)
   - ⚠️ Casos de error detallados
   - 🚀 Rate limiting y consideraciones

2. **Formato de salida**: Markdown profesional estilo OpenAPI documentation

3. **Ejecuta el prompt** y documenta:

   - Tiempo de generación vs tiempo manual estimado
   - Calidad de ejemplos generados
   - Completitud de la documentación

4. **Criterios de calidad**:
   - Documentación es self-sufficient para developers externos
   - Ejemplos son copy-pasteable y funcionales
   - Cubre todos los casos de error
   - Sigue estándares de documentación API

---

## 🔍 Challenge 3: Analizador de Code Review

### 🎯 **Contexto del Problema**

Tu equipo realiza code reviews manualmente, pero a menudo pasan por alto issues de seguridad, performance, o mejores prácticas. Necesitas un sistema que identifique automáticamente problemas prioritarios.

### **Código a Revisar**

```javascript
// user-service.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class UserService {
  async createUser(userData) {
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user
    const user = new User({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role || "user",
    });

    const savedUser = await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: savedUser._id,
        username: savedUser.username,
        role: savedUser.role,
      },
      "secret123", // Hardcoded secret
      { expiresIn: "30d" }
    );

    return {
      user: savedUser,
      token: token,
    };
  }

  async loginUser(email, password) {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      "secret123", // Same hardcoded secret
      { expiresIn: "24h" }
    );

    // Update last login
    await User.updateOne({ _id: user._id }, { lastLogin: new Date() });

    return { user, token };
  }

  async getAllUsers() {
    // Get all users (no pagination)
    const users = await User.find({}).select("-password");
    return users;
  }

  async deleteUser(userId) {
    // Delete user - no checks
    await User.deleteOne({ _id: userId });
    return { message: "User deleted" };
  }

  async updateUserPassword(userId, newPassword) {
    // Update password without validation
    const hashedPassword = await bcrypt.hash(newPassword, 8); // Lower salt rounds

    await User.updateOne({ _id: userId }, { password: hashedPassword });

    return { message: "Password updated" };
  }

  async searchUsers(query) {
    // Direct regex without escaping
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    return users;
  }
}

module.exports = new UserService();
```

### **Tu Tarea**

1. **Diseña un prompt SPICE** que analice el código y genere un review estructurado:

   - 🔒 **Seguridad**: Vulnerabilidades críticas/medias/bajas
   - ⚡ **Performance**: Problemas de rendimiento y escalabilidad
   - 🧹 **Code Quality**: Mantenibilidad y best practices
   - 🐛 **Bugs Potenciales**: Issues que pueden causar errores
   - ✅ **Aspectos Positivos**: Qué está bien implementado
   - 🔧 **Recomendaciones**: Fixes concretos con ejemplos de código

2. **Formato de salida**: Markdown estructurado con prioridades y líneas específicas

3. **Criterios de calidad del review**:
   - Identifica issues reales (no false positives)
   - Proporciona line numbers específicos
   - Incluye código de ejemplo para fixes
   - Prioriza issues por severidad
   - Explica el "por qué" de cada recomendación

### **Problemas Esperados a Identificar**

Para validar la efectividad de tu prompt, estos son algunos issues que debería detectar:

- 🚨 **Critical**: Hardcoded JWT secret
- 🚨 **Critical**: NoSQL injection vulnerability en searchUsers
- 🔴 **High**: No input validation en updateUserPassword
- 🔴 **High**: No pagination en getAllUsers (DoS potential)
- 🟡 **Medium**: Lower salt rounds en updateUserPassword
- 🟡 **Medium**: Inconsistent token expiration times
- 🟡 **Medium**: Generic error messages (info disclosure)
- 🔵 **Low**: No proper logging for security events
- 🔵 **Low**: Inconsistent error handling patterns

---

## 📊 Entregables del Reto

### **1. Documentación de Prompts**

Para cada challenge, documenta:

```markdown
## Challenge [X]: [Nombre]

### Prompt SPICE Utilizado
```

[Tu prompt completo aquí]

```

### Configuración LLM
- **Modelo**: GPT-4 / Claude-3 / etc.
- **Temperatura**: 0.1
- **Max Tokens**: 4000
- **Otros parámetros**: [...]

### Resultados Obtenidos
```

[Respuesta del LLM aquí]

```

### Análisis de Calidad
- ✅ **Criterios Cumplidos**: [lista]
- ❌ **Criterios No Cumplidos**: [lista con explicación]
- 📊 **Score**: X/100 puntos
- ⏱️ **Tiempo Generación**: X segundos
- 💰 **Costo Estimado**: $X.XX
- 🔄 **Iteraciones Necesarias**: X

### Validación Práctica
- ¿El resultado es utilizable sin edición?
- ¿Cumple el objetivo original?
- ¿Qué mejorarías del prompt?

### ROI Analysis
- **Tiempo Manual Estimado**: X horas
- **Tiempo con IA**: X minutos
- **Ahorro de Tiempo**: X%
- **Calidad vs Manual**: [comparación]
```

### **2. Reflexión y Aprendizajes**

```markdown
## Reflexión del Proceso

### Principales Aprendizajes

1. **Metodología SPICE**: [qué funcionó mejor]
2. **Optimización de Prompts**: [iteraciones necesarias]
3. **Limitaciones Encontradas**: [problemas y soluciones]

### Recomendaciones para Uso Productivo

1. **Templates Reutilizables**: [cómo estructurarías templates]
2. **Integration en Workflow**: [dónde/cuándo usarías estos prompts]
3. **Mejoras Futuras**: [cómo evolucionarías estos prompts]

### Métricas de Efectividad

| Métrica             | Challenge 1 | Challenge 2 | Challenge 3 | Promedio |
| ------------------- | ----------- | ----------- | ----------- | -------- |
| Calidad (1-10)      | X           | X           | X           | X        |
| Velocidad vs Manual | Xx%         | Xx%         | Xx%         | Xx%      |
| Utilidad Inmediata  | Xx%         | Xx%         | Xx%         | Xx%      |
| Necesita Edición    | Sí/No       | Sí/No       | Sí/No       | -        |
```

### **3. Automation Script (Bonus)**

Si completas los 3 challenges exitosamente, crea un script que automatice uno de los prompts:

```javascript
// prompt-automation-challenge.js
const { PromptAutomation } = require("./prompt-automation");

class ChallengeAutomation {
  constructor() {
    this.automation = new PromptAutomation(llmClient);
  }

  async runChallenge1(apiSpec, businessRules) {
    // Tu implementación aquí
    return await this.automation.generate("test-generation", {
      api_specification: JSON.stringify(apiSpec),
      business_rules: businessRules.join("\n"),
      // ... otros parámetros
    });
  }

  // Implementa los otros challenges...
}

// Ejemplo de uso
const challenger = new ChallengeAutomation();
const results = await challenger.runChallenge1(apiSpec, businessRules);
console.log("Generated tests:", results.content);
```

---

## 🏆 Criterios de Evaluación Final

### **Scoring Rubric (100 puntos total)**

| Criterio                  | Puntos | Descripción                                      |
| ------------------------- | ------ | ------------------------------------------------ |
| **SPICE Implementation**  | 30 pts | Cada sección SPICE bien estructurada y detallada |
| **Results Quality**       | 25 pts | Outputs son profesionales y utilizables          |
| **Documentation**         | 20 pts | Análisis completo y reflexión profunda           |
| **Practical Application** | 15 pts | Prompts resuelven problemas reales efectivamente |
| **Innovation & Bonus**    | 10 pts | Automation script, optimizaciones creativas      |

### **Niveles de Logro**

- **🏆 Expert (90-100 pts)**: Prompts production-ready, automation implementada, análisis profundo
- **🥈 Advanced (80-89 pts)**: Prompts funcionales, documentación completa, buen ROI
- **🥉 Competent (70-79 pts)**: SPICE aplicado correctamente, resultados utilizables
- **📚 Learning (60-69 pts)**: Conceptos entendidos, necesita refinamiento
- **🔄 Retry (&lt;60 pts)**: Requiere revisar metodología y rehacer challenges

---

## 💡 Tips para el Éxito

### **Optimización de Prompts**

1. **Iteration Strategy**:

   ```markdown
   Version 1.0: Basic SPICE structure
   Version 1.1: Add specific output format
   Version 1.2: Refine constraints based on results
   Version 2.0: Add evaluation criteria
   ```

2. **Context Management**:

   - Prioriza información más importante al inicio
   - Usa bullets y estructura clara
   - Incluye ejemplos concretos vs descripciones abstractas

3. **Output Validation**:
   - Siempre incluye formato esperado
   - Agrega criterios de validación
   - Especifica qué NO quieres en el output

### **Debugging Prompts**

Si tu prompt no genera buenos resultados:

1. **🔍 Diagnóstico**:

   - ¿Es específico el SETUP?
   - ¿La PERSONA tiene suficiente expertise?
   - ¿Los INPUTS están completos?
   - ¿Las CONSTRAINTS son claras?
   - ¿La EVALUATION es objetiva?

2. **🔧 Fixes Comunes**:

   - Agregar ejemplos concretos
   - Reducir ambigüedad en instrucciones
   - Especificar formato de salida más detalladamente
   - Incluir casos edge en CONSTRAINTS

3. **⚡ Quick Wins**:
   - Usar "Respond with only [format]" para outputs estructurados
   - Incluir "Do not include explanations unless requested"
   - Agregar "Use realistic data, avoid placeholder values"

---

¡Acepta el reto y conviértete en un **Prompt Engineer profesional**! 🚀

Tu capacidad de automatizar tareas complejas usando IA será una ventaja competitiva crucial en tu carrera como developer.
