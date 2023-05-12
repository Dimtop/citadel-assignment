import { Router } from 'express'
import { loginHanlder, registerHandler, renewAuthHandler, verifyOTPHander } from './auth.controller'
import { controllerWrapper } from '../../app/controller-wrapper.util'

const authRouter = Router()
authRouter.post('/register', controllerWrapper(registerHandler))
authRouter.post('/login', controllerWrapper(loginHanlder))
authRouter.post('/otp/verify', controllerWrapper(verifyOTPHander))
authRouter.post('/renew', controllerWrapper(renewAuthHandler))

export default authRouter
