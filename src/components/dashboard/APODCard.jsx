import { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Collapse,
  IconButton,
  Skeleton,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaDownload, FaExpand, FaCompress } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apodAPI } from '../../api/apod';
import { formatRelativeTime, formatSmartDate } from '../../utils/dayjs';
import ErrorMessage from '../common/ErrorMessage';

const APODCard = ({ featured = false }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchAPOD();
  }, []);

  const fetchAPOD = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apodAPI.getToday();
      setApod(response.data);
      toast.success('Astronomy Picture loaded!', { duration: 2000 });
    } catch (err) {
      setError(err.message || 'Failed to load Astronomy Picture of the Day');
      toast.error('Failed to load APOD');
      console.error('APOD fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card sx={{
        height: featured ? 600 : 400,
        background: isDark
          ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(17, 24, 39, 0.9) 100%)'
          : undefined,
      }}>
        <Skeleton variant="rectangular" height={featured ? 400 : 250} />
        <CardContent>
          <Skeleton variant="text" height={40} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <ErrorMessage error={error} retry={fetchAPOD} />
        </CardContent>
      </Card>
    );
  }

  if (!apod) return null;

  const truncatedExplanation = apod.explanation?.substring(0, 200) + '...';

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
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
          ? '0 16px 48px rgba(124, 58, 237, 0.35)'
          : '0 16px 48px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-4px)',
      },
    }}>
      <Box sx={{ position: 'relative' }}>
        {apod.mediaType === 'image' ? (
          <CardMedia
            component="img"
            height={featured ? 400 : 250}
            image={apod.url}
            alt={apod.title}
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{ height: featured ? 400 : 250 }}>
            <iframe
              src={apod.url}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ width: '100%', height: '100%' }}
              title={apod.title}
            />
          </Box>
        )}
        {/* Gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))',
            pointerEvents: 'none',
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant={featured ? 'h4' : 'h5'} component="div">
          {apod.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {formatSmartDate(apod.date)}
        </Typography>

        {apod.copyright && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            © {apod.copyright}
          </Typography>
        )}

        <Typography variant="body2" sx={{ mb: 2 }}>
          {expanded ? apod.explanation : truncatedExplanation}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            size="small"
            startIcon={expanded ? <FaCompress /> : <FaExpand />}
            onClick={() => setExpanded(!expanded)}
            sx={{
              color: isDark ? '#00E0FF' : undefined,
              '&:hover': {
                background: isDark ? 'rgba(0, 224, 255, 0.1)' : undefined,
              },
            }}
          >
            {expanded ? 'Show Less' : 'Read More'}
          </Button>

          {apod.hdurl && (
            <Button
              size="small"
              startIcon={<FaDownload />}
              component="a"
              href={apod.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: isDark ? '#7C3AED' : undefined,
                '&:hover': {
                  background: isDark ? 'rgba(124, 58, 237, 0.1)' : undefined,
                },
              }}
            >
              HD Version
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default APODCard;

