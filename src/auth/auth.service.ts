import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/module/account/account.entity';
import { AccountService } from 'src/module/account/account.service';
import { createAccountDto } from 'src/module/account/dto/createAccount.dto';
import { AuthLoginDto } from "./auth-login.dto";
 import * as bcrypt from 'bcrypt';
import {Cache} from 'cache-manager';




@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,

    ) { }

    async register (userDto: createAccountDto){
        const user = await this.accountService.create(userDto);
        return {
            username: user.name,
            email: user.email
        };
    }

    async validateAccount(email): Promise<Account>{
        const account = await this.accountService.findEmail(email);
        if (!account){
            throw new HttpException('Invalid email address',HttpStatus.UNAUTHORIZED);
        }
        return account;
    }
    
    async login(user: AuthLoginDto){
        const account = await this.accountService.findByLogin(user);
        const refreshToken = this._createToken(account);
        this.cacheManager.set('login', (await refreshToken).accesstoken);
        console.log(refreshToken);
        
        return {
            username: account.name,
            access_token: (await refreshToken).accesstoken,
        }
    }

    async _createToken({email}) {
        const accesstoken = this.jwtService.sign({email});
        
            return {
                accesstoken,
            };
    }

    async logout(){
        return this.cacheManager.del('login');
    }

 }