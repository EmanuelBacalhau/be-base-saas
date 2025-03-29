import type { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adaptres/routeAdapter';
import { makeSignUpController } from '../../factories/account/makeSignUpController';
import { makeSignInController } from '../../factories/account/makeSignInController';

export async function routes(app: FastifyInstance) {
  app.post('/sign-up', routeAdapter(makeSignUpController()));
  app.post('/sign-in', routeAdapter(makeSignInController()));
}
