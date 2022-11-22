import { Injectable} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { loginUserDto } from './dto/loginUser.dto';
import * as bcrypt from 'bcrypt';

export type user_info = any;
@Injectable()
export class userService {

  private readonly users = this.UserRepo.find();
  constructor(
    @InjectRepository(User)
    private readonly UserRepo: Repository<User>,
  ) {}
  
  async findAll(): Promise<User[]> {
    return await this.UserRepo.find();
  } 

  async findOne(email: string): Promise<user_info | undefined> {
    return (await this.users).find(user => user.email === email);
  }

  async create(data: createUserDto){
    data.password =  await bcrypt.hash(data.password, 10);
    try {
      const user_bcrypt = await this.UserRepo.save(data);
      delete user_bcrypt.password;
      return user_bcrypt;
    } catch (error) {
      throw new Error('User already exists');
    }
  }

  remove(id: number){
    return this.UserRepo.delete(id)
  }

  async update(id: number, userUpdateDto:updateUserDto){
    return await this.UserRepo.update(+id, userUpdateDto);
  }

  async login(Dto: loginUserDto){
    // tìm kiếm user theo email
    const user = await this.UserRepo.findOne({
      where : {
        email: Dto.email,
      }
    });
    if(!user){
      throw new Error(`thông tin tài khoản không chính xác`);
    }

    const pw = await bcrypt.compare(Dto.password, user.password);
    if(!pw){
      throw new Error('thông tin tài không chính xác')
    }    

    delete user.password;
    return user;
    // tìm kiếm user theo password
  }

  check_money(){
    // return this.UserRepo.findOne({
    //   where:{
    //     money
    //   }
    // })
  }
}
