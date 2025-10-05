import { Container, Grid, Box, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import APODCard from '../components/dashboard/APODCard';
import DashboardCard from '../components/dashboard/DashboardCard';
import EventsAlert from '../components/dashboard/EventsAlert';
import { useLocation } from '../context/LocationContext';
import { useWeatherData } from '../hooks/useWeatherData';
import { geomagneticAPI } from '../api/geomagnetic';
import { openaqAPI } from '../api/openaq';
import { eonetAPI } from '../api/eonet';
import { formatAPIDate, getCurrentDate, getCurrentHourTimestamp } from '../utils/dateFormatter';
import { AQI_LEVELS, KP_INDEX_LEVELS } from '../utils/constants';

const Home = () => {
  const { location } = useLocation();
  const today = formatAPIDate(getCurrentDate());
  
  // Use the same hook as Weather page
  const { data: weatherData, loading: weatherLoading } = useWeatherData(
    location.latitude,
    location.longitude,
    today,
    20
  );
  const [stats, setStats] = useState({
    temperature: null,
    kpIndex: null,
    aqi: null,
    activeEvents: null,
  });

  // Update temperature when weatherData changes
  useEffect(() => {
    if (!weatherData?.hourlyData?.T2M) {
      return;
    }
    
    const currentHourKey = getCurrentHourTimestamp();
    const hourlyData = weatherData.hourlyData.T2M;
    
    // Try to get current hour, fallback to closest hour
    let temperature = hourlyData[currentHourKey];
    if (temperature === undefined || temperature === null) {
      const hours = Object.keys(hourlyData).sort();
      if (hours.length > 0) {
        temperature = hourlyData[hours[0]];
      }
    }
    
    if (temperature !== undefined && temperature !== null) {
      setStats(prev => ({ ...prev, temperature: temperature.toFixed(1) }));
    }
  }, [weatherData]);

  useEffect(() => {
    fetchDashboardStats();
  }, [location]);

  const fetchDashboardStats = async () => {
    try {

      // Fetch geomagnetic
      try {
        const geoRes = await geomagneticAPI.get3DayForecast();
        const forecast = geoRes.data?.forecasts?.[0];
        if (forecast) {
          setStats(prev => ({ ...prev, kpIndex: forecast.kpIndex || 0 }));
        }
      } catch (err) {
        console.error('Geomagnetic fetch error:', err);
      }

      // Fetch air quality
      try {
        const aqRes = await openaqAPI.getAirQuality(location.latitude, location.longitude);
        const pm25 = aqRes.data?.measurements?.find(m => m.parameter === 'pm25');
        if (pm25) {
          setStats(prev => ({ ...prev, aqi: pm25.value.toFixed(1) }));
        }
      } catch (err) {
        console.error('AQ fetch error:', err);
      }

      // Fetch events count
      try {
        const eventsRes = await eonetAPI.getEvents({ status: 'open', limit: 100 });
        if (eventsRes.data?.events) {
          setStats(prev => ({ ...prev, activeEvents: eventsRes.data.events.length }));
        }
      } catch (err) {
        console.error('Events fetch error:', err);
      }
    } catch (error) {
      console.error('Dashboard stats error:', error);
    }
  };

  const getAQILevel = (value) => {
    if (!value) return null;
    for (const [key, level] of Object.entries(AQI_LEVELS)) {
      if (value <= level.max) return level;
    }
    return AQI_LEVELS.UNHEALTHY;
  };

  const getKpLevel = (value) => {
    if (value === null || value === undefined) return null;
    const kp = Math.floor(value);
    return KP_INDEX_LEVELS[kp] || KP_INDEX_LEVELS[0];
  };

  const aqiLevel = getAQILevel(stats.aqi);
  const kpLevel = getKpLevel(stats.kpIndex);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section - APOD */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
          Welcome to Nova Mind
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Your Gateway to Environmental & Space Data
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* APOD Featured */}
        <Grid item xs={12}>
          <APODCard featured />
        </Grid>

        {/* Quick Stats Dashboard */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
            Quick Stats
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Temperature"
            value={weatherLoading ? 'Loading...' : (stats.temperature || '--')}
            unit={weatherLoading ? '' : '°C'}
            icon="🌡️"
            color="#ef4444"
            subtitle={location.name}
            link="/weather"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Geomagnetic"
            value={stats.kpIndex !== null ? stats.kpIndex : '--'}
            unit="Kp"
            icon="🌍"
            color={kpLevel?.color}
            subtitle={kpLevel?.label || 'Loading...'}
            status={kpLevel?.label}
            link="/geomagnetic"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Air Quality"
            value={stats.aqi || '--'}
            unit="PM2.5"
            icon="💨"
            color={aqiLevel?.color}
            subtitle={aqiLevel?.label || 'Loading...'}
            status={aqiLevel?.label}
            link="/air-quality"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard
            title="Active Events"
            value={stats.activeEvents || '--'}
            icon="⚠️"
            color="#f59e0b"
            subtitle="Natural disasters worldwide"
            link="/events"
          />
        </Grid>

        {/* Recent Natural Events */}
        <Grid item xs={12} md={6}>
          <EventsAlert />
        </Grid>

        {/* Upcoming Asteroids - Placeholder */}
        <Grid item xs={12} md={6}>
          <DashboardCard
            title="Near-Earth Objects"
            value="Coming Soon"
            icon="☄️"
            color="#8b5cf6"
            subtitle="Track asteroid approaches"
            link="/asteroids"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
