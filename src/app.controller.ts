import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Render,
  Res,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { createAccountDto } from './module/account/dto/createAccount.dto';
import { AccountService } from './module/account/account.service';
import { Role } from './auth/roles/roles.enum';
import { Auth } from './auth/auth.decorator';
import { User } from './module/account/user.decorator';
import {Cache} from 'cache-manager';
import { Request, Response } from 'express';
import { JwtStrategy } from './auth/jwt.strategy';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
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
  @Post('api/loginUser')
  async loginUsers(@Req() req: Request, @Res() res: Response) {
    const cookie = await this.authService.login(req.body);
    const account = await this.accountService.findByLogin(req.body.email,req.body.password);
      res.setHeader('Set-Cookie', await cookie);
      account.password = undefined;
      res.send({account: account});
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


  @Get('vote')
  @Render('vote')
  vote() {
    return { message: this.appService.root() }; 
  }

}
