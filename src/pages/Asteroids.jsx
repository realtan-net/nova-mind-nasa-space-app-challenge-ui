import { 
  Container, Typography, Box, Paper, Grid, Card, CardContent, Chip, 
  TextField, Alert, Accordion, AccordionSummary, AccordionDetails, 
  Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  LinearProgress, Divider, Avatar
} from '@mui/material';
import { useState } from 'react';
import { useAsteroidFeed } from '../hooks/useAsteroidData';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatAPIDateStandard, getDateDaysAgo, getCurrentDate, formatDisplayDate } from '../utils/dateFormatter';
import { format, parseISO } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaRocket, FaExclamationTriangle, FaMeteor, FaRuler, FaTachometerAlt } from 'react-icons/fa';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, BarChart, Bar,
  PieChart, Pie
} from 'recharts';

const Asteroids = () => {
  const [startDate, setStartDate] = useState(formatAPIDateStandard(getCurrentDate()));
  const [endDate, setEndDate] = useState(formatAPIDateStandard(getDateDaysAgo(-1)));
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none');

  const { asteroids, loading, error } = useAsteroidFeed(startDate, endDate);

  const getHazardColor = (isHazardous) => {
    return isHazardous ? '#f44336' : '#4caf50';
  };

  const getSizeColor = (diameterKm) => {
    if (diameterKm > 1) return '#d32f2f';
    if (diameterKm > 0.5) return '#f57c00';
    if (diameterKm > 0.1) return '#fbc02d';
    return '#7cb342';
  };

  const getVelocityColor = (kmPerHour) => {
    if (kmPerHour > 100000) return '#d32f2f';
    if (kmPerHour > 75000) return '#f57c00';
    if (kmPerHour > 50000) return '#fbc02d';
    return '#7cb342';
  };

  const formatDistance = (km) => {
    if (km > 1000000) {
      return `${(km / 1000000).toFixed(2)}M km`;
    }
    if (km > 1000) {
      return `${(km / 1000).toFixed(2)}K km`;
    }
    return `${km.toFixed(0)} km`;
  };

  const formatVelocity = (kmPerHour) => {
    return `${kmPerHour.toLocaleString()} km/h`;
  };

  const renderSummaryCards = () => {
    if (!asteroids || !asteroids.data) return null;

    const { summary, elementCount } = asteroids.data;

    return (
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <FaMeteor color="white" size={24} />
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Total Asteroids
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight={700} sx={{ color: 'white' }}>
                {summary.totalAsteroids}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Tracked in date range
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <FaExclamationTriangle color="white" size={24} />
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Potentially Hazardous
                </Typography>
              </Box>
              <Typography variant="h3" fontWeight={700} sx={{ color: 'white' }}>
                {summary.potentiallyHazardous}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Require monitoring
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <FaRocket color="white" size={24} />
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Closest Approach
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: 'white' }}>
                {formatDistance(summary.closestApproach.distance.kilometers)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {summary.closestApproach.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <FaTachometerAlt color="white" size={24} />
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  Fastest Asteroid
                </Typography>
              </Box>
              <Typography variant="h5" fontWeight={700} sx={{ color: 'white' }}>
                {summary.fastestAsteroid.velocity.kilometersPerHour.toLocaleString()} km/h
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                {summary.fastestAsteroid.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  };

  const renderCharts = () => {
    if (!asteroids || !asteroids.data || !asteroids.data.asteroidsByDate) return null;

    const allAsteroids = Object.values(asteroids.data.asteroidsByDate).flat();

    // Prepare data for scatter plot (size vs distance)
    const scatterData = allAsteroids.map(asteroid => ({
      name: asteroid.name,
      distance: asteroid.closeApproachData.missDistance.kilometers,
      diameter: asteroid.estimatedDiameter.kilometers.max,
      velocity: asteroid.closeApproachData.relativeVelocity.kilometersPerHour,
      isHazardous: asteroid.isPotentiallyHazardous
    }));

    // Prepare data for hazard distribution
    const hazardData = [
      { name: 'Safe', value: allAsteroids.filter(a => !a.isPotentiallyHazardous).length, color: '#4caf50' },
      { name: 'Potentially Hazardous', value: allAsteroids.filter(a => a.isPotentiallyHazardous).length, color: '#f44336' }
    ];

    // Prepare data for daily counts
    const dailyData = Object.entries(asteroids.data.asteroidsByDate).map(([date, asteroids]) => ({
      date: format(parseISO(date), 'MMM dd'),
      count: asteroids.length,
      hazardous: asteroids.filter(a => a.isPotentiallyHazardous).length
    }));

    return (
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Scatter Plot: Size vs Distance */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Asteroid Size vs Distance from Earth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="distance" 
                  name="Distance (km)" 
                  scale="log" 
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                />
                <YAxis 
                  dataKey="diameter" 
                  name="Diameter (km)" 
                  scale="log" 
                  domain={['auto', 'auto']}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <Paper sx={{ p: 1.5 }}>
                          <Typography variant="subtitle2" fontWeight={600}>{data.name}</Typography>
                          <Typography variant="caption" display="block">
                            Distance: {formatDistance(data.distance)}
                          </Typography>
                          <Typography variant="caption" display="block">
                            Diameter: {data.diameter.toFixed(3)} km
                          </Typography>
                          <Typography variant="caption" display="block">
                            Velocity: {formatVelocity(data.velocity)}
                          </Typography>
                          <Chip 
                            label={data.isHazardous ? 'Hazardous' : 'Safe'} 
                            size="small" 
                            sx={{ 
                              mt: 0.5,
                              bgcolor: data.isHazardous ? '#f44336' : '#4caf50', 
                              color: 'white' 
                            }}
                          />
                        </Paper>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Scatter name="Asteroids" data={scatterData} fill="#8884d8">
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isHazardous ? '#f44336' : '#4caf50'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Pie Chart: Hazard Distribution */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Hazard Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={hazardData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {hazardData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bar Chart: Daily Counts */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Daily Asteroid Count
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#2196f3" name="Total Asteroids" />
                <Bar dataKey="hazardous" fill="#f44336" name="Potentially Hazardous" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    );
  };

const processedAsteroids = asteroids?.data?.asteroidsByDate
    ? Object.entries(asteroids.data.asteroidsByDate).reduce((acc, [date, dayAsteroids]) => {
        let results = dayAsteroids.filter(asteroid =>
            asteroid.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortBy === 'name') {
            results.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'size') {
            results.sort((a, b) => b.estimatedDiameter.kilometers.max - a.estimatedDiameter.kilometers.max);
        } else if (sortBy === 'velocity') {
            results.sort((a, b) => b.closeApproachData.relativeVelocity.kilometersPerHour - a.closeApproachData.relativeVelocity.kilometersPerHour);
        }

        if (results.length > 0) {
            acc[date] = results;
        }
        return acc;
    }, {})
    : {};

  const renderAsteroidList = () => {
    if (!asteroids || !asteroids.data || !asteroids.data.asteroidsByDate) return null;

    return (
      <Box>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaMeteor />
          Asteroid Details ({asteroids.data.elementCount} objects)
        </Typography>

          {Object.entries(processedAsteroids).map(([date, dayAsteroids]) => (
          <Box key={date} sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1, color: 'primary.main' }}>
              📅 {format(parseISO(date), 'MMMM dd, yyyy')} ({dayAsteroids.length} asteroids)
            </Typography>

            {dayAsteroids.map((asteroid, index) => (
              <Accordion key={asteroid.id} sx={{ mb: 1 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', flexWrap: 'wrap' }}>
                    <Avatar sx={{ bgcolor: getSizeColor(asteroid.estimatedDiameter.kilometers.max) }}>
                      <FaMeteor />
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {asteroid.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {asteroid.id}
                      </Typography>
                    </Box>

                    <Chip 
                      label={asteroid.isPotentiallyHazardous ? '⚠️ Hazardous' : '✓ Safe'}
                      size="small"
                      sx={{ 
                        bgcolor: getHazardColor(asteroid.isPotentiallyHazardous),
                        color: 'white',
                        fontWeight: 600
                      }}
                    />

                    {asteroid.isSentryObject && (
                      <Chip 
                        label="🎯 Sentry Object"
                        size="small"
                        color="error"
                        sx={{ fontWeight: 600 }}
                      />
                    )}

                    <Chip 
                      label={formatDistance(asteroid.closeApproachData.missDistance.kilometers)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container spacing={3}>
                    {/* Size Information */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaRuler /> Estimated Size
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Diameter (km)</Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {asteroid.estimatedDiameter.kilometers.min.toFixed(3)} - {asteroid.estimatedDiameter.kilometers.max.toFixed(3)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Diameter (meters)</Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {asteroid.estimatedDiameter.meters.min.toFixed(1)} - {asteroid.estimatedDiameter.meters.max.toFixed(1)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Diameter (miles)</Typography>
                            <Typography variant="body1">
                              {asteroid.estimatedDiameter.miles.min.toFixed(4)} - {asteroid.estimatedDiameter.miles.max.toFixed(4)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Diameter (feet)</Typography>
                            <Typography variant="body1">
                              {asteroid.estimatedDiameter.feet.min.toFixed(1)} - {asteroid.estimatedDiameter.feet.max.toFixed(1)}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary">Relative Size</Typography>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((asteroid.estimatedDiameter.kilometers.max / 1) * 100, 100)} 
                            sx={{ 
                              height: 8, 
                              borderRadius: 1, 
                              mt: 0.5,
                              bgcolor: 'grey.300',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: getSizeColor(asteroid.estimatedDiameter.kilometers.max)
                              }
                            }}
                          />
                        </Box>
                      </Paper>
                    </Grid>

                    {/* Close Approach Data */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="subtitle2" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaRocket /> Close Approach Data
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Date & Time</Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {asteroid.closeApproachData.dateFull}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">Orbiting Body</Typography>
                            <Typography variant="body1" fontWeight={600}>
                              🌍 {asteroid.closeApproachData.orbitingBody}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">Miss Distance</Typography>
                            <Typography variant="body2">
                              • {formatDistance(asteroid.closeApproachData.missDistance.kilometers)}
                            </Typography>
                            <Typography variant="body2">
                              • {asteroid.closeApproachData.missDistance.astronomical.toFixed(4)} AU
                            </Typography>
                            <Typography variant="body2">
                              • {asteroid.closeApproachData.missDistance.lunar.toFixed(2)} Lunar Distances
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">Relative Velocity</Typography>
                            <Typography variant="body2">
                              • {formatVelocity(asteroid.closeApproachData.relativeVelocity.kilometersPerHour)}
                            </Typography>
                            <Typography variant="body2">
                              • {asteroid.closeApproachData.relativeVelocity.kilometersPerSecond.toFixed(2)} km/s
                            </Typography>
                            <Typography variant="body2">
                              • {asteroid.closeApproachData.relativeVelocity.milesPerHour.toLocaleString()} mph
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    {/* Additional Info */}
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">Absolute Magnitude (H)</Typography>
                            <Typography variant="body1" fontWeight={600}>
                              {asteroid.absoluteMagnitude}
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                              (Brightness measure - lower is brighter)
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">NASA JPL Database</Typography>
                            <Link href={asteroid.nasaJplUrl} target="_blank" rel="noopener" sx={{ display: 'block', mt: 0.5 }}>
                              View detailed orbital data →
                            </Link>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FaMeteor size={32} />
        Near-Earth Objects (NEO) Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Monitor asteroid approaches, potentially hazardous objects, and close encounters with Earth
      </Typography>

      {/* Info Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>About NEOs:</strong> Near-Earth Objects are asteroids and comets with orbits that bring them within 
          30 million miles (50 million kilometers) of Earth's orbit. Those larger than ~140 meters that come within 
          4.6 million miles (7.5 million km) are classified as Potentially Hazardous Asteroids (PHAs).
        </Typography>
      </Alert>

      {/* Date Range Selector */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
              <TextField
                  fullWidth
                  label="Asteroid İsmine Göre Filtrele"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Örn: (2024 BX)..."
              />
          </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    select
                    fullWidth
                    label="Sırala"
                    size="small"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    SelectProps={{ native: true }}
                >
                    <option value="none">Varsayılan</option>
                    <option value="name">İsim (A-Z)</option>
                    <option value="size">Büyüklük (Azalan)</option>
                    <option value="velocity">Hız (Azalan)</option>
                </TextField>
            </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="caption" color="text.secondary">
              {asteroids?.data?.elementCount || 0} asteroids
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Content */}
      {loading && <LoadingSpinner message="Loading asteroid data..." />}
      {error && <ErrorMessage error={error} />}
      {!loading && !error && asteroids && (
        <Box>
          {renderSummaryCards()}
          {renderCharts()}
          {renderAsteroidList()}
        </Box>
      )}
      {!loading && !error && !asteroids && (
        <Alert severity="info">
          Select a date range to view asteroid data
        </Alert>
      )}
    </Container>
  );
};

export default Asteroids;
