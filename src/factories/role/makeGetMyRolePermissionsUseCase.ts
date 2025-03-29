import { GetMyRolePermissionsUseCase } from '../../application/useCases/role/GetMyRolePermissionsUseCase';

export function makeGetMyRolePermissionsUseCase() {
  return new GetMyRolePermissionsUseCase();
}
