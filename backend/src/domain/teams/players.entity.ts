import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { Team } from './teams.entity'

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  isInjured: boolean

  @ManyToOne(() => Team, { onDelete: 'CASCADE' })
  @JoinColumn({ referencedColumnName: 'id', name: 'team' })
  team: Team

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
