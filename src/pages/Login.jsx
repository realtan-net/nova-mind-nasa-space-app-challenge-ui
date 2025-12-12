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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaRocket } from "react-icons/fa";

const Login = () => {
  const theme = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData.email, formData.password);
      navigate("/dashboard"); // Redirect to home/dashboard after login
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
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 8px 32px rgba(0, 0, 0, 0.4)"
              : "0 8px 32px rgba(31, 38, 135, 0.15)",
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
              background: "linear-gradient(135deg, #00E0FF 0%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0, 224, 255, 0.4)",
            }}
          >
            <FaRocket size={24} color="white" />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your credentials to access the cosmos.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            sx={{ mb: 2 }}
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
              background: "linear-gradient(90deg, #00E0FF 0%, #3B82F6 100%)",
              boxShadow: "0 4px 14px 0 rgba(0, 224, 255, 0.35)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(0, 224, 255, 0.5)",
              },
            }}
          >
            {loading ? "Initiating Launch..." : "Login"}
          </Button>
        </form>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            New to Nova Mind?{" "}
            <MuiLink
              component={Link}
              to="/register"
              fontWeight={600}
              underline="hover"
              sx={{ color: "primary.main" }}
            >
              Create Account
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
