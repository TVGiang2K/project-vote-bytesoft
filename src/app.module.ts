import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { AccountModule} from './module/account/account.module';
import { ContestModule } from './module/contest/contest.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ ContestModule, TypeOrmModule.forRoot(typeormConfig),
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AccountModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService
  // {
  //       provide: APP_GUARD,
  //       useClass: RolesGuard,
  //     },
  ],  
})
export class AppModule {}  