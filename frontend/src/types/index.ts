export interface IRegisterReqBody {
  email: string
  name: string
  password: string
}

export interface IVerifyOTPReqBody {
  code: string
  userId: string
}

export interface ILoginReqBody {
  email: string
  password: string
}

export interface ICreateTeamReqBody {
  name: string
  user: string
}

export interface ICreateTeamPlayerReqBody {
  team: string
  name: string
  isInjured: boolean
}

export interface ITeam {
  id: string
  user: any
  name: string
  created_at: Date
  updated_at: Date
}

export interface IPlayer {
  id: string
  team: any
  name: string
  isInjured: boolean
  created_at: Date
  updated_at: Date
}
