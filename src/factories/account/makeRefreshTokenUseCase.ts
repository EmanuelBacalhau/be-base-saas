import { RefreshTokenUseCase } from '../../application/useCases/account/RefreshTokenUseCase';

export function makeRefreshTokenUseCase() {
  return new RefreshTokenUseCase();
}
