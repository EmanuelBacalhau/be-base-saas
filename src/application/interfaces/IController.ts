import type { FastifyJwtSignOptions, SignPayloadType } from '@fastify/jwt';

export interface IJwtSign {
  payload: SignPayloadType;
  options?: FastifyJwtSignOptions;
}

export interface IRequest {
  body: Record<string, unknown>;
  params: Record<string, string>;
  queryParameters: Record<string, string>;
  jwtSign: (params: IJwtSign) => Promise<string>;
}

export interface IResponse {
  statusCode: number;
  body?: Record<string, unknown>;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
