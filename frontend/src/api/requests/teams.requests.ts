import { deleteRequest, getRequest, postRequest, putRequest } from '..'
import type { ICreateTeamPlayerReqBody, ICreateTeamReqBody } from '../../types'

export const getTeamsRequest = (params: { [key: string]: any }) => {
  return getRequest('teams', params)
}

export const createTeamRequest = (body: ICreateTeamReqBody) => {
  return postRequest('teams', body)
}

export const deleteTeamRequest = (id: string) => {
  return deleteRequest(`teams/${id}`)
}

export const getTeamRequest = (id: string) => {
  return getRequest(`teams/${id}`)
}

export const getTeamPlayersRequest = (id: string) => {
  return getRequest(`teams/${id}/players`)
}

export const createTeamPlayerRequest = (body: ICreateTeamPlayerReqBody) => {
  return postRequest(`teams/${body.team}/players`, body)
}

export const deleteTeamPlayerRequest = (teamId: string, playerId: string) => {
  return deleteRequest(`teams/${teamId}/players/${playerId}`)
}

export const updateTeamPlayerRequest = (
  teamId: string,
  playerId: string,
  body: Partial<ICreateTeamPlayerReqBody>
) => {
  return putRequest(`teams/${teamId}/players/${playerId}`, body)
}
