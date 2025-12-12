import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Chip,
  Avatar,
  useTheme,
} from "@mui/material";
import APODCard from "../components/dashboard/APODCard";
import EventsAlert from "../components/dashboard/EventsAlert";
import { useAsteroidFeed } from "../hooks/useAsteroidData";
import {
  formatAPIDateStandard,
  getCurrentDate,
  getDateDaysAgo,
} from "../utils/dateFormatter";
import { FaCloudSun, FaGlobeAmericas, FaMeteor } from "react-icons/fa";

const Home = () => {
  const theme = useTheme(); // Access the theme to check if we are in dark mode

  // Fetch asteroid data (today to tomorrow)
  const startDate = formatAPIDateStandard(getCurrentDate());
  const endDate = formatAPIDateStandard(getDateDaysAgo(-1)); // Tomorrow
  const { asteroids, loading: asteroidsLoading } = useAsteroidFeed(
    startDate,
    endDate
  );

  // Get closest asteroids for display
  const getRecentAsteroids = () => {
    if (!asteroids || !asteroids.data || !asteroids.data.asteroidsByDate)
      return [];

    // Flatten all asteroids from all dates
    const allAsteroids = Object.values(asteroids.data.asteroidsByDate).flat();

    // Sort by closest approach distance and take top 3
    return allAsteroids
      .sort((a, b) => {
        const distA = parseFloat(
          a.closeApproachData?.missDistance?.kilometers || 999999999
        );
        const distB = parseFloat(
          b.closeApproachData?.missDistance?.kilometers || 999999999
        );
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
      {/* Feature Highlights */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            gutterBottom
            fontWeight={800}
            sx={{
              mb: 3,
              // FIX 1: Removed hardcoded color '#1F2937'.
              // Now it uses the Theme Default (White in Dark Mode, Gray in Light Mode)
              color: "text.primary",
              letterSpacing: "-0.01em",
            }}
          >
            Platform Features
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              // FIX 2: Dynamic Background (Dark in Dark Mode, Glass/White in Light Mode)
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.6)" // Dark translucent
                  : "rgba(255, 255, 255, 0.8)", // Light translucent
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(0, 224, 255, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 48px rgba(59, 130, 246, 0.25)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(135deg, #3B82F6 0%, #00E0FF 100%)",
                    width: 64,
                    height: 64,
                    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                  }}
                >
                  <FaCloudSun size={32} />
                </Avatar>
                {/* FIX 3: Removed hardcoded color, using 'text.primary' */}
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  Weather Monitoring
                </Typography>
              </Box>
              {/* FIX 4: Removed hardcoded color, using 'text.secondary' */}
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                Access detailed hourly weather data including temperature,
                humidity, wind speed, and solar irradiance for any location
                worldwide. Get future weather forecasts based on historical data
                patterns using NASA POWER API.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              // Dynamic Background
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.6)"
                  : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(124, 58, 237, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 48px rgba(124, 58, 237, 0.25)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
                    width: 64,
                    height: 64,
                    boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)",
                  }}
                >
                  <FaMeteor size={32} />
                </Avatar>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  Asteroid Tracking
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                Track near-Earth objects with comprehensive data on asteroid
                size, velocity, and closest approach distances. Identify
                potentially hazardous asteroids.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "100%",
              // Dynamic Background
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.6)"
                  : "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              borderRadius: 3,
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px rgba(52, 211, 153, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 48px rgba(52, 211, 153, 0.25)",
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  sx={{
                    background:
                      "linear-gradient(135deg, #34D399 0%, #10B981 100%)",
                    width: 64,
                    height: 64,
                    boxShadow: "0 4px 20px rgba(52, 211, 153, 0.4)",
                  }}
                >
                  <FaGlobeAmericas size={32} />
                </Avatar>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  Environmental Data
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.7 }}
              >
                Monitor air quality, geomagnetic storms, and natural disasters
                in real-time. Stay informed about wildfires, severe weather, and
                other critical environmental events.
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
            elevation={0}
            sx={{
              p: 4,
              height: "100%",
              background:
                "linear-gradient(135deg, #00E0FF 0%, #3B82F6 50%, #7C3AED 100%)",
              borderRadius: 3,
              color: "white",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 12px 40px rgba(0, 224, 255, 0.25)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <FaMeteor
                size={36}
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}
              />
              <Typography
                variant="h5"
                fontWeight={800}
                sx={{ textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
              >
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
                  const distance = parseFloat(
                    approach?.missDistance?.kilometers || 0
                  );
                  const velocity = parseFloat(
                    approach?.relativeVelocity?.kilometersPerHour || 0
                  );
                  const isHazardous = asteroid.isPotentiallyHazardous;

                  return (
                    <Card
                      key={asteroid.id}
                      sx={{
                        mb: 2,
                        // Updated to match the same logic as above
                        background:
                          theme.palette.mode === "light"
                            ? "rgba(255, 255, 255, 0.95)"
                            : "rgba(30, 41, 59, 0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                        border:
                          theme.palette.mode === "light"
                            ? "1px solid rgba(255, 255, 255, 0.3)"
                            : "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            mb: 1.5,
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            color="text.primary" // Ensuring high contrast
                          >
                            {asteroid.name}
                          </Typography>
                          {isHazardous && (
                            <Chip
                              label="Hazardous"
                              size="small"
                              sx={{
                                fontWeight: 700,
                                background:
                                  "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                                color: "white",
                                boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
                              }}
                            />
                          )}
                        </Box>
                        <Grid container spacing={1}>
                          {/* Replaced hardcoded checks with theme colors */}
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Distance
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="text.primary"
                            >
                              {formatDistance(distance)}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Velocity
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="text.primary"
                            >
                              {velocity.toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}{" "}
                              km/h
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Size (Est.)
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="text.primary"
                            >
                              {diameter?.min?.toFixed(3)} -{" "}
                              {diameter?.max?.toFixed(3)} km
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Approach Date
                            </Typography>
                            <Typography
                              variant="body2"
                              fontWeight={600}
                              color="text.primary"
                            >
                              {approach?.date || "N/A"}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
                <Box sx={{ textAlign: "center", mt: 3 }}>
                  <Chip
                    label="View All Asteroids →"
                    clickable
                    component="a"
                    href="/asteroids"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.25)",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      px: 2,
                      py: 2.5,
                      border: "1px solid rgba(255, 255, 255, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "rgba(255, 255, 255, 0.35)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 16px rgba(255, 255, 255, 0.3)",
                      },
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
