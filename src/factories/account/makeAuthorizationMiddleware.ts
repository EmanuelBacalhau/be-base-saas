import { AuthorizationMiddleware } from '../../application/middlewares/AuthorizationMiddleware';
import { makeGetMyRolePermissionsUseCase } from '../role/makeGetMyRolePermissionsUseCase';

export function makeAuthorizationMiddleware(requiredPermissions: string[]) {
  const getMyRolesPermissionsUseCase = makeGetMyRolePermissionsUseCase();
  return new AuthorizationMiddleware(requiredPermissions, getMyRolesPermissionsUseCase);
}
