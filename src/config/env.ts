// Environment configuration for API integration
export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api',
  
  // Feature flags
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || true, // Default to mock data
  
  // Other environment variables
  APP_ENV: import.meta.env.MODE || 'development',
  
  // Debug flags
  DEBUG_API: import.meta.env.VITE_DEBUG_API === 'true' || false,
} as const

// Log configuration in development
if (env.APP_ENV === 'development') {
  console.log('Environment Configuration:', {
    API_BASE_URL: env.API_BASE_URL,
    USE_MOCK_DATA: env.USE_MOCK_DATA,
    APP_ENV: env.APP_ENV,
  })
}
