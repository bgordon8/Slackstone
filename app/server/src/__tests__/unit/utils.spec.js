import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { comparePass, hashPassword, createToken } from '../../utils';

describe('utils', () => {
  describe('comparePass()', () => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('password123', salt);
    it('returns true if valid', async () => {
      const validPassword = await comparePass('password123', hash);

      expect(validPassword).toBe(true);
    });

    it('throws an error if invalid', async () => {
      let error;

      try {
        await comparePass('invalid', hash);
      } catch (err) {
        error = err;
      }
      expect(error).toBeTruthy();
      expect(error.message).toBe('invalid credentials');
    });
  });

  describe('hashPassword()', () => {
    it('hashes a password', () => {
      const hash = hashPassword('password123');

      expect(hash).toBeTruthy();
      expect(hash).not.toBe('password123');
    });
  });

  describe('createToken', () => {
    it('creates a token from user', async () => {
      const token = createToken({
        id: 1,
        email: 'bubba@email.com',
        role: 'USER',
      });

      const decodedToken = jwt.decode(token);

      expect(token).toBeTruthy();
      expect(decodedToken).toHaveProperty('sub');
      expect(decodedToken.sub).toBe(1);
      expect(decodedToken).toHaveProperty('email');
      expect(decodedToken.email).toBe('bubba@email.com');
      expect(decodedToken).toHaveProperty('role');
      expect(decodedToken.role).toBe('USER');
    });

    it('throws an error if no role assigned to user', async () => {
      let error;

      try {
        createToken({
          id: 1,
          email: 'bubba@email.com',
        });
      } catch (err) {
        error = err;
      }

      expect(error).toBeTruthy();
      expect(error.message).toBe('no user role specified');
    });
  });
});
