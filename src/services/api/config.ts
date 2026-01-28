export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',
  },
  FOLDERS: '/api/folders',
  NOTEBOOKS: '/api/notebooks',
  NOTES: '/api/notes',
  PROFILE: '/api/profile'
} as const;
