import fastify from 'fastify';
import { env } from '../application/config/env';
import { routes } from './routes';
import { fastifyJwt } from '@fastify/jwt';

const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

app.addHook('preHandler', (req, res, next) => {
  req.jwt = app.jwt;
  return next();
});

app.register(routes);

app.listen(
  {
    port: env.PORT,
  },
  () => {
    if (env.NODE_ENV === 'production') {
      console.log('🚀 Server is running in PRODUCTION mode.');
    } else {
      console.log(`🚀 Server is running in DEVELOPMENT mode on http://localhost:${env.PORT}`);
    }
  },
);
