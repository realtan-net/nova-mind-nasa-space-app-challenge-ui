import { useState, useEffect } from 'react';
import { asteroidAPI } from '../api/asteroids';

export const useAsteroidFeed = (startDate, endDate) => {
  const [asteroids, setAsteroids] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsteroids = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
      setError(null);

      try {
        const response = await asteroidAPI.getFeed(startDate, endDate);
        setAsteroids(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch asteroid data');
        console.error('Asteroid fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, [startDate, endDate]);

  return { asteroids, loading, error };
};
