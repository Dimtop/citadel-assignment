import { NextFunction, Request, Response } from 'express'

export const responseFormatMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const resJson = res.json

  res.json = function (data: any) {
    if (data.success !== null && typeof data.success !== 'undefined' && !data.success) {
      return resJson.call(res, {
        ...data
      })
    }

    return resJson.call(res, {
      data,
      success: true
    })
  }
  next()
}
