import { PartialType } from '@nestjs/swagger';
import { CreateRechargeHistoryDto } from './create-recharge_history.dto';

export class UpdateRechargeHistoryDto extends PartialType(CreateRechargeHistoryDto) {}
