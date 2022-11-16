import { Body, Controller, Get, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { userService } from './user.service';
import { User } from './user.entity';

@Controller('User')
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

    @Delete('/delete/:id')
    remove(@Param('id') id: number){
        return this.userService.remove(+id);
    }
}
