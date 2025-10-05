import { useState, useEffect } from 'react';
import { eonetAPI } from '../api/eonet';

export const useEonetCategories = () => {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await eonetAPI.getCategories();
        setCategories(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch EONET categories');
        console.error('EONET categories fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useEonetEvents = (params = {}) => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await eonetAPI.getEvents(params);
        setEvents(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch EONET events');
        console.error('EONET events fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [JSON.stringify(params)]);

  return { events, loading, error };
};

export const useEonetEventsGeoJSON = (params = {}) => {
  const [geoJSON, setGeoJSON] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await eonetAPI.getEventsGeoJSON(params);
        setGeoJSON(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch EONET GeoJSON');
        console.error('EONET GeoJSON fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGeoJSON();
  }, [JSON.stringify(params)]);

  return { geoJSON, loading, error };
};

export const useEonetEventsByCategory = (categoryId, params = {}) => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoryId) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await eonetAPI.getEventsByCategory(categoryId, params);
        setEvents(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch category events');
        console.error('EONET category events fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [categoryId, JSON.stringify(params)]);

  return { events, loading, error };
};

export const useEonetRegionalEvents = (params = {}) => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if we have bbox or user location
    if (!params.bbox && (!params.userLat || !params.userLon)) return;

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await eonetAPI.getRegionalEvents(params);
        setEvents(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch regional events');
        console.error('EONET regional events fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [JSON.stringify(params)]);

  return { events, loading, error };
};
