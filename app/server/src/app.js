import express from 'express';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth';
import workspaceRoutes from './routes/workspace';

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());

app.use(authRoutes);
app.use(workspaceRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('listening on port 3000...');
  });
}

export { app };
