import { NextFunction, Request, Response } from 'express'
import { InternalError, UnauthorizedException } from '../../app/errors.types'
import { DBInstance } from '../../db/db-instance'
import { AccessToken } from './accessToken.entity'
import moment from 'moment'
import * as jwt from 'jsonwebtoken'

const accessTokensRespository = DBInstance.getRepository(AccessToken)

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!Object.keys(req.headers).includes('authorization')) {
    throw new UnauthorizedException('Authorization header not present')
  }
  const accessToken = req.headers['authorization']?.replace('Bearer', '').trim()

  const accessTokenFromDB = await accessTokensRespository.findOne({
    where: {
      token: accessToken
    }
  })

  if (!accessTokenFromDB) {
    throw new UnauthorizedException('Not authorized')
  }
  if (moment().isAfter(accessTokenFromDB.expiresOn)) {
    throw new UnauthorizedException('Access token expired')
  }

  try {
    if (!process.env['JWT_SECRET']) {
      throw new InternalError()
    }
    const tokenData = jwt.verify(
      accessTokenFromDB.token,
      process.env['JWT_SECRET']
    ) as jwt.JwtPayload
    if (!tokenData.userId) {
      throw new UnauthorizedException('Unauthorized user')
    }
    req.context = {
      ...req.context,
      userId: tokenData.userId
    }
    next()
  } catch (e) {
    console.log(e)
    throw new UnauthorizedException('Error verifying access token')
  }
}
