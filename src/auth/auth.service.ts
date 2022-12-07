import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/module/account/account.entity';
import { AccountService } from 'src/module/account/account.service';
import { createAccountDto } from 'src/module/account/dto/createAccount.dto';
import { AuthLoginDto } from "./auth-login.dto";
 import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';




@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService,
        private configService: ConfigService,
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
        // console.log(account);
        const email = account.email
        const accesstoken = this.jwtService.sign({email});
        return `Authentication=${accesstoken}; HttpOnly; Path=/; Max-Age=${this.configService.get('EXPRIRESIN')}`
    }

    // async _createToken(email:string) {
        
    //     return accesstoken;
    // }

    async logout(){
        return this.cacheManager.del('login');
    }

 }