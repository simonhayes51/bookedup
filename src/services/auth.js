/**
 * Authentication Service
 */

import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

export const authService = {
  // Register new user
  async register(userData) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    if (response.token) {
      apiService.setToken(response.token);
    }
    return response;
  },

  // Login user
  async login(credentials) {
    const response = await apiService.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    if (response.token) {
      apiService.setToken(response.token);
    }
    return response;
  },

  // Logout user
  async logout() {
    await apiService.post(API_ENDPOINTS.AUTH.LOGOUT);
    apiService.setToken(null);
    localStorage.clear();
  },

  // Get current user
  async getCurrentUser() {
    return await apiService.get(API_ENDPOINTS.AUTH.ME);
  },

  // Update user details
  async updateDetails(userData) {
    return await apiService.put(API_ENDPOINTS.AUTH.UPDATE_DETAILS, userData);
  },

  // Update password
  async updatePassword(passwords) {
    return await apiService.put(API_ENDPOINTS.AUTH.UPDATE_PASSWORD, passwords);
  },

  // Forgot password
  async forgotPassword(email) {
    return await apiService.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  // Reset password
  async resetPassword(token, password) {
    return await apiService.put(API_ENDPOINTS.AUTH.RESET_PASSWORD(token), { password });
  },

  // Verify email
  async verifyEmail(token) {
    return await apiService.get(API_ENDPOINTS.AUTH.VERIFY_EMAIL(token));
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!apiService.token;
  },

  // Get token
  getToken() {
    return apiService.token;
  },
};

export default authService;
