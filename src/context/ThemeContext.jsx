import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("themeMode");
    return saved || "light";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
              // COSMIC DARK THEME
              primary: {
                main: "#7C3AED", // Nebula purple
                light: "#A855F7",
                dark: "#6D28D9",
              },
              secondary: {
                main: "#00E0FF", // Cyan glow accent
                light: "#33E8FF",
                dark: "#00B8D4",
              },
              background: {
                default: "#0B1020", // Deep space navy
                paper: "#111827", // Space blue for cards
              },
              text: {
                primary: "#ffffff", // Pure White
                secondary: "#B8C5D6", // Bright silver-blue for accessibility
              },
              divider: "rgba(124, 58, 237, 0.3)", // Subtle purple dividers
            }
            : {
              // LIGHT MODE
              primary: {
                main: "#00E0FF",
                light: "#33E8FF",
                dark: "#00B8D4",
              },
              secondary: {
                main: "#3B82F6",
              },
              background: {
                default: "#F0F4FF",
                paper: "rgba(255, 255, 255, 0.8)",
              },
              text: {
                primary: "#1F2937",
                secondary: "#4B5563",
              },
            }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          allVariants: {
            color: mode === "dark" ? "#ffffff" : "#1F2937",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: mode === "dark" ? "#0B1020" : "#F0F4FF",
                color: mode === "dark" ? "#ffffff" : "#1F2937",
              },
            },
          },
          // FORCE HEADERS TO BE WHITE IN DARK MODE
          MuiTypography: {
            styleOverrides: {
              root: {
                "&.MuiTypography-colorTextSecondary": {
                  color: mode === "dark" ? "#B8C5D6" : undefined,
                },
              },
              h1: { color: mode === "dark" ? "#ffffff" : undefined },
              h2: { color: mode === "dark" ? "#ffffff" : undefined },
              h3: { color: mode === "dark" ? "#ffffff" : undefined },
              h4: { color: mode === "dark" ? "#ffffff" : undefined },
              h5: { color: mode === "dark" ? "#ffffff" : undefined },
              h6: { color: mode === "dark" ? "#ffffff" : undefined },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
                border: mode === "dark" ? "1px solid rgba(124, 58, 237, 0.2)" : "none",
                boxShadow: mode === "dark" ? "0 4px 20px rgba(124, 58, 237, 0.15)" : undefined,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#111827" : "#ffffff",
                color: mode === "dark" ? "#ffffff" : "inherit",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              containedPrimary: {
                background: mode === "dark"
                  ? "linear-gradient(135deg, #7C3AED 0%, #00E0FF 100%)"
                  : undefined,
                boxShadow: mode === "dark"
                  ? "0 4px 14px rgba(124, 58, 237, 0.4)"
                  : undefined,
                "&:hover": {
                  boxShadow: mode === "dark"
                    ? "0 6px 20px rgba(124, 58, 237, 0.6)"
                    : undefined,
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const value = { mode, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "html, body, #root": {
              backgroundColor:
                mode === "dark" ? "#0B1020 !important" : "#F0F4FF",
              color: mode === "dark" ? "#ffffff" : "#1F2937",
            },
            // Fallback: If a text is still dark, this catches it
            ".MuiTypography-root": {
              color: mode === "dark" ? "#ffffff" : undefined,
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

