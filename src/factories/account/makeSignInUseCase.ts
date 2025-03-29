import { SignInUseCase } from '../../application/useCases/account/SignInUseCase';

export function makeSignInUseCase() {
  return new SignInUseCase();
}
