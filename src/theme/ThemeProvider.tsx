import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { getNflTheme } from './nfl-theme';
import { getNbaTheme } from './nba-theme';
import { baseThemeOptions } from './base';

type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export function SportThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mode, setMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('colorMode');
    return (saved as ColorMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => {
    if (location.pathname.startsWith('/nfl')) {
      return getNflTheme(mode);
    }
    if (location.pathname.startsWith('/nba')) {
      return getNbaTheme(mode);
    }
    return createTheme({
      ...baseThemeOptions,
      palette: {
        mode,
        ...(mode === 'dark' && {
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
      },
    });
  }, [location.pathname, mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
