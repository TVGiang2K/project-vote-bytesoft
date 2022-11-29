import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RechargeHistoryService } from './recharge_history.service';
import { CreateRechargeHistoryDto } from './dto/create-recharge_history.dto';
import { UpdateRechargeHistoryDto } from './dto/update-recharge_history.dto';

@Controller('recharge-history')
export class RechargeHistoryController {
  constructor(private readonly rechargeHistoryService: RechargeHistoryService) {}

  @Post()
  create(@Body() createRechargeHistoryDto: CreateRechargeHistoryDto) {
    return this.rechargeHistoryService.create(createRechargeHistoryDto);
  }

  @Get()
  findAll() {
    return this.rechargeHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rechargeHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRechargeHistoryDto: UpdateRechargeHistoryDto) {
    return this.rechargeHistoryService.update(+id, updateRechargeHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rechargeHistoryService.remove(+id);
  }
}
