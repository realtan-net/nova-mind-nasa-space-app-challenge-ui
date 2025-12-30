import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.8)'
            : 'linear-gradient(135deg, #0B1020 0%, #111827 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: (theme) =>
          theme.palette.mode === 'light'
            ? '1px solid rgba(0, 224, 255, 0.1)'
            : '1px solid rgba(124, 58, 237, 0.3)',
        boxShadow: (theme) =>
          theme.palette.mode === 'light'
            ? '0 -4px 30px rgba(0, 224, 255, 0.1)'
            : '0 -4px 30px rgba(124, 58, 237, 0.15)',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.mode === 'dark' ? '#e0e0e0' : '#4B5563',
              fontWeight: 500,
            }}
          >
            © {currentYear} Aether Link. Environmental & Space Data Platform.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.mode === 'dark' ? '#e0e0e0' : '#4B5563',
                fontWeight: 500,
              }}
            >
              Data sources: NASA POWER, EONET, NeoWs, APOD, NOAA, OpenAQ
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

