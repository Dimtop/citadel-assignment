import { NextFunction, Request, Response } from 'express'
import { createUser, getAllUsers, getUsers } from './users.service'
import { InternalError, NotFoundException, UnauthorizedException } from '../../app/errors.types'
import { plainToInstance } from 'class-transformer'
import { GetUserByReqParamsDTO, UserPostReqBodyDTO, UserPostResDTO } from './users.types'
import { getTeams } from '../teams/teams.service'

export const getUsersHandler = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query
  const users = await getUsers(query)
  res.json(
    users.map((user) => plainToInstance(UserPostResDTO, user, { excludeExtraneousValues: true }))
  )
}

export const createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
  const userData = plainToInstance(UserPostReqBodyDTO, req.body, { excludeExtraneousValues: true })
  const user = await createUser(userData)
  res.json(plainToInstance(UserPostResDTO, user, { excludeExtraneousValues: true }))
}
