import { HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/module/account/account.entity';
import { AccountService } from 'src/module/account/account.service';
import { createAccountDto } from 'src/module/account/dto/createAccount.dto';
import { AuthLoginDto } from "./auth-login.dto";
 import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService,
    ) { }


    async register (userDto: createAccountDto){
        const user = await this.accountService.create(userDto);
        const token = await this._createToken(user);
        return {
            email:user.email,
            ...token,
        }
    }

    async login(user: AuthLoginDto){
        const account = await this.accountService.findByLogin(user);
         const token = await this._createToken(account)
        return {
            email: user.email,
            ...token,
        }
    }

    async validateAccount(email): Promise<Account>{
        const account = await this.accountService.findEmail(email);
        if (!account){
            throw new HttpException('Invalid email address',HttpStatus.UNAUTHORIZED);
        }
        return account;
    }

    async _createToken({email}) {
        const accesstoken = this.jwtService.sign({email});
        
            return {
                accesstoken,
            };
    }

    

    

 }