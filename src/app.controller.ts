import {
  Controller,
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
  Req,
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
import { Request, Response } from 'express';
import { View } from 'typeorm/schema-builder/view/View';
import { JwtStrategy } from './auth/jwt.strategy';
import { get } from 'http';
import RequestWithUser from './auth/requestWithUser.interface';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly  accountService: AccountService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @Render('login')
  async loginUser() {
    return { message: 'hello' }; 
  }

  @HttpCode(200)
  @UseGuards(JwtStrategy)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const cookie = await this.authService.login(req.body);
    // console.log(cookie);
    if(!cookie){
      res.redirect('/')
      return {
        message: 'incorrect account'
      }
    }else{
      res.setHeader('Set-Cookie', await cookie);
      req.body.password = undefined;
      res.redirect('/profile')
    }
    return res.send(req.body.email);
  }
  
  @HttpCode(200)
  @UseGuards(JwtStrategy)
  @Post('loginUser')
  async loginUsers(@Req() req: Request, @Res() res: Response) {
    const cookie = await this.authService.login(req.body);

      res.setHeader('Set-Cookie', await cookie);
      req.body.password = undefined;
      res.redirect('/profile');
    // return res.send(req.body.email);
  }

  @Post('register')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() AdminCreate: createAccountDto) {
    return await this.authService.register(AdminCreate);
  }

  @Auth(Role.ADMIN, Role.USER)
  @Get('profile')
  async myInfo(@User() user: any,@Res() res: Response) {
    res.render('index',{
      MyUser: user
    });
    res.status(user.statusCode).json(user.data); // when remove .send(), it will succeed
  return;
  }

  // @Auth(Role.USER, Role.ADMIN)
  // @Get('logout')
  // async logout( @Res() res: Response ) {
  //   console.log('áds');
  //   res.setHeader('Set-Cookie', await this.authService.logout())
  //   return res.redirect('/');
  // }


  @Get('error')
  @Render('error')
  error() {
    return { message: this.appService.root() }; 
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

  @Get('contest-history')
  @Render('history-vote')
  contestHis() {
    return { message: this.appService.root() }; 
  }

  @Get('candidates')
  @Render('candidates/candidates')
  candidates() {
    return { message: this.appService.root() }; 
  }

  @Get('vote')
  @Render('vote')
  vote() {
    return { message: this.appService.root() }; 
  }

}
