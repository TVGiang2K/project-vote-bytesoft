import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { jwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/roles.enum';
import { RolesGuard } from './roles/roles.guard';

export function Auth(...roles: Role[]){
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(jwtAuthGuard,RolesGuard),
  );
}
