import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { User } from '../users/users.entity'

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id', name: 'user' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
