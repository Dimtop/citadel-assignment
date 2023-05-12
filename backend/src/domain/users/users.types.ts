import { Expose } from 'class-transformer'

export class UserPostReqBodyDTO {
  @Expose()
  email: string
  @Expose()
  password: string
  @Expose()
  name: string
  @Expose()
  has2faEnabled: boolean
  @Expose()
  otpSecret: string
}

export class UserPostResDTO {
  @Expose()
  email: string
  @Expose()
  has2faEnabled: boolean
  @Expose()
  name: string
}

export class GetUserByReqParamsDTO {
  @Expose()
  key: string
  @Expose()
  value: string
}
