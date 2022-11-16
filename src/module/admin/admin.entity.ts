import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    BaseEntity,
  } from 'typeorm';
  
  @Entity('admin')
  export class Admin extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    name: string;
  
    @Column({ type: 'varchar' })
    email: string;
  
    @Column({ type: 'varchar' })
    password: string;
  
    @Column({ type: 'datetime',   default: () => 'NOW()' })
    createdAt: Date; 
  
    @Column({ type: 'datetime', nullable: true })
    updateAt: Date;
  
    @Column({ type: 'datetime', nullable: true })
    deleteAt: Date;
  }
  