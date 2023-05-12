import {
  AlreadyExistsException,
  InternalError,
  NotFoundException,
  UnauthorizedException
} from '../../app/errors.types'
import { createUser, getUser, getUsers, updateUser } from '../users/users.service'
import { UserPostReqBodyDTO } from '../users/users.types'
import { totp, authenticator } from 'otplib'
import { ICreateUserTokensData, IOTPSecretData, LoginReqBodyDTO } from './auth.types'
import { User } from '../users/users.entity'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as crypto from 'crypto'
import { DBInstance } from '../../db/db-instance'
import { AccessToken } from './accessToken.entity'
import { RefreshToken } from './refreshToken.entity'
import { FindOptionsWhere } from 'typeorm'
import moment from 'moment'

const accessTokensRespository = DBInstance.getRepository(AccessToken)
const refreshTokensRespository = DBInstance.getRepository(RefreshToken)

export const register = async (userData: UserPostReqBodyDTO) => await createUser(userData)

export const generateOTPSecret = (email: string): IOTPSecretData => {
  const secret = authenticator.generateSecret(20)
  return {
    keyURI: totp.keyuri(email, 'Citadel', secret),
    secret
  }
}

export const verifyOTP = async (userId: string, token: string) => {
  const user = await getUser(userId)

  if (!user) {
    throw new NotFoundException('User not found')
  }
  const isValid = authenticator.verify({ token, secret: user.otpSecret })
  await updateUser({ ...user, has2faEnabled: isValid })
  return isValid
}

export const login = async (loginData: LoginReqBodyDTO): Promise<ICreateUserTokensData> => {
  const users = await getUsers({ email: loginData.email })

  if (!users || users.length == 0) {
    throw new UnauthorizedException('Wrong username')
  }
  const user = users[0]

  const isPasswordValid = await bcrypt.compare(loginData.password, user.password)

  if (!isPasswordValid) {
    throw new UnauthorizedException('Wrong password')
  }

  return {
    ...(await createUserTokens(user)),
    userId: user.id
  }
}

export const renewAuth = async (refreshToken: string) => {
  const refreshTokenFromDb = await refreshTokensRespository.findOneBy({
    token: refreshToken
  })
  if (!refreshTokenFromDb) {
    throw new UnauthorizedException('Not authorized')
  }
  if (moment().isAfter(refreshTokenFromDb.expiresOn)) {
    throw new UnauthorizedException('Refresh token expired')
  }
  return await createUserTokens(refreshTokenFromDb.user)
}

export const createUserTokens = async (user: User) => {
  const payload = {
    sub: user.id,
    userId: user.id,
    authorized: true
  }
  if (!process.env['JWT_SECRET'] || !process.env['JWT_DURATION']) {
    throw new InternalError()
  }

  const accessToken = jwt.sign(payload, process.env['JWT_SECRET'] as string, {
    expiresIn: `${process.env['JWT_DURATION'] as string}h`
  })
  const refreshToken = crypto.randomBytes(64).toString('base64')

  const currentUserAccessToken = await accessTokensRespository.findOneBy({ user: { id: user.id } })
  const currentUserRefreshToken = await refreshTokensRespository.findOneBy({
    user: { id: user.id }
  })

  if (currentUserRefreshToken) {
    await refreshTokensRespository.save({
      ...currentUserRefreshToken,
      token: refreshToken,
      user: user,
      expiresOn: moment().add(Number(process.env['JWT_DURATION']), 'weeks').toDate()
    })
  } else {
    await refreshTokensRespository.save({
      user: user,
      token: refreshToken,
      expiresOn: moment().add(Number(process.env['JWT_DURATION']), 'weeks').toDate()
    })
  }

  if (currentUserAccessToken) {
    await accessTokensRespository.save({
      ...currentUserAccessToken,
      token: accessToken,
      user: user,
      expiresOn: moment().add(Number(process.env['JWT_DURATION']), 'hours').toDate()
    })
  } else {
    await accessTokensRespository.save({
      user: user,
      token: accessToken,
      expiresOn: moment().add(Number(process.env['JWT_DURATION']), 'hours').toDate()
    })
  }

  return {
    accessToken,
    refreshToken
  }
}
