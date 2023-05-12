<script setup lang="ts">
import ErrorToast from './components/ErrorToast.vue'
import NavigationBar from './components/NavigationBar.vue'
</script>

<template>
  <div class="row">
    <NavigationBar />
  </div>
  <div class="row justify-content-center">
    <ErrorToast />
  </div>
  <div class="row flex-grow-1">
    <router-view />
  </div>
</template>
