import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Alert,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaSave, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const theme = useTheme();
  const { user, token, logout, fetchProfile } = useAuth();

  // UPDATED: State uses firstName and lastName
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // Load user data into form
  useEffect(() => {
    if (user) {
      // UPDATED: Map backend fields to form state
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // UPDATED: Send firstName and lastName directly
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");

      await fetchProfile(token);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom sx={{ mb: 4 }}>
        Commander Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Left Side: Avatar Card */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.6)"
                  : "white",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                margin: "0 auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "2.5rem",
              }}
            >
              {user?.firstName?.charAt(0) || <FaUserCircle />}
            </Avatar>
            {/* UPDATED: Display Combined Name */}
            <Typography variant="h6" fontWeight={700}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {user?.email}
            </Typography>

            <Button
              variant="outlined"
              color="error"
              startIcon={<FaSignOutAlt />}
              onClick={logout}
              fullWidth
            >
              Logout
            </Button>
          </Paper>
        </Grid>

        {/* Right Side: Edit Form */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 3,
              background:
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.6)"
                  : "white",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight={700}>
                Account Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Update your personal information
              </Typography>
            </Box>

            {message.text && (
              <Alert severity={message.type} sx={{ mb: 3 }}>
                {message.text}
              </Alert>
            )}

            <form onSubmit={handleUpdate}>
              <Grid container spacing={3}>
                {/* UPDATED: Separate Fields */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "right" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={<FaSave />}
                    sx={{
                      px: 4,
                      background:
                        "linear-gradient(90deg, #00E0FF 0%, #3B82F6 100%)",
                    }}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
