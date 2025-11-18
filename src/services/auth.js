/**
 * Authentication Service - Mock Implementation
 */

import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

// Mock user data
const DEMO_USERS = {
  performer: {
    id: 1,
    email: 'demo@performer.com',
    firstName: 'Alex',
    lastName: 'Turner',
    role: 'performer',
    avatar: 'https://i.pravatar.cc/150?img=33',
    verified: true,
    premium: true
  },
  client: {
    id: 2,
    email: 'demo@client.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'client',
    avatar: 'https://i.pravatar.cc/150?img=45'
  }
};

export const authService = {
  // Register new user - Mock
  async register(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const user = {
      id: Math.floor(Math.random() * 10000),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role || 'client',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      verified: false,
      premium: false
    };

    const token = 'mock_token_' + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    apiService.setToken(token);

    return { token, user };
  },

  // Login user - Mock
  async login(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check for demo accounts
    if (credentials.email === 'demo@performer.com' && credentials.password === 'demo') {
      const user = DEMO_USERS.performer;
      const token = 'demo_token_performer';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      apiService.setToken(token);
      return { token, user };
    }

    if (credentials.email === 'demo@client.com' && credentials.password === 'demo') {
      const user = DEMO_USERS.client;
      const token = 'demo_token_client';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      apiService.setToken(token);
      return { token, user };
    }

    // For any other login, create a mock user
    const user = {
      id: Math.floor(Math.random() * 10000),
      email: credentials.email,
      firstName: credentials.email.split('@')[0],
      lastName: 'User',
      role: 'client',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    const token = 'mock_token_' + Date.now();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    apiService.setToken(token);

    return { token, user };
  },

  // Demo login - Instant access
  async demoLogin(type = 'performer') {
    const user = DEMO_USERS[type] || DEMO_USERS.performer;
    const token = `demo_token_${type}`;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    apiService.setToken(token);

    return { token, user };
  },

  // Logout user
  async logout() {
    apiService.setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  async getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return { data: user };
    }
    throw new Error('No user found');
  },

  // Update user details - Mock
  async updateDetails(userData) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { data: updatedUser };
    }
    throw new Error('No user found');
  },

  // Update password - Mock
  async updatePassword(passwords) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  // Forgot password - Mock
  async forgotPassword(email) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, message: 'Password reset email sent (mock)' };
  },

  // Reset password - Mock
  async resetPassword(token, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  // Verify email - Mock
  async verifyEmail(token) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Get token
  getToken() {
    return localStorage.getItem('token');
  },
};

export default authService;
