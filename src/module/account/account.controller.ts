import { Body, Controller, Get,Request, Patch, HttpCode, Post, Delete, UsePipes, Param, ValidationPipe, UseGuards, SetMetadata} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { AccountService } from './account.service';
import { updateAccountDto } from './dto/updateAccount.dto';


@Controller('account')
export class AccountController {
    constructor(
            private readonly  accountService: AccountService,
          
        ){}

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

    @Auth(Role.ADMIN)
    @UsePipes(ValidationPipe)
    @Patch(':id')
    updateUser(@Param('id') id:number, @Body() updateUserDto:updateAccountDto){
        return this.accountService.update(+id, updateUserDto);
    }

    @Auth(Role.ADMIN)
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.accountService.remove(+id);
    }

    // @Auth(Role.USER)
    @Get('recharge/:money')
    recharge(@Param('money') body){
        return this.accountService.User_recharge(body)
    }

}
