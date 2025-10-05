import api from './axios';

export const geomagneticAPI = {
  // Get geomagnetic storms
  getStorms: async (startDate, endDate) => {
    return api.get('/geomagnetic/storms', {
      params: { startDate, endDate }
    });
  },

  // Get 3-day forecast
  get3DayForecast: async () => {
    return api.get('/geomagnetic/forecast/3-day');
  },

  // Get 27-day forecast
  get27DayForecast: async () => {
    return api.get('/geomagnetic/forecast/27-day');
  },

  // Get combined forecast
  getCombinedForecast: async () => {
    return api.get('/geomagnetic/forecast/combined');
  }
};
