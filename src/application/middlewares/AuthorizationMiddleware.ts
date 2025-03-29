import type { IMiddleware, IRequest, IResponse } from '../interfaces/IMiddleware';
import type { GetMyRolesPermissionsUseCase } from '../useCases/role/GetMyRolesPermissionsUseCase';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getMyRolesPermissionsUseCase: GetMyRolesPermissionsUseCase,
  ) {}
  async handle({ account: { role } }: IRequest): Promise<IResponse> {
    if (!role) {
      return {
        statusCode: 403,
        body: { error: 'Access Denied' },
      };
    }

    const permissionCodes = await this.getMyRolesPermissionsUseCase.execute({
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
