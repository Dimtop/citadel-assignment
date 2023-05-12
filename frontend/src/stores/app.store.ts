import Cookies from 'js-cookie'
import { defineStore } from 'pinia'
import router from '../router'
import { registerRequest } from '../api/requests/auth.requests'
import type { IRegisterReqBody } from '../types'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    isErrorToastVisible: false,
    errorToastMessage: ''
  }),
  actions: {
    async showErrorToast(message: string) {
      this.isErrorToastVisible = true
      this.errorToastMessage = message
    },
    async resetErrorToast() {
      this.isErrorToastVisible = false
      this.errorToastMessage = ''
    }
  }
})
