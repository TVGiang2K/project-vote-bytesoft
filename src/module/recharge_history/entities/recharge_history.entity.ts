import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from 'src/module/account/account.entity';

// @Entity('RechargeHistory')
export class RechargeHistory{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>  Account, (Account) => Account.id)
    Account: Account;

    @Column({ type: 'tinyint'})
    status:number;

    @Column({  type: 'bigint' })
    wait_money:number;

    @Column({ type: 'datetime',   default: () => 'NOW()' })
    created_date: Date;
}
