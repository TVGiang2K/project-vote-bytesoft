import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RechargeHistoryService } from '../recharge_history/recharge_history.service';
import { RechargeHistoryModule } from '../recharge_history/recharge_history.module';
import { CandidatesModule } from '../candidates/candidates.module';
@Module({
  imports: [
    RechargeHistoryModule,
    CandidatesModule,
    TypeOrmModule.forFeature([Account]),
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
      }),
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
