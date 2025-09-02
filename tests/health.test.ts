import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app'; // tu app Express


describe('GET /health', () => {
  it('debe regresar status ok y time', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('time');
    // Valida formato de fecha ISO
    expect(() => new Date(res.body.time).toISOString()).not.toThrow();
  });
});