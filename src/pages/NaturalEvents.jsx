import { useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Alert,
  Button,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Public as PublicIcon,
} from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { format } from 'date-fns';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useEonetCategories, useEonetEvents, useEonetEventsByCategory } from '../hooks/useEonetData';

// Fix Leaflet default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NaturalEvents = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('open');
  const [expandedEvent, setExpandedEvent] = useState(null);

  // Fetch categories
  const { categories: categoriesData, loading: categoriesLoading, error: categoriesError } = useEonetCategories();

  // Fetch events based on filters
  const eventParams = useMemo(() => ({
    status: statusFilter,
    limit: 50,
  }), [statusFilter]);

  const { events: allEventsData, loading: eventsLoading, error: eventsError } = useEonetEvents(eventParams);
  const { events: categoryEventsData, loading: categoryLoading, error: categoryError } = useEonetEventsByCategory(
    selectedCategory !== 'all' ? selectedCategory : null,
    selectedCategory !== 'all' ? eventParams : {}
  );

  // Use category-specific data if a category is selected, otherwise use all events
  const eventsData = selectedCategory !== 'all' ? categoryEventsData : allEventsData;
  const loading = categoriesLoading || eventsLoading || categoryLoading;
  const error = categoriesError || eventsError || categoryError;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Category color mapping
  const getCategoryColor = (categoryId) => {
    const colors = {
      drought: '#D4A574',
      dustHaze: '#B8860B',
      earthquakes: '#8B4513',
      floods: '#4682B4',
      landslides: '#8B4513',
      manmade: '#696969',
      seaLakeIce: '#87CEEB',
      severeStorms: '#FF6347',
      snow: '#F0F8FF',
      tempExtremes: '#FF4500',
      volcanoes: '#DC143C',
      waterColor: '#20B2AA',
      wildfires: '#FF8C00',
    };
    return colors[categoryId] || '#757575';
  };

  // Get magnitude severity color
  const getMagnitudeColor = (value, unit) => {
    if (unit === 'kts') {
      if (value >= 85) return '#d32f2f'; // Category 3+ hurricane
      if (value >= 65) return '#f57c00'; // Category 1-2 hurricane
      if (value >= 50) return '#ffa726'; // Tropical storm
      return '#ffb74d'; // Tropical depression
    }
    if (unit === 'acres') {
      if (value >= 1000) return '#d32f2f';
      if (value >= 500) return '#f57c00';
      return '#ffa726';
    }
    return '#757575';
  };

  // Create custom icons for different event types
  const createCustomIcon = (categoryId, magnitude) => {
    const color = getCategoryColor(categoryId);
    const size = magnitude ? Math.min(40, Math.max(20, magnitude / 10)) : 25;

    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  };

  // Render summary cards
  const renderSummaryCards = () => {
    if (!eventsData?.data?.events) return null;

    const events = eventsData.data.events;
    const totalEvents = events.length;
    const activeEvents = events.filter(e => !e.isStaleData).length;
    const staleEvents = events.filter(e => e.isStaleData).length;

    // Get category distribution
    const categoryCount = {};
    events.forEach(event => {
      event.categories?.forEach(cat => {
        categoryCount[cat.title] = (categoryCount[cat.title] || 0) + 1;
      });
    });

    const cards = [
      {
        title: 'Total Events',
        value: totalEvents,
        icon: <PublicIcon />,
        color: 'linear-gradient(135deg, #7C3AED 0%, #0B1020 100%)',
      },
      {
        title: 'Active Events',
        value: activeEvents,
        icon: <CheckCircleIcon />,
        color: 'linear-gradient(135deg, #DC2626 0%, #7C3AED 100%)',
      },
      {
        title: 'Stale Data',
        value: staleEvents,
        icon: <WarningIcon />,
        color: 'linear-gradient(135deg, #00E0FF 0%, #7C3AED 100%)',
      },
      {
        title: 'Categories',
        value: Object.keys(categoryCount).length,
        icon: <CategoryIcon />,
        color: 'linear-gradient(135deg, #3B82F6 0%, #00E0FF 100%)',
      },
    ];

    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                background: card.color,
                color: 'white',
                height: '100%',
                boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(124, 58, 237, 0.4)',
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" component="div" fontWeight={600}>
                    {card.title}
                  </Typography>
                  <Box sx={{ fontSize: 32, opacity: 0.8 }}>{card.icon}</Box>
                </Box>
                <Typography variant="h3" component="div" fontWeight={700}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Render charts
  const renderCharts = () => {
    if (!eventsData?.data?.events) return null;

    const events = eventsData.data.events;

    // Category distribution for pie chart
    const categoryData = {};
    events.forEach(event => {
      event.categories?.forEach(cat => {
        categoryData[cat.title] = (categoryData[cat.title] || 0) + 1;
      });
    });

    const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
    const COLORS = ['#FF6347', '#4682B4', '#FF8C00', '#32CD32', '#9370DB', '#FFD700', '#FF69B4', '#00CED1'];

    // Magnitude distribution
    const magnitudeData = events
      .filter(e => e.currentMagnitude?.value)
      .map(e => ({
        title: e.title.substring(0, 20) + '...',
        magnitude: e.currentMagnitude.value,
        unit: e.currentMagnitude.unit,
      }))
      .slice(0, 10);

    return (
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Events by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Event Magnitude Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={magnitudeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="magnitude" fill="#8884d8">
                  {magnitudeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getMagnitudeColor(entry.magnitude, entry.unit)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    );
  };

  // Render map view
  const renderMapView = () => {
    if (!eventsData?.data?.events) return null;

    const events = eventsData.data.events;
    const center = [20, 0]; // World center

    return (
      <Paper sx={{ p: 2, height: 600 }}>
        <MapContainer
          center={center}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {events.map((event) => {
            // Handle events with geometry array (storms with tracks)
            if (event.geometry && event.geometry.length > 0) {
              const latestPosition = event.geometry[event.geometry.length - 1];
              const coords = latestPosition.coordinates;

              // Draw track for storms
              if (event.geometry.length > 1) {
                const trackPoints = event.geometry.map(g => [g.coordinates.latitude, g.coordinates.longitude]);

                return (
                  <div key={event.id}>
                    <Polyline
                      positions={trackPoints}
                      color={getCategoryColor(event.categories[0]?.id)}
                      weight={3}
                      opacity={0.6}
                    />
                    {event.geometry.map((point, idx) => (
                      <CircleMarker
                        key={`${event.id}-${idx}`}
                        center={[point.coordinates.latitude, point.coordinates.longitude]}
                        radius={4}
                        fillColor={getMagnitudeColor(point.magnitude?.value, point.magnitude?.unit)}
                        color="white"
                        weight={1}
                        fillOpacity={0.8}
                      >
                        <Popup>
                          <div>
                            <strong>{event.title}</strong>
                            <br />
                            {point.magnitude && `Magnitude: ${point.magnitude.label}`}
                            <br />
                            {format(new Date(point.date), 'MMM dd, yyyy HH:mm')}
                          </div>
                        </Popup>
                      </CircleMarker>
                    ))}
                  </div>
                );
              }

              // Single point event
              return (
                <Marker
                  key={event.id}
                  position={[coords.latitude, coords.longitude]}
                  icon={createCustomIcon(
                    event.categories[0]?.id,
                    latestPosition.magnitude?.value
                  )}
                >
                  <Popup>
                    <div>
                      <strong>{event.title}</strong>
                      <br />
                      {event.categories[0]?.title}
                      <br />
                      {event.currentMagnitude && `Magnitude: ${event.currentMagnitude.label}`}
                      <br />
                      Status: {event.status}
                      <br />
                      {event.isStaleData && <span style={{ color: 'orange' }}>⚠ Stale Data</span>}
                    </div>
                  </Popup>
                </Marker>
              );
            }

            // Handle events with single location (wildfires)
            if (event.location) {
              return (
                <Marker
                  key={event.id}
                  position={[event.location.latitude, event.location.longitude]}
                  icon={createCustomIcon(event.categories[0]?.id, event.magnitude?.value)}
                >
                  <Popup>
                    <div>
                      <strong>{event.title}</strong>
                      <br />
                      {event.description}
                      <br />
                      {event.categories[0]?.title}
                      <br />
                      {event.magnitude && `Size: ${event.magnitude.label}`}
                      <br />
                      Status: {event.status}
                      <br />
                      {event.dataAge?.isStale && (
                        <span style={{ color: 'orange' }}>⚠ Stale ({event.dataAge.hours}h old)</span>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            }

            return null;
          })}
        </MapContainer>
      </Paper>
    );
  };

  // Render event list
  const renderEventList = () => {
    if (!eventsData?.data?.events) return null;

    const events = eventsData.data.events;

    return (
      <Box>
        {events.map((event) => (
          <Accordion
            key={event.id}
            expanded={expandedEvent === event.id}
            onChange={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: getCategoryColor(event.categories[0]?.id),
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ flexGrow: 1, fontWeight: 600 }}>
                  {event.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {event.categories?.map((cat) => (
                    <Chip
                      key={cat.id}
                      label={cat.title}
                      size="small"
                      sx={{
                        bgcolor: getCategoryColor(cat.id),
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                  {event.currentMagnitude && (
                    <Chip
                      label={event.currentMagnitude.label}
                      size="small"
                      sx={{
                        bgcolor: getMagnitudeColor(event.currentMagnitude.value, event.currentMagnitude.unit),
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  )}
                  {event.magnitude && (
                    <Chip
                      label={event.magnitude.label}
                      size="small"
                      sx={{
                        bgcolor: getMagnitudeColor(event.magnitude.value, event.magnitude.unit),
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  )}
                  <Chip
                    label={event.status}
                    size="small"
                    color={event.status === 'open' ? 'error' : 'default'}
                  />
                  {(event.isStaleData || event.dataAge?.isStale) && (
                    <Chip
                      icon={<WarningIcon />}
                      label="Stale"
                      size="small"
                      color="warning"
                    />
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {event.description && (
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {event.description}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      <CalendarIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Last Update
                    </Typography>
                    <Typography variant="body2">
                      {format(new Date(event.lastUpdate), 'MMM dd, yyyy HH:mm:ss')}
                    </Typography>
                  </Box>

                  {event.location && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        <LocationOnIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                        Location
                      </Typography>
                      <Typography variant="body2">
                        Lat: {event.location.latitude.toFixed(4)}, Lon: {event.location.longitude.toFixed(4)}
                      </Typography>
                    </Box>
                  )}

                  {event.geometry && event.geometry.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        <LocationOnIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                        Track Points
                      </Typography>
                      <Typography variant="body2">
                        {event.geometry.length} positions tracked
                      </Typography>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  {event.sources && event.sources.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Data Sources
                      </Typography>
                      {event.sources.map((source, idx) => (
                        <Button
                          key={idx}
                          variant="outlined"
                          size="small"
                          href={source.url}
                          target="_blank"
                          sx={{ mr: 1, mb: 1 }}
                        >
                          {source.id}
                        </Button>
                      ))}
                    </Box>
                  )}

                  {event.proximityToUser && (
                    <Alert severity={event.proximityToUser.riskLevel === 'HIGH' ? 'error' : 'warning'} sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {event.proximityToUser.alert}
                      </Typography>
                      <Typography variant="caption">
                        Distance: {event.proximityToUser.distanceKm.toFixed(2)} km ({event.proximityToUser.distanceMiles.toFixed(2)} miles)
                      </Typography>
                    </Alert>
                  )}

                  {(event.dataAge?.isStale || event.isStaleData) && (
                    <Alert severity="warning">
                      <Typography variant="body2">
                        Data is stale {event.dataAge && `(${event.dataAge.hours}h old)`}
                      </Typography>
                      {event.dataAge?.staleSince && (
                        <Typography variant="caption">
                          Since: {format(new Date(event.dataAge.staleSince), 'MMM dd, yyyy HH:mm')}
                        </Typography>
                      )}
                    </Alert>
                  )}
                </Grid>

                {/* Show geometry timeline for storms */}
                {event.geometry && event.geometry.length > 1 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Track Timeline
                    </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={event.geometry.map((g, idx) => ({
                        time: format(new Date(g.date), 'MMM dd HH:mm'),
                        magnitude: g.magnitude?.value || 0,
                        index: idx,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" angle={-45} textAnchor="end" height={80} />
                        <YAxis label={{ value: event.geometry[0].magnitude?.unit || '', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="magnitude"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={{ fill: '#8884d8', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Grid>
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  if (loading && !eventsData) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Natural Events Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Real-time global natural disaster tracking from NASA EONET
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
                <MenuItem value="all">All Categories</MenuItem>
                {categoriesData?.data?.categories?.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} onChange={handleStatusChange} label="Status">
                <MenuItem value="open">Open Events</MenuItem>
                <MenuItem value="closed">Closed Events</MenuItem>
                <MenuItem value="all">All Events</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Cards */}
      {renderSummaryCards()}

      {/* Charts */}
      {renderCharts()}

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Map View" />
          <Tab label="Event List" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {activeTab === 0 && renderMapView()}
      {activeTab === 1 && renderEventList()}

      {eventsData?.data?.events?.length === 0 && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No events found for the selected filters.
        </Alert>
      )}
    </Container>
  );
};

export default NaturalEvents;
