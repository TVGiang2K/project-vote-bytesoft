import { Account } from "src/module/account/account.entity";
import { Candidate } from "src/module/candidates/entities/candidate.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'datetime'})
    created_time: Date

    @ManyToOne(()=>  Candidate, (candidate) => candidate.id)
    candidate: Candidate;
    @ManyToOne(()=>  Account , (acc ) => acc.id)
    acc: Account; 
}
