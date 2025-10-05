import { Container, Typography, Grid, Box } from '@mui/material';
import APODCard from '../components/dashboard/APODCard';

const APOD = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={700}>
        Astronomy Picture of the Day
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Discover the cosmos! Each day a different image or photograph of our fascinating universe.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <APODCard featured />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Archive browsing and date selection coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default APOD;
