import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '80vh',
                    textAlign: 'center',
                }}
            >
                <RocketLaunchIcon sx={{ fontSize: 100, color: 'primary.main', mb: 2 }} />
                <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ mb: 4 }}>
                    Üzgünüz, galaksinin bu köşesinde aradığınız şeyi bulamadık.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ borderRadius: 2 }}
                >
                    Dünya'ya (Ana Sayfa) Dön
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;