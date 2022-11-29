import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/loginAccount.dto';
import { createAccountDto } from './dto/createAccount.dto';
import { updateAccountDto } from './dto/updateAccount.dto';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly AccountRp: Repository<Account>
  ) {}
  
  async create(data: createAccountDto){
    const Account = this.AccountRp.create(data);
    await Account.save();
    delete Account.password;

    return Account
  }
  

  async findByLogin({email, password}: AuthLoginDto){
    const Account = await this.AccountRp.findOne({
        where: { email: email}
    });

    if(!Account){
      throw new HttpException("Account Not Found", HttpStatus.UNAUTHORIZED);
    }
    const compare_pass = await bcrypt.compare(password,Account.password)
    if(!compare_pass){
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }
    return Account;
  }
  
  async showById(id: number): Promise<Account> {
    const Account = await this.AccountRp.findOne({where : {id: id}});
    delete Account.password;
    return Account;
  }

  async showAll(): Promise<Account[]>{
    return await this.AccountRp.find();
  }
  remove(id: number){
    return this.AccountRp.delete(id)
  }
  async update(id: number, userUpdateDto:updateAccountDto){
    return await this.AccountRp.update(+id, userUpdateDto);
  }

  async findEmail(email: string): Promise<Account>{ 
    return await this.AccountRp.findOne({
      where:{
        email:email
      }
    });
}

}
