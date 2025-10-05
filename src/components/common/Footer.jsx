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

          <Box sx={{ display: 'flex', gap: 2 }}>
            <MuiLink
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              <FaGithub size={24} />
            </MuiLink>
            <MuiLink
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
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
