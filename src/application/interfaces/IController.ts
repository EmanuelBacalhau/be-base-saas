export interface IRequest {
  body: Record<string, unknown>;
  params: Record<string, string>;
  queryParameters: Record<string, string>;
}

export interface IResponse {
  statusCode: number;
  body?: Record<string, unknown>;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
