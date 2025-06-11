
import axios, { AxiosInstance, AxiosResponse } from 'axios'

// API configuration for Joomla backend integration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://test82mac.bie-paris.local'
const LOGIN_DEVICE = import.meta.env.VITE_LOGIN_DEVICE || 'CRM25'
const INITIAL_TOKEN = import.meta.env.VITE_INITIAL_TOKEN || '3MraZBpsdPbC3gcbSWuOmEtgCGql40EM9gAoi0eX4xulKT6p9dBSrIR2JtYeRrbh'

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
  success: boolean
}

class ApiClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor for auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token') || INITIAL_TOKEN
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        // Add login device to headers
        config.headers['X-Login-Device'] = LOGIN_DEVICE
        
        // Log requests in development
        if (import.meta.env.DEV) {
          console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
          })
        }
        
        return config
      },
      (error) => {
        console.error('Request interceptor error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log responses in development
        if (import.meta.env.DEV) {
          console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data)
        }
        return response
      },
      (error) => {
        console.error('API Error:', error)
        
        // Handle unauthorized access
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        
        return Promise.reject(error)
      }
    )
  }

  // HTTP Methods
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const response = await this.instance.get<T>(endpoint, { params })
    return response.data
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.instance.post<T>(endpoint, data)
    return response.data
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.instance.put<T>(endpoint, data)
    return response.data
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await this.instance.patch<T>(endpoint, data)
    return response.data
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await this.instance.delete<T>(endpoint)
    return response.data
  }

  // File upload method
  async uploadFile<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await this.instance.post<T>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export const apiClient = new ApiClient()
