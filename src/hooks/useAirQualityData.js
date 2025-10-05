import { useState, useEffect } from 'react';
import { openaqAPI } from '../api/openaq';

// Custom hook to fetch air quality data
export const useAirQuality = (latitude, longitude, radius = 25000, limit = 10) => {
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirQuality = async () => {
      if (!latitude || !longitude) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await openaqAPI.getAirQuality(latitude, longitude, radius, limit);
        // Response already unwrapped by axios interceptor
        setAirQuality(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch air quality data');
        setAirQuality(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAirQuality();
  }, [latitude, longitude, radius, limit]);

  return { airQuality, loading, error };
};
