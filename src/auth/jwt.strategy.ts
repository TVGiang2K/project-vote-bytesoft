import { HttpException, Injectable, HttpStatus } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService
    ) {
        super({
            // jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            //     return request?.cookies?.Authentication;
            //   }]),
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromExtractors([(request: Request) => {
                    return request?.cookies?.Authentication;
                  }]),
                  ExtractJwt.fromExtractors([(request: Request) => {
                    return request?.cookies?.AuthenUser;
                  }]),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
            
        });
    }

    async validate({email}) {
        const admin = await this.authService.validateAccount(email)
        if(!admin){
            throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
        }
        return admin;
      }
}