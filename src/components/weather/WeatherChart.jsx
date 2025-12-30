import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { parseHourlyTimestamp } from '../../utils/dateFormatter';
import { format } from 'date-fns';
import { WEATHER_PARAMETERS } from '../../utils/constants';

// Custom tooltip component for cosmic theme
const CustomTooltip = ({ active, payload, label, isDark, paramInfo }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: isDark
            ? 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(124, 58, 237, 0.2) 100%)'
            : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: isDark ? '1px solid rgba(124, 58, 237, 0.3)' : '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
          p: 1.5,
          boxShadow: isDark
            ? '0 8px 32px rgba(124, 58, 237, 0.3)'
            : '0 4px 16px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600} sx={{ color: payload[0]?.color || 'text.primary' }}>
          {paramInfo?.icon} {payload[0]?.value?.toFixed(2)} {paramInfo?.unit || ''}
        </Typography>
      </Box>
    );
  }
  return null;
};

const WeatherChart = ({ parameter, hourlyData, title, chartType = 'line' }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

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

  // Cosmic color palette
  const chartColors = {
    line: isDark ? '#00E0FF' : '#3b82f6',
    area: isDark ? '#7C3AED' : '#3b82f6',
    bar: isDark ? '#7C3AED' : '#3b82f6',
    grid: isDark ? 'rgba(124, 58, 237, 0.2)' : 'rgba(0, 0, 0, 0.1)',
    axis: isDark ? '#B8C5D6' : '#4B5563',
  };

  const color = paramInfo.color || chartColors[chartType];

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${parameter}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.area} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColors.area} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="time" stroke={chartColors.axis} tick={{ fill: chartColors.axis }} />
            <YAxis stroke={chartColors.axis} tick={{ fill: chartColors.axis }} />
            <Tooltip content={<CustomTooltip isDark={isDark} paramInfo={paramInfo} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColors.area}
              fill={`url(#gradient-${parameter})`}
              strokeWidth={2}
              animationDuration={1000}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id={`barGradient-${parameter}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.bar} stopOpacity={0.9} />
                <stop offset="95%" stopColor={chartColors.bar} stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="time" stroke={chartColors.axis} tick={{ fill: chartColors.axis }} />
            <YAxis stroke={chartColors.axis} tick={{ fill: chartColors.axis }} />
            <Tooltip content={<CustomTooltip isDark={isDark} paramInfo={paramInfo} />} />
            <Bar
              dataKey="value"
              fill={`url(#barGradient-${parameter})`}
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        );

      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="time" stroke={chartColors.axis} tick={{ fill: chartColors.axis }} />
            <YAxis stroke={chartColors.axis} tick={{ fill: chartColors.axis }} />
            <Tooltip content={<CustomTooltip isDark={isDark} paramInfo={paramInfo} />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={chartColors.line}
              strokeWidth={2}
              dot={{ r: 3, fill: chartColors.line, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: chartColors.line, stroke: isDark ? '#fff' : '#000', strokeWidth: 2 }}
              animationDuration={1000}
            />
          </LineChart>
        );
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        background: isDark
          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(17, 24, 39, 0.9) 100%)'
          : undefined,
        border: isDark ? '1px solid rgba(124, 58, 237, 0.2)' : undefined,
      }}
    >
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

