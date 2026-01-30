import { createTheme, ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { baseThemeOptions } from './base';

const nflThemeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#013369', // NFL Navy Blue
      light: '#1a4a8f',
      dark: '#012347',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d50a0a', // NFL Red
      light: '#e53939',
      dark: '#9a0707',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7fa', // Light blue-gray
      paper: '#ffffff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #013369 0%, #012347 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(1, 51, 105, 0.3)',
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
              boxShadow: '0 0 0 3px rgba(1, 51, 105, 0.1)',
            },
            '&.Mui-focused': {
              boxShadow: '0 0 0 3px rgba(1, 51, 105, 0.2)',
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
            boxShadow: '0 0 0 3px rgba(1, 51, 105, 0.1)',
          },
          '&.Mui-focused': {
            boxShadow: '0 0 0 3px rgba(1, 51, 105, 0.2)',
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
            borderColor: '#013369',
            boxShadow: '0 4px 12px rgba(1, 51, 105, 0.15)',
          },
        },
      },
    },
  },
};

export const nflTheme = createTheme(deepmerge(baseThemeOptions, nflThemeOptions));
