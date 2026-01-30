import { ThemeProvider as MuiThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { nflTheme } from './nfl-theme';
import { nbaTheme } from './nba-theme';
import { baseThemeOptions } from './base';

const defaultTheme = createTheme(baseThemeOptions);

export function SportThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const theme = useMemo(() => {
    if (location.pathname.startsWith('/nfl')) {
      return nflTheme;
    }
    if (location.pathname.startsWith('/nba')) {
      return nbaTheme;
    }
    return defaultTheme;
  }, [location.pathname]);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
