import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAstronaut } from "react-icons/fa";

const Register = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();

  // UPDATED: State now has firstName and lastName
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // UPDATED: Passing separated fields
      await register(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ py: 8, minHeight: "80vh", display: "flex", alignItems: "center" }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 4,
          background:
            theme.palette.mode === "dark"
              ? "rgba(30, 41, 59, 0.6)"
              : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(20px)",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(255, 255, 255, 0.4)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              margin: "0 auto",
              mb: 2,
              background: "linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(124, 58, 237, 0.4)",
            }}
          >
            <FaUserAstronaut size={24} color="white" />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Join the Mission
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your account to start tracking the universe.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* UPDATED: Split inputs for First and Last Name */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                variant="outlined"
                margin="normal"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                margin="normal"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            sx={{ mb: 4 }}
          />

          <Button
            fullWidth
            size="large"
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 700,
              background: "linear-gradient(90deg, #7C3AED 0%, #EC4899 100%)",
              boxShadow: "0 4px 14px 0 rgba(124, 58, 237, 0.35)",
            }}
          >
            {loading ? "Registering..." : "Create Account"}
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <MuiLink
              component={Link}
              to="/login"
              fontWeight={600}
              underline="hover"
              sx={{ color: "secondary.main" }}
            >
              Login Here
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
