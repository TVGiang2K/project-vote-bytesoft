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
  Render,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/auth-login.dto';
import { createAccountDto } from './module/account/dto/createAccount.dto';
import { AccountService } from './module/account/account.service';
import { Role } from './auth/roles/roles.enum';
import { Auth } from './auth/auth.decorator';
import { User } from './module/account/user.decorator';
import {Cache} from 'cache-manager';
import { Response } from 'express';
import { View } from 'typeorm/schema-builder/view/View';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly  accountService: AccountService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Auth(Role.ADMIN)
  @Get('show')
  getsession(){
    return this.cacheManager.get('login')
  }

  @Post('login')
  login(@Body() loginAdminDto:AuthLoginDto) {
    return this.authService.login(loginAdminDto)
  }

  @Get('show')
  show(){
    return this.cacheManager.get('login')
  }


  @Post('register')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() AdminCreate: createAccountDto) {
    return await this.authService.register(AdminCreate);
  }

  @Auth(Role.USER, Role.ADMIN)
  @Get('profile')
  async myInfo(@User() user: any) {
    return {
      MyUser: user
    }
  }



  @Auth(Role.USER, Role.ADMIN)
  @Get('logout')
  async logout(){
    return await this.authService.logout()
  }











  @Get('account-admin')
    @Render('account')
    account() {
        return  this.accountService.showAll().then((data) => data? {account : data}: {account: []}); ;
    }





  @Get()
  @Render('index')
  root() {
    return { message: this.appService.root() }; 
  }

  @Get('login')
  @Render('login')
  loginadmin() {
    return { message: this.appService.root() }; 
  }

  @Get('contest')
  @Render('contest/contest')
  contest() {
    return { message: this.appService.root() }; 
  }
  @Get('create-contest')
  @Render('contest/create')
  contestCreate() {
    return { message: this.appService.root() }; 
  }
  @Get('edit-contest')
  @Render('contest/update')
  contestUpdate() {
    return { message: this.appService.root() }; 
  }



  
  @Get('candidates')
  @Render('candidates/candidates')
  candidates() {
    return { message: this.appService.root() }; 
  }

  @Get('create-candidates')
  @Render('candidates/create')
  createCandidates() {
    return { message: this.appService.root() }; 
  }

  @Get('edit-candidates')
  @Render('candidates/update')
  updateCandidates() {
    return { message: this.appService.root() }; 
  }


  @Get('vote')
  @Render('vote')
  vote() {
    return { message: this.appService.root() }; 
  }




  // @Get()
  // getView(@Res() res: Response){
  //   console.log(this.appService.getAllBook());
    
  //   return res.render("index", { books : this.appService.getAllBook()}); 
  // }


 

}
