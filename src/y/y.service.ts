import { Injectable } from '@nestjs/common';
import { CreateYDto } from './dto/create-y.dto';
import { UpdateYDto } from './dto/update-y.dto';

@Injectable()
export class YService {
  create(createYDto: CreateYDto) {
    return 'This action adds a new y';
  }

  findAll() {
    return `This action returns all y`;
  }

  findOne(id: number) {
    return `This action returns a #${id} y`;
  }

  update(id: number, updateYDto: UpdateYDto) {
    return `This action updates a #${id} y`;
  }

  remove(id: number) {
    return `This action removes a #${id} y`;
  }
}
