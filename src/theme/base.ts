import { ThemeOptions } from '@mui/material';

export const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Oswald", "Roboto", sans-serif',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    h2: {
      fontFamily: '"Oswald", "Roboto", sans-serif',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
    },
    h3: {
      fontFamily: '"Oswald", "Roboto", sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
    },
    h4: {
      fontFamily: '"Oswald", "Roboto", sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h5: {
      fontFamily: '"Oswald", "Roboto", sans-serif',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
    },
    h6: {
      fontFamily: '"Oswald", "Roboto", sans-serif',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
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
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
};
