import { Injectable,HttpStatus, HttpException } from '@nestjs/common';
import { Admin } from './admin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createAdminDto } from './dto/createAdmin.dto';
import { updateAdminDto } from './dto/updateAdmin.dto';
import * as bcrypt from 'bcrypt';
import { loginUserDto } from '../user/dto/loginUser.dto';
import { info } from 'console';

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
  

  async findByLogin({email, password}:loginUserDto){
    const admin = await this.AdminRp.findOne({
        where: { email: email}
    });

    if(!admin){
      throw new HttpException("Admin Not Found", HttpStatus.UNAUTHORIZED);
    }
    const compare_pass = await bcrypt.compare(password,admin.password)
    if(!compare_pass){
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }
    return admin;
  }
  
  async showById(id: number): Promise<Admin> {
    const admin = await this.AdminRp.findOne({where : {id: id}});
    delete admin.password;
    return admin;
  }

  async showAll(): Promise<Admin[]>{
    return await this.AdminRp.find();
  }
  remove(id: number){
    return this.AdminRp.delete(id)
  }
  async update(id: number, userUpdateDto:updateAdminDto){
    return await this.AdminRp.update(+id, userUpdateDto);
  }

  async findEmail(email: string): Promise<Admin>{ 
    return await this.AdminRp.findOne({
      where:{
        email:email
      }
    });
}


}
