import api from './axios';

export const eonetAPI = {
  // Get categories
  getCategories: async () => {
    return api.get('/eonet/categories');
  },

  // Get events
  getEvents: async (params = {}) => {
    return api.get('/eonet/events', { params });
  },

  // Get events in GeoJSON format
  getEventsGeoJSON: async (params = {}) => {
    return api.get('/eonet/events/geojson', { params });
  },

  // Get events by category
  getEventsByCategory: async (categoryId, params = {}) => {
    return api.get(`/eonet/events/category/${categoryId}`, { params });
  },

  // Get regional events with bounding box
  getRegionalEvents: async (params = {}) => {
    return api.get('/eonet/events/regional', { params });
  }
};
