
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient } from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
  role?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  refreshAuth: () => Promise<void>
}

interface LoginCredentials {
  username: string
  password: string
}

interface LoginResponse {
  user: User
  token: string
  success: boolean
  message?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing auth on app start
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    const storedToken = localStorage.getItem('auth_token')
    const initialToken = import.meta.env.VITE_INITIAL_TOKEN
    
    if (storedToken || initialToken) {
      const tokenToUse = storedToken || initialToken
      setToken(tokenToUse)
      
      try {
        // Verify token and get user info
        await refreshAuth()
      } catch (error) {
        console.error('Auth initialization failed:', error)
        logout()
      }
    }
    
    setIsLoading(false)
  }

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        ...credentials,
        device: import.meta.env.VITE_LOGIN_DEVICE,
      })

      if (response.success && response.token) {
        setToken(response.token)
        setUser(response.user)
        localStorage.setItem('auth_token', response.token)
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error.response?.data?.message || error.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
  }

  const refreshAuth = async () => {
    try {
      const response = await apiClient.get<{ user: User; success: boolean }>('/auth/me')
      
      if (response.success && response.user) {
        setUser(response.user)
      } else {
        throw new Error('Failed to get user info')
      }
    } catch (error) {
      console.error('Auth refresh failed:', error)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    logout,
    refreshAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
