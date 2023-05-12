<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppStore } from '../stores/app.store'
import { useAuthStore } from '../stores/auth.store'
import { isStringEmptyOrNullOrUndefined } from '../utils'
import router from '../router'

const authStore = useAuthStore()
</script>

<template>
  <nav
    class="navbar navbar-expand-lg sticky-top bg-body-tertiary"
    data-bs-theme="dark"
    style="margin-bottom: 1rem"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Team Rosters</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="authStore.authState">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/teams">Teams</router-link>
          </li>
        </ul>
        <div class="d-flex" v-if="authStore.authState">
          <button class="btn btn-link" @click="authStore.logout">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>
