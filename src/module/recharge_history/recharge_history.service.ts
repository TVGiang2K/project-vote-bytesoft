import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { Account } from '../account/account.entity';
import { User } from '../account/user.decorator';
import { CreateRechargeHistoryDto } from './dto/create-recharge_history.dto';
import { UpdateRechargeHistoryDto } from './dto/update-recharge_history.dto';
import { RechargeHistory } from './entities/recharge_history.entity';

@Injectable()
export class RechargeHistoryService {
  constructor(
    @InjectRepository(RechargeHistory)
    private historyRepository: Repository<RechargeHistory>
  ){}
  create(createRechargeHistoryDto: CreateRechargeHistoryDto) {
    return 'This action adds a new rechargeHistory';
  }

  async findAll(): Promise<RechargeHistory[]>{
    return await this.historyRepository.find({relations: ['Account']})
  }

  async findOne(id: number): Promise<RechargeHistory> {
    return await this.historyRepository.findOne({where: {id:id}, relations: ['Account']})
  }

  update(id: number, updateRechargeHistoryDto: UpdateRechargeHistoryDto) {
    return `This action updates a #${id} rechargeHistory`;
  }

  remove(id: number) {
    return this.historyRepository.delete(id)
  }

  async User_recharge(body:number,@User() userReq): Promise<RechargeHistory>{
    console.log(body)
    const data = new RechargeHistory()
    data.Account = userReq.id;
    let a = data.wait_money = body;
    console.log(data)

    return await this.historyRepository.save(data)
  }

  async cancel_recharge(req){
    return this.historyRepository.delete(req)
  }

  updateStatus(id:number){
    return this.historyRepository.update(id,{
      status: 1
    })
  }
}
