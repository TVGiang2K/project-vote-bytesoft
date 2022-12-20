import { Injectable, HttpStatus, HttpException, Param, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/loginAccount.dto';
import { createAccountDto } from './dto/createAccount.dto';
import { updateAccountDto } from './dto/updateAccount.dto';
import { Account } from './account.entity';
import { User } from './user.decorator';
import { RechargeHistoryService } from '../recharge_history/recharge_history.service';
import { CandidatesService } from '../candidates/candidates.service';
import { VoteService } from '../vote/vote.service';
import { Response } from 'express';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly AccountRp: Repository<Account>,
    private RechargeHistoryService: RechargeHistoryService,
    private candidatesServices: CandidatesService,
    private VoteService: VoteService,
  ) {}
 
  clientToUser = {};

  
  async create(data: createAccountDto) {
    const showAcc = await this.showByEmail(data.email);
    if(showAcc.email == data.email) {
      return {
        action: false
      };
    }else{
      const Account = this.AccountRp.create(data);
      await Account.save();
      delete Account.password;
      return {
        action: true
      };
    }
  }

  async findByLogin( email, password ) {
    const Account = await this.AccountRp.findOne({
      where: { email: email },
    });
    if (!Account) {
      throw new HttpException('Account Not Found', HttpStatus.UNAUTHORIZED);
    }
    const compare_pass = await bcrypt.compare(password, Account.password);
    if (!compare_pass) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return Account;
  }

  async idInfo(name: string, clientId: string){
    this.clientToUser[clientId] = name;
    return Object.values(this.clientToUser);
  }


  async showById(id: any): Promise<Account> {
    const Account = await this.AccountRp.findOne({ where: { id: id } });
    delete Account.password;
    return Account;
  }

  async showByEmail(email: any): Promise<Account> {
    const Account = await this.AccountRp.findOne({ where: { email: email } });
    delete Account.password;
    return Account;
  }

  async showAllPaginate(take: number,skip:number) {
    const [data, total] = await this.AccountRp.findAndCount({
      take,
      skip,
    })
    const page = total/3
    return {  data: data, total: total, page: parseInt(page.toFixed())  }
  }


  async remove(id: number) {
    return await this.AccountRp.delete(id);
  }

  async update(id: number, userUpdateDto: updateAccountDto) {
    return await this.AccountRp.update(+id, userUpdateDto);
  }

  async findEmail(email: string): Promise<Account> {
    return await this.AccountRp.findOne({
      where: {
        email: email,
      },
    });
  }

  // admin xác nhận nạp tiền cho users
  async updateMoney(id:number,accId:any,money:any,moneyOld:any){
    const updateMoney = parseInt(money) + parseInt(moneyOld)
    await this.AccountRp.update(accId,{
      money: updateMoney
    })
    return await this.RechargeHistoryService.updateStatus(id)
  }
   
  // user vote for candidates
  vote(quantityVote:number, idCandidate, getUser){
    let baseMoney = 10000;
    let totalMoney = baseMoney*quantityVote;
    let newMoney = getUser.money - totalMoney;
    if(getUser.money < totalMoney){
      return {
        action: false
      }
    }else{
      this.AccountRp.update(getUser.id,{
        money:newMoney,
      });
      this.candidatesServices.updateVote(quantityVote,idCandidate);
      this.VoteService.createHistoryVote(getUser.id,idCandidate,quantityVote);
      return {
        action: true
      }
    }
  }

  async MyhistoryVote(UserId: number){
    const history = await this.VoteService.historyVoteUser(UserId)
    return history;
  }
}

