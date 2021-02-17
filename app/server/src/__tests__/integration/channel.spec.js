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

  describe('GET /channels/:channelId/data', () => {
    it('returns channel data by channel id', async () => {
      const res = await request.get('/channels/1/data');
      console.log(res.body);
      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('status');
      expect(res.body.status).toBe('success');
      expect(res.body).toHaveProperty('name');
      expect(res.body.name).toBe('general');
      expect(res.body).toHaveProperty('private');
      expect(res.body.private).toBe(false);
      expect(res.body).toHaveProperty('default');
      expect(res.body.default).toBe(true);
      expect(res.body).toHaveProperty('members');
      expect(res.body.members.length).toBe(2);
      expect(res.body).toHaveProperty('messages');
      expect(res.body.messages.length).toBe(2);
    });
  });
});
