import { Contest } from 'src/module/contest/entities/contest.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'

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
    phone: number

    @Column({ type: 'tinyint'})
    status: number
    
    @ManyToMany(()=> Contest)
    // Candidate_id: number
    @JoinTable()
    contests: Contest[]
    
  @Column({ type: 'datetime',   default: () => 'NOW()' })
  createdAt: Date; 

  @Column({ type: 'datetime', nullable: true })
  updateAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deleteAt: Date;

}
 