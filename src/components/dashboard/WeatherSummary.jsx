import { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { weatherAPI } from '../../api/weather';
import { useLocation } from '../../context/LocationContext';
import { formatAPIDate, getCurrentDate, getCurrentHourTimestamp } from '../../utils/dateFormatter';
import { formatValue } from '../../utils/unitConverter';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const WeatherSummary = () => {
  const { location } = useLocation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const today = getCurrentDate();
      const dateStr = formatAPIDate(today);
      
      const response = await weatherAPI.getWeatherData({
        latitude: location.latitude,
        longitude: location.longitude,
        date: dateStr,
        historicalYears: 20
      });
      
      setWeather(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading weather..." />;
  if (error) return <ErrorMessage error={error} retry={fetchWeather} />;
  if (!weather) return null;

  // Get current hour data
  const currentHourKey = getCurrentHourTimestamp();
  const hourlyData = weather.hourlyData || {};
  
  // Find closest hour if exact match not found
  const getHourlyValue = (paramData) => {
    if (!paramData) return null;
    if (paramData[currentHourKey]) return paramData[currentHourKey];
    
    // Find closest hour
    const hours = Object.keys(paramData).sort();
    if (hours.length === 0) return null;
    
    // Return first available hour if current hour not found
    return paramData[hours[0]];
  };

  const currentTemp = getHourlyValue(hourlyData.T2M);
  const currentHumidity = getHourlyValue(hourlyData.RH2M);
  const currentWindSpeed = getHourlyValue(hourlyData.WS10M);
  const currentPressure = getHourlyValue(hourlyData.PS);
  const currentUV = getHourlyValue(hourlyData.ALLSKY_SFC_UV_INDEX);
  
  // UV Index categories: 0-2 Low, 3-5 Moderate, 6-7 High, 8-10 Very High, 11+ Extreme
  const getUVInfo = (uv) => {
    if (uv === null || uv === undefined) return null;
    if (uv >= 6) return { warning: true, color: 'error', message: '☀️ High UV - Use sunscreen!' };
    if (uv >= 3) return { warning: false, color: 'warning', message: `☀️ UV ${formatValue(uv)}` };
    return { warning: false, color: 'success', message: `☀️ UV ${formatValue(uv)}` };
  };
  
  const uvInfo = getUVInfo(currentUV);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Current Weather Conditions
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {location.name} • {weather.dataType === 'prediction' ? 'Forecast' : 'Historical'}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {currentTemp !== null && (
            <Chip 
              label={`🌡️ ${formatValue(currentTemp)}°C`}
              color="primary"
              variant="outlined"
            />
          )}
          {currentHumidity !== null && (
            <Chip 
              label={`💧 ${formatValue(currentHumidity)}%`}
              color="info"
              variant="outlined"
            />
          )}
          {currentWindSpeed !== null && (
            <Chip 
              label={`💨 ${formatValue(currentWindSpeed)} m/s`}
              color="secondary"
              variant="outlined"
            />
          )}
          {currentPressure !== null && (
            <Chip 
              label={`📊 ${formatValue(currentPressure)} kPa`}
              color="warning"
              variant="outlined"
            />
          )}
          {uvInfo && (
            <Chip 
              label={uvInfo.message}
              color={uvInfo.color}
              variant={uvInfo.warning ? "filled" : "outlined"}
              sx={uvInfo.warning ? { fontWeight: 'bold' } : {}}
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherSummary;
