import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // async validate({email}) {
  //   const admin = await this.authService.validateAdmin(email);
  //   if (!admin) {
  //     throw new UnauthorizedException('không thể đăng nhập');
  //   }
  //   return admin;
  // }
}
