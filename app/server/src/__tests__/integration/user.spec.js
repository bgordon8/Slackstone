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

describe('routes : user', () => {
  describe('GET /users/:userId/workspaces', () => {
    it('returns workspaces by user id', async () => {
      const res = await request.get('/users/1/workspaces');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('workspaces');
      expect(res.body.workspaces.length).toBe(1);
    });
  });
});
