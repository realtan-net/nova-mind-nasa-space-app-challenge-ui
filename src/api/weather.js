import api from './axios';

export const weatherAPI = {
  // Get weather data for a specific date
  getWeatherData: async (params) => {
    const { latitude, longitude, date, historicalYears = 20 } = params;
    
    // Use all 6 required parameters
    const parameters = 'T2M,RH2M,WS10M,WD10M,PS,ALLSKY_SFC_SW_DWN';
    
    return api.get('/weather/data', {
      params: {
        latitude,
        longitude,
        date, // Format: YYYY-MM-DD
        parameters,
        historicalYears,
        format: 'json'
      }
    });
  },

  // Get available parameters
  getParameters: async () => {
    return api.get('/weather/parameters');
  },

  // Get historical range
  getHistoricalRange: async (latitude, longitude) => {
    return api.get('/weather/historical-range', {
      params: { latitude, longitude }
    });
  }
};
