import { forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from '../contest/entities/contest.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CandidatesModule } from '../candidates/candidates.module';
import { VoteModule } from '../vote/vote.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contest]),ScheduleModule.forRoot(),forwardRef(() => CandidatesModule),VoteModule],
  controllers: [ContestController],
  providers: [ContestService],
  exports: [ContestService]
})
export class ContestModule {
  
}
