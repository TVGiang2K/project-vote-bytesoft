

import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "src/auth/constants";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate({email}) {
        const admin = await this.authService.validateAdmin(email)
        if(!admin){
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
        }
        return admin;
      }
}