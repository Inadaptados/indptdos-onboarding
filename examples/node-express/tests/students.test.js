import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../app.js';


async function reset() {
  await request(app).delete('/__test__/reset');
}


describe('Students CRUD (in-memory)', () => {
  beforeEach(async () => { await reset(); });


  it('POST /students should validate payload', async () => {
    const bad = await request(app).post('/students').send({ name: '', group: 'G1' });
    expect(bad.status).toBe(400);
  });


  it('should create, read, update and delete a student', async () => {
    // Create
    const created = await request(app).post('/students').send({ name: 'Ana', group: 'G1' });
    expect(created.status).toBe(201);
    expect(created.body.id).toBeDefined();


    const id = created.body.id;


    // Read list
    const list = await request(app).get('/students');
    expect(list.status).toBe(200);
    expect(list.body.length).toBe(1);


    // Read single
    const single = await request(app).get(`/students/${id}`);
    expect(single.status).toBe(200);
    expect(single.body.name).toBe('Ana');


    // Update
    const updated = await request(app).put(`/students/${id}`).send({ name: 'Ana María', group: 'G2' });
    expect(updated.status).toBe(200);
    expect(updated.body.group).toBe('G2');


    // Delete
    const del = await request(app).delete(`/students/${id}`);
    expect(del.status).toBe(204);


    // Not found after delete
    const nf = await request(app).get(`/students/${id}`);
    expect(nf.status).toBe(404);
  });
});