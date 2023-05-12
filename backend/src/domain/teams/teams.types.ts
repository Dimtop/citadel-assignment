import { Expose } from 'class-transformer'

export class TeamPostReqBodyDTO {
  @Expose()
  user: string
  @Expose()
  name: string
}

export class TeamPlayerPostReqBodyDTO {
  @Expose()
  team: string
  @Expose()
  name: string
  @Expose()
  isInjured: boolean
}

export class GetTeamsByReqParamsDTO {
  @Expose()
  key: string
  @Expose()
  value: string
}
