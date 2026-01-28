export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/auth/signup',
    SIGNIN: '/api/auth/signin',
    SIGNOUT: '/api/auth/signout',
    SESSION: '/api/auth/session',
  },
  NOTEBOOKS: '/api/notebooks',
  NOTEBOOKS_GET: '/api/notebooks/get',
  NOTES: '/api/notes',
  NOTES_LIST: '/api/notes/list',
  NOTES_GET: '/api/notes/get',
  PROFILE: '/api/profile',
  PROFILE_PICTURE: '/api/profile/picture'
} as const;
