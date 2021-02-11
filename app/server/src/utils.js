import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function comparePass(userPassword, dbPassword) {
  const valid = await bcrypt.compareSync(userPassword, dbPassword);

  if (!!valid) {
    return true;
  } else {
    throw new Error('invalid credentials');
  }
}

export function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

export function createToken(user) {
  if (!user.role) {
    throw new Error('no user role specified');
  }

  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role,
      iss: 'api.slack',
      aud: 'api.slack',
    },
    'changeme',
    { algorithm: 'HS256', expiresIn: '1hr' }
  );
}
