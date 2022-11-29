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
export function Session(){
  return applyDecorators(
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     isGlobal: true,
    //     store: redisStore,
    //     host: configService.get<string>('REDIS_HOST'),
    //     port: configService.get<string>('REDIS_PORT'),
    //     username: configService.get<string>('REDIS_USERNAME'),
    //     password: configService.get<string>('REDIS_PASSWORD'),
    //   })
    // }),
  );
}