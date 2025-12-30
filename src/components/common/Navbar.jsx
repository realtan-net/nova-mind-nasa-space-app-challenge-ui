import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSatellite,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaUserAstronaut,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext"; // 1. Import Auth Context
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useTheme();
  const { user, logout } = useAuth(); // 2. Get user state
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/weather", label: "Weather" },
    { path: "/geomagnetic", label: "Geomagnetic" },
    { path: "/asteroids", label: "Asteroids" },
    { path: "/events", label: "Events" },
    { path: "/air-quality", label: "Air Quality" },
    { path: "/apod", label: "APOD" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  // --- MOBILE DRAWER CONTENT ---
  const drawer = (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        width: 280,
        background:
          mode === "dark"
            ? "linear-gradient(135deg, #0B1020 0%, #111827 100%)"
            : "linear-gradient(135deg, #F0F4FF 0%, #E0EBFF 100%)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FaSatellite
            size={24}
            color={mode === "dark" ? "white" : "#1F2937"}
          />
          <Typography
            variant="h6"
            fontWeight={900}
            sx={{ color: mode === "dark" ? "white" : "#1F2937" }}
          >
            Aether Link
          </Typography>
        </Box>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ color: mode === "dark" ? "white" : "#1F2937" }}
        >
          <FaTimes />
        </IconButton>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={location.pathname === item.path}
              sx={{
                py: 2,
                px: 3,
                "&.Mui-selected": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(59, 130, 246, 0.2)"
                      : "rgba(0, 224, 255, 0.15)",
                  borderLeft: "4px solid",
                  borderColor: mode === "dark" ? "#3B82F6" : "#00E0FF",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: location.pathname === item.path ? 700 : 600,
                  color: mode === "dark" ? "white" : "#1F2937",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

      {/* Mobile Auth Buttons */}
      <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {user ? (
          <>
            <Button
              fullWidth
              component={Link}
              to="/profile"
              onClick={handleDrawerToggle}
              startIcon={<FaUserAstronaut />}
              sx={{
                justifyContent: "flex-start",
                color: mode === "dark" ? "white" : "#1F2937",
                fontWeight: 700,
              }}
            >
              My Profile
            </Button>
            <Button
              fullWidth
              onClick={handleLogout}
              startIcon={<FaSignOutAlt />}
              sx={{
                justifyContent: "flex-start",
                color: "#EF4444", // Red for logout
                fontWeight: 700,
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            fullWidth
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
            startIcon={<FaSignInAlt />}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #00E0FF 0%, #3B82F6 100%)",
              fontWeight: 700,
            }}
          >
            Login
          </Button>
        )}

        <Button
          fullWidth
          variant="outlined"
          onClick={toggleTheme}
          startIcon={mode === "dark" ? <FaSun /> : <FaMoon />}
          sx={{
            mt: 1,
            color: mode === "dark" ? "white" : "#1F2937",
            borderColor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.3)"
                : "rgba(0, 224, 255, 0.5)",
          }}
        >
          {mode === "dark" ? "Light Mode" : "Dark Mode"}
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
          background:
            mode === "dark"
              ? "linear-gradient(135deg, #0B1020 0%, #7C3AED 50%, #00E0FF 100%)"
              : "linear-gradient(135deg, #00E0FF 0%, #3B82F6 50%, #7C3AED 100%)",
          backdropFilter: "blur(20px)",
          boxShadow:
            mode === "light"
              ? "0 4px 30px rgba(0, 224, 255, 0.2)"
              : "0 4px 30px rgba(124, 58, 237, 0.3)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                gap: 1.5,
                mr: 4,
                transition: "all 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(255, 255, 255, 0.4)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <FaSatellite
                  style={{
                    fontSize: "1.5rem",
                    color: "#ffffff",
                    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
                  }}
                />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: "#ffffff",
                  textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Aether Link
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "#ffffff",
                    fontWeight: location.pathname === item.path ? 700 : 600,
                    fontSize: "0.95rem",
                    borderRadius: 2,
                    px: 2.5,
                    py: 1,
                    backgroundColor:
                      location.pathname === item.path
                        ? "rgba(255, 255, 255, 0.3)"
                        : "transparent",
                    border:
                      location.pathname === item.path
                        ? "1px solid rgba(255, 255, 255, 0.5)"
                        : "1px solid transparent",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}

              {/* AUTH BUTTONS (Desktop) */}
              <Box
                sx={{
                  ml: 2,
                  pl: 2,
                  borderLeft: "1px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  gap: 1,
                }}
              >
                {user ? (
                  <>
                    <Button
                      component={Link}
                      to="/profile"
                      startIcon={<FaUserAstronaut />}
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        textTransform: "none",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                      }}
                    >
                      {user.firstName?.split(" ")[0] || "Profile"}
                    </Button>
                    <IconButton
                      onClick={handleLogout}
                      title="Logout"
                      sx={{
                        color: "white",
                        "&:hover": {
                          color: "#ffcccb",
                          backgroundColor: "rgba(255, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <FaSignOutAlt size={20} />
                    </IconButton>
                  </>
                ) : (
                  <Button
                    component={Link}
                    to="/login"
                    variant="contained"
                    startIcon={<FaSignInAlt />}
                    sx={{
                      backgroundColor: "white",
                      color: "#3B82F6",
                      fontWeight: 700,
                      borderRadius: "20px",
                      textTransform: "none",
                      boxShadow: "0 4px 14px 0 rgba(0,0,0,0.2)",
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </Box>
            </Box>

            {/* Desktop Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              sx={{
                ml: 2,
                display: { xs: "none", md: "flex" },
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
              }}
            >
              {mode === "dark" ? <FaSun /> : <FaMoon />}
            </IconButton>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{
                ml: 2,
                display: { xs: "flex", md: "none" },
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              }}
            >
              <FaBars />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
