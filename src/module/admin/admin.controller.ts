import { Body, Controller, Get, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe} from '@nestjs/common';
import { AdminService } from './admin.service';
import { createAdminDto } from './dto/createAdmin.dto';
import { updateAdminDto } from './dto/updateAdmin.dto';


@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService){}
    @Get('/')
    getAdmin(){
        return this.adminService.findAll();
    }

    @Get('/:id')
    getByAdmin(@Param('id') id: number) {
        return this.adminService.findOne(+id);
    }

    @Post('/')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    async createAdmin(@Body() AdminCreate: createAdminDto){
        return await this.adminService.create(AdminCreate);
    }

    @Delete('/:id')
    removeAdmin(@Param('id') id: number){
        return this.adminService.remove(+id);
    }

    @Patch('/:id')
    updateAdmin(@Param('id') id:number, @Body() updateAdminDto:updateAdminDto){
        return this.adminService.update(+id, updateAdminDto);
    }

}
