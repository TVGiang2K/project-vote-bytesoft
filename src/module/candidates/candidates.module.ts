import { forwardRef, Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './entities/candidate.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ContestModule } from '../contest/contest.module';

@Module({
  imports: [TypeOrmModule.forFeature([Candidate]), MulterModule.register({ dest: './public/img/avatars' }) ,ContestModule],
  controllers: [CandidatesController],
  providers: [CandidatesService],
  exports: [CandidatesService]
})
export class CandidatesModule {}
