import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { parseHourlyTimestamp } from '../../utils/dateFormatter';
import { format } from 'date-fns';
import { WEATHER_PARAMETERS } from '../../utils/constants';

const WeatherChart = ({ parameter, hourlyData, title, chartType = 'line' }) => {
  if (!hourlyData || !hourlyData[parameter]) return null;

  const paramInfo = WEATHER_PARAMETERS[parameter] || {};
  const data = hourlyData[parameter];

  // Convert to chart data format
  const chartData = Object.entries(data).map(([timestamp, value]) => {
    const date = parseHourlyTimestamp(timestamp);
    return {
      time: format(date, 'HH:mm'),
      value: value,
      fullTime: format(date, 'HH:mm')
    };
  });

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    const color = paramInfo.color || '#3b82f6';

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke={color} fill={color} fillOpacity={0.6} />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} />
          </BarChart>
        );
      
      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        );
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h5">{paramInfo.icon || '📊'}</Typography>
        <Typography variant="h6">
          {title || paramInfo.name || parameter}
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        {renderChart()}
      </ResponsiveContainer>
    </Paper>
  );
};

export default WeatherChart;
