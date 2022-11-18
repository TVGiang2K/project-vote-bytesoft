import { Body, Controller, Get, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, UseGuards} from '@nestjs/common';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminService } from './admin.service';
import { createAdminDto } from './dto/createAdmin.dto';
import { updateAdminDto } from './dto/updateAdmin.dto';


@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createAdmin(@Body() AdminCreate: createAdminDto){
        return await this.adminService.create(AdminCreate);
    }

    @Get('/:id') 
    show(@Param(':id') id: string){ 
        return this.adminService.showById(+id);
    }


}
