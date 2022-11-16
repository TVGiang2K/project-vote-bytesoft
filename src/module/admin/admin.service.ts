import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createAdminDto } from './dto/createAdmin.dto';
import { updateAdminDto } from './dto/updateAdmin.dto';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly AdminRp: Repository<Admin>,
  ) {}

  async findAll(): Promise<Admin[]> {
    return await this.AdminRp.find();
  } 

  findOne(id: number): Promise<Admin> {
    return this.AdminRp.findOneBy({ id });
  }

  async create(data: createAdminDto){
    return await this.AdminRp.save(data)
  }

  remove(id: number){
    return this.AdminRp.delete(id)
  }

  update(id: number, AdminUpdateDto:updateAdminDto){
    return this.AdminRp.update(+id, AdminUpdateDto);
  }
}
