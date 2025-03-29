import type { JWT } from '@fastify/jwt';

interface UserPayload {
  accountId: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload;
  }
}
