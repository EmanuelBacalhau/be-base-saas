import { RegisterRefreshTokenUseCase } from '../../application/useCases/refreshToken/RegisterRefreshToken';

export function makeRegisterTokenUseCase() {
  return new RegisterRefreshTokenUseCase();
}
