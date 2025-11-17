/**
 * Performers Service
 */

import apiService from './api';
import { API_ENDPOINTS } from '../config/api';

// Mock data for development
const mockPerformers = [
  {
    id: 1,
    stageName: 'DJ Alex Turner',
    genre: 'DJ',
    location: 'London',
    rating: 4.9,
    totalReviews: 248,
    priceMin: 350,
    priceMax: 850,
    priceUnit: 'event',
    verified: true,
    premium: true,
    featuredImage: 'https://images.unsplash.com/photo-1571266028243-d220c64cd3fe?w=800',
    bio: 'Professional DJ with 10+ years experience specializing in weddings and corporate events.'
  },
  {
    id: 2,
    stageName: 'Sarah Vocals',
    genre: 'Singer',
    location: 'Manchester',
    rating: 4.8,
    totalReviews: 156,
    priceMin: 400,
    priceMax: 900,
    priceUnit: 'event',
    verified: true,
    premium: false,
    featuredImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
    bio: 'Award-winning vocalist for weddings, corporate events, and private functions.'
  },
  {
    id: 3,
    stageName: 'The Rockers Band',
    genre: 'Band',
    location: 'Birmingham',
    rating: 4.7,
    totalReviews: 89,
    priceMin: 800,
    priceMax: 1500,
    priceUnit: 'event',
    verified: true,
    premium: true,
    featuredImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    bio: '5-piece live band playing rock, pop, and indie covers for any occasion.'
  },
  {
    id: 4,
    stageName: 'Mike Comedy',
    genre: 'Comedy',
    location: 'London',
    rating: 4.6,
    totalReviews: 67,
    priceMin: 300,
    priceMax: 600,
    priceUnit: 'event',
    verified: false,
    premium: false,
    featuredImage: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800',
    bio: 'Stand-up comedian available for corporate events, weddings, and private parties.'
  },
  {
    id: 5,
    stageName: 'Emma DJ',
    genre: 'DJ',
    location: 'Leeds',
    rating: 4.9,
    totalReviews: 134,
    priceMin: 320,
    priceMax: 750,
    priceUnit: 'event',
    verified: true,
    premium: true,
    featuredImage: 'https://images.unsplash.com/photo-1574434736850-e4e4c70e2720?w=800',
    bio: 'Female DJ specializing in house, techno, and chart music for all events.'
  },
  {
    id: 6,
    stageName: 'The Jazz Trio',
    genre: 'Band',
    location: 'London',
    rating: 4.8,
    totalReviews: 92,
    priceMin: 600,
    priceMax: 1200,
    priceUnit: 'event',
    verified: true,
    premium: false,
    featuredImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    bio: 'Professional jazz trio perfect for weddings, corporate dinners, and cocktail events.'
  }
];

export const performersService = {
  // Get all performers
  async getPerformers(params = {}) {
    // For now, return mock data instead of making API calls
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...mockPerformers];

        // Apply filters
        if (params.genre) {
          filtered = filtered.filter(p => p.genre === params.genre);
        }
        if (params.verified) {
          filtered = filtered.filter(p => p.verified);
        }
        if (params.premium) {
          filtered = filtered.filter(p => p.premium);
        }
        if (params.search) {
          const search = params.search.toLowerCase();
          filtered = filtered.filter(p =>
            p.stageName.toLowerCase().includes(search) ||
            p.bio.toLowerCase().includes(search)
          );
        }

        resolve({
          data: filtered,
          totalPages: 1,
          total: filtered.length
        });
      }, 500);
    });

    // Original API call (commented out for now)
    // return await apiService.get(API_ENDPOINTS.PERFORMERS.LIST, params);
  },

  // Get single performer
  async getPerformer(id) {
    // For now, return mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const performer = mockPerformers.find(p => p.id === parseInt(id));
        resolve({ data: performer || mockPerformers[0] });
      }, 300);
    });

    // Original API call (commented out for now)
    // return await apiService.get(API_ENDPOINTS.PERFORMERS.GET(id));
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
    // For now, just return success
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 200);
    });

    // Original API call (commented out for now)
    // return await apiService.post(API_ENDPOINTS.PERFORMERS.FAVORITE(id));
  },

  // Get user's favorites
  async getFavorites() {
    return await apiService.get(API_ENDPOINTS.PERFORMERS.FAVORITES);
  },
};

export default performersService;
