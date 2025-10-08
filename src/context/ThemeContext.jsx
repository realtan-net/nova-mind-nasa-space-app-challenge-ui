import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                // Dark mode colors
                primary: {
                  main: '#3b82f6',
                  light: '#60a5fa',
                  dark: '#2563eb',
                },
                secondary: {
                  main: '#10b981',
                  light: '#34d399',
                  dark: '#059669',
                },
                background: {
                  default: '#0f172a',
                  paper: '#1e293b',
                },
                text: {
                  primary: '#f1f5f9',
                  secondary: '#cbd5e1',
                },
                error: {
                  main: '#ef4444',
                },
                warning: {
                  main: '#f59e0b',
                },
                info: {
                  main: '#06b6d4',
                },
                success: {
                  main: '#10b981',
                },
              }
            : {
                // Light mode colors - Bright, modern, space-inspired theme
                primary: {
                  main: '#00E0FF', // Turquoise
                  light: '#33E8FF',
                  dark: '#00B8D4',
                },
                secondary: {
                  main: '#3B82F6', // Bright blue
                  light: '#60A5FA',
                  dark: '#2563EB',
                },
                background: {
                  default: 'linear-gradient(135deg, #F0F4FF 0%, #E0EBFF 100%)',
                  paper: 'rgba(255, 255, 255, 0.75)',
                },
                text: {
                  primary: '#1F2937', // Dark gray for titles
                  secondary: '#4B5563', // Medium gray for descriptions
                },
                error: {
                  main: '#EF4444',
                },
                warning: {
                  main: '#F59E0B',
                },
                info: {
                  main: '#00E0FF',
                },
                success: {
                  main: '#34D399', // Mint green
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 600,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'dark' 
                  ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
                  : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              },
            },
          },
        },
      }),
    [mode]
  );

  const value = {
    mode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
