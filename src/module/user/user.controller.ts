import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { userService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: userService){}
    @Get('/list')
    getUsers(){
        return this.userService.findAll();
    }

    @Post('/create')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUser(@Body() UserCreate: createUserDto){
        return await this.userService.create(UserCreate);
    }
}
