import { z, ZodError } from 'zod';
import type { IController, IRequest, IResponse } from '../../interfaces/IController';
import type { SignUpUseCase } from '../../useCases/account/SignUpUseCase';
import { AccountAlreadyExistsError } from '../../errors/AccountAlreadyExistsError';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export class SignUpController implements IController {
  constructor(private readonly createAccountUseCase: SignUpUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const data = schema.parse(request.body);

      await this.createAccountUseCase.execute(data);

      return {
        statusCode: 201,
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

      if (error instanceof AccountAlreadyExistsError) {
        return {
          statusCode: 409,
          body: {
            message: 'Account already exists',
          },
        };
      }

      throw error;
    }
  }
}
