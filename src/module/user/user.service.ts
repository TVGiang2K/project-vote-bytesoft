import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.UserRepo.find();
  } 

  async create(data: createUserDto){
    return await this.UserRepo.save(data)
  }

  remove(id: number){
    return this.UserRepo.delete(id)
  }

  update(id: number){}
}
