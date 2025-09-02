import express from 'express';
res.json({ status: 'ok', time: new Date().toISOString() });
});


// --- CRUD en memoria: students ---
const state = { students: [] }; // {id, name, group}
let nextId = 1;


function isValidStudent(body) {
  return body && typeof body.name === 'string' && body.name.trim() !== '' && typeof body.group === 'string';
}


app.get('/students', (req, res) => {
  res.json(state.students);
});


app.post('/students', (req, res) => {
  const { body } = req;
  if (!isValidStudent(body)) {
    return res.status(400).json({ error: 'Invalid student payload' });
  }
  const student = { id: nextId++, name: body.name.trim(), group: body.group };
  state.students.push(student);
  res.status(201).json(student);
});


app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = state.students.find(s => s.id === id);
  if (!found) return res.status(404).json({ error: 'Not found' });
  res.json(found);
});


app.put('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const { body } = req;
  const idx = state.students.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  if (!isValidStudent(body)) return res.status(400).json({ error: 'Invalid student payload' });
  const updated = { id, name: body.name.trim(), group: body.group };
  state.students[idx] = updated;
  res.json(updated);
});


app.delete('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const before = state.students.length;
  state.students = state.students.filter(s => s.id !== id);
  if (state.students.length === before) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});


// Para facilitar pruebas limpiando estado
app.delete('/__test__/reset', (req, res) => {
  state.students = [];
  nextId = 1;
  res.status(204).send();
});


export default app;