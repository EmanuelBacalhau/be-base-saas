import { SignUpController } from '../../application/controllers/account/SignUpController';
import { makeSignUpUseCase } from './makeSignUpUseCase';

export function makeSignUpController() {
  const signUpUseCase = makeSignUpUseCase();
  return new SignUpController(signUpUseCase);
}
