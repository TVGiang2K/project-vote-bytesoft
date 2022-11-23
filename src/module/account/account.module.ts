import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { AccountService } from './account.service';

@Module({
    imports: [TypeOrmModule.forFeature([Account])],
    controllers: [ AccountController],
    providers: [AccountService, JwtStrategy,AuthService,JwtService],
    exports: [AccountService],
})
export class AccountModule {
}