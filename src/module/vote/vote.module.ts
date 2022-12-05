import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { GatewayModule } from 'src/gateway/gateway.module';




@Module({
  imports: [TypeOrmModule.forFeature([Vote]), 
  GatewayModule,
],
  controllers: [VoteController],
  providers: [VoteService],
  exports:[VoteService]
})
export class VoteModule {}
