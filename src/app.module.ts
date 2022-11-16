import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';
import { YModule } from './y/y.module';
import { AdminModule } from './module/admin/admin.module';

@Module({
  imports: [UserModule, AdminModule, TypeOrmModule.forRoot(typeormConfig), ProductModule, YModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
