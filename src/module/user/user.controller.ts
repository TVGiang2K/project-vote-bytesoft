import { Body, Controller, Get, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { userService } from './user.service';
import { User } from './user.entity';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
    constructor(private userService: userService){}
    @Get('/')
    getUsers(){
        return this.userService.findAll();
    }

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUser(@Body() UserCreate: createUserDto){
        return await this.userService.create(UserCreate);
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.userService.remove(+id);
    }

    @Patch(':id')
    update(@Param('id') id:string, @Body() updateUserDto:updateUserDto){
        return this.userService.update(+id, updateUserDto);
    }
}
