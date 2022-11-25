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

    async _createToken({email},refresh:boolean=true) {
        const accesstoken = this.jwtService.sign({email});
        if(refresh){
            const refreshToken = this.jwtService.sign(
                {email},
                {
                    secret: process.env.SECRETKEY_REFRESH,
                    expiresIn: '20h' 
                });
            await this.accountService.updateToken(
                {email : email},
                {
                    refreshToken: refreshToken
                }
            );
            return {
                expiresIn: process.env.EXPRIRESIN,
                accesstoken,
                refreshToken,
                expriresInRefreshToken: process.env.EXPRIRESIN_REFRESH
            };
        }else{
            return{
                expiresIn: process.env.EXPRIRESIN,
                accesstoken,
            }
        }
    }

    async refresh(refreshToken){
        try {
            const payload = await this.jwtService.verify(refreshToken,{
                secret: process.env.SECRETKEY_REFRESH,
            });
            const user = await this.accountService.getUserByRefreshToken(refreshToken,payload.email);
            const token = await this._createToken(user,false)
            return {
                email: user.email,
                ...token,
            }
        }catch(error){
            throw new HttpException('Invalid token',HttpStatus.UNAUTHORIZED)
        }
    }

    async logout(user: Account){
        await this.accountService.updateToken({ email:user.email }, {refreshToken:null})
    }

 }