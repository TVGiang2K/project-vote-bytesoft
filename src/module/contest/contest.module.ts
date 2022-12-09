import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from '../contest/entities/contest.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { PagerMiddleware } from 'src/middleware/page.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Contest]),ScheduleModule.forRoot(),],
  controllers: [ContestController],
  providers: [ContestService],
  exports: [ContestService]
})
export class ContestModule {
  
}
