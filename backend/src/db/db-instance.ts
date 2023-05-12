require('dotenv').config()
import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../domain/users/users.entity'
import { OtpSecret1683736176187 } from '../../migrations/1683736176187-otpSecret'
import { AccessToken } from '../domain/auth/accessToken.entity'
import { RefreshToken } from '../domain/auth/refreshToken.entity'
import { Team } from '../domain/teams/teams.entity'
import { Player } from '../domain/teams/players.entity'

const postgresConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

export const DBInstance = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [User, AccessToken, RefreshToken, Team, Player],
  migrations: [OtpSecret1683736176187]
})
