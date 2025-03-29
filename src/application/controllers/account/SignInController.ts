import { z, ZodError } from 'zod';
import type { IController, IRequest, IResponse } from '../../interfaces/IController';
import type { SignInUseCase } from '../../useCases/account/SignInUseCase';
import type { RegisterRefreshTokenUseCase } from '../../useCases/account/RegisterRefreshTokenUseCase';
import { constants } from '../../config/contants';
import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError';

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

      const { accountId, roleId } = await this.signInUseCase.execute(data);
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + constants.REFRESH_TOKEN_EXPIRATION_DAYS);

      const { refreshToken } = await this.registerRefreshToken.execute({
        accountId,
        expiresAt,
      });

      const token = request.jwt.sign(
        {
          sub: accountId,
          role: roleId,
        },
        {
          expiresIn: constants.ACCESS_TOKEN_EXPIRATION_HOURS,
        },
      );

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
          statusCode: 400,
          body: {
            message: error.issues,
          },
        };
      }

      if (error instanceof InvalidCredentialsError) {
        return {
          statusCode: 401,
          body: {
            message: 'Invalid credentials',
          },
        };
      }

      throw error;
    }
  }
}
