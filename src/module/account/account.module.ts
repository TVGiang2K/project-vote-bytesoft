import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RechargeHistoryService } from '../recharge_history/recharge_history.service';
import { RechargeHistoryModule } from '../recharge_history/recharge_history.module';
import { CandidatesModule } from '../candidates/candidates.module';
import { VoteModule } from '../vote/vote.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [
    RechargeHistoryModule,
    CandidatesModule,
    VoteModule,
    TypeOrmModule.forFeature([Account]),
    CacheModule.register(),
    forwardRef(() => AuthModule),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
