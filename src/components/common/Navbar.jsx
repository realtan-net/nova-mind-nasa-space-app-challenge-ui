import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { FaSatellite, FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/weather', label: 'Weather' },
    { path: '/geomagnetic', label: 'Geomagnetic' },
    { path: '/asteroids', label: 'Asteroids' },
    { path: '/events', label: 'Events' },
    { path: '/air-quality', label: 'Air Quality' },
    { path: '/apod', label: 'APOD' },
  ];

  return (
    <AppBar 
      position="sticky" 
      elevation={4}
      sx={{
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 0.5 }}>
          <FaSatellite style={{ fontSize: '2rem', marginRight: '1rem' }} />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '0.5px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Nova Mind
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{
                  fontWeight: location.pathname === item.path ? 700 : 500,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ 
              ml: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
            aria-label="toggle theme"
          >
            {mode === 'dark' ? <FaSun /> : <FaMoon />}
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
