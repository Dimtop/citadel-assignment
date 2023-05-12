<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useTeamsStore } from '../stores/teams.store'
import router from '../router'
import { useRoute } from 'vue-router'
import type { IPlayer, ITeam } from '../types'
import { isStringEmptyOrNullOrUndefined } from '../utils'
import { useAppStore } from '../stores/app.store'

const teamsStore = useTeamsStore()
const appStore = useAppStore()

let name = ''
let isInjured = false

onMounted(() => {
  const route = useRoute()
  teamsStore.getTeam(route.params.id as string)
  teamsStore.getTeamPlayers(route.params.id as string)
})

const onPlayerAdd = async () => {
  if (isStringEmptyOrNullOrUndefined(name)) {
    return appStore.showErrorToast('Please provide a name')
  }
  await teamsStore.createTeamPlayer({
    name,
    isInjured,
    team: teamsStore?.currentTeam?.id || ''
  })
}

const onIsInjuredChange = async (e: any, player: IPlayer) => {
  await teamsStore.updateTeamPlayer(player.team.id, player.id, { isInjured: e.target.checked })
}
</script>

<template>
  <div>
    <h1>{{ teamsStore.currentTeam?.name }}</h1>
    <br />
    <div class="d-flex">
      <input
        class="form-control me-2"
        type="search"
        placeholder="Search Player"
        @input="(e:any)=>teamsStore.searchPlayer(e.target.value||'')"
      />
    </div>
    <br />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Injured</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="player in teamsStore.currentPlayers" :key="player.id">
          <td>{{ player.name }}</td>
          <td>
            <input
              type="checkbox"
              :checked="player.isInjured"
              @change="(e) => onIsInjuredChange(e, player)"
            />
          </td>
          <td>
            <span
              class="btn btn-link"
              @click="teamsStore.deleteTeamPlayer(player.team.id, player.id)"
              >Delete</span
            >
          </td>
        </tr>

        <tr class="table-secondary">
          <td><input type="text" v-model="name" /></td>
          <td><input type="checkbox" v-model="isInjured" /></td>
          <td><button class="btn btn-link" @click="onPlayerAdd">Add</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
