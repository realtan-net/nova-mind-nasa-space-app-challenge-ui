import { Container, Typography, Box, Paper, Grid, Card, CardContent, Chip, Tabs, Tab, TextField, Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Accordion, AccordionSummary, AccordionDetails, Link } from '@mui/material';
import { useState } from 'react';
import { useGeomagneticStorms, useGeomagnetic3DayForecast, useGeomagnetic27DayForecast } from '../hooks/useGeomagneticData';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { formatAPIDateStandard, formatDisplayDate, getDateDaysAgo, getCurrentDate } from '../utils/dateFormatter';
import { format, parseISO } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FaExclamationTriangle, FaBolt, FaSatelliteDish } from 'react-icons/fa';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Area, AreaChart 
} from 'recharts';

const Geomagnetic = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startDate, setStartDate] = useState(formatAPIDateStandard(getDateDaysAgo(30)));
  const [endDate, setEndDate] = useState(formatAPIDateStandard(getCurrentDate()));

  // Fetch data from different endpoints
  const { storms, loading: stormsLoading, error: stormsError } = useGeomagneticStorms(startDate, endDate);
  const { forecast: forecast3Day, loading: loading3Day, error: error3Day } = useGeomagnetic3DayForecast();
  const { forecast: forecast27Day, loading: loading27Day, error: error27Day } = useGeomagnetic27DayForecast();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getKpColor = (kpIndex) => {
    if (kpIndex >= 9) return '#dc004e'; // G5 - Extreme
    if (kpIndex >= 8) return '#f50057'; // G4 - Severe
    if (kpIndex >= 7) return '#ff6f00'; // G3 - Strong
    if (kpIndex >= 6) return '#ff9800'; // G2 - Moderate
    if (kpIndex >= 5) return '#ffc107'; // G1 - Minor
    if (kpIndex >= 4) return '#4caf50'; // Active
    if (kpIndex >= 3) return '#8bc34a'; // Unsettled
    return '#9e9e9e'; // Quiet
  };

  const getActivityLevelChip = (activityLevel, stormLevel, kpIndex) => {
    const color = getKpColor(kpIndex);
    return (
      <Chip 
        label={stormLevel || activityLevel} 
        size="small" 
        sx={{ bgcolor: color, color: 'white', fontWeight: 600 }}
      />
    );
  };

  const renderHistoricalStorms = () => {
    if (stormsLoading) return <LoadingSpinner message="Loading historical storm data..." />;
    if (stormsError) return <ErrorMessage error={stormsError} />;
    if (!storms || !storms.data) return <Alert severity="info">No storm data available</Alert>;

    const { storms: stormList, statistics } = storms.data;

    return (
      <Box>
        {/* Statistics Cards */}
        {statistics && (
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <FaBolt color="#ffc107" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Storms
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight={700}>
                    {storms.data.totalCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <FaExclamationTriangle color="#f50057" />
                    <Typography variant="subtitle2" color="text.secondary">
                      Max Kp Index
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight={700} sx={{ color: getKpColor(statistics.maxKpIndex) }}>
                    {statistics.maxKpIndex}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h5">📊</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Average Kp Index
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight={700}>
                    {statistics.averageKpIndex}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h5">🌩️</Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Observations
                    </Typography>
                  </Box>
                  <Typography variant="h4" fontWeight={700}>
                    {statistics.totalKpObservations}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Storm List */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Storm Events ({stormList.length})
        </Typography>
        
        {stormList.map((storm, index) => (
          <Accordion key={storm.gstID} sx={{ mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {format(parseISO(storm.startTime), 'MMM dd, yyyy HH:mm')} UTC
                </Typography>
                <Chip 
                  label={`Max Kp: ${Math.max(...storm.allKpIndex.map(k => k.kpIndex))}`}
                  size="small"
                  sx={{ bgcolor: getKpColor(Math.max(...storm.allKpIndex.map(k => k.kpIndex))), color: 'white' }}
                />
                <Chip 
                  label={`${storm.allKpIndex.length} observations`}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {/* Kp Index Timeline */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Kp Index Timeline
                  </Typography>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={storm.allKpIndex.map(k => ({
                      time: format(parseISO(k.observedTime), 'HH:mm'),
                      kp: k.kpIndex,
                      source: k.source
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 9]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="kp" stroke="#f50057" strokeWidth={2} name="Kp Index" />
                    </LineChart>
                  </ResponsiveContainer>
                </Grid>

                {/* Linked Events */}
                {storm.linkedEvents && storm.linkedEvents.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                      Linked Events
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      {storm.linkedEvents.map((event, idx) => (
                        <Chip key={idx} label={event.activityID} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Grid>
                )}

                {/* Additional Info */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="text.secondary">
                    Storm ID: {storm.gstID}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Link href={storm.link} target="_blank" rel="noopener" sx={{ typography: 'caption' }}>
                    View on NASA DONKI →
                  </Link>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  const render3DayForecast = () => {
    if (loading3Day) return <LoadingSpinner message="Loading 3-day forecast..." />;
    if (error3Day) return <ErrorMessage error={error3Day} />;
    if (!forecast3Day || !forecast3Day.data) return <Alert severity="info">No forecast data available</Alert>;

    const { forecasts, summary } = forecast3Day.data;

    // Prepare chart data
    const chartData = forecasts.flatMap(day => 
      day.kpValues.map((kp, index) => ({
        date: day.date,
        hour: index * 3,
        kp: kp,
        label: `${day.date} ${String(index * 3).padStart(2, '0')}:00`
      }))
    );
/*Merhabalar bu yorum satırıdır.*/ 
    return (
      <Box>
        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Max Kp Expected
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: getKpColor(summary.maxKp) }}>
                  {summary.maxKp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Average Kp
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {summary.averageKp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Storm Days
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {summary.stormDays}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Active Days
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {summary.activeDays}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Kp Index Chart */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            3-Hour Kp Index Forecast
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="label" 
                angle={-45} 
                textAnchor="end" 
                height={80}
                tick={{ fontSize: 10 }}
              />
              <YAxis domain={[0, 9]} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="kp" stroke="#4caf50" fill="#4caf50" fillOpacity={0.6} name="Kp Index" />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>

        {/* Daily Forecast Cards */}
        <Typography variant="h6" gutterBottom>
          Daily Forecasts
        </Typography>
        <Grid container spacing={2}>
          {forecasts.map((day) => (
            <Grid item xs={12} md={4} key={day.date}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {format(parseISO(day.date), 'MMM dd, yyyy')}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    {getActivityLevelChip(day.activityLevel, day.stormLevel, day.kpIndex)}
                  </Box>

                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Average Kp</Typography>
                      <Typography variant="h5" fontWeight={600}>{day.kpIndex}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Max Kp</Typography>
                      <Typography variant="h5" fontWeight={600} sx={{ color: getKpColor(day.maxKpIndex) }}>
                        {day.maxKpIndex}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">Min Kp</Typography>
                      <Typography variant="body1">{day.minKpIndex}</Typography>
                    </Grid>
                  </Grid>

                  {/* 3-hour values */}
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom display="block">
                      3-Hour Values
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {day.kpValues.map((kp, idx) => (
                        <Chip 
                          key={idx} 
                          label={kp} 
                          size="small" 
                          sx={{ 
                            bgcolor: getKpColor(kp), 
                            color: 'white',
                            minWidth: 35
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  const render27DayForecast = () => {
    if (loading27Day) return <LoadingSpinner message="Loading 27-day outlook..." />;
    if (error27Day) return <ErrorMessage error={error27Day} />;
    if (!forecast27Day || !forecast27Day.data) return <Alert severity="info">No outlook data available</Alert>;

    const { outlooks, summary } = forecast27Day.data;

    return (
      <Box>
        {/* Summary Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Max Kp Expected
                </Typography>
                <Typography variant="h4" fontWeight={700} sx={{ color: getKpColor(summary.maxKp) }}>
                  {summary.maxKp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Average Kp
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {summary.averageKp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Storm Days
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {summary.stormDays}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Notable Events
                </Typography>
                <Typography variant="h4" fontWeight={700}>
                  {summary.notableEvents}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Kp Index Chart */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            27-Day Kp Index Outlook
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outlooks.map(day => ({
              date: format(parseISO(day.date), 'MMM dd'),
              kp: day.kpIndex,
              aIndex: day.aIndex
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
              <YAxis yAxisId="left" domain={[0, 9]} label={{ value: 'Kp Index', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'A Index', angle: 90, position: 'insideRight' }} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="kp" fill="#4caf50" name="Kp Index" />
              <Bar yAxisId="right" dataKey="aIndex" fill="#2196f3" name="A Index" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Radio Flux Chart */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Solar Radio Flux (10.7 cm)
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={outlooks.map(day => ({
              date: format(parseISO(day.date), 'MMM dd'),
              flux: day.radioFlux
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="flux" stroke="#ff9800" strokeWidth={2} name="Radio Flux" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>

        {/* Table View */}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell align="center"><strong>Kp Index</strong></TableCell>
                <TableCell align="center"><strong>A Index</strong></TableCell>
                <TableCell align="center"><strong>Radio Flux</strong></TableCell>
                <TableCell><strong>Activity Level</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {outlooks.map((day) => (
                <TableRow key={day.date} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                  <TableCell>{format(parseISO(day.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={day.kpIndex} 
                      size="small" 
                      sx={{ bgcolor: getKpColor(day.kpIndex), color: 'white', fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell align="center">{day.aIndex}</TableCell>
                  <TableCell align="center">{day.radioFlux}</TableCell>
                  <TableCell>
                    {getActivityLevelChip(day.activityLevel, day.stormLevel, day.kpIndex)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Geomagnetic Activity Monitor
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Track geomagnetic storms, space weather forecasts, and solar activity
      </Typography>

      {/* Info Alert */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Kp Index Scale:</strong> 0-2 (Quiet), 3-4 (Unsettled/Active), 5 (G1 Minor Storm), 
          6 (G2 Moderate), 7 (G3 Strong), 8 (G4 Severe), 9 (G5 Extreme)
        </Typography>
      </Alert>

      {/* Tabs for different views */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab label="Historical Storms" icon={<FaBolt />} iconPosition="start" />
          <Tab label="3-Day Forecast" icon={<Typography>📅</Typography>} iconPosition="start" />
          <Tab label="27-Day Outlook" icon={<FaSatelliteDish />} iconPosition="start" />
        </Tabs>
      </Paper>

      {/* Date Range Selector for Historical Data */}
      {activeTab === 0 && (
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
            <Grid item xs={12} sm={2}>
              <Typography variant="caption" color="text.secondary">
                {storms?.data?.totalCount || 0} storms found
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Content based on active tab */}
      <Box sx={{ mt: 3 }}>
        {activeTab === 0 && renderHistoricalStorms()}
        {activeTab === 1 && render3DayForecast()}
        {activeTab === 2 && render27DayForecast()}
      </Box>
    </Container>
  );
};

export default Geomagnetic;
