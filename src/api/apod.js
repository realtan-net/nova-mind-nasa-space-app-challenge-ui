import api from './axios';

export const apodAPI = {
  // Get today's APOD
  getToday: async (thumbs = false) => {
    return api.get('/apod', {
      params: { thumbs }
    });
  },

  // Get APOD by date
  getByDate: async (date, thumbs = false) => {
    return api.get(`/apod/date/${date}`, {
      params: { thumbs }
    });
  },

  // Get random APOD
  getRandom: async (count = 1, thumbs = false) => {
    return api.get('/apod/random', {
      params: { count, thumbs }
    });
  }
};
