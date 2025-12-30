import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { LocationProvider } from "./context/LocationContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Geomagnetic from "./pages/Geomagnetic";
import Asteroids from "./pages/Asteroids";
import NaturalEvents from "./pages/NaturalEvents";
import AirQuality from "./pages/AirQuality";
import APOD from "./pages/APOD";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import NotFound from "./pages/NotFound"

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        <AuthProvider>
          <BrowserRouter>
            {/* Global Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#111827',
                  color: '#fff',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(124, 58, 237, 0.2)',
                },
                success: {
                  iconTheme: { primary: '#10B981', secondary: '#fff' },
                },
                error: {
                  iconTheme: { primary: '#EF4444', secondary: '#fff' },
                },
                loading: {
                  iconTheme: { primary: '#7C3AED', secondary: '#fff' },
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
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
                  <Route path="*" element={<NotFound />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Box>
              <Footer />
            </Box>
          </BrowserRouter>
        </AuthProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

export default App;

