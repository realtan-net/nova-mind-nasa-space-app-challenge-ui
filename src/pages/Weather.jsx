import { Container, Typography, Box, Paper, TextField, Grid, Card, CardContent, Chip, Tabs, Tab } from '@mui/material';
import LocationInput from '../components/common/LocationInput';
import { useState } from 'react';
import { useLocation } from '../context/LocationContext';
import { formatAPIDate, formatAPIDateStandard, getCurrentDate, parseHourlyTimestamp, getDateDaysFromNow } from '../utils/dateFormatter';
import { useWeatherData } from '../hooks/useWeatherData';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import WeatherChart from '../components/weather/WeatherChart';
import { WEATHER_PARAMETERS } from '../utils/constants';
import { formatValue } from '../utils/unitConverter';
import { format } from 'date-fns';

const Weather = () => {
  const { location } = useLocation();
  // Set default date to tomorrow (YYYY-MM-DD format for HTML date input)
  const [selectedDate, setSelectedDate] = useState(formatAPIDateStandard(getDateDaysFromNow(1)));
  const [activeTab, setActiveTab] = useState(0);

  const { data, loading, error } = useWeatherData(
    location.latitude,
    location.longitude,
    selectedDate,
    20
  );

  const renderCharts = () => {
    if (!data || !data.hourlyData) return null;

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Weather Visualizations
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <WeatherChart parameter="T2M" hourlyData={data.hourlyData} title="Temperature" chartType="line" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <WeatherChart parameter="RH2M" hourlyData={data.hourlyData} title="Relative Humidity" chartType="area" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <WeatherChart parameter="WS10M" hourlyData={data.hourlyData} title="Wind Speed" chartType="line" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <WeatherChart parameter="PS" hourlyData={data.hourlyData} title="Pressure" chartType="line" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <WeatherChart parameter="ALLSKY_SFC_SW_DWN" hourlyData={data.hourlyData} title="Solar Irradiance" chartType="bar" />
          </Grid>
          <Grid item xs={12} lg={6}>
            <WeatherChart parameter="WD10M" hourlyData={data.hourlyData} title="Wind Direction" chartType="line" />
          </Grid>
        </Grid>
      </Box>
    );
  };

  const renderHourlyData = () => {
    if (!data || !data.hourlyData) return null;

    const hourlyData = data.hourlyData;
    const parameters = Object.keys(hourlyData);
    
    // Get all hours from first parameter
    const hours = Object.keys(hourlyData[parameters[0]] || {}).sort();

    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Hourly Data for {selectedDate}
        </Typography>
        
        {/* Daily Aggregates */}
        {data.dailyAggregates && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {Object.entries(data.dailyAggregates).map(([param, values]) => {
              const paramInfo = WEATHER_PARAMETERS[param] || {};
              return (
                <Grid item xs={12} sm={6} md={4} lg={2} key={param}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="h5">{paramInfo.icon || '📊'}</Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {paramInfo.name || param}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ color: paramInfo.color }}>
                        {formatValue(values.mean)} {values.units}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                        <Chip label={`Min: ${formatValue(values.min)}`} size="small" variant="outlined" />
                        <Chip label={`Max: ${formatValue(values.max)}`} size="small" variant="outlined" />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* Hourly Data Table */}
        <Paper sx={{ overflow: 'auto' }}>
          <Box sx={{ minWidth: 800 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '100px repeat(6, 1fr)', gap: 1, p: 2, bgcolor: 'background.default' }}>
              <Typography variant="subtitle2" fontWeight={600}>Time</Typography>
              {parameters.map(param => {
                const paramInfo = WEATHER_PARAMETERS[param] || {};
                return (
                  <Typography key={param} variant="subtitle2" fontWeight={600}>
                    {paramInfo.icon} {paramInfo.name || param}
                  </Typography>
                );
              })}
            </Box>

            {hours.map((hour, index) => {
              const timestamp = parseHourlyTimestamp(hour);
              const timeStr = format(timestamp, 'HH:mm');
              
              return (
                <Box 
                  key={hour} 
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: '100px repeat(6, 1fr)', 
                    gap: 1, 
                    p: 2,
                    bgcolor: index % 2 === 0 ? 'background.paper' : 'background.default',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                >
                  <Typography variant="body2" fontWeight={500}>{timeStr}</Typography>
                  {parameters.map(param => {
                    const value = hourlyData[param][hour];
                    const paramInfo = WEATHER_PARAMETERS[param] || {};
                    const dailyAgg = data.dailyAggregates?.[param];
                    
                    return (
                      <Typography 
                        key={param} 
                        variant="body2"
                        sx={{ 
                          color: dailyAgg && value === dailyAgg.max ? 'error.main' : 
                                 dailyAgg && value === dailyAgg.min ? 'info.main' : 'text.primary'
                        }}
                      >
                        {formatValue(value)} {dailyAgg?.units || ''}
                      </Typography>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Paper>

        {/* Metadata */}
        {data.predictionMetadata && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Prediction Information
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`Type: ${data.dataType === 'prediction' ? 'Forecast' : 'Historical'}`} 
                size="small" 
              />
              <Chip 
                label={`Method: ${data.predictionMethod}`} 
                size="small" 
              />
              <Chip 
                label={`Historical Years: ${data.historicalYearsUsed}`} 
                size="small" 
              />
              <Chip 
                label={`Reliability: ${data.predictionMetadata.reliability}`} 
                size="small" 
                color={data.predictionMetadata.reliability === 'high' ? 'success' : 'warning'}
              />
            </Box>
            {data.historicalDateRange && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Based on data from: {data.historicalDateRange}
              </Typography>
            )}
          </Paper>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Weather Data
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Hourly weather parameters from NASA POWER API
      </Typography>

      <LocationInput />

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select Date
        </Typography>
        <TextField
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ maxWidth: 300 }}
        />
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
          Select a future date for predictions based on historical averages, or a past date for actual data
        </Typography>
      </Paper>

      {loading && <LoadingSpinner message="Loading weather data..." />}
      {error && <ErrorMessage error={error} />}
      
      {data && (
        <>
          <Paper sx={{ mb: 3 }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} aria-label="weather views">
              <Tab label="Hourly Table" />
              <Tab label="Charts" />
            </Tabs>
          </Paper>

          {activeTab === 0 && renderHourlyData()}
          {activeTab === 1 && renderCharts()}
        </>
      )}
    </Container>
  );
};

export default Weather;
