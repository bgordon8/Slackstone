import express from 'express';
import { json, urlencoded } from 'body-parser';
import jwt from 'jsonwebtoken';
import db from './db';
import { comparePass, createToken } from './utils';

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

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('listening on port 3000...');
  });
}

export { app };
