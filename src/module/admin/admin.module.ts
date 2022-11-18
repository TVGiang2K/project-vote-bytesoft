import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './admin.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [ AdminController ],
    providers: [AdminService, JwtStrategy],
    exports: [AdminService],
})
export class AdminModule {
}