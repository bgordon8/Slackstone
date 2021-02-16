import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth';
import workspaceRoutes from './routes/workspace';
import user from './middleware/user';
import channelRoutes from './routes/channel';
import userRoutes from './routes/user';
const app = express();

app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(user);
app.use(authRoutes);
app.use(workspaceRoutes);
app.use(channelRoutes);
app.use(userRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(4000, () => {
    console.log('listening on port 4000...');
  });
}

export { app };
