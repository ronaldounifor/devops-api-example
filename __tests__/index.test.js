const request = require('supertest');
const app = require('./index');

describe('Testando a API de usuários', () => {
  let createdUserId;

  it('Deve criar um novo usuário', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'João' });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('João');
    createdUserId = res.body.id; // salvar para testar o delete
  });

  it('Deve listar usuários', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('Deve remover um usuário existente', async () => {
    const res = await request(app).delete(`/users/${createdUserId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Usuário removido');
  });

  it('Deve retornar 404 ao tentar remover um usuário inexistente', async () => {
    const res = await request(app).delete('/users/999999');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Usuário não encontrado');
  });
});
