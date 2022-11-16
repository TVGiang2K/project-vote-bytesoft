import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './module/user/user.controller';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(typeormConfig), ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
