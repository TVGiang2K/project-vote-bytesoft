import { HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/module/account/account.entity';
import { AccountService } from 'src/module/account/account.service';
import { createAccountDto } from 'src/module/account/dto/createAccount.dto';
import { AuthLoginDto } from "./auth-login.dto";



@Injectable()
export class AuthService {
    token: any;
    accesstoken:any;
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
    ) { }


    async register (userDto: createAccountDto){
        const user = await this.accountService.create(userDto);
        const token = this._createToken(user);
        return {
            email:user.email,
            ...token,
        }
    }

    async login(user: AuthLoginDto){
        const account = await this.accountService.findByLogin(user);
         this.token = this._createToken(account)
        return {
            email: user.email,
            token: this.token
        }
    }

    async logout(){
        await this._DeleteToken()
        console.log(this.accesstoken)
    }

    async validateAccount(email): Promise<Account>{
        const account = await this.accountService.findEmail(email);
        if (!account){
            throw new HttpException('Invalid email address',HttpStatus.UNAUTHORIZED);
        }
        return account;
    }

    private _createToken({email}):any {
        this.accesstoken = this.jwtService.sign({email})
        return {
            accesstoken:this.accesstoken
        };
    }
    private _DeleteToken():any {
        this.accesstoken = null;
        return {
            accesstoken:this.accesstoken
        };
    }

 }