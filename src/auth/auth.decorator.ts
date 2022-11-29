import { applyDecorators, CacheModule, SetMetadata, UseGuards } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtAuthGuard } from './jwt-auth.guard';
import { Role } from './roles/roles.enum';
import { RolesGuard } from './roles/roles.guard';
import * as redisStore from 'cache-manager-redis-store';


export function Auth(...roles: Role[]){
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(jwtAuthGuard,RolesGuard),
  );
}
