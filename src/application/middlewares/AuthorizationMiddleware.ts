import type { IMiddleware, IRequest, IResponse } from '../interfaces/IMiddleware';
import type { GetMyRolePermissionsUseCase } from '../useCases/role/GetMyRolePermissionsUseCase';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getMyRolePermissionsUseCase: GetMyRolePermissionsUseCase,
  ) {}
  async handle({ account: { role } }: IRequest): Promise<IResponse> {
    if (!role) {
      return {
        statusCode: 403,
        body: { error: 'Access Denied' },
      };
    }

    const permissionCodes = await this.getMyRolePermissionsUseCase.execute({
      roleId: role,
    });

    const hasPermission = permissionCodes.permissionCodes.some((permission) =>
      this.requiredPermissions.includes(permission),
    );

    if (!hasPermission) {
      return {
        statusCode: 403,
        body: { error: 'Access Denied' },
      };
    }

    return {
      statusCode: 200,
    };
  }
}
