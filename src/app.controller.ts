<<<<<<< HEAD
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
=======
import { Controller, Request, Post, UseGuards, Body,Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtAuthGuard} from './auth/jwt-auth.guard';
>>>>>>> ef536691973887924c5775b4ec3a36fdeb79826a
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { localAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
<<<<<<< HEAD

 
=======
  
  @UseGuards(jwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.admin;
  }
  
  @UseGuards(localAuthGuard)
  @Post('auth')
    async login(@Body() authLoginDto: AuthLoginDto){
      return this.authService.login(authLoginDto);
    }


>>>>>>> ef536691973887924c5775b4ec3a36fdeb79826a
}


