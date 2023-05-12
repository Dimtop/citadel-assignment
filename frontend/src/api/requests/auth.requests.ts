import { postRequest } from '..'
import type { ILoginReqBody, IRegisterReqBody, IVerifyOTPReqBody } from '../../types'

export const renewAuthRequest = (body: { refreshToken: string }) => {
  return postRequest('auth/renew', body)
}

export const registerRequest = (body: IRegisterReqBody) => {
  return postRequest('auth/register', body)
}

export const loginRequest = (body: ILoginReqBody) => {
  return postRequest('auth/login', body)
}

export const verifyOTPRequest = (body: IVerifyOTPReqBody) => {
  return postRequest('auth/otp/verify', body)
}
