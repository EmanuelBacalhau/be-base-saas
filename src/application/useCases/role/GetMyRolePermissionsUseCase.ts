import { prismaClient } from '../../libs/prismaClient';

interface IInput {
  roleId: string;
}

interface IOutput {
  permissionCodes: string[];
}

export class GetMyRolePermissionsUseCase {
  async execute({ roleId }: IInput): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermissions.findMany({
      where: {
        roleId,
      },
      select: {
        permissionCode: true,
      },
    });

    const permissionCodes = rolePermissions.map((rolePermission) => rolePermission.permissionCode);

    return {
      permissionCodes,
    };
  }
}
