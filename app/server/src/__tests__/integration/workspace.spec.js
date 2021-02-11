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

describe('routes : workspace', () => {
  describe('GET /workspaces', () => {
    it('returns all workspaces', async () => {
      const res = await request.get('/workspaces');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('workspaces');
      expect(res.body.workspaces.length).toBe(1);
      expect(res.body.workspaces[0]).toHaveProperty('id');
      expect(res.body.workspaces[0].id).toBe(1);
      expect(res.body.workspaces[0]).toHaveProperty('name');
      expect(res.body.workspaces[0].name).toBe('apollo');
      expect(res.body.workspaces[0]).toHaveProperty('ownerId');
      expect(res.body.workspaces[0].ownerId).toBe(1);
    });
  });

  describe('GET /workspaces/:id', () => {
    it('returns workspace by id', async () => {
      const res = await request.get('/workspaces/1');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('workspace');
      expect(res.body.workspace).toHaveProperty('id');
      expect(res.body.workspace.id).toBe(1);
      expect(res.body.workspace).toHaveProperty('name');
      expect(res.body.workspace.name).toBe('apollo');
      expect(res.body.workspace).toHaveProperty('ownerId');
      expect(res.body.workspace.id).toBe(1);
    });
  });
});
