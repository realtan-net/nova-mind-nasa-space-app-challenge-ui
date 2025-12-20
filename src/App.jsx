import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "./context/ThemeContext";
import { LocationProvider } from "./context/LocationContext";
import { AuthProvider } from "./context/AuthContext"; // 1. Import the AuthProvider

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Geomagnetic from "./pages/Geomagnetic";
import Asteroids from "./pages/Asteroids";
import NaturalEvents from "./pages/NaturalEvents";
import AirQuality from "./pages/AirQuality";
import APOD from "./pages/APOD";

// 2. Import your new Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import NotFound from "./pages/NotFound"

function App() {
  return (
    <ThemeProvider>
      <LocationProvider>
        {/* 3. Wrap application with AuthProvider */}
        <AuthProvider>
          <BrowserRouter>
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
                    {/* Add the NotFound Route */}
                  <Route path="*" element={<NotFound />} />
                  {/* 4. Add the Authentication Routes */}
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
