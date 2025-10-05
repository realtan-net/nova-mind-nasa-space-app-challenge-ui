import { Container, Typography, Box } from '@mui/material';

const NaturalEvents = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Natural Events
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Global natural disaster tracking from NASA EONET
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Interactive map and event listing coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default NaturalEvents;
