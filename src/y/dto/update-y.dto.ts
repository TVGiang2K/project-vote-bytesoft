import { PartialType } from '@nestjs/mapped-types';
import { CreateYDto } from './create-y.dto';

export class UpdateYDto extends PartialType(CreateYDto) {}
