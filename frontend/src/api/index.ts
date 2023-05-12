import axios, { type InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { renewAuthRequest } from './requests/auth.requests'
import { useAuthStore } from '../stores/auth.store'
import { useAppStore } from '../stores/app.store'
import router from '../router'

const URL = import.meta.env['VITE_API_URL']

const axiosInstance = axios.create({
  baseURL: URL,
  timeoutErrorMessage: 'Request took long to complete, times up!'
})
const axiosAuthInstance = axios.create({
  baseURL: URL,
  timeoutErrorMessage: 'Request took long to complete, times up!'
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    const appStore = useAppStore()
    appStore.showErrorToast(error?.response?.data?.message || 'Something went wrong')
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    const appStore = useAppStore()
    appStore.resetErrorToast()
    return response?.data?.data
  },
  async (error) => {
    const authStore = useAuthStore()
    const appStore = useAppStore()

    if (
      (error.response.status === 401 || error.message.status === 403) &&
      !error.config.headers['x-retry']
    ) {
      error.config.headers['x-retry'] = 'true'
      // Renew access token
      const _refreshToken = Cookies.get('refreshToken')
      if (_refreshToken) {
        try {
          const tokens: any = await axiosAuthInstance.post(`${URL}/auth/renew`, {
            refreshToken: _refreshToken
          })
          await renewAuthRequest({
            refreshToken: _refreshToken
          })
          axios.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`
          // Set new access token
          Cookies.set('accessToken', tokens.accessToken)
          Cookies.set('refreshToken', tokens.refreshToken)
          authStore.$patch({
            ...tokens
          })

          return axiosInstance(error.config)
        } catch (error) {
          // Remove old token
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
          authStore.$patch({
            accessToken: null,
            refreshToken: null
          })
          router.push('login')
        }
      }
    }

    appStore.showErrorToast(error?.response?.data?.message || 'Something went wrong')
    return Promise.reject(error)
  }
)

export const postRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.post(endpoint, { ...body }, {})
}

export const putRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.put(endpoint, { ...body }, {})
}

export const getRequest = (endpoint: string, params?: any): Promise<any> => {
  return axiosInstance.get(endpoint, { params })
}

export const deleteRequest = (endpoint: string, params?: any): Promise<any> => {
  return axiosInstance.delete(endpoint, { params })
}
