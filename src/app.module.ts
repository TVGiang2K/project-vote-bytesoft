import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AdminModule } from './module/admin/admin.module';
import { ContestModule } from './module/contest/contest.module';
<<<<<<< Updated upstream
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, ContestModule, TypeOrmModule.forRoot(typeormConfig),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AdminModule,
    AuthModule
  ],
=======
import { CandidatesModule } from './module/candidates/candidates.module';

@Module({
  imports: [UserModule, AdminModule, ContestModule, TypeOrmModule.forRoot(typeormConfig), CandidatesModule,],
>>>>>>> Stashed changes
  controllers: [AppController],
  providers: [AppService],  
})
export class AppModule {