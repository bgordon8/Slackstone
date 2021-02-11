import express from 'express';
import { json, urlencoded } from 'body-parser';
import jwt from 'jsonwebtoken';
import db from './db';
import { comparePass, hashPassword, createToken } from './utils';

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db('users').where({ email }).first();

    if (!user) {
      res.status(401).status({
        status: 'error',
        message: 'invalid credentials',
      });
    }

    const passwordValid = await comparePass(password, user.password);

    if (passwordValid) {
      const { password, ...rest } = user;

      const userInfo = Object.assign({}, { ...rest });

      const token = createToken(user);

      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp;

      res.status(200).send({
        status: 'success',
        message: 'user logged in',
        token,
        userInfo,
        expiresAt,
      });
    } else {
      res.status(403).json({ status: 'error', message: err.message });
    }
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = hashPassword(password);

    const userData = {
      email: email.toLowerCase(),
      username,
      password: hashedPassword,
    };

    const usernameExists = await db('users').where({ username }).first();

    if (usernameExists) {
      return res.status(400).send({
        status: 'error',
        message: 'username already exists',
      });
    }
    const emailExists = await db('users').where({ email }).first();

    if (emailExists) {
      return res.status(400).send({
        status: 'error',
        message: 'email already exists',
      });
    }

    const [user] = await db('users').insert(userData).returning('*');

    if (user) {
      const token = createToken(user);
      const decodedToken = jwt.decode(token);
      const expiresAt = decodedToken.exp;

      const { id, email, username, role } = user;

      const userInfo = {
        id,
        email,
        username,
        role,
      };
      res.status(200).send({
        status: 'success',
        message: 'user successfully registered',
        userInfo,
        token,
        expiresAt,
      });
    } else {
      res.status(400).send({
        status: 'error',
        message: 'there was a problem creating your account',
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: err.message,
    });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('listening on port 3000...');
  });
}

export { app };
