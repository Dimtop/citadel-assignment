import { NextFunction, Request, Response } from 'express'
import { getUsers } from '../users/users.service'
import { generateOTPSecret, login, register, renewAuth, verifyOTP } from './auth.service'
import { AlreadyExistsException, NotFoundException } from '../../app/errors.types'

import { plainToInstance } from 'class-transformer'
import { LoginReqBodyDTO, LoginResDTO, RegisterReqBodyDTO, RegisterResDTO } from './auth.types'
import * as bcrypt from 'bcrypt'
import { authenticator, totp } from 'otplib'
import QRCode from 'qrcode'

export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
  const registrationData = plainToInstance(RegisterReqBodyDTO, req.body, {
    excludeExtraneousValues: true
  })
  const existingUser = await getUsers({ email: registrationData.email })

  if (existingUser.length > 0) {
    throw new AlreadyExistsException('This user already exists')
  }
  const otpSecretData = generateOTPSecret(registrationData.email)

  const user = await register({
    ...registrationData,
    password: await bcrypt.hash(registrationData.password, 12),
    has2faEnabled: false,
    otpSecret: otpSecretData.secret
  })

  const qrCode = await QRCode.toDataURL(otpSecretData.keyURI)

  res.json(
    plainToInstance(
      RegisterResDTO,
      {
        ...user,
        qrCode
      },
      { excludeExtraneousValues: true }
    )
  )
}

export const loginHanlder = async (req: Request, res: Response, next: NextFunction) => {
  const loginData = plainToInstance(LoginReqBodyDTO, req.body, { excludeExtraneousValues: true })
  const loginResponse = await login(loginData)
  res.json(plainToInstance(LoginResDTO, loginResponse, { excludeExtraneousValues: true }))
}

export const verifyOTPHander = async (req: Request, res: Response, next: NextFunction) => {
  const { code, userId } = req.body
  res.json(await verifyOTP(userId, code))
}

export const renewAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.body
  res.json(await renewAuth(refreshToken))
}
