export interface IRequest {
  headers: Record<string, string>;
  jwtVerify: () => Promise<Record<string, unknown>>;
}

export interface IResponse {
  statusCode: number;
  body: Record<string, unknown>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse>;
}
