import { SignUpUseCase } from '../../application/useCases/account/SignUpUseCase';

export function makeSignUpUseCase() {
  return new SignUpUseCase();
}
