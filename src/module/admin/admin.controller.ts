import { Body, Controller, Get,Request, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, UseGuards} from '@nestjs/common';
import { get } from 'http';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from './admin.decorator';
import { AdminService } from './admin.service';
import { createAdminDto } from './dto/createAdmin.dto';
import { updateAdminDto } from './dto/updateAdmin.dto';


@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}


    @Post('profile')
    @UseGuards(jwtAuthGuard)
    async getProfile(@Request() req:any,  @GetUser() user,) {
      return req.user;
    }

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createAdmin(@Body() AdminCreate: createAdminDto){
        return await this.adminService.create(AdminCreate);
    }

    @Get('/:id') 
    show(@Param('id') id: string){ 
        return this.adminService.showById(+id);
    }

    @Get()
    showAll(){
        return this.adminService.showAll()
    }

}
