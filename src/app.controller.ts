import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { createAccountDto } from './module/account/dto/createAccount.dto';
import { AccountService } from './module/account/account.service';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './auth/roles/roles.enum';
import { RolesGuard } from './auth/roles/roles.guard';
import { Auth } from './auth/auth.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly  accountService: AccountService,

  ) {}


  @Post('login')
  login(@Body() loginAdminDto:AuthLoginDto) {
    return this.authService.login(loginAdminDto)
  }

  @Post('register')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() AdminCreate: createAccountDto){
      return await this.authService.register(AdminCreate)
  }


  @Post('/Refresh')
  async refresh(@Body() body){
    return await this.authService.refresh(body.refreshToken);
  }

  // @UseGuards(jwtAuthGuard)
  @Auth(Role.USER)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Auth(Role.USER)
  @Post('logout')
  async logout(@Request() req:any){
    await this.authService.logout(req.user);
    return{
      status:200,
    }
  }

}
