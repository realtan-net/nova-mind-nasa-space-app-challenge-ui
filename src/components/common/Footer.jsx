import { Box, Container, Typography, Link as MuiLink, Divider } from '@mui/material';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
            : theme.palette.grey[900],
        backdropFilter: 'blur(10px)',
        borderTop: (theme) => 
          theme.palette.mode === 'light' 
            ? '1px solid rgba(0, 224, 255, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: (theme) => 
          theme.palette.mode === 'light' 
            ? '0 -4px 30px rgba(0, 224, 255, 0.1)'
            : 'none',
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
              color: '#4B5563',
              fontWeight: 500,
            }}
          >
            © {currentYear} Nova Mind. Built for NASA Space Apps Challenge.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#4B5563',
                fontWeight: 500,
              }}
            >
              Data sources: NASA POWER, EONET, NeoWs, APOD, NOAA, OpenAQ
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <MuiLink
              href="https://github.com/realtan-net/nova-mind-nasa-space-app-challenge-app"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: '#1F2937',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-3px)',
                  color: '#00E0FF',
                }
              }}
              title="Backend Repository"
            >
              <FaGithub size={26} />
            </MuiLink>
            <MuiLink
              href="https://github.com/realtan-net/nova-mind-nasa-space-app-challenge-ui"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: '#1F2937',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-3px)',
                  color: '#3B82F6',
                }
              }}
              title="Frontend Repository"
            >
              <FaGithub size={26} />
            </MuiLink>
            <MuiLink
              href="https://www.linkedin.com/in/realtan/"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: '#1F2937',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  transform: 'translateY(-3px)',
                  color: '#7C3AED',
                }
              }}
              title="LinkedIn Profile"
            >
              <FaLinkedin size={26} />
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
