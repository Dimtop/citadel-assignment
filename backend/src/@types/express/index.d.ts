type IRequestContext = {
  userId: string
}

declare global {
  namespace Express {
    interface Request {
      context: IRequestContext
    }
  }
}
export default global
