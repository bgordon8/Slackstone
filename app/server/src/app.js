import express from 'express';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('listening on port 3000...');
  });
}

export { app };
