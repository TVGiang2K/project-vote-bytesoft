import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AccountModule } from './module/account/account.module';
import { ContestModule } from './module/contest/contest.module';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './module/candidates/candidates.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LogoutMiddleware, PagerMiddleware } from './middleware/page.middleware';
import * as redisStore from 'cache-manager-redis-store';
import { RechargeHistoryModule } from './module/recharge_history/recharge_history.module';
import { VoteModule } from './module/vote/vote.module';

@Module({
  imports: [
    ContestModule,
    VoteModule,
    TypeOrmModule.forRoot(typeormConfig),
    CandidatesModule,
    RechargeHistoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountModule,
    AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware).forRoutes({
      path: 'paged',
      method: RequestMethod.GET,
    });

    consumer.apply(LogoutMiddleware).forRoutes({
      path: '/logout/true',
      method: RequestMethod.ALL,
    });
  }
}
