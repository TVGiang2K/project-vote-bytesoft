import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
    BeforeInsert,
  } from 'typeorm';
 import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/roles/roles.enum';
import { Vote } from '../vote/entities/vote.entity';



  @Entity('admin')
  export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    name: string;
  
    @Column({ type: 'varchar' })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER})
    role: Role;
    
    @Column({ type: 'datetime',   default: () => 'NOW()' })
    createdAt: Date; 
  
    @Column({ type: 'datetime', nullable: true })
    updateAt: Date;
    
    @Column({ type: 'datetime', nullable: true })
    deleteAt: Date;

    @BeforeInsert()
    async hashPassword(){
      this.password = await bcrypt.hash(this.password, 8); 
    }
    
    
    // async validatePassword(passport: string): Promise<boolean>{
    //   return bcrypt.compare(passport, this.password )
    // }
  }
  