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
} from '@mui/material';
import { FaDownload, FaExpand, FaCompress } from 'react-icons/fa';
import { apodAPI } from '../../api/apod';
import { formatFullDate } from '../../utils/dateFormatter';
import ErrorMessage from '../common/ErrorMessage';

const APODCard = ({ featured = false }) => {
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
    } catch (err) {
      setError(err.message || 'Failed to load Astronomy Picture of the Day');
      console.error('APOD fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card sx={{ height: featured ? 600 : 400 }}>
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
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant={featured ? 'h4' : 'h5'} component="div">
          {apod.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {formatFullDate(apod.date)}
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
