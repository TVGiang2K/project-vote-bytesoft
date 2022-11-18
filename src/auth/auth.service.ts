import { AdminService } from "src/module/admin/admin.service";
import { Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from "./auth-login.dto";



@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService
    ) { }

    async login(authLogindto: AuthLoginDto) {
        const admin = await this.validateAdmin(authLogindto);
        const payload = {
            adminId: admin.id
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    async validateAdmin(authLoginDto: AuthLoginDto){
        const {email, password} = authLoginDto;
        const admin = await this.adminService.findEmail(email);
        if (!(await admin.validatePassword(password))){
            throw new UnauthorizedException();
        }
        return admin;
    }

 }