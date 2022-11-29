import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AccountModule} from './module/account/account.module';
import { ContestModule } from './module/contest/contest.module';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './module/candidates/candidates.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PagerMiddleware } from './middleware/page.middleware';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [ ContestModule, TypeOrmModule.forRoot(typeormConfig),
    CandidatesModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AccountModule,
    AuthModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        isGlobal: true,
        store: redisStore,
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<string>('REDIS_PORT'),
        username: configService.get<string>('REDIS_USERNAME'),
        password: configService.get<string>('REDIS_PASSWORD'),
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],  
})
export class AppModule {
  
}  
