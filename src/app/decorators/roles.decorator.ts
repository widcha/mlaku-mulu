import { SetMetadata } from '@nestjs/common';
import { RolesEnum } from '../enums/role.enum';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: RolesEnum[]) => SetMetadata(ROLES_KEY, roles);
