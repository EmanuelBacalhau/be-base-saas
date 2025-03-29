import { prismaClient } from '../../libs/prismaClient';

interface IInput {
  accountId: string;
  expiresAt: Date;
}

interface IOutput {
  refreshToken: string;
}

export class RegisterRefreshTokenUseCase {
  async execute(data: IInput): Promise<IOutput> {
    const { accountId, expiresAt } = data;

    const [, refreshToken] = await Promise.all([
      prismaClient.refreshToken.deleteMany({
        where: {
          accountId,
        },
      }),
      prismaClient.refreshToken.create({
        data: {
          accountId,
          expiresAt,
        },
        select: {
          id: true,
        },
      }),
    ]);

    return {
      refreshToken: refreshToken.id,
    };
  }
}
