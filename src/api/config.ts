// src/api/config.ts
export const getBaseUrl = (): string => {
    const env = process.env.NODE_ENV || 'development'
  
    switch (env) {
      case 'production':
        return 'https://api.production.com'
      case 'staging':
        return 'https://api.staging.com'
      case 'development':
      default:
        return 'http://localhost:4000'
    }
  }
  