import { useState, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Alert,
  Paper,
  Chip,
  Divider,
  CircularProgress,
  LinearProgress,
  Stack,
  Tooltip,
  IconButton
} from '@mui/material';
import {
  FaWind,
  FaSmog,
  FaLeaf,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle
} from 'react-icons/fa';
import { MdLocationOn, MdRefresh } from 'react-icons/md';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import LocationInput from '../components/common/LocationInput';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useLocation } from '../context/LocationContext';
import { useAirQuality } from '../hooks/useAirQualityData';

const AirQuality = () => {
  const { location } = useLocation();
  const [radius, setRadius] = useState(25000);
  const [limit, setLimit] = useState(10);

  const { airQuality, loading, error } = useAirQuality(
    location?.latitude,
    location?.longitude,
    radius,
    limit
  );

  // Get quality color based on level
  const getQualityColor = (level) => {
    const colors = {
      1: '#4caf50', // Good - Green
      2: '#8bc34a', // Moderate - Light Green
      3: '#ffeb3b', // Unhealthy for Sensitive - Yellow
      4: '#ff9800', // Unhealthy - Orange
      5: '#f44336', // Very Unhealthy - Red
      6: '#9c27b0'  // Hazardous - Purple
    };
    return colors[level] || '#9e9e9e';
  };

  // Get quality icon
  const getQualityIcon = (level) => {
    if (level <= 2) return <FaCheckCircle size={32} />;
    if (level <= 4) return <FaExclamationTriangle size={32} />;
    return <FaSmog size={32} />;
  };

  // Render overall air quality card
  const renderOverallQuality = () => {
    if (!airQuality?.data?.assessment) return null;

    const { assessment, station } = airQuality.data;
    const color = getQualityColor(assessment.overallLevel);

    return (
      <Card
        sx={{
          background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
          border: `2px solid ${color}`,
          mb: 3
        }}
      >
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
              <Box sx={{ color, mb: 1 }}>
                {getQualityIcon(assessment.overallLevel)}
              </Box>
              <Typography variant="h3" fontWeight={700} sx={{ color }}>
                {assessment.overallQuality}
              </Typography>
              <Chip
                label={`Level ${assessment.overallLevel}`}
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: color,
                  color: '#fff',
                  fontWeight: 600
                }}
              />
            </Grid>

            <Grid item xs={12} md={5}>
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    MONITORING STATION
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <MdLocationOn color={color} />
                    <Typography variant="body1" fontWeight={600}>
                      {station.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {station.distance.toFixed(2)} km away
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    PRIMARY POLLUTANT
                  </Typography>
                  <Typography variant="body1" fontWeight={600} sx={{ color }}>
                    {assessment.primaryPollutant}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    LAST UPDATE
                  </Typography>
                  <Typography variant="body2">
                    {new Date(station.lastUpdate.local).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider'
                }}
              >
                <Typography variant="caption" color="text.secondary" fontWeight={600} gutterBottom>
                  ASSESSMENT
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {assessment.description}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  PM2.5 MONITORING
                </Typography>
                <Chip
                  label={assessment.hasPM25 ? 'Available' : 'Not Available'}
                  size="small"
                  icon={assessment.hasPM25 ? <FaCheckCircle /> : <FaExclamationTriangle />}
                  color={assessment.hasPM25 ? 'success' : 'warning'}
                  sx={{ mt: 0.5 }}
                />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Render pollutant cards
  const renderPollutantCards = () => {
    if (!airQuality?.data?.measurements) return null;

    const pollutantInfo = {
      CO: {
        name: 'Carbon Monoxide',
        icon: <FaSmog />,
        description: 'Colorless, odorless gas from combustion'
      },
      NO2: {
        name: 'Nitrogen Dioxide',
        icon: <FaWind />,
        description: 'Gas from vehicle emissions and power plants'
      },
      O3: {
        name: 'Ozone',
        icon: <FaLeaf />,
        description: 'Ground-level ozone, formed by reactions'
      },
      PM10: {
        name: 'Particulate Matter 10',
        icon: <FaSmog />,
        description: 'Particles ≤10 micrometers in diameter'
      },
      PM25: {
        name: 'Particulate Matter 2.5',
        icon: <FaSmog />,
        description: 'Fine particles ≤2.5 micrometers'
      },
      SO2: {
        name: 'Sulfur Dioxide',
        icon: <FaWind />,
        description: 'Gas from fossil fuel combustion'
      }
    };

    return (
      <Grid container spacing={3}>
        {airQuality.data.measurements.map((measurement, index) => {
          const color = getQualityColor(measurement.level);
          const info = pollutantInfo[measurement.parameterCode.toUpperCase()] || {};

          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  border: `2px solid ${color}33`,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Box sx={{ color }}>{info.icon}</Box>
                        <Typography variant="h6" fontWeight={700}>
                          {measurement.parameter}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {info.name}
                      </Typography>
                    </Box>
                    <Chip
                      label={measurement.quality}
                      size="small"
                      sx={{
                        bgcolor: color,
                        color: '#fff',
                        fontWeight: 600
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Typography variant="h3" fontWeight={700} sx={{ color }}>
                      {measurement.value.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {measurement.unit}
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={(measurement.level / 6) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: `${color}22`,
                      '& .MuiLinearProgress-bar': {
                        bgcolor: color,
                        borderRadius: 4
                      }
                    }}
                  />

                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      {info.description}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Typography variant="caption" color="text.secondary">
                      Last measured: {new Date(measurement.timestamp.local).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // Render health recommendations
  const renderHealthRecommendations = () => {
    if (!airQuality?.data?.healthRecommendations) return null;

    const { healthRecommendations, assessment } = airQuality.data;
    const color = getQualityColor(assessment.overallLevel);

    return (
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <FaInfoCircle size={24} color={color} />
            <Typography variant="h6" fontWeight={700}>
              Health Recommendations
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: `${color}11`,
                  border: `1px solid ${color}33`
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ color }}>
                  General Public
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {healthRecommendations.general}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: `${color}11`,
                  border: `1px solid ${color}33`
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ color }}>
                  Sensitive Groups
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {healthRecommendations.sensitive}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: `${color}11`,
                  border: `1px solid ${color}33`
                }}
              >
                <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ color }}>
                  Activity Recommendations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {healthRecommendations.activities}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // Render pollutant comparison chart
  const renderPollutantChart = () => {
    if (!airQuality?.data?.measurements) return null;

    const chartData = airQuality.data.measurements.map(m => ({
      name: m.parameter,
      value: m.value,
      level: m.level,
      color: getQualityColor(m.level)
    }));

    return (
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Pollutant Levels Comparison
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Current measurements for all monitored pollutants
          </Typography>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #ccc',
                  borderRadius: 8
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  // Render radar chart for quality levels
  const renderQualityRadar = () => {
    if (!airQuality?.data?.measurements) return null;

    const radarData = airQuality.data.measurements.map(m => ({
      parameter: m.parameter,
      level: m.level,
      fullMark: 6
    }));

    return (
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Air Quality Index Radar
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Quality levels across different pollutants (1=Good, 6=Hazardous)
          </Typography>

          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="parameter" />
              <PolarRadiusAxis angle={90} domain={[0, 6]} />
              <Radar
                name="Quality Level"
                dataKey="level"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
          Air Quality Monitor
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Real-time air quality measurements from OpenAQ global network
        </Typography>
      </Box>

      <LocationInput />

      {!location && (
        <Alert severity="info" sx={{ mt: 3 }}>
          Please select a location to view air quality data
        </Alert>
      )}

      {loading && (
        <Box sx={{ mt: 3 }}>
          <LoadingSpinner message="Fetching air quality data..." />
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 3 }}>
          <ErrorMessage message={error} />
        </Box>
      )}

      {airQuality?.data && !loading && (
        <Box sx={{ mt: 3 }}>
          {renderOverallQuality()}
          {renderPollutantCards()}
          {renderHealthRecommendations()}
          
          <Grid container spacing={3} sx={{ mt: 0 }}>
            <Grid item xs={12} lg={7}>
              {renderPollutantChart()}
            </Grid>
            <Grid item xs={12} lg={5}>
              {renderQualityRadar()}
            </Grid>
          </Grid>

          <Paper
            elevation={0}
            sx={{
              mt: 3,
              p: 2,
              bgcolor: 'background.default',
              border: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Typography variant="caption" color="text.secondary">
              <strong>Data Source:</strong> OpenAQ - Open Air Quality Data Platform
              <br />
              <strong>Search Radius:</strong> {(radius / 1000).toFixed(0)} km
              <br />
              <strong>Station Coordinates:</strong> {airQuality.data.station.coordinates.latitude.toFixed(4)}°N, {airQuality.data.station.coordinates.longitude.toFixed(4)}°E
            </Typography>
          </Paper>
        </Box>
      )}

      {!loading && !error && !airQuality && location && (
        <Alert severity="warning" sx={{ mt: 3 }}>
          No air quality data available for this location. Try selecting a different location or increasing the search radius.
        </Alert>
      )}
    </Container>
  );
};

export default AirQuality;
