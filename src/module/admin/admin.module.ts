import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Admin } from './admin.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [TypeOrmModule.forFeature([Admin])],
    controllers: [ AdminController ],
    providers: [AdminService, JwtStrategy,AuthService,JwtService],
    exports: [AdminService],
})
export class AdminModule {
}