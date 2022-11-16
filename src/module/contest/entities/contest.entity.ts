import { Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity('contest')
export class Contest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'datetime'})
  start_date: Date;

  @Column({ type: 'datetime'})
  last_date: Date; 

  @Column({ type: 'tinyint', default: () => 0 })
  status: number;

  @Column({ type: 'datetime',   default: () => 'NOW()' })
  createdAt: Date; 

  @Column({ type: 'datetime', nullable: true })
  updateAt: Date;

  @Column({ type: 'datetime', nullable: true })
  deleteAt: Date;
}