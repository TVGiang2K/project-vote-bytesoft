import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  HttpCode,
  Render,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AccountService } from './module/account/account.service';
import { Role } from './auth/roles/roles.enum';
import { Auth } from './auth/auth.decorator';
import { User } from './module/account/user.decorator';
import { Request, Response } from 'express';
import { JwtStrategy } from './auth/jwt.strategy';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private accountService: AccountService
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
      res.setHeader('Set-Cookie', await cookie);
      req.body.password = undefined;
      res.redirect('/profile');
  }

  // @Post('upload')
  // @UseInterceptors(
  // FileInterceptor('file')) 
  //   uploadFile(@UploadedFile() file: Express.Multer.File) {
  //     return file;
  // }

  @Post('register')
  @HttpCode(200)
  async createAdmin(@Req() req: Request) {    
    return await this.accountService.create(req.body);
  }

  @Auth(Role.ADMIN)
  @Get('profile')
  async myInfo(@User() user: any,@Res() res: Response) {
    res.render('index',{
      MyUser: user
    });
  }

  @Auth(Role.USER)
  @Get('api/profile')
  async ApimyInfo(@User() user: any,@Res() res: Response) {
    res.send({
      user: user
    })
  }

  @Auth(Role.ADMIN)
  @Get('logout')
  async logout( @Res() res: Response ) {
    res.setHeader('Set-Cookie', await this.authService.logout())
    return res.redirect('/');
  }

  @Auth(Role.USER)
  @Get('api/logout')
  async Userlogout( @Res() res: Response ) {
    res.setHeader('Set-Cookie', `AuthenUser=; HttpOnly; Path=/; Max-Age=0`)
    res.send({
      profile: []
    })
  }


  @Get('error')
  @Render('error')
  error() {
    return { message: this.appService.root() }; 
  }


}
