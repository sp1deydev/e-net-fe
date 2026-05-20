import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor to automatically attach token
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response Interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status
      const data = error.response.data as any
      const errorMessage = data?.message || error.message

      console.error(`[API Error] Status: ${status} - Message: ${errorMessage}`)

      if (status === 401) {
        // Clear auth sessions on token expiry
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('currentUser')
        localStorage.removeItem('accessToken')
        
        // Optionally redirect or notify via window events
        window.dispatchEvent(new Event('auth:unauthorized'))
      }
    } else {
      console.error('[API Network Error] - ', error.message)
    }

    return Promise.reject(error)
  }
)
