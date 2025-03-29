interface SignOptions {
  expiresIn?: string;
}

interface JWT {
  sign(payload: Record<string, unknown>, options?: SignOptions): string;
}

export interface IRequest {
  body: Record<string, unknown>;
  params: Record<string, string>;
  queryParameters: Record<string, string>;
  jwt: JWT;
}

export interface IResponse {
  statusCode: number;
  body?: Record<string, unknown>;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
