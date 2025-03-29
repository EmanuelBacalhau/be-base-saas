import { constants } from '../../config/contants';
import { ExpiresTokenError } from '../../errors/ExpiresTokenError';
import { prismaClient } from '../../libs/prismaClient';

interface IInput {
  refreshToken: string;
}

interface IOutput {
  refreshToken: string;
}

export class RefreshTokenUseCase {
  async execute(params: IInput): Promise<IOutput> {
    const token = await prismaClient.refreshToken.findFirst({
      where: {
        id: params.refreshToken,
      },
    });

    if (!token) {
      throw new ExpiresTokenError();
    }

    if (token.expiresAt.getTime() < Date.now()) {
      await prismaClient.refreshToken.delete({
        where: {
          id: token.id,
        },
      });

      throw new ExpiresTokenError();
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + constants.REFRESH_TOKEN_EXPIRATION_DAYS);

    const [newToken] = await Promise.all([
      prismaClient.refreshToken.create({
        data: {
          accountId: token.accountId,
          expiresAt,
        },
      }),
      prismaClient.refreshToken.delete({
        where: {
          id: token.id,
        },
      }),
    ]);

    return {
      refreshToken: newToken.id,
    };
  }
}
