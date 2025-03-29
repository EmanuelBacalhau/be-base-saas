import { SignInController } from '../../application/controllers/account/SignInController';
import { makeRegisterTokenUseCase } from '../refreshToken/makeRegisterTokenUseCase';
import { makeSignInUseCase } from './makeSignInUseCase';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();
  const registerTokenUseCase = makeRegisterTokenUseCase();

  return new SignInController(signInUseCase, registerTokenUseCase);
}
