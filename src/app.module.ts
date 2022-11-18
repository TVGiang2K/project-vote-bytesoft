import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AdminModule } from './module/admin/admin.module';
import { ContestModule } from './module/contest/contest.module';
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
  controllers: [AppController],
  providers: [AppService],  
})
export class AppModule {}
