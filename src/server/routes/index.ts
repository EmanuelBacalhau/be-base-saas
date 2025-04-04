import type { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adapters/routeAdapter';
import { makeSignUpController } from '../../factories/account/makeSignUpController';
import { makeSignInController } from '../../factories/account/makeSignInController';
import { makeRefreshTokenController } from '../../factories/account/makeRefreshTokenController';
import { middlewareAdapter } from '../adapters/middlewareAdapter';
import { makeAuthenticationMiddleware } from '../../factories/account/makeAuthenticationMiddleware';
import { makeAuthorizationMiddleware } from '../../factories/account/makeAuthorizationMiddleware';

export async function routes(app: FastifyInstance) {
  app.post('/sign-up', routeAdapter(makeSignUpController()));
  app.post('/sign-in', routeAdapter(makeSignInController()));
  app.post('/refresh-token', routeAdapter(makeRefreshTokenController()));
  app.get(
    '/test-middleware',
    {
      preHandler: middlewareAdapter(makeAuthenticationMiddleware()),
    },
    async (request, reply) => {
      return reply.send({
        message: 'Middleware works',
        accountId: request.account.id,
      });
    },
  );
  app.get(
    '/test-middleware-authorization',
    {
      preHandler: [
        middlewareAdapter(makeAuthenticationMiddleware()),
        middlewareAdapter(makeAuthorizationMiddleware(['user:read'])),
      ],
    },
    async (request, reply) => {
      return reply.send({
        message: 'Middleware works',
        accountId: request.account.id,
      });
    },
  );
}
