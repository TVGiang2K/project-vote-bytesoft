import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  avatar: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'varchar' })
  money: string;

  @Column({ type: 'datetime',   default: () => 'NOW()' })
  createdAt: Date; 

  @Column({ type: 'datetime', nullable: true })
  updateAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deleteAt: Date;
}
