<script setup lang="ts">
import router from '../router'

const onViewMyTeamsClick = () => {
  router.push('teams')
}
</script>

<template>
  <div class="row justify-content-center align-items-center">
    <button class="btn btn-primary btn-lg" style="width: 10rem" @click="onViewMyTeamsClick">
      View my teams
    </button>
  </div>
</template>
