import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthGuard } from './auth/jwt-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { localAuthGuard } from './auth/local-auth.guard';
import { createAdminDto } from './module/admin/dto/createAdmin.dto';
import { Auth } from './auth/auth.decorator';
import { userGet } from './module/user/users.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  // @UseGuards(localAuthGuard)

  @Post('auth/register')
  
  register(@Body() createAdminDto:createAdminDto) {
    return this.authService.register(createAdminDto)
  }

  @Post('auth/login')
  login(@Body() loginAdminDto:AuthLoginDto) {
    return this.authService.login(loginAdminDto)
  }

  @Auth()
  @Get()
  getHello() {
  }


  // @Post('auth')
  //   async login(@Body() authLoginDto: AuthLoginDto){
  //     return this.authService.login(authLoginDto);
  //   }
}
