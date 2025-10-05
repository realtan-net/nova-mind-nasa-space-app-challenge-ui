import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Weather from './pages/Weather';
import Geomagnetic from './pages/Geomagnetic';
import Asteroids from './pages/Asteroids';
import NaturalEvents from './pages/NaturalEvents';
import AirQuality from './pages/AirQuality';
import APOD from './pages/APOD';

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <BrowserRouter>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/geomagnetic" element={<Geomagnetic />} />
                <Route path="/asteroids" element={<Asteroids />} />
                <Route path="/events" element={<NaturalEvents />} />
                <Route path="/air-quality" element={<AirQuality />} />
                <Route path="/apod" element={<APOD />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </BrowserRouter>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;
