import type { FastifyInstance } from 'fastify';
import { routeAdapter } from '../adaptres/routeAdapter';
import { makeSignUpController } from '../../factories/account/makeSignUpController';

export async function routes(app: FastifyInstance) {
    app.post('/accounts', routeAdapter(makeSignUpController()));
}
