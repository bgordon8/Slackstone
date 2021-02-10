import express from 'express';
import { json, urlencoded } from 'body-parser';
import bcrypt from 'bcryptjs';
import db from './db';

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

    const valid = await bcrypt.compareSync(password, user.password);

    if (!valid) {
      res.status(401).status({
        status: 'error',
        message: 'invalid credentials',
      });
    }

    res.status(200).send({
      status: 'success',
      userInfo: user,
    });
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
