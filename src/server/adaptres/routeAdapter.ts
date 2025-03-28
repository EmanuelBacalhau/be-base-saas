import type { FastifyReply, FastifyRequest } from 'fastify';
import type { IController } from '../../application/interfaces/IController';

export function routeAdapter(controller: IController) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const response = await controller.handle({
      body: request.body as Record<string, unknown>,
      params: request.params as Record<string, string>,
      queryParameters: request.query as Record<string, string>,
    });

    reply.code(response.statusCode).send(response.body);
  };
}
