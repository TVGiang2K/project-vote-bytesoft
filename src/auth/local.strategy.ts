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

  async validate(data: AuthLoginDto): Promise<any> {
    const admin = await this.authService.validateAdmin(data);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
