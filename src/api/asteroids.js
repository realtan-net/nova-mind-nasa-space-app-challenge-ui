import api from './axios';

export const asteroidAPI = {
  // Get asteroid feed
  getFeed: async (startDate, endDate) => {
    return api.get('/asteroids/feed', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    });
  }
};
