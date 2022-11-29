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
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { createAccountDto } from './module/account/dto/createAccount.dto';
import { AccountService } from './module/account/account.service';
import { Role } from './auth/roles/roles.enum';
import { Auth } from './auth/auth.decorator';
import {Cache} from 'cache-manager';
// import { OnGlobalQueueActive } from '@nestjs/bull';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly  accountService: AccountService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('show')
  showss(){
    return this.cacheManager.get('login');
  }


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


  // @UseGuards(jwtAuthGuard)
  @Auth(Role.USER, Role.ADMIN)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Auth(Role.USER, Role.ADMIN)
  @Get('logout')
  async logout(){
    await this.authService.logout();
    return{
      status:200,
    }
  }
}
