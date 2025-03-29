import { RegisterRefreshTokenUseCase } from '../../application/useCases/account/RegisterRefreshTokenUseCase';

export function makeRegisterTokenUseCase() {
  return new RegisterRefreshTokenUseCase();
}
