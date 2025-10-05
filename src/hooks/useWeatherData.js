import { useState, useEffect } from 'react';
import { weatherAPI } from '../api/weather';

export const useWeatherData = (latitude, longitude, date, historicalYears = 20) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!latitude || !longitude || !date) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await weatherAPI.getWeatherData({
          latitude,
          longitude,
          date, // Format: YYYY-MM-DD
          historicalYears
        });
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
        console.error('Weather data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [latitude, longitude, date, historicalYears]);

  const refetch = () => {
    if (latitude && longitude && date) {
      fetchData();
    }
  };

  return { data, loading, error, refetch };
};

export const useWeatherParameters = () => {
  const [parameters, setParameters] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParameters = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await weatherAPI.getParameters();
        setParameters(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch weather parameters');
        console.error('Weather parameters fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, []);

  return { parameters, loading, error };
};
