import { Module } from '@nestjs/common';
import { RechargeHistoryService } from './recharge_history.service';
import { RechargeHistoryController } from './recharge_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RechargeHistory } from './entities/recharge_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RechargeHistory])],
  controllers: [RechargeHistoryController],
  providers: [RechargeHistoryService]
})
export class RechargeHistoryModule {}
