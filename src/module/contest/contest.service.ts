import { Injectable } from '@nestjs/common';
import { CreateContestDto } from './dto/create-contest.dto';
import { UpdateContestDto } from './dto/update-contest.dto';
import { Contest } from '../contest/entities/contest.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult,DeleteResult } from 'typeorm';

@Injectable()
export class ContestService {
  constructor(
    @InjectRepository(Contest) // tự động cập nhật khi có thay đổi về dữ liệu
    private contestsRepository: Repository<Contest>,
  ) {}
  create(createContestDto: CreateContestDto): Promise<Contest> {
    return this.contestsRepository.save(createContestDto);
  }

  findAll(): Promise<Contest[]> {
    return this.contestsRepository.find();
  }

  findOne(id: number) : Promise<Contest> {
    return this.contestsRepository.findOneBy({id});
  }

  update(id: number, updateContestDto: UpdateContestDto): Promise<UpdateResult> {
    return this.contestsRepository.update(id, updateContestDto);
  }

  remove(id: number): Promise<DeleteResult>{
    return this.contestsRepository.delete(id);
  }
}
