import { NextFunction, Request, Response } from 'express'

export const controllerWrapper =
  (controller: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      console.log(error)
      return next(error)
    }
  }
