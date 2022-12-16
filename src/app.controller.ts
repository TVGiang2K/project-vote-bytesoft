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
    console.log(cookie);
      res.setHeader('Set-Cookie', await cookie);
      req.body.password = undefined;
      res.redirect('/profile')
    return res.send(req.body.email);
  }
  




  @Post('upload')
  @UseInterceptors(
  FileInterceptor('file')) 
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return file;
  }

  @Post('register')
  @HttpCode(200)
  async createAdmin(@Req() req: Request) {    
    console.log(req.body);
    
    return await this.authService.register(req.body);
  }



  @Auth(Role.ADMIN)
  @Get('profile')
  async myInfo(@User() user: any,@Res() res: Response) {
    res.render('index',{
      MyUser: user
    });
    res.status(user.statusCode).json(user.data); // when remove .send(), it will succeed
    return;
  }

  @Auth(Role.USER)
  @Get('api/profile')
  async ApimyInfo(@User() user: any,@Res() res: Response) {
    res.status(user.statusCode).json(user.data); // when remove .send(), it will succeed
    return;
  }

  @Auth(Role.ADMIN)
  @Get('logout')
  async logout( @Res() res: Response ) {
    res.setHeader('Set-Cookie', await this.authService.logout())
    return res.redirect('/');
  }

  @Auth(Role.USER)
  @Get('logout')
  async Userlogout( @Res() res: Response ) {
    res.setHeader('Set-Cookie', await this.authService.logout())
  }


  @Get('error')
  @Render('error')
  error() {
    return { message: this.appService.root() }; 
  }


}
