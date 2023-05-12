import { NextFunction, Request, Response } from 'express'
import { APIError } from './errors.types'

export const errorMiddleware = (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode || 500).json({ ...error, success: false })
}
