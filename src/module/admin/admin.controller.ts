import { Body, Controller, Get,Request, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, UseGuards, SetMetadata} from '@nestjs/common';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AdminService } from './admin.service';
import { createAdminDto } from './dto/createAdmin.dto';
import { updateAdminDto } from './dto/updateAdmin.dto';


@Controller('admin')
export class AdminController {
    constructor(
            private readonly  adminService: AdminService,
          
        ){}


    @Get('profile')
    async getProfile(@Request() req:any) {
        return req.user;
    }
        
    @Roles(Role.ADMIN)
    @UseGuards(jwtAuthGuard, RolesGuard)
    @Get()
    showAll(){
        return this.adminService.showAll()
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

    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto:updateAdminDto){
        return this.adminService.update(+id, updateUserDto);
    }


    @Delete(':id')
    remove(@Param('id') id: number){
        return this.adminService.remove(+id);
    }

}
