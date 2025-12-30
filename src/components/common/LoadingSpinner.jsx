import { Box, CircularProgress, Typography, Skeleton, Grid, useTheme } from '@mui/material';

const LoadingSpinner = ({ message = 'Loading...', size = 40, variant = 'spinner' }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Skeleton loading for cards
  if (variant === 'card') {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ borderRadius: 2, mb: 2 }}
          animation="wave"
        />
        <Skeleton variant="text" width="60%" height={32} animation="wave" />
        <Skeleton variant="text" width="40%" animation="wave" />
      </Box>
    );
  }

  // Skeleton loading for charts
  if (variant === 'chart') {
    return (
      <Box
        sx={{
          p: 3,
          background: isDark
            ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(17, 24, 39, 0.9) 100%)'
            : undefined,
          borderRadius: 2,
        }}
      >
        <Skeleton variant="text" width="30%" height={32} animation="wave" sx={{ mb: 2 }} />
        <Skeleton
          variant="rectangular"
          height={280}
          sx={{ borderRadius: 2 }}
          animation="wave"
        />
      </Box>
    );
  }

  // Skeleton loading for maps
  if (variant === 'map') {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton
          variant="rectangular"
          height={400}
          sx={{ borderRadius: 2 }}
          animation="wave"
        />
        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Skeleton variant="circular" width={20} height={20} animation="wave" />
          <Skeleton variant="text" width="20%" animation="wave" />
          <Skeleton variant="circular" width={20} height={20} animation="wave" />
          <Skeleton variant="text" width="20%" animation="wave" />
        </Box>
      </Box>
    );
  }

  // Skeleton loading for dashboard grid
  if (variant === 'dashboard') {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Skeleton
              variant="rectangular"
              height={120}
              sx={{ borderRadius: 2 }}
              animation="wave"
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Default spinner
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
      }}
    >
      <CircularProgress
        size={size}
        sx={{
          color: isDark ? '#7C3AED' : undefined,
        }}
      />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;

