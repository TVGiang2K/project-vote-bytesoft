import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { createAdminDto } from './dto/createAdmin.dto';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}
    @Get('/')
    getAdmin(){
        return this.adminService.findAll();
    }

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createUser(@Body() AdminCreate: createAdminDto){
        return await this.adminService.create(AdminCreate);
    }
}
