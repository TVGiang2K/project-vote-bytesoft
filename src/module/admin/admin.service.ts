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
    private readonly AdminRp: Repository<Admin>
  ) {}
  
  async create(data: createAdminDto){
    const admin = this.AdminRp.create(data);
    await admin.save();
    delete admin.password;

    return admin
  }
  

  
  async showById(id: number): Promise<Admin> {
    const admin = await this.AdminRp.findOne({where : {id: id}});
    delete admin.password;
    return admin;
  }



  async findEmail(email: string): Promise<Admin>{ 
    return await this.AdminRp.findOne({
      where:{
        email:email
      }
    });
}


}
