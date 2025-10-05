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
      <Card>
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
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaExclamationTriangle style={{ color: '#f59e0b' }} />
            <Typography variant="h6">Recent Natural Events</Typography>
          </Box>
          <Chip label={`${events.events.length} Active`} color="warning" size="small" />
        </Box>

        <List>
          {events.events.slice(0, 5).map((event) => {
            const category = event.categories?.[0];
            const categoryKey = category?.id || 'default';
            const categoryInfo = EVENT_CATEGORIES[categoryKey] || {};

            return (
              <ListItem key={event.id} divider>
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
          sx={{ mt: 2 }}
        >
          View All Events
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventsAlert;
