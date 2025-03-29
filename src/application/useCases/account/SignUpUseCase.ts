import { env } from '../../config/env';
import { AccountAlreadyExistsError } from '../../errors/AccountAlreadyExistsError';
import { prismaClient } from '../../libs/prismaClient';
import { hash } from 'bcryptjs';

interface IInput {
  name: string;
  email: string;
  password: string;
}

type IOutput = void;

export class SignUpUseCase {
  async execute(params: IInput): Promise<IOutput> {
    const accountAlreadyExists = await prismaClient.account.findUnique({
      where: {
        email: params.email,
      },
    });

    if (accountAlreadyExists) {
      throw new AccountAlreadyExistsError();
    }

    const passwordHash = await hash(params.password, env.BCRYPT_SALT);

    await prismaClient.account.create({
      data: {
        name: params.name,
        email: params.email,
        password: passwordHash,
      },
    });
  }
}
