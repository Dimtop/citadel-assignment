import { AlreadyExistsException, InvalidRequestException } from '../../app/errors.types'
import { DBInstance } from '../../db/db-instance'
import { getUser } from '../users/users.service'
import { Player } from './players.entity'
import { Team } from './teams.entity'
import { TeamPlayerPostReqBodyDTO, TeamPostReqBodyDTO } from './teams.types'

const teamsRepository = DBInstance.getRepository(Team)
const playersRepository = DBInstance.getRepository(Player)

export const createTeam = async (team: TeamPostReqBodyDTO) => {
  const user = await getUser(team.user)
  if (!user) {
    throw new InvalidRequestException('Wrong user id')
  }
  const existingTeam = await teamsRepository.findOne({
    where: {
      name: team.name
    }
  })
  if (existingTeam) {
    throw new AlreadyExistsException('This team already exists')
  }
  return await teamsRepository.save({ ...team, user })
}
export const updateTeam = async (team: Partial<Team>) => await teamsRepository.save(team)
export const deleteTeam = async (teamId: string) => await teamsRepository.delete({ id: teamId })
export const getTeams = async (query: { [key: string]: any }): Promise<Team[]> =>
  await teamsRepository.find({ where: { ...query }, relations: ['user'] })
export const getTeam = async (id: string): Promise<Team | null> =>
  await teamsRepository.findOne({ where: { id } })
export const getTeamPlayers = async (id: string) =>
  await playersRepository.find({
    where: {
      team: {
        id
      }
    },
    relations: {
      team: true
    }
  })
export const createTeamPlayer = async (player: TeamPlayerPostReqBodyDTO) => {
  const team = await getTeam(player.team)
  if (!team) {
    throw new InvalidRequestException('Wrong team')
  }
  const existingPlayer = await playersRepository.findOne({
    where: {
      name: player.name,
      team: { id: player.team }
    }
  })
  if (existingPlayer) {
    throw new AlreadyExistsException('This player is already in the team')
  }
  return await playersRepository.save({ ...player, team })
}

export const deleteTeamPlayer = async (playerId: string) =>
  await playersRepository.delete({ id: playerId })
export const updateTeamPlayer = async (playerId: string, player: Partial<Player>) =>
  await playersRepository.update({ id: playerId }, player)
