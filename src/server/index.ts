import fastify from 'fastify';
import { env } from '../application/config/env';
import { routes } from './routes';

const app = fastify();

app.register(routes);

app.listen(
  {
    port: env.PORT,
  },
  () => {
    console.log('Server is running on http://localhost:3001');
  },
);
