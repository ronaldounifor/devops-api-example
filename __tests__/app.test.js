const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
  it('should return a hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Hello, DevOps!');
  });
});

