---
id: plantillas
title: Plantillas útiles
slug: /99-recursos/plantillas
---

### User Story

Como &lt;rol&gt; quiero &lt;objetivo&gt; para &lt;beneficio&gt;.

**Ejemplo**
Como **estudiante** quiero **marcar asistencia escaneando un QR** para **evitar filas y perder tiempo**.

### Criteria (Gherkin opcional)

Feature: Registrar asistencia con QR Scenario: Escaneo exitoso Given un estudiante autenticado When escanea el QR válido de la sesión Then el sistema marca la asistencia y muestra confirmación

### Threat Model (STRIDE)

| Amenaza                | Descripción           | Mitigación                        |
| ---------------------- | --------------------- | --------------------------------- |
| Spoofing               | QR falsificado        | Firmar payload + expirar tokens   |
| Tampering              | Modificar request     | HTTPS + validaciones server-side  |
| Repudiation            | Negar acción          | Logs con trazabilidad             |
| Information Disclosure | Filtrado de datos     | Minimizar datos en QR + RBAC      |
| DoS                    | Bombardeo de requests | Rate limiting + captcha selectivo |
| Elevation of Privilege | Escalar permisos      | Reglas de autorización por rol    |

### PR Checklist

- [ ] Cumple requerimientos del reto
- [ ] Lint/tests OK
- [ ] Validación de entrada y manejo de errores
- [ ] Revisión de seguridad básica (OWASP)
- [ ] Accesibilidad mínima (labels, contraste)
