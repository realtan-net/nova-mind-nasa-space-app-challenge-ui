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
      elevation={0}
      sx={{
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #00E0FF 0%, #3B82F6 50%, #7C3AED 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: mode === 'light' ? '0 4px 30px rgba(0, 224, 255, 0.2)' : '0 4px 30px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <FaSatellite 
            style={{ 
              fontSize: '2.2rem', 
              marginRight: '1rem',
              filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
            }} 
          />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              letterSpacing: '-0.01em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Nova Mind
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{
                  fontWeight: location.pathname === item.path ? 700 : 600,
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(255, 255, 255, 0.25)' 
                    : 'transparent',
                  backdropFilter: location.pathname === item.path ? 'blur(10px)' : 'none',
                  border: location.pathname === item.path ? '1px solid rgba(255, 255, 255, 0.3)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'scale(1.05)',
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
