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
    <AppBar position="sticky" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FaSatellite style={{ fontSize: '2rem', marginRight: '1rem' }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
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
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  borderBottom: location.pathname === item.path ? '2px solid' : 'none',
                  borderRadius: 0,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            onClick={toggleTheme}
            color="inherit"
            sx={{ ml: 2 }}
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
