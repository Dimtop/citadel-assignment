import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm'

@Entity('users')
@Unique(['email', 'name'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Index('email_index')
  @Column()
  email: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  has2faEnabled: boolean

  @Column({ nullable: true })
  otpSecret: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
