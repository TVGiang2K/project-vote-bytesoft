import { Candidate } from "src/module/candidates/entities/candidate.entity";
import { User } from "src/module/user/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn, Entity } from "typeorm";
@Entity('vote')
export class Vote {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'datetime'})
    created_time: Date

    @ManyToOne(()=>  Candidate, (candidate) => candidate.id)
    candidate: Candidate;
    @ManyToOne(()=>  User , (user ) => user.id)
    user: User;
}
