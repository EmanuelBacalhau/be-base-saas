import { z } from 'zod';
import type { IController, IRequest, IResponse } from '../../interfaces/IController';
import type { SignInUseCase } from '../../useCases/account/SignInUseCase';
import type { RegisterRefreshTokenUseCase } from '../../useCases/refreshToken/RegisterRefreshTokenUseCase';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignInController implements IController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
    private readonly registerRefreshToken: RegisterRefreshTokenUseCase,
  ) {}
  async handle(request: IRequest): Promise<IResponse> {
    try {
      const data = schema.parse(request.body);

      const { accountId } = await this.signInUseCase.execute(data);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1);

      const { refreshToken } = await this.registerRefreshToken.execute({
        accountId,
        expiresAt,
      });

      const token = await request.jwtSign({
        payload: {
          accountId,
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
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            message: error.issues,
          },
        };
      }

      throw error;
    }
  }
}
