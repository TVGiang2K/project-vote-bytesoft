import { AdminService } from "src/module/admin/admin.service";
import { HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from "src/module/admin/admin.entity";
import { createAdminDto } from "src/module/admin/dto/createAdmin.dto";
import { AuthLoginDto } from "./auth-login.dto";



@Injectable()
export class AuthService {
    constructor(
        private adminService: AdminService,
        private jwtService: JwtService
    ) { }


    async register (userDto: createAdminDto){
        const user = await this.adminService.create(userDto);
        const token = this._createToken(user);
        return {
            email:user.email,
            ...token,
        }
    }

    async login(user: AuthLoginDto){
        const admin = await this.adminService.findByLogin(user);
        const token = this._createToken(admin)
        return {
            email: user.email,
            ...token
        }
    }
    async validateAdmin(email): Promise<Admin>{
        const admin = await this.adminService.findEmail(email);
        if (!admin){
            throw new HttpException('Invalid email address',HttpStatus.UNAUTHORIZED);
        }
        return admin;
    }

    private _createToken({email}):any {
        const accesstoken = this.jwtService.sign({email})
        return {
            accesstoken
        };
    }

 }