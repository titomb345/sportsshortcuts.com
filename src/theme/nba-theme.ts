import { createTheme, ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { baseThemeOptions } from './base';

const nbaThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#17408B', // NBA Blue
      light: '#2c5aa8',
      dark: '#102d61',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#C9082A', // NBA Red
      light: '#e02e4e',
      dark: '#8f061e',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f58426', // Basketball Orange accent
      light: '#f9a35a',
      dark: '#c66a1e',
    },
    background: {
      default: '#faf5f0', // Warm off-white
      paper: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #17408B 0%, #C9082A 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(23, 64, 139, 0.3)',
          },
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '&:hover': {
              boxShadow: '0 0 0 3px rgba(23, 64, 139, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(23, 64, 139, 0.2)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          '&:hover': {
            boxShadow: '0 0 0 3px rgba(23, 64, 139, 0.1)',
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 3px rgba(23, 64, 139, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateX(4px)',
            borderColor: '#17408B',
            boxShadow: '0 4px 12px rgba(23, 64, 139, 0.15)',
          },
        },
      },
    },
  },
};

export const nbaTheme = createTheme(deepmerge(baseThemeOptions, nbaThemeOptions));
