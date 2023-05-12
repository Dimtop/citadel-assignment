<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAppStore } from '../stores/app.store'
import { useAuthStore } from '../stores/auth.store'
import { isStringEmptyOrNullOrUndefined } from '../utils'
import router from '../router'

let email = ''
let password = ''
let successfulLogin = ref(false)
let otpCode = ''

const authStore = useAuthStore()
const appStore = useAppStore()

const onLogin = async () => {
  await authStore.login({
    email,
    password
  })
  successfulLogin.value = true
}

const onVerifyOTP = async () => {
  let isValid = await authStore.verifyOTPCode(otpCode)
  if (!isValid) {
    return appStore.showErrorToast('Wrong OTP code')
  }
  router.push({ name: 'teams' })
}
</script>

<template>
  <div class="container-sm" style="max-width: 400px">
    <div class="card">
      <h5 class="card-header">Login</h5>
      <div class="card-body">
        <div class="card-text">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input
              id="email"
              type="email"
              class="form-control"
              v-model="email"
              :disabled="successfulLogin"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="password"
              :disabled="successfulLogin"
            />
          </div>
          <div class="gap-2justify-content-sm-end" :hidden="successfulLogin">
            <button @click="onLogin" class="btn btn-primary me-md-2" type="submit">Login</button>
          </div>
          <div :hidden="!successfulLogin">
            <div class="mb-3">
              <label for="2faCode" class="form-label">2FA</label>
              <input type="text" class="form-control" v-model="otpCode" />
            </div>
            <div class="gap-2justify-content-sm-end">
              <button class="btn btn-primary me-md-2" type="submit" @click="onVerifyOTP">
                Verify OTP code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div><a href="/register">Register</a></div>
  </div>
</template>
