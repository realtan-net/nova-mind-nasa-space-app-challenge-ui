import api from './axios';

export const openaqAPI = {
  // Get air quality for location
  getAirQuality: async (latitude, longitude, radius = 25000, limit = 10) => {
    return api.get('/openaq/airquality', {
      params: {
        coordinates: `${latitude},${longitude}`,
        radius,
        limit
      }
    });
  }
};
