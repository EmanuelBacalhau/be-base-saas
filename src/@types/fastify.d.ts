import type { JWT } from '@fastify/jwt';

export interface AccountPayload {
  id: string;
  role: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
    account: AccountPayload;
  }
}
