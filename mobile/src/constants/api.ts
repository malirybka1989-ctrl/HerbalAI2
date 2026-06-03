/**
 * API configuration for the HerbaAI mobile app.
 * Update BASE_URL to point to the deployed API server.
 */
export const API = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile',
    },
    PANTRY: {
      SCAN: '/pantry/scan',
      ITEMS: '/pantry/items',
      ADD_ITEM: '/pantry/items/add',
      REMOVE_ITEM: '/pantry/items/remove',
    },
    SUGGESTIONS: '/suggestions',
    SUBSCRIPTION: {
      STATUS: '/subscription/status',
      PLANS: '/subscription/plans',
      CREATE: '/subscription/create',
      CANCEL: '/subscription/cancel',
    },
    PRACTITIONERS: {
      LIST: '/practitioners',
      BOOK: '/consultations/book',
      SCHEDULE: '/consultations',
    },
    COURSES: {
      LIST: '/courses',
      ENROLL: '/courses/enroll',
      PROGRESS: '/courses/progress',
    },
  },
} as const;