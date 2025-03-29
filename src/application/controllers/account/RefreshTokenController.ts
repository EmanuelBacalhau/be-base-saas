import { z, ZodError } from 'zod';
import type { IController, IRequest, IResponse } from '../../interfaces/IController';
import type { RefreshTokenUseCase } from '../../useCases/account/RefreshTokenUseCase';
import { ExpiresTokenError } from '../../errors/ExpiresTokenError';

const schema = z.object({
  refreshToken: z.string().uuid(),
});

export class RefreshTokenController implements IController {
  constructor(private readonly refreshTokenUseCase: RefreshTokenUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const data = schema.parse(request.body);

      const { refreshToken } = await this.refreshTokenUseCase.execute(data);

      const token = await request.jwtSign({
        payload: {
          refreshToken,
        },
        options: {
          sign: {
            expiresIn: '1h',
          },
        },
      });

      return {
        statusCode: 200,
        body: {
          token,
          refreshToken,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 422,
          body: {
            error: error.issues,
          },
        };
      }

      if (error instanceof ExpiresTokenError) {
        return {
          statusCode: 401,
          body: {
            error: 'Token expired',
          },
        };
      }

      throw error;
    }
  }
}
