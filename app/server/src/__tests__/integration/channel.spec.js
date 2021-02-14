import supertest from 'supertest';
import { app } from '../../app';
import db from '../../db';

const request = supertest(app);

afterAll(async () => {
  await db.destroy();
});

describe('routes : channel', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  describe('GET /channels', () => {
    it('returns all channels', async () => {
      const res = await request.get('/channels');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('channels');
      expect(res.body.channels.length).toBe(1);
      expect(res.body.channels[0]).toHaveProperty('id');
      expect(res.body.channels[0].id).toBe(1);
      expect(res.body.channels[0]).toHaveProperty('name');
      expect(res.body.channels[0].name).toBe('general');
    });
  });
});
