import { Body, Controller, Get, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe } from '@nestjs/common';
import { userService } from './user.service';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private userService: userService){}
    @Get('/')
    getUsers(){
        return this.userService.findAll();
    }

    @Get('/:id')
    getByUsers(@Param('id') id: number) {
        return this.userService.findOne(+id);
    }

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUser(@Body() UserCreate: createUserDto){
        return await this.userService.create(UserCreate);
    }

    @Delete(':id')
    removeUser(@Param('id') id: number){
        return this.userService.remove(+id);
    }

    @Patch(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto:updateUserDto){
        return this.userService.update(+id, updateUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id:number ){
        const user = new User();
        if(id == user.id){
            return this.userService.findOne(id);
        }else{
            return `không tìm thấy thí sinh có id này`;
        }
    }
}
