import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  Button,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { eonetAPI } from '../../api/eonet';
import { formatDateTime } from '../../utils/dateFormatter';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import { EVENT_CATEGORIES } from '../../utils/constants';

const EventsAlert = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await eonetAPI.getEvents({
        status: 'open',
        limit: 5,
        days: 7,
      });
      setEvents(response.data);
    } catch (err) {
      setError(err.message || 'Failed to load natural events');
      console.error('Events fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading recent events..." />;
  if (error) return <ErrorMessage error={error} retry={fetchEvents} />;
  if (!events || !events.events || events.events.length === 0) {
    return (
      <Card sx={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(17, 24, 39, 0.9) 100%)'
          : undefined,
        border: isDark ? '1px solid rgba(124, 58, 237, 0.2)' : undefined,
      }}>
        <CardContent>
          <Typography variant="h6">Recent Natural Events</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No major events reported in the last 7 days.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{
      background: isDark
        ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(17, 24, 39, 0.95) 100%)'
        : undefined,
      border: isDark ? '1px solid rgba(124, 58, 237, 0.3)' : undefined,
      boxShadow: isDark
        ? '0 8px 32px rgba(124, 58, 237, 0.2)'
        : '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: isDark
          ? '0 12px 40px rgba(124, 58, 237, 0.3)'
          : '0 12px 40px rgba(0, 0, 0, 0.15)',
      },
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaExclamationTriangle style={{
              color: isDark ? '#00E0FF' : '#f59e0b',
              filter: isDark ? 'drop-shadow(0 0 6px rgba(0, 224, 255, 0.5))' : undefined,
            }} />
            <Typography variant="h6">Recent Natural Events</Typography>
          </Box>
          <Chip
            label={`${events.events.length} Active`}
            size="small"
            sx={{
              background: isDark
                ? 'linear-gradient(135deg, #DC2626 0%, #7C3AED 100%)'
                : undefined,
              color: isDark ? 'white' : undefined,
              fontWeight: 600,
            }}
            color={isDark ? undefined : "warning"}
          />
        </Box>

        <List>
          {events.events.slice(0, 5).map((event) => {
            const category = event.categories?.[0];
            const categoryKey = category?.id || 'default';
            const categoryInfo = EVENT_CATEGORIES[categoryKey] || {};

            return (
              <ListItem
                key={event.id}
                divider
                sx={{
                  borderColor: isDark ? 'rgba(124, 58, 237, 0.2)' : undefined,
                  '&:hover': {
                    background: isDark ? 'rgba(124, 58, 237, 0.1)' : 'rgba(0, 0, 0, 0.02)',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{categoryInfo.icon || '🌍'}</span>
                      <Typography variant="body1">{event.title}</Typography>
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        {category?.title || 'Natural Event'}
                      </Typography>
                      {event.geometry?.[0]?.date && (
                        <Typography variant="caption" display="block" color="text.secondary">
                          {formatDateTime(event.geometry[0].date)}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            );
          })}
        </List>

        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate('/events')}
          sx={{
            mt: 2,
            borderColor: isDark ? 'rgba(124, 58, 237, 0.5)' : undefined,
            color: isDark ? '#00E0FF' : undefined,
            '&:hover': {
              borderColor: isDark ? '#7C3AED' : undefined,
              background: isDark ? 'rgba(124, 58, 237, 0.1)' : undefined,
            },
          }}
        >
          View All Events
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventsAlert;

