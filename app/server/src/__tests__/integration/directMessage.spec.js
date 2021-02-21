import supertest from 'supertest';
import { app } from '../../app';
import db from '../../db';

const request = supertest(app);

afterAll(async () => {
  await db.destroy();
});

describe('routes : direct messages', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  describe('GET /workspaces/:workspaceId/direct-messages/:recipientId', () => {
    it('returns all messages for conversation', async () => {
      const loginRes = await request.post('/auth/login').send({
        email: 'user@email.com',
        password: 'password123',
      });
      const res = await request.get('/workspaces/1/direct-messages/2').set({
        authorization: `Bearer ${loginRes.body.token}`,
      });

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('messages');
      expect(res.body.messages.length).toBe(2);
    });
  });

  describe('POST /direct-messages/:recipientId/new', () => {
    it('creates a direct message for recipient', async () => {
      const loginRes = await request.post('/auth/login').send({
        email: 'user@email.com',
        password: 'password123',
      });
      const res = await request
        .post('/direct-messages/2/new')
        .send({
          message: {
            workspaceId: 1,
            recipientId: 2,
            message: 'test message',
          },
        })
        .set({
          authorization: `Bearer ${loginRes.body.token}`,
        });

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('message');
    });
  });
});
