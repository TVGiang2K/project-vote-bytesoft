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
      return await this.accountService.create(AdminCreate);
  }

  // @UseGuards(jwtAuthGuard)
  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

}
