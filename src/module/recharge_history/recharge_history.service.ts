import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findAll() {
    return `This action returns all rechargeHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rechargeHistory`;
  }

  update(id: number, updateRechargeHistoryDto: UpdateRechargeHistoryDto) {
    return `This action updates a #${id} rechargeHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} rechargeHistory`;
  }
}
