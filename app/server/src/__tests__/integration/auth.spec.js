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
    it('returns a valid user with token', async () => {
      const res = await request.post('/auth/login').send({
        email: 'user@email.com',
        password: 'password123',
      });
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('userInfo');
      expect(res.body.userInfo).toHaveProperty('id');
      expect(res.body.userInfo.id).toBe(1);
      expect(res.body.userInfo).toHaveProperty('email');
      expect(res.body.userInfo.email).toBe('user@email.com');
      expect(res.body.userInfo).toHaveProperty('username');
      expect(res.body.userInfo.username).toBe('newUser');
      expect(res.body.userInfo).toHaveProperty('role');
      expect(res.body.userInfo.role).toBe('ADMIN');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('expiresAt');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('user logged in');
    });
  });

  describe('POST /auth/register', () => {
    it('returns a valid user with a token', async () => {
      const res = await request.post('/auth/register').send({
        username: 'test',
        email: 'new@email.com',
        password: 'password123',
      });
      console.log(res.body);

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('userInfo');
      expect(res.body.userInfo).toHaveProperty('id');
      expect(res.body.userInfo.id).toBe(2);
      expect(res.body.userInfo).toHaveProperty('email');
      expect(res.body.userInfo.email).toBe('new@email.com');
      expect(res.body.userInfo).toHaveProperty('username');
      expect(res.body.userInfo.username).toBe('test');
      expect(res.body.userInfo).toHaveProperty('role');
      expect(res.body.userInfo.role).toBe('USER');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('expiresAt');
      expect(res.body).toHaveProperty('message');
    });
  });
});
