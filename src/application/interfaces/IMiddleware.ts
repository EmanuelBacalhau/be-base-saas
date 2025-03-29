import type { AccountPayload } from '../../@types/fastify';

export interface IRequest {
  headers: Record<string, string>;
  jwtVerify: () => Promise<Record<string, unknown>>;
  account: AccountPayload;
}

export interface IResponse {
  statusCode: number;
  body?: Record<string, unknown>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse>;
}
