import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Contest } from 'src/module/contest/entities/contest.entity'
import { Vote } from 'src/module/vote/entities/vote.entity'
 
@Entity()
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'varchar'})
    avatar: string

    @Column()
    age: number

    @Column({ type: 'text'})
    content: string

    @Column({ type: 'varchar'})
    adress: string

    @Column({ type: 'text', nullable: true})
    other: string

    @Column({unique: true})
    phone: string

    @Column({ type: 'tinyint'})
    status: number

    @Column({ type: 'bigint', default: 0 })
    quantityVote: number

 
    @ManyToOne(()=>  Contest, (contest) => contest.id)
    contest: Contest;
    
    @OneToMany(()=> Vote, (vote) => vote.id)
  vote: Vote[];
    
  @Column({ type: 'datetime',   default: () => 'NOW()' })
  createdAt: Date; 

  @Column({ type: 'datetime', nullable: true })
  updateAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deleteAt: Date;

}
 