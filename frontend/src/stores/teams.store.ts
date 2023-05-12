import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import router from '../router'
import { registerRequest } from '../api/requests/auth.requests'
import type {
  ICreateTeamPlayerReqBody,
  ICreateTeamReqBody,
  IPlayer,
  IRegisterReqBody,
  ITeam
} from '../types'
import {
  createTeamPlayerRequest,
  createTeamRequest,
  deleteTeamPlayerRequest,
  deleteTeamRequest,
  getTeamPlayersRequest,
  getTeamRequest,
  getTeamsRequest,
  updateTeamPlayerRequest
} from '../api/requests/teams.requests'
import { useAuthStore } from './auth.store'
import Fuse from 'fuse.js'
import { isStringEmptyOrNullOrUndefined } from '../utils'

export const useTeamsStore = defineStore({
  id: 'teams',
  state: () => ({
    teams: [] as ITeam[],
    currentTeam: null as ITeam | null,
    currentPlayers: [] as IPlayer[]
  }),
  actions: {
    async getTeams(query: { [key: string]: any } = {}) {
      const authStore = useAuthStore()
      const teams = await getTeamsRequest({
        ...query,
        'user.id': authStore.userId
      })
      this.$patch({
        teams
      })
    },
    async createTeam(name: string) {
      const authStore = useAuthStore()
      await createTeamRequest({
        name,
        user: authStore.userId
      })
      await this.getTeams()
    },
    async deleteTeam(id: string) {
      await deleteTeamRequest(id)
      await this.getTeams()
    },
    async getTeam(id: string) {
      this.currentTeam = await getTeamRequest(id)
    },
    async getTeamPlayers(id: string) {
      this.currentPlayers = await getTeamPlayersRequest(id)
    },
    async createTeamPlayer(playerData: ICreateTeamPlayerReqBody) {
      await createTeamPlayerRequest(playerData)
      await this.getTeamPlayers(playerData.team)
    },
    async deleteTeamPlayer(teamId: string, playerId: string) {
      await deleteTeamPlayerRequest(teamId, playerId)
      await this.getTeamPlayers(teamId)
    },
    async updateTeamPlayer(
      teamId: string,
      playerId: string,
      player: Partial<ICreateTeamPlayerReqBody>
    ) {
      await updateTeamPlayerRequest(teamId, playerId, player)
      await this.getTeamPlayers(teamId)
    },
    async searchPlayer(searchText: string) {
      await this.getTeamPlayers(this.currentTeam?.id || '')
      if (isStringEmptyOrNullOrUndefined(searchText)) {
        return
      }
      const options = {
        includeScore: true,
        threshold: 0.2,
        // Search in `author` and in `tags` array
        keys: ['name']
      }
      const fuse = new Fuse(this.currentPlayers, options)
      const searchResult = fuse.search(searchText)
      this.currentPlayers = searchResult.map((e) => e.item)
    }
  }
})
