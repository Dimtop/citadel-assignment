<script setup lang="ts">
import { useAppStore } from '../stores/app.store'
import { useAuthStore } from '../stores/auth.store'
import { isStringEmptyOrNullOrUndefined } from '../utils'
import router from '../router'
import { ref } from 'vue'

let email = ''
let name = ''
let password = ''
let confirmPassword = ''
let qrCode = ref('')
let successfullRegistration = ref(false)
let otpCode = ''

const authStore = useAuthStore()
const appStore = useAppStore()

const onRegister = async () => {
  if (
    isStringEmptyOrNullOrUndefined(email) ||
    isStringEmptyOrNullOrUndefined(name) ||
    isStringEmptyOrNullOrUndefined(password) ||
    isStringEmptyOrNullOrUndefined(confirmPassword)
  ) {
    return appStore.showErrorToast('You must fill in all the fields')
  }
  if (password !== confirmPassword) {
    return appStore.showErrorToast('Passwords must be the same')
  }

  let registrationData = {
    email,
    name,
    password
  }

  const user = await authStore.register(registrationData)
  successfullRegistration.value = true
  qrCode.value = user.qrCode
}

const onVerifyOTP = async () => {
  let isValid = await authStore.verifyOTPCode(otpCode)
  if (!isValid) {
    return appStore.showErrorToast('Wrong OTP code')
  }
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="container-sm" style="max-width: 400px">
    <div class="card">
      <h5 class="card-header">Register New User</h5>
      <div class="card-body">
        <div class="card-text">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              type="email"
              class="form-control"
              v-model="email"
              :disabled="successfullRegistration"
            />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              v-model="name"
              :disabled="successfullRegistration"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              :disabled="successfullRegistration"
            />
          </div>
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              :disabled="successfullRegistration"
              v-model="confirmPassword"
            />
          </div>

          <div class="gap-2 justify-content-sm-end" :hidden="successfullRegistration">
            <button class="btn btn-primary me-md-2" @click="onRegister">Register</button>
          </div>
          <div :hidden="!successfullRegistration">
            <div class="mb-3">
              <img :src="qrCode" alt="qrCode" />
            </div>
            <div class="mb-3">
              <label for="2faCode" class="form-label">Enter your 2FA code</label>
              <input type="text" class="form-control" id="2faCode" v-model="otpCode" />
            </div>
            <div class="gap-2 justify-content-sm-end">
              <button class="btn btn-primary me-md-2" @click="onVerifyOTP">
                Complete registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
