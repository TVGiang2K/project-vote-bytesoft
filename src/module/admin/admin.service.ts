import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { createAdminDto } from './dto/createAdmin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly AdminRepo: Repository<Admin>,
  ) {}
  async findAll(): Promise<Admin[]> {
    return await this.AdminRepo.find();
  } 

  async create(data: createAdminDto){
    return await this.AdminRepo.save(data)
  }
  
}
