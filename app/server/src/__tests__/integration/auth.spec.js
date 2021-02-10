import supertest from 'supertest';
import { app } from '../../app';
import db from '../../db';

const request = supertest(app);

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe('routes: auth', () => {
  describe('POST /auth/login', () => {
    it('returns a valid user', async () => {
      const res = await request.post('/auth/login').send({
        email: 'user@email.com',
        password: 'password123',
      });
      expect(res.status).toBe(200);
    });
  });
});
