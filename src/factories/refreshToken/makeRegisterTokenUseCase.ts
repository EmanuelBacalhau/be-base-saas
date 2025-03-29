import { RegisterRefreshTokenUseCase } from '../../application/useCases/refreshToken/RegisterRefreshTokenUseCase';

export function makeRegisterTokenUseCase() {
  return new RegisterRefreshTokenUseCase();
}
