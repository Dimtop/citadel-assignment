import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'

import { TeamPlayerPostReqBodyDTO, TeamPostReqBodyDTO } from './teams.types'
import {
  createTeam,
  createTeamPlayer,
  deleteTeam,
  deleteTeamPlayer,
  getTeam,
  getTeamPlayers,
  getTeams,
  updateTeamPlayer
} from './teams.service'
import { UserPostResDTO } from '../users/users.types'

export const getTeamsHandler = async (req: Request, res: Response) => {
  const teams = await getTeams(req.query)

  res.json(
    teams.map((team) => {
      return {
        ...team,
        user: plainToInstance(UserPostResDTO, team.user, { excludeExtraneousValues: true })
      }
    })
  )
}

export const getTeamHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const team = await getTeam(id)
  res.json({
    ...team,
    user: plainToInstance(UserPostResDTO, team?.user, { excludeExtraneousValues: true })
  })
}

export const createTeamHandler = async (req: Request, res: Response) => {
  const teamData = plainToInstance(TeamPostReqBodyDTO, req.body, { excludeExtraneousValues: true })
  const team = await createTeam(teamData)
  res.json({
    ...team,
    user: plainToInstance(UserPostResDTO, team.user, { excludeExtraneousValues: true })
  })
}

export const deleteTeamHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteTeam(id)
  res.json(id)
}

export const getTeamPlayersHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const players = await getTeamPlayers(id)

  res.json(players)
}

export const createTeamPlayerHandler = async (req: Request, res: Response) => {
  const playerData = plainToInstance(TeamPlayerPostReqBodyDTO, req.body, {
    excludeExtraneousValues: true
  })
  const player = await createTeamPlayer(playerData)
  res.json(player)
}

export const deleteTeamPlayerHandler = async (req: Request, res: Response) => {
  const { playerId } = req.params
  await deleteTeamPlayer(playerId)

  res.json(playerId)
}

export const updateTeamPlayerHandler = async (req: Request, res: Response) => {
  const { playerId } = req.params
  const player = await updateTeamPlayer(playerId, req.body)
  res.json(player)
}
