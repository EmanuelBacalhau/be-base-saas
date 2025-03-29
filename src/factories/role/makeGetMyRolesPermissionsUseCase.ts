import { GetMyRolesPermissionsUseCase } from '../../application/useCases/role/GetMyRolesPermissionsUseCase';

export function makeGetMyRolesPermissionsUseCase() {
  return new GetMyRolesPermissionsUseCase();
}
