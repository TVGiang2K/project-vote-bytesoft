import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [userService],
    exports: [userService],
})
export class UserModule {
}
