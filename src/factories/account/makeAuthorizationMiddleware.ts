import { AuthorizationMiddleware } from '../../application/middlewares/AuthorizationMiddleware';
import { makeGetMyRolesPermissionsUseCase } from '../role/makeGetMyRolesPermissionsUseCase';

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  const getMyRolesPermissionsUseCase = makeGetMyRolesPermissionsUseCase();
  return new AuthorizationMiddleware(requiredPermissions, getMyRolesPermissionsUseCase);
}
