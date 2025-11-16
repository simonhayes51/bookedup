/**
 * Bookings Service
 */

import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

export const bookingsService = {
  // Get all bookings
  async getBookings(params = {}) {
    return await apiService.get(API_ENDPOINTS.BOOKINGS.LIST, params);
  },

  // Get single booking
  async getBooking(id) {
    return await apiService.get(API_ENDPOINTS.BOOKINGS.GET(id));
  },

  // Create booking
  async createBooking(bookingData) {
    return await apiService.post(API_ENDPOINTS.BOOKINGS.CREATE, bookingData);
  },

  // Update booking status
  async updateBookingStatus(id, status, cancellationReason = null) {
    return await apiService.put(API_ENDPOINTS.BOOKINGS.UPDATE_STATUS(id), {
      status,
      cancellationReason,
    });
  },

  // Delete booking
  async deleteBooking(id) {
    return await apiService.delete(API_ENDPOINTS.BOOKINGS.DELETE(id));
  },
};

export default bookingsService;
