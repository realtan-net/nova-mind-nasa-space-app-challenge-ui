import { useState, useEffect } from 'react';
import { geomagneticAPI } from '../api/geomagnetic';

export const useGeomagneticStorms = (startDate, endDate) => {
  const [storms, setStorms] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStorms = async () => {
      if (!startDate || !endDate) return;

      setLoading(true);
      setError(null);

      try {
        const response = await geomagneticAPI.getStorms(startDate, endDate);
        setStorms(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch geomagnetic storms');
        console.error('Geomagnetic storms fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStorms();
  }, [startDate, endDate]);

  return { storms, loading, error };
};

export const useGeomagnetic3DayForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await geomagneticAPI.get3DayForecast();
        setForecast(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch 3-day forecast');
        console.error('3-day forecast fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  return { forecast, loading, error };
};

export const useGeomagnetic27DayForecast = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await geomagneticAPI.get27DayForecast();
        setForecast(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch 27-day forecast');
        console.error('27-day forecast fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, []);

  return { forecast, loading, error };
};
