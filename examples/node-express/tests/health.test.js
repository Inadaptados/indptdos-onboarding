import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app.js';


describe('GET /health', () => {
  it('should return status ok and a valid ISO time', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(typeof res.body.time).toBe('string');
    // ISO 8601 simple check
    expect(() => new Date(res.body.time).toISOString()).not.toThrow();
  });
});