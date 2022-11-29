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


  @Entity('account')
  export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    name: string;
  
    @Column({ type: 'varchar', unique: true   })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @Column({ type: 'varchar' })
    avatar: string;
  
    @Column({ type: 'varchar', unique: true  })
    phone: string;
  
    @Column({ type: 'varchar' })
    money: string;
  
    @OneToMany(()=> Vote, (vote) => vote.id)
    vote: Vote[];
    
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

    @BeforeInsert()
    async hashPhone(){
      this.phone = await bcrypt.hash(this.phone, 8); 
    }
    
  }
  