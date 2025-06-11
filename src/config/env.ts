// Environment configuration for Joomla API integration
export const env = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://test82mac.bie-paris.local',
  LOGIN_DEVICE: import.meta.env.VITE_LOGIN_DEVICE || 'CRM25',
  INITIAL_TOKEN: import.meta.env.VITE_INITIAL_TOKEN || '3MraZBpsdPbC3gcbSWuOmEtgCGql40EM9gAoi0eX4xulKT6p9dBSrIR2JtYeRrbh',
  
  // Feature flags
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true' || false, // Default to real API
  
  // Other environment variables
  APP_ENV: import.meta.env.MODE || 'development',
  
  // Debug flags
  DEBUG_API: import.meta.env.VITE_DEBUG_API === 'true' || true, // Enable by default for development
} as const

// Log configuration in development
if (env.APP_ENV === 'development') {
  console.log('🔧 Environment Configuration:', {
    API_BASE_URL: env.API_BASE_URL,
    LOGIN_DEVICE: env.LOGIN_DEVICE,
    USE_MOCK_DATA: env.USE_MOCK_DATA,
    APP_ENV: env.APP_ENV,
    DEBUG_API: env.DEBUG_API,
  })
}
