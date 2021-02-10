import express from 'express';

const app = express();

app.post('/auth/login', async (req, res) => {
  res.status(200).send({});
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('listening on port 3000...');
  });
}

export { app };
