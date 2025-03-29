import type { IMiddleware, IRequest, IResponse } from '../interfaces/IMiddleware';

export class AuthenticationMiddleware implements IMiddleware {
  async handle(request: IRequest): Promise<IResponse> {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return {
        statusCode: 401,
        body: { error: 'Unauthorized' },
      };
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      return {
        statusCode: 401,
        body: { error: 'Unauthorized' },
      };
    }

    try {
      const { sub, role } = await request.jwtVerify();

      return {
        statusCode: 200,
        body: {
          accountId: sub,
          role: role,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: { error: 'Unauthorized' },
      };
    }
  }
}
