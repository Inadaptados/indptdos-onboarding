---
id: reto-api-healthcheck
title: "Reto: API Health Check y Monitoring"
sidebar_position: 1
---

# 🎯 Reto Práctico: Health Check y Sistema de Monitoreo

> **Duración estimada**: 60-90 minutos
> **Dificultad**: Principiante-Intermedio
> **Objetivo**: Implementar un sistema completo de health checks, logging y monitoring para APIs profesionales.

## 📋 Contexto

Todo servicio en producción debe tener endpoints de health check que permitan a los sistemas de monitoreo, load balancers y orquestadores (como Kubernetes) verificar el estado del servicio. Implementarás un sistema robusto de health checks con diferentes niveles de verificación.

## 🎯 Objetivos de Aprendizaje

Al completar este reto serás capaz de:

- ✅ **Diseñar health checks** efectivos para diferentes componentes
- ✅ **Implementar logging estructurado** con diferentes niveles
- ✅ **Crear middleware de monitoring** para requests/responses
- ✅ **Configurar métricas básicas** de rendimiento
- ✅ **Testing de endpoints** con diferentes escenarios
- ✅ **Documentar APIs** con OpenAPI/Swagger

---

## 🏗️ Arquitectura del Health Check System

```mermaid
graph TB
    A[Load Balancer] -->|Health Check| B[/health endpoint]
    B --> C[Health Check Service]

    C --> D[Database Check]
    C --> E[Redis Check]
    C --> F[External API Check]
    C --> G[System Resources]

    subgraph "Monitoring"
        H[Request Logger]
        I[Performance Metrics]
        J[Error Tracking]
    end

    subgraph "Health Levels"
        K[Basic: /health]
        L[Detailed: /health/detailed]
        M[Ready: /ready]
        N[Live: /live]
    end
```

---

## 📁 Estructura del Proyecto

```
src/
├── app.js                          # Express app setup
├── server.js                       # Server startup
├── routes/
│   └── health.js                   # Health check routes
├── services/
│   ├── healthService.js            # Health check business logic
│   └── monitoringService.js        # Metrics collection
├── middlewares/
│   ├── requestLogger.js            # HTTP request logging
│   ├── performanceMonitor.js       # Response time tracking
│   └── errorTracker.js             # Error monitoring
├── utils/
│   ├── logger.js                   # Winston logger setup
│   └── systemInfo.js               # System information
└── tests/
    ├── health.test.js              # Health endpoint tests
    └── integration/
        └── api.test.js             # Full API integration tests
```

---

## 🔧 Implementación Paso a Paso

### 1. **Logger Profesional con Winston**

```javascript
// utils/logger.js
import winston from "winston";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom log levels con colores
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Custom format para desarrollo
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const { timestamp, level, message, requestId, duration, ...meta } = info;

    let logMessage = `${timestamp} [${level}]`;

    if (requestId) logMessage += ` [${requestId}]`;
    if (duration) logMessage += ` (${duration}ms)`;

    logMessage += `: ${message}`;

    // Add metadata if present
    if (Object.keys(meta).length > 0) {
      logMessage += `\n  ${JSON.stringify(meta, null, 2)}`;
    }

    return logMessage;
  })
);

// JSON format para producción
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Determine log directory
const logDir = path.join(process.cwd(), "logs");

// Create logs directory if it doesn't exist
import fs from "fs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create transports
const transports = [
  // Console transport
  new winston.transports.Console({
    level: process.env.LOG_LEVEL || "debug",
    format:
      process.env.NODE_ENV === "production"
        ? productionFormat
        : developmentFormat,
  }),
];

// File transports for production
if (process.env.NODE_ENV === "production") {
  transports.push(
    // Error log
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: productionFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

    // Combined log
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      format: productionFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Create logger instance
export const logger = winston.createLogger({
  level:
    process.env.LOG_LEVEL ||
    (process.env.NODE_ENV === "production" ? "info" : "debug"),
  levels,
  format:
    process.env.NODE_ENV === "production"
      ? productionFormat
      : developmentFormat,
  transports,
  // Don't exit on handled exceptions
  exitOnError: false,
});

// Custom logging methods
export class Logger {
  static info(message, meta = {}) {
    logger.info(message, meta);
  }

  static error(message, error = null, meta = {}) {
    const errorMeta = error
      ? {
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
          },
          ...meta,
        }
      : meta;

    logger.error(message, errorMeta);
  }

  static warn(message, meta = {}) {
    logger.warn(message, meta);
  }

  static debug(message, meta = {}) {
    logger.debug(message, meta);
  }

  static http(message, meta = {}) {
    logger.http(message, meta);
  }

  // Structured logging for requests
  static logRequest(req, res, duration) {
    const { method, url, ip, headers } = req;
    const { statusCode } = res;

    this.http(`${method} ${url}`, {
      requestId: req.requestId,
      method,
      url,
      statusCode,
      ip,
      userAgent: headers["user-agent"],
      duration,
      timestamp: new Date().toISOString(),
    });
  }

  // Performance logging
  static logPerformance(operation, duration, meta = {}) {
    this.info(`Performance: ${operation}`, {
      operation,
      duration: `${duration}ms`,
      ...meta,
    });
  }
}

// Stream for Morgan HTTP logger
export const morganStream = {
  write: (message) => {
    logger.http(message.trim());
  },
};
```

### 2. **Middleware de Request Logging**

```javascript
// middlewares/requestLogger.js
import { Logger } from "../utils/logger.js";
import { randomUUID } from "crypto";

export const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Generate unique request ID
  req.requestId = req.headers["x-request-id"] || randomUUID();

  // Add request ID to response headers
  res.set("X-Request-ID", req.requestId);

  // Log incoming request
  Logger.info("Incoming request", {
    requestId: req.requestId,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    contentType: req.get("Content-Type"),
    contentLength: req.get("Content-Length"),
    timestamp: new Date().toISOString(),
  });

  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    const duration = Date.now() - start;

    // Log response
    Logger.logRequest(req, res, duration);

    // Log slow requests
    if (duration > 1000) {
      // > 1 second
      Logger.warn("Slow request detected", {
        requestId: req.requestId,
        method: req.method,
        url: req.url,
        duration: `${duration}ms`,
        statusCode: res.statusCode,
      });
    }

    // Log errors
    if (res.statusCode >= 400) {
      Logger.error("Request resulted in error", null, {
        requestId: req.requestId,
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
      });
    }

    originalEnd.call(this, chunk, encoding);
  };

  next();
};

// Middleware para capturar request body en logs (solo para debugging)
export const requestBodyLogger = (req, res, next) => {
  if (process.env.LOG_REQUEST_BODY === "true" && req.body) {
    // Never log sensitive information
    const sanitizedBody = { ...req.body };

    // Remove sensitive fields
    const sensitiveFields = ["password", "token", "secret", "key", "auth"];
    sensitiveFields.forEach((field) => {
      if (sanitizedBody[field]) {
        sanitizedBody[field] = "[REDACTED]";
      }
    });

    Logger.debug("Request body", {
      requestId: req.requestId,
      body: sanitizedBody,
    });
  }

  next();
};
```

### 3. **Sistema de Health Checks Robusto**

```javascript
// services/healthService.js
import { Logger } from "../utils/logger.js";
import { SystemInfo } from "../utils/systemInfo.js";

export class HealthService {
  constructor() {
    this.checks = new Map();
    this.setupDefaultChecks();
  }

  // Register a new health check
  registerCheck(name, checkFunction, options = {}) {
    this.checks.set(name, {
      name,
      check: checkFunction,
      timeout: options.timeout || 5000,
      critical: options.critical || false,
      description: options.description || `Health check for ${name}`,
    });

    Logger.info(`Registered health check: ${name}`);
  }

  // Setup default system checks
  setupDefaultChecks() {
    // Basic application check
    this.registerCheck(
      "application",
      async () => {
        return {
          status: "healthy",
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          version: process.env.APP_VERSION || "1.0.0",
        };
      },
      { critical: true, description: "Application basic health" }
    );

    // Memory usage check
    this.registerCheck(
      "memory",
      async () => {
        const memUsage = process.memoryUsage();
        const totalMem = SystemInfo.getTotalMemory();
        const usedPercent = (memUsage.rss / totalMem) * 100;

        return {
          status: usedPercent < 80 ? "healthy" : "unhealthy",
          details: {
            rss: `${Math.round(memUsage.rss / 1024 / 1024)}MB`,
            heapUsed: `${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memUsage.heapTotal / 1024 / 1024)}MB`,
            external: `${Math.round(memUsage.external / 1024 / 1024)}MB`,
            usedPercent: `${usedPercent.toFixed(2)}%`,
          },
          threshold: "80%",
        };
      },
      { description: "Memory usage monitoring" }
    );

    // Disk space check
    this.registerCheck(
      "disk",
      async () => {
        const diskInfo = await SystemInfo.getDiskInfo();
        const usedPercent =
          ((diskInfo.total - diskInfo.free) / diskInfo.total) * 100;

        return {
          status: usedPercent < 85 ? "healthy" : "unhealthy",
          details: {
            total: `${Math.round(diskInfo.total / 1024 / 1024 / 1024)}GB`,
            free: `${Math.round(diskInfo.free / 1024 / 1024 / 1024)}GB`,
            used: `${Math.round(
              (diskInfo.total - diskInfo.free) / 1024 / 1024 / 1024
            )}GB`,
            usedPercent: `${usedPercent.toFixed(2)}%`,
          },
          threshold: "85%",
        };
      },
      { description: "Disk space monitoring" }
    );
  }

  // Execute a single health check with timeout
  async executeCheck(name, checkConfig) {
    const startTime = Date.now();

    try {
      // Create timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Health check timeout")),
          checkConfig.timeout
        );
      });

      // Execute check with timeout
      const result = await Promise.race([checkConfig.check(), timeoutPromise]);

      const duration = Date.now() - startTime;

      return {
        name,
        status: result.status || "healthy",
        description: checkConfig.description,
        details: result.details || result,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
        critical: checkConfig.critical,
      };
    } catch (error) {
      const duration = Date.now() - startTime;

      Logger.error(`Health check failed: ${name}`, error, {
        duration: `${duration}ms`,
        critical: checkConfig.critical,
      });

      return {
        name,
        status: "unhealthy",
        description: checkConfig.description,
        error: error.message,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
        critical: checkConfig.critical,
      };
    }
  }

  // Execute all health checks
  async getHealthStatus(detailed = false) {
    const startTime = Date.now();
    const results = [];
    let overallStatus = "healthy";
    let criticalFailures = 0;

    // Execute all checks in parallel
    const checkPromises = Array.from(this.checks.entries()).map(
      ([name, checkConfig]) => this.executeCheck(name, checkConfig)
    );

    const checkResults = await Promise.allSettled(checkPromises);

    // Process results
    checkResults.forEach((result, index) => {
      const checkName = Array.from(this.checks.keys())[index];

      if (result.status === "fulfilled") {
        const checkResult = result.value;
        results.push(checkResult);

        if (checkResult.status === "unhealthy") {
          if (checkResult.critical) {
            criticalFailures++;
            overallStatus = "unhealthy";
          } else if (overallStatus === "healthy") {
            overallStatus = "degraded";
          }
        }
      } else {
        // Check execution failed
        results.push({
          name: checkName,
          status: "unhealthy",
          error: "Check execution failed",
          critical: this.checks.get(checkName).critical,
          timestamp: new Date().toISOString(),
        });

        if (this.checks.get(checkName).critical) {
          criticalFailures++;
          overallStatus = "unhealthy";
        } else if (overallStatus === "healthy") {
          overallStatus = "degraded";
        }
      }
    });

    const totalDuration = Date.now() - startTime;

    const response = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      duration: `${totalDuration}ms`,
      checks: {
        total: results.length,
        healthy: results.filter((r) => r.status === "healthy").length,
        unhealthy: results.filter((r) => r.status === "unhealthy").length,
        critical_failures: criticalFailures,
      },
    };

    // Add system info for detailed response
    if (detailed) {
      response.system = await SystemInfo.getSystemInfo();
      response.details = results;
    }

    Logger.info(`Health check completed`, {
      status: overallStatus,
      duration: `${totalDuration}ms`,
      totalChecks: results.length,
      healthyChecks: response.checks.healthy,
      unhealthyChecks: response.checks.unhealthy,
      criticalFailures,
    });

    return response;
  }

  // Simple liveness check (for Kubernetes)
  async getLivenessStatus() {
    return {
      status: "alive",
      timestamp: new Date().toISOString(),
      uptime: `${Math.floor(process.uptime())}s`,
    };
  }

  // Readiness check (for load balancers)
  async getReadinessStatus() {
    // Only check critical components for readiness
    const criticalChecks = Array.from(this.checks.entries()).filter(
      ([_, config]) => config.critical
    );

    if (criticalChecks.length === 0) {
      return {
        status: "ready",
        timestamp: new Date().toISOString(),
      };
    }

    const results = await Promise.all(
      criticalChecks.map(([name, config]) => this.executeCheck(name, config))
    );

    const hasFailures = results.some((r) => r.status === "unhealthy");

    return {
      status: hasFailures ? "not_ready" : "ready",
      timestamp: new Date().toISOString(),
      critical_checks: results.map((r) => ({
        name: r.name,
        status: r.status,
      })),
    };
  }
}

// Singleton instance
export const healthService = new HealthService();
```

### 4. **Utilidades del Sistema**

```javascript
// utils/systemInfo.js
import os from "os";
import fs from "fs/promises";

export class SystemInfo {
  static getBasicInfo() {
    return {
      hostname: os.hostname(),
      platform: os.platform(),
      architecture: os.arch(),
      nodeVersion: process.version,
      processId: process.pid,
      uptime: process.uptime(),
      loadAverage: os.loadavg(),
      cpuCount: os.cpus().length,
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
    };
  }

  static getTotalMemory() {
    return os.totalmem();
  }

  static getFreeMemory() {
    return os.freemem();
  }

  static getMemoryUsage() {
    const total = os.totalmem();
    const free = os.freemem();
    const used = total - free;

    return {
      total,
      free,
      used,
      usedPercent: (used / total) * 100,
    };
  }

  static getCpuInfo() {
    const cpus = os.cpus();
    const loadAvg = os.loadavg();

    return {
      count: cpus.length,
      model: cpus[0]?.model || "Unknown",
      speed: cpus[0]?.speed || 0,
      loadAverage: {
        "1min": loadAvg[0],
        "5min": loadAvg[1],
        "15min": loadAvg[2],
      },
    };
  }

  static async getDiskInfo() {
    try {
      const stats = await fs.stat(process.cwd());
      // This is a simplified version - in production you'd use a library like 'df'
      return {
        total: 100 * 1024 * 1024 * 1024, // 100GB placeholder
        free: 50 * 1024 * 1024 * 1024, // 50GB placeholder
      };
    } catch (error) {
      return {
        total: 0,
        free: 0,
        error: error.message,
      };
    }
  }

  static async getSystemInfo() {
    const basic = this.getBasicInfo();
    const memory = this.getMemoryUsage();
    const cpu = this.getCpuInfo();
    const disk = await this.getDiskInfo();

    return {
      ...basic,
      memory: {
        total: `${Math.round(memory.total / 1024 / 1024 / 1024)}GB`,
        free: `${Math.round(memory.free / 1024 / 1024 / 1024)}GB`,
        used: `${Math.round(memory.used / 1024 / 1024 / 1024)}GB`,
        usedPercent: `${memory.usedPercent.toFixed(2)}%`,
      },
      cpu,
      disk: {
        total: `${Math.round(disk.total / 1024 / 1024 / 1024)}GB`,
        free: `${Math.round(disk.free / 1024 / 1024 / 1024)}GB`,
        used: `${Math.round((disk.total - disk.free) / 1024 / 1024 / 1024)}GB`,
      },
    };
  }
}
```

### 5. **Health Check Routes**

```javascript
// routes/health.js
import express from "express";
import { healthService } from "../services/healthService.js";
import { Logger } from "../utils/logger.js";

const router = express.Router();

// Basic health check - lightweight
router.get("/health", async (req, res) => {
  try {
    const health = await healthService.getLivenessStatus();

    res.status(200).json({
      ...health,
      service: "indaptados-api",
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    Logger.error("Basic health check failed", error, {
      requestId: req.requestId,
    });

    res.status(503).json({
      status: "unhealthy",
      error: "Health check failed",
      timestamp: new Date().toISOString(),
    });
  }
});

// Detailed health check - comprehensive
router.get("/health/detailed", async (req, res) => {
  try {
    const health = await healthService.getHealthStatus(true);

    const statusCode =
      health.status === "healthy"
        ? 200
        : health.status === "degraded"
        ? 200
        : 503;

    res.status(statusCode).json({
      ...health,
      service: "indaptados-api",
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    Logger.error("Detailed health check failed", error, {
      requestId: req.requestId,
    });

    res.status(503).json({
      status: "unhealthy",
      error: "Detailed health check failed",
      timestamp: new Date().toISOString(),
    });
  }
});

// Kubernetes liveness probe
router.get("/live", async (req, res) => {
  try {
    const liveness = await healthService.getLivenessStatus();
    res.status(200).json(liveness);
  } catch (error) {
    Logger.error("Liveness check failed", error);
    res.status(503).json({
      status: "dead",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Kubernetes readiness probe
router.get("/ready", async (req, res) => {
  try {
    const readiness = await healthService.getReadinessStatus();

    const statusCode = readiness.status === "ready" ? 200 : 503;
    res.status(statusCode).json(readiness);
  } catch (error) {
    Logger.error("Readiness check failed", error);
    res.status(503).json({
      status: "not_ready",
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// Prometheus metrics endpoint (basic)
router.get("/metrics", async (req, res) => {
  try {
    const health = await healthService.getHealthStatus(false);

    // Simple Prometheus-format metrics
    const metrics = [
      `# HELP app_health_status Application health status (1=healthy, 0=unhealthy)`,
      `# TYPE app_health_status gauge`,
      `app_health_status{service="indaptados-api"} ${
        health.status === "healthy" ? 1 : 0
      }`,
      "",
      `# HELP app_uptime_seconds Application uptime in seconds`,
      `# TYPE app_uptime_seconds counter`,
      `app_uptime_seconds{service="indaptados-api"} ${Math.floor(
        process.uptime()
      )}`,
      "",
      `# HELP app_memory_usage_bytes Application memory usage in bytes`,
      `# TYPE app_memory_usage_bytes gauge`,
      `app_memory_usage_bytes{service="indaptados-api"} ${
        process.memoryUsage().rss
      }`,
      "",
    ].join("\n");

    res.set("Content-Type", "text/plain");
    res.status(200).send(metrics);
  } catch (error) {
    Logger.error("Metrics endpoint failed", error);
    res.status(500).send("# Error generating metrics");
  }
});

export default router;
```

### 6. **Testing Completo**

```javascript
// tests/health.test.js
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Health Check Endpoints", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(0); // Random port for testing
  });

  afterAll(async () => {
    await server.close();
  });

  describe("GET /health", () => {
    it("should return basic health status", async () => {
      const response = await request(server).get("/health").expect(200);

      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("uptime");
      expect(response.body.service).toBe("indaptados-api");
      expect(typeof response.body.uptime).toBe("string");
    });

    it("should include request ID in logs", async () => {
      const requestId = "test-request-123";

      const response = await request(server)
        .get("/health")
        .set("X-Request-ID", requestId)
        .expect(200);

      expect(response.headers["x-request-id"]).toBe(requestId);
    });
  });

  describe("GET /health/detailed", () => {
    it("should return detailed health information", async () => {
      const response = await request(server)
        .get("/health/detailed")
        .expect(200);

      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("duration");
      expect(response.body).toHaveProperty("checks");
      expect(response.body).toHaveProperty("system");
      expect(response.body).toHaveProperty("details");

      // Validate checks object
      expect(response.body.checks).toHaveProperty("total");
      expect(response.body.checks).toHaveProperty("healthy");
      expect(response.body.checks).toHaveProperty("unhealthy");
      expect(response.body.checks).toHaveProperty("critical_failures");

      // Validate system info
      expect(response.body.system).toHaveProperty("hostname");
      expect(response.body.system).toHaveProperty("platform");
      expect(response.body.system).toHaveProperty("nodeVersion");
    });

    it("should include all default health checks", async () => {
      const response = await request(server)
        .get("/health/detailed")
        .expect(200);

      const checkNames = response.body.details.map((check) => check.name);
      expect(checkNames).toContain("application");
      expect(checkNames).toContain("memory");
      expect(checkNames).toContain("disk");
    });
  });

  describe("GET /live", () => {
    it("should return liveness status", async () => {
      const response = await request(server).get("/live").expect(200);

      expect(response.body.status).toBe("alive");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("uptime");
    });
  });

  describe("GET /ready", () => {
    it("should return readiness status", async () => {
      const response = await request(server).get("/ready").expect(200);

      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("timestamp");
      expect(["ready", "not_ready"]).toContain(response.body.status);
    });
  });

  describe("GET /metrics", () => {
    it("should return Prometheus metrics", async () => {
      const response = await request(server).get("/metrics").expect(200);

      expect(response.headers["content-type"]).toContain("text/plain");
      expect(response.text).toContain("app_health_status");
      expect(response.text).toContain("app_uptime_seconds");
      expect(response.text).toContain("app_memory_usage_bytes");
    });
  });

  describe("Error Handling", () => {
    it("should handle health check failures gracefully", async () => {
      // This would require mocking a failing health check
      // For now, we verify the endpoint exists and returns properly
      const response = await request(server).get("/health").expect(200);

      expect(response.body).toHaveProperty("status");
    });
  });
});

// Performance tests
describe("Health Check Performance", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(0);
  });

  afterAll(async () => {
    await server.close();
  });

  it("should respond to basic health check within 100ms", async () => {
    const start = Date.now();

    await request(server).get("/health").expect(200);

    const duration = Date.now() - start;
    expect(duration).toBeLessThan(100);
  });

  it("should handle concurrent health checks", async () => {
    const requests = Array(10)
      .fill(null)
      .map(() => request(server).get("/health"));

    const responses = await Promise.all(requests);

    responses.forEach((response) => {
      expect(response.status).toBe(200);
      expect(response.body.status).toBeDefined();
    });
  });
});
```

---

## ✅ Criterios de Evaluación

### Excelente (90-100%)

- ✅ Health checks funcionando en todos los niveles (/health, /health/detailed, /live, /ready)
- ✅ Logging estructurado con Winston y diferentes levels
- ✅ Middleware de request logging con request IDs
- ✅ Sistema de métricas básico funcionando
- ✅ Tests completos con cobertura >90%
- ✅ Manejo robusto de errores y timeouts
- ✅ Documentación clara de todos los endpoints

### Bueno (75-89%)

- ✅ Health checks básicos implementados correctamente
- ✅ Logging funcional con formato estructurado
- ✅ Request/response logging básico
- ✅ Tests unitarios para endpoints principales
- ✅ Manejo básico de errores

### Satisfactorio (60-74%)

- ✅ Endpoint /health básico funcionando
- ✅ Logger configurado correctamente
- ✅ Logs de requests implementados
- ✅ Al menos un test funcionando

---

## 🎯 Entregables

1. **API completa** con todos los endpoints de health check
2. **Sistema de logging** estructurado funcionando
3. **Suite de tests** con Vitest
4. **Documentación README** con ejemplos de uso
5. **Demo en vivo** mostrando diferentes niveles de health checks

---

## 🚀 Bonus Features (Opcional)

- **Custom health checks** para servicios externos (DB, Redis, APIs)
- **Dashboard básico** para visualizar métricas
- **Alerting simple** cuando health checks fallan
- **Docker health checks** configurados
- **Graceful shutdown** handling
- **Circuit breaker** pattern para servicios externos

---

_¿Tienes dudas sobre implementación de logging o health checks? ¡Pregunta en el canal #backend-help de Slack!_ 🔍
