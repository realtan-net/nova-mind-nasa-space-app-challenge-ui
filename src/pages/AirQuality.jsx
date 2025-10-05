import { Container, Typography, Box } from '@mui/material';
import LocationInput from '../components/common/LocationInput';

const AirQuality = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Air Quality
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Real-time air quality measurements from OpenAQ
      </Typography>

      <LocationInput />

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Air quality visualization coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default AirQuality;
