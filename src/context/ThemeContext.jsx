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
                // TRUE DARK MODE
                primary: {
                  main: "#90caf9",
                },
                secondary: {
                  main: "#ce93d8",
                },
                background: {
                  default: "#000000", // Pure Black
                  paper: "#121212", // Dark Charcoal for Cards
                },
                text: {
                  primary: "#ffffff", // Pure White
                  secondary: "#e0e0e0", // Ultra-Bright Silver (Fixed visibility)
                },
                divider: "#333333",
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
                backgroundColor: mode === "dark" ? "#000000" : "#F0F4FF",
                color: mode === "dark" ? "#ffffff" : "#1F2937",
              },
            },
          },
          // FORCE HEADERS TO BE WHITE (Fixes "Platform Features" visibility)
          MuiTypography: {
            styleOverrides: {
              root: {
                "&.MuiTypography-colorTextSecondary": {
                  color: mode === "dark" ? "#e0e0e0" : undefined,
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
                backgroundColor: mode === "dark" ? "#121212" : "#ffffff",
                border: mode === "dark" ? "1px solid #333333" : "none",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#121212" : "#ffffff",
                color: mode === "dark" ? "#ffffff" : "inherit",
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
                mode === "dark" ? "#000000 !important" : "#F0F4FF",
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
