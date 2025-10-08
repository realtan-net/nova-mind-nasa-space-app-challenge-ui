import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="xl">
        <Divider sx={{ mb: 2 }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} Nova Mind. Built for NASA Space Apps Challenge.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Data sources: NASA POWER, EONET, NeoWs, APOD, NOAA, OpenAQ
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <MuiLink
              href="https://github.com/realtan-net/nova-mind-nasa-space-app-challenge-app"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
              title="Backend Repository"
            >
              <FaGithub size={24} />
            </MuiLink>
            <MuiLink
              href="https://github.com/realtan-net/nova-mind-nasa-space-app-challenge-ui"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
              title="Frontend Repository"
            >
              <FaGithub size={24} />
            </MuiLink>
            <MuiLink
              href="https://www.linkedin.com/in/realtan/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
              title="LinkedIn Profile"
            >
              <FaLinkedin size={24} />
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
