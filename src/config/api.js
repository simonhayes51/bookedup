/**
 * API Configuration
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:5000';
export const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    UPDATE_DETAILS: '/api/auth/updatedetails',
    UPDATE_PASSWORD: '/api/auth/updatepassword',
    FORGOT_PASSWORD: '/api/auth/forgotpassword',
    RESET_PASSWORD: (token) => `/api/auth/resetpassword/${token}`,
    VERIFY_EMAIL: (token) => `/api/auth/verify/${token}`,
    GOOGLE: '/api/auth/google',
    FACEBOOK: '/api/auth/facebook',
  },

  // Performers
  PERFORMERS: {
    LIST: '/api/performers',
    GET: (id) => `/api/performers/${id}`,
    CREATE: '/api/performers',
    UPDATE: (id) => `/api/performers/${id}`,
    DELETE: (id) => `/api/performers/${id}`,
    FAVORITE: (id) => `/api/performers/${id}/favorite`,
    FAVORITES: '/api/performers/favorites/me',
  },

  // Bookings
  BOOKINGS: {
    LIST: '/api/bookings',
    GET: (id) => `/api/bookings/${id}`,
    CREATE: '/api/bookings',
    UPDATE_STATUS: (id) => `/api/bookings/${id}/status`,
    DELETE: (id) => `/api/bookings/${id}`,
  },

  // Messages
  MESSAGES: {
    CONVERSATIONS: '/api/messages/conversations',
    GET_CONVERSATION: (id) => `/api/messages/conversations/${id}`,
    CREATE_CONVERSATION: '/api/messages/conversations',
    SEND: '/api/messages',
    MARK_READ: (id) => `/api/messages/conversations/${id}/read`,
    DELETE: (id) => `/api/messages/${id}`,
  },

  // Reviews
  REVIEWS: {
    LIST: (performerId) => `/api/reviews/performer/${performerId}`,
    GET: (id) => `/api/reviews/${id}`,
    CREATE: '/api/reviews',
    UPDATE: (id) => `/api/reviews/${id}`,
    DELETE: (id) => `/api/reviews/${id}`,
    RESPOND: (id) => `/api/reviews/${id}/respond`,
  },

  // Payments
  PAYMENTS: {
    CREATE_INTENT: '/api/payments/create-intent',
    CONFIRM: '/api/payments/confirm',
    REFUND: '/api/payments/refund',
    HISTORY: '/api/payments/history',
  },

  // Admin
  ADMIN: {
    STATS: '/api/admin/stats',
    USERS: '/api/admin/users',
    UPDATE_USER_STATUS: (id) => `/api/admin/users/${id}/status`,
    PENDING_PERFORMERS: '/api/admin/performers/pending',
    UPDATE_PERFORMER_STATUS: (id) => `/api/admin/performers/${id}/status`,
    PENDING_REVIEWS: '/api/admin/reviews/pending',
    MODERATE_REVIEW: (id) => `/api/admin/reviews/${id}/moderate`,
    BOOKINGS: '/api/admin/bookings',
  },
};

export default {
  API_URL,
  WS_URL,
  STRIPE_KEY,
  API_ENDPOINTS,
};
