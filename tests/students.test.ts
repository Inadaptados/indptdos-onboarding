import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';


let createdId: string;


describe('CRUD de Students', () => {
  it('POST /students crea un estudiante', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Ana', group: 'G1' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    createdId = res.body.id;
  });


  it('GET /students regresa lista con el creado', async () => {
    const res = await request(app).get('/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find((s: any) => s.id === createdId)).toBeDefined();
  });


  it('PUT /students/:id actualiza un estudiante', async () => {
    const res = await request(app)
      .put(`/students/${createdId}`)
      .send({ name: 'Ana María' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('name', 'Ana María');
  });


  it('DELETE /students/:id elimina un estudiante', async () => {
    const res = await request(app).delete(`/students/${createdId}`);
    expect(res.statusCode).toBe(204);
  });
});