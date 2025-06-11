
import { apiClient, ApiResponse } from '@/lib/api'

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  user: {
    id: string
    name: string
    email: string
    role?: string
  }
  token: string
  success: boolean
  message?: string
}

export interface LogoutResponse {
  success: boolean
  message?: string
}

export class LoginService {
  // Authenticate user
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', {
      ...credentials,
      device: import.meta.env.VITE_LOGIN_DEVICE,
    })
  }

  // Logout user
  async logout(): Promise<LogoutResponse> {
    return apiClient.post<LogoutResponse>('/auth/logout')
  }

  // Get current user info
  async getCurrentUser(): Promise<ApiResponse<any>> {
    return apiClient.get<ApiResponse<any>>('/auth/me')
  }

  // Refresh token
  async refreshToken(): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/refresh')
  }

  // Verify token
  async verifyToken(token: string): Promise<ApiResponse<boolean>> {
    return apiClient.post<ApiResponse<boolean>>('/auth/verify', { token })
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/auth/change-password', {
      current_password: currentPassword,
      new_password: newPassword,
    })
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<ApiResponse<void>> {
    return apiClient.post<ApiResponse<void>>('/auth/password-reset', { email })
  }
}

export const loginService = new LoginService()
