import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import router from '../router'
import { loginRequest, registerRequest, verifyOTPRequest } from '../api/requests/auth.requests'
import type { ILoginReqBody, IRegisterReqBody } from '../types'

import { isStringEmptyOrNullOrUndefined } from '../utils'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    accessToken: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    userId: Cookies.get('userId') || ''
  }),
  getters: {
    authState: (state) =>
      !(
        isStringEmptyOrNullOrUndefined(state.refreshToken) ||
        isStringEmptyOrNullOrUndefined(state.refreshToken) ||
        isStringEmptyOrNullOrUndefined(state.userId)
      )
  },
  actions: {
    async register(registrationData: IRegisterReqBody) {
      const user = await registerRequest(registrationData)
      Cookies.set('userId', user.id)
      this.userId = user.id
      return user
    },
    async verifyOTPCode(code: string) {
      return await verifyOTPRequest({ userId: this.userId, code })
    },
    async login(loginData: ILoginReqBody) {
      const loginResponse = await loginRequest(loginData)
      Cookies.set('userId', loginResponse?.userId)
      Cookies.set('accessToken', loginResponse?.accessToken)
      Cookies.set('refreshToken', loginResponse?.refreshToken)
      this.$patch({
        ...loginResponse
      })
    },
    async logout() {
      Cookies.remove('userId')
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      this.$patch({
        accessToken: null,
        refreshToken: null,
        userId: ''
      })
      router.push('login')
    }
  }
})
