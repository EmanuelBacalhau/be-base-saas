import type { FastifyReply, FastifyRequest } from 'fastify';
import type { IMiddleware } from '../../application/interfaces/IMiddleware';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const response = await middleware.handle({
      headers: request.headers as Record<string, string>,
      jwtVerify: request.jwtVerify,
      account: request.account,
    });

    if (response.statusCode === 401) {
      return reply.status(response.statusCode).send(response.body);
    }

    if (response.statusCode === 200 && response.body) {
      request.account = {
        id: response.body.accountId as string,
        role: response.body.role as string,
      };
    }

    if (response.statusCode === 403) {
      return reply.status(response.statusCode).send(response.body);
    }
  };
}
