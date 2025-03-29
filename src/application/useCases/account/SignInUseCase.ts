import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError';
import { prismaClient } from '../../libs/prismaClient';
import { compare } from 'bcryptjs';

interface IInput {
  email: string;
  password: string;
}

interface IOutput {
  accountId: string;
  roleId: string;
}

export class SignInUseCase {
  async execute(data: IInput): Promise<IOutput> {
    const { email, password } = data;

    const account = await prismaClient.account.findUnique({
      where: {
        email,
      },
    });

    if (!account) {
      throw new InvalidCredentialsError();
    }

    const isPasswordCorrect = await compare(password, account.password);

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    return {
      accountId: account.id,
      roleId: account.roleId,
    };
  }
}
