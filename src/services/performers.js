/**
 * Performers Service
 */

import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

export const performersService = {
  // Get all performers
  async getPerformers(params = {}) {
    return await apiService.get(API_ENDPOINTS.PERFORMERS.LIST, params);
  },

  // Get single performer
  async getPerformer(id) {
    return await apiService.get(API_ENDPOINTS.PERFORMERS.GET(id));
  },

  // Create performer profile
  async createPerformer(performerData) {
    return await apiService.post(API_ENDPOINTS.PERFORMERS.CREATE, performerData);
  },

  // Update performer profile
  async updatePerformer(id, performerData) {
    return await apiService.put(API_ENDPOINTS.PERFORMERS.UPDATE(id), performerData);
  },

  // Delete performer profile
  async deletePerformer(id) {
    return await apiService.delete(API_ENDPOINTS.PERFORMERS.DELETE(id));
  },

  // Toggle favorite
  async toggleFavorite(id) {
    return await apiService.post(API_ENDPOINTS.PERFORMERS.FAVORITE(id));
  },

  // Get user's favorites
  async getFavorites() {
    return await apiService.get(API_ENDPOINTS.PERFORMERS.FAVORITES);
  },
};

export default performersService;
