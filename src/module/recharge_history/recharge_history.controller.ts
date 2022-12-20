import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Res } from '@nestjs/common';
import { RechargeHistoryService } from './recharge_history.service';
import { Request } from 'express';
import { CreateRechargeHistoryDto } from './dto/create-recharge_history.dto';
import { UpdateRechargeHistoryDto } from './dto/update-recharge_history.dto';
import { Auth } from 'src/auth/auth.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { User } from '../account/user.decorator';

@Controller('recharge-history')
export class RechargeHistoryController {
  constructor(private readonly rechargeHistoryService: RechargeHistoryService) {}

  // view admin xem lịch sử nạp tiền cho user
  @Auth(Role.ADMIN)
  @Get()
  @Render('recharge')
  async findAll(@User() user:any) {
    const data = await this.rechargeHistoryService.findAll();
    return {
      MyUser:user,
      data:data
    }
  }

  // @Get()
  // api_findAll() {
  //   return this.rechargeHistoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.rechargeHistoryService.findOne(+id);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: number) {
  //   this.rechargeHistoryService.remove(id)
  // }
 

}
