import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Unique,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { User } from '../users/users.entity'
import Model from '../../db/base-entity'

@Entity('accessTokens')
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  token: string

  @Column()
  expiresOn: Date

  @OneToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id', name: 'user' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
