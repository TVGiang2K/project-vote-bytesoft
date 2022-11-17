import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AdminModule } from './module/admin/admin.module';
import { ContestModule } from './module/contest/contest.module';
import { CandidatesModule } from './module/candidates/candidates.module';
import { VoteModule } from './module/vote/vote.module';

@Module({
  imports: [UserModule, AdminModule, ContestModule, TypeOrmModule.forRoot(typeormConfig), CandidatesModule, VoteModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
