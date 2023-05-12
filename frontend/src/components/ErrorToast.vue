<script setup lang="ts">
import { useAppStore } from '../stores/app.store'

const appStore = useAppStore()
</script>

<template>
  <div
    v-if="appStore.isErrorToastVisible"
    class="alert alert-danger"
    style="width: 20rem"
    role="alert"
  >
    {{ appStore.errorToastMessage }}
  </div>
</template>
