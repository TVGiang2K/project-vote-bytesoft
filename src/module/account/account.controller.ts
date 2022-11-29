import { Body, Controller, Get,Request, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, UseGuards, SetMetadata} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { AccountService } from './account.service';
import { updateAccountDto } from './dto/updateAccount.dto';


@Controller('account')
export class AccountController {
    constructor(
            private readonly  accountService: AccountService,
          
        ){}

    @Roles(Role.ADMIN)
    @UseGuards(jwtAuthGuard, RolesGuard)
    @Auth(Role.ADMIN)
    @Get()
    showAll(){
        return this.accountService.showAll()
    }


    @Auth(Role.ADMIN)
    @Get('/:id') 
    show(@Param('id') id: string){
        return this.accountService.showById(+id);
    }


    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto:updateAccountDto){
        return this.accountService.update(+id, updateUserDto);
    }

    @Roles(Role.ADMIN)
    @UseGuards(jwtAuthGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.accountService.remove(+id);
    }

}
