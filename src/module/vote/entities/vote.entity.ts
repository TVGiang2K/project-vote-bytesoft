import { Admin } from "src/module/admin/admin.entity";
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
    @ManyToOne(()=>  Admin , (user ) => user.id)
    user: Admin;
}
