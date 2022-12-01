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
import { RechargeHistory } from '../recharge_history/entities/recharge_history.entity';


  @Entity('account')
  export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    name: string;
  
    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER})
    role: Role;

    @Column({ type: 'varchar',nullable: true })
    avatar: string;
  
    @Column({ type: 'varchar', unique: true, nullable: true  })
    phone: string;
  
    @Column({nullable: true, default: () => 0 })
    money: number;
  
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

    @OneToMany(()=> RechargeHistory, (RechargeHistory) => RechargeHistory.id)
    RechargeHistory: RechargeHistory[]
    
    
  }
  