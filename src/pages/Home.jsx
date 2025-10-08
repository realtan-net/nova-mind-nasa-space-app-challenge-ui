import { Container, Grid, Box, Typography, Card, CardContent, Paper, Chip, Avatar } from '@mui/material';
import APODCard from '../components/dashboard/APODCard';
import EventsAlert from '../components/dashboard/EventsAlert';
import { useAsteroidFeed } from '../hooks/useAsteroidData';
import { formatAPIDateStandard, getCurrentDate, getDateDaysAgo } from '../utils/dateFormatter';
import { FaCloudSun, FaGlobeAmericas, FaMeteor } from 'react-icons/fa';

const Home = () => {
  // Fetch asteroid data (today to tomorrow)
  const startDate = formatAPIDateStandard(getCurrentDate());
  const endDate = formatAPIDateStandard(getDateDaysAgo(-1)); // Tomorrow
  const { asteroids, loading: asteroidsLoading } = useAsteroidFeed(startDate, endDate);

  // Get closest asteroids for display
  const getRecentAsteroids = () => {
    if (!asteroids || !asteroids.data || !asteroids.data.asteroidsByDate) return [];
    
    // Flatten all asteroids from all dates
    const allAsteroids = Object.values(asteroids.data.asteroidsByDate).flat();
    
    // Sort by closest approach distance and take top 3
    return allAsteroids
      .sort((a, b) => {
        const distA = parseFloat(a.closeApproachData?.missDistance?.kilometers || 999999999);
        const distB = parseFloat(b.closeApproachData?.missDistance?.kilometers || 999999999);
        return distA - distB;
      })
      .slice(0, 3);
  };

  const recentAsteroids = getRecentAsteroids();

  const formatDistance = (km) => {
    if (km > 1000000) return `${(km / 1000000).toFixed(2)}M km`;
    if (km > 1000) return `${(km / 1000).toFixed(2)}K km`;
    return `${km.toFixed(0)} km`;
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section with Gradient Background */}
      <Box 
        sx={{ 
          mb: 6,
          p: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight={800} sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Welcome to Nova Mind
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, opacity: 0.95, fontWeight: 300 }}>
            Your Gateway to Environmental & Space Data
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 800, opacity: 0.9, lineHeight: 1.7 }}>
            Explore real-time weather patterns, track near-Earth asteroids, monitor geomagnetic activity, 
            and stay informed about natural disasters worldwide. All powered by NASA and environmental data APIs.
          </Typography>
        </Box>
      </Box>

      {/* Feature Highlights */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
            Platform Features
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%', 
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: '#3b82f6', width: 56, height: 56 }}>
                  <FaCloudSun size={28} />
                </Avatar>
                <Typography variant="h6" fontWeight={600}>
                  Weather Monitoring
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Access detailed hourly weather data including temperature, humidity, wind speed, and solar irradiance 
                for any location worldwide. Get future weather forecasts based on historical data patterns using NASA POWER API.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: '#8b5cf6', width: 56, height: 56 }}>
                  <FaMeteor size={28} />
                </Avatar>
                <Typography variant="h6" fontWeight={600}>
                  Asteroid Tracking
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Track near-Earth objects with comprehensive data on asteroid size, velocity, and closest approach 
                distances. Identify potentially hazardous asteroids.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { 
                transform: 'translateY(-4px)',
                boxShadow: 6,
              }
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ bgcolor: '#10b981', width: 56, height: 56 }}>
                  <FaGlobeAmericas size={28} />
                </Avatar>
                <Typography variant="h6" fontWeight={600}>
                  Environmental Data
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Monitor air quality, geomagnetic storms, and natural disasters in real-time. Stay informed about 
                wildfires, severe weather, and other critical environmental events.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* APOD Featured */}
        <Grid item xs={12}>
          <APODCard featured />
        </Grid>

        {/* Recent Natural Events */}
        <Grid item xs={12} md={6}>
          <EventsAlert />
        </Grid>

        {/* Near-Earth Objects with Real Data */}
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 3, 
              height: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <FaMeteor size={32} />
              <Typography variant="h5" fontWeight={700}>
                Near-Earth Objects
              </Typography>
            </Box>
            
            {asteroidsLoading ? (
              <Typography>Loading asteroid data...</Typography>
            ) : recentAsteroids.length > 0 ? (
              <Box>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Closest approaching asteroids (today & tomorrow)
                </Typography>
                {recentAsteroids.map((asteroid, index) => {
                  const approach = asteroid.closeApproachData;
                  const diameter = asteroid.estimatedDiameter?.kilometers;
                  const distance = parseFloat(approach?.missDistance?.kilometers || 0);
                  const velocity = parseFloat(approach?.relativeVelocity?.kilometersPerHour || 0);
                  const isHazardous = asteroid.isPotentiallyHazardous;
                  
                  return (
                    <Card key={asteroid.id} sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.95)' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                          <Typography variant="subtitle1" fontWeight={600} color="text.primary">
                            {asteroid.name}
                          </Typography>
                          {isHazardous && (
                            <Chip 
                              label="Hazardous" 
                              size="small" 
                              color="error"
                              sx={{ fontWeight: 600 }}
                            />
                          )}
                        </Box>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Distance
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color="text.primary">
                              {formatDistance(distance)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Velocity
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color="text.primary">
                              {velocity.toLocaleString(undefined, { maximumFractionDigits: 0 })} km/h
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Size (Est.)
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color="text.primary">
                              {diameter?.min?.toFixed(3)} - {diameter?.max?.toFixed(3)} km
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="caption" color="text.secondary">
                              Approach Date
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color="text.primary">
                              {approach?.date || 'N/A'}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
                <Box sx={{ textAlign: 'center', mt: 2 }}>
                  <Chip 
                    label="View All Asteroids →" 
                    clickable
                    component="a"
                    href="/asteroids"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.3)',
                      }
                    }}
                  />
                </Box>
              </Box>
            ) : (
              <Typography>No recent asteroid data available</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
