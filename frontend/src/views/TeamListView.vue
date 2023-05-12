<script setup lang="ts">
import { useAppStore } from '../stores/app.store'
import router from '../router'
import { useTeamsStore } from '../stores/teams.store'
import { onMounted, ref } from 'vue'
import { isStringEmptyOrNullOrUndefined } from '../utils'

let nameToAdd = ''

const teamsStore = useTeamsStore()
const appStore = useAppStore()

onMounted(() => {
  teamsStore.getTeams()
})

const onTeamAdd = async () => {
  if (isStringEmptyOrNullOrUndefined(nameToAdd)) {
    return appStore.showErrorToast('Please provide a name')
  }
  await teamsStore.createTeam(nameToAdd)
}

const onTeamClick = async (teamId: string) => {
  router.push(`/teams/${teamId}`)
}
</script>

<template>
  <div>
    <h1>Teams</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Team Name</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="team in teamsStore.teams" :key="team.id">
          <td>
            <a href="#" @click="onTeamClick(team.id)">{{ team.name }}</a>
          </td>
          <td><span class="btn btn-link" @click="teamsStore.deleteTeam(team.id)">Delete</span></td>
        </tr>

        <tr class="table-secondary">
          <td><input type="text" v-model="nameToAdd" /></td>
          <td><button class="btn btn-link" @click="onTeamAdd">Add</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
