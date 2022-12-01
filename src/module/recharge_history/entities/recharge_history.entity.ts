import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from 'src/module/account/account.entity';
@Entity()
export class RechargeHistory{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>  Account, (Account) => Account.id)
    Account: Account;

    // @Column()
    // @JoinColumn({name: 'accountId'})
    // accountId:Account;

    @Column({ type: 'tinyint', default: () => 0 })
    status:number;

    @Column({  type: 'bigint' })
    wait_money:number;

    @Column({ type: 'datetime',   default: () => 'NOW()' })
    created_date: Date;
}
