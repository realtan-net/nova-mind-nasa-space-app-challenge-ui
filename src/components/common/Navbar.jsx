import { AppBar, Toolbar, Typography, Button, IconButton, Box, Container, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { FaSatellite, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/weather', label: 'Weather' },
    { path: '/geomagnetic', label: 'Geomagnetic' },
    { path: '/asteroids', label: 'Asteroids' },
    { path: '/events', label: 'Events' },
    { path: '/air-quality', label: 'Air Quality' },
    { path: '/apod', label: 'APOD' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        width: 280,
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
          : 'linear-gradient(135deg, #F0F4FF 0%, #E0EBFF 100%)',
        height: '100%',
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FaSatellite size={24} color={mode === 'dark' ? 'white' : '#1F2937'} />
          <Typography variant="h6" fontWeight={900} sx={{ color: mode === 'dark' ? 'white' : '#1F2937' }}>
            Nova Mind
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: mode === 'dark' ? 'white' : '#1F2937' }}>
          <FaTimes />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                py: 2,
                px: 3,
                '&.Mui-selected': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(59, 130, 246, 0.2)' 
                    : 'rgba(0, 224, 255, 0.15)',
                  borderLeft: '4px solid',
                  borderColor: mode === 'dark' ? '#3B82F6' : '#00E0FF',
                },
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 224, 255, 0.1)',
                },
              }}
            >
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 600,
                  color: mode === 'dark' ? 'white' : '#1F2937',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={toggleTheme}
          startIcon={mode === 'dark' ? <FaSun /> : <FaMoon />}
          sx={{
            color: mode === 'dark' ? 'white' : '#1F2937',
            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 224, 255, 0.5)',
            '&:hover': {
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 224, 255, 0.8)',
              backgroundColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 224, 255, 0.1)',
            },
          }}
        >
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
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
            {/* Logo with Animation */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                gap: 1.5,
                mr: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 12px 40px rgba(255, 255, 255, 0.3)',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                  },
                }}
              >
                <FaSatellite 
                  style={{ 
                    fontSize: '1.5rem',
                    color: '#ffffff',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                  }} 
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: '#ffffff',
                  letterSpacing: '0.02em',
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
                  background: 'linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Nova Mind
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#ffffff',
                    fontWeight: location.pathname === item.path ? 700 : 600,
                    fontSize: '0.95rem',
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                    backgroundColor: location.pathname === item.path 
                      ? 'rgba(255, 255, 255, 0.3)' 
                      : 'transparent',
                    backdropFilter: location.pathname === item.path ? 'blur(10px)' : 'none',
                    border: location.pathname === item.path 
                      ? '1px solid rgba(255, 255, 255, 0.5)' 
                      : '1px solid transparent',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Desktop Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={{ 
                ml: 2,
                display: { xs: 'none', md: 'flex' },
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

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                ml: 2,
                display: { xs: 'flex', md: 'none' },
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <FaBars />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
