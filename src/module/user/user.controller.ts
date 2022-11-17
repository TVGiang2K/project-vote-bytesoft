import { Body, Controller, Get, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, Patch } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { userService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from './dto/loginUser.dto';

@Controller('User')
export class UserController {
    constructor(private userService: userService){}
    @Get('/')
    getUsers(){
        return this.userService.findAll();
    }

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async register(@Body() UserCreate: createUserDto){
        return this.userService.create(UserCreate)
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.userService.remove(+id);
    }

    @Patch(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto:updateUserDto){
        return this.userService.update(+id, updateUserDto);
    }
    //lấy theo id 
    @Get(':id')
    findOne(@Param('id') id:object ){
        const searchById = this.userService.findOne(id);
        if(searchById) {
            return searchById;
          }else{
            return 'không có người bình trọn này';
          }
    }

    @Post('/login')
    login(@Body() info:loginUserDto){
        return this.userService.login(info)
    }
}
