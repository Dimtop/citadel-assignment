import { Expose } from 'class-transformer'

export class RegisterReqBodyDTO {
  @Expose()
  email: string
  @Expose()
  name: string
  @Expose()
  password: string
}

export class LoginReqBodyDTO {
  @Expose()
  email: string
  @Expose()
  password: string
}

export class RegisterResDTO {
  @Expose()
  id: string
  @Expose()
  email: string
  @Expose()
  has2faEnabled: boolean
  @Expose()
  name: string
  @Expose()
  qrCode: string
}

export class LoginResDTO {
  @Expose()
  userId: string
  @Expose()
  accessToken: string
  @Expose()
  refreshToken: string
}

export type IOTPSecretData = {
  secret: string
  keyURI: string
}

export type ICreateUserTokensData = {
  userId: string
  accessToken: string
  refreshToken: string
}
