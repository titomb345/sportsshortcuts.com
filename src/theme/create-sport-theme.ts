import { createTheme, ThemeOptions } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { baseThemeOptions } from './base';

type ColorMode = 'light' | 'dark';

interface PrimaryColors {
  light: { main: string; light: string; dark: string };
  dark: { main: string; light: string; dark: string };
}

interface SportThemeConfig {
  primary: PrimaryColors;
  secondary: { main: string; light: string; dark: string };
  appBarGradient: string;
  lightBackground: string;
  extraPalette?: ThemeOptions['palette'];
}

const DARK_MODE_BACKGROUNDS = {
  default: '#121212',
  paper: '#1e1e1e',
  input: '#2d2d2d',
};

const getInputStyles = (mode: ColorMode, primaryRgb: string) => ({
  backgroundColor: mode === 'light' ? '#ffffff' : DARK_MODE_BACKGROUNDS.input,
  '&:hover': {
    boxShadow:
      mode === 'light'
        ? `0 0 0 3px rgba(${primaryRgb}, 0.1)`
        : '0 0 0 3px rgba(255, 255, 255, 0.1)',
  },
  '&.Mui-focused': {
    boxShadow:
      mode === 'light'
        ? `0 0 0 3px rgba(${primaryRgb}, 0.2)`
        : '0 0 0 3px rgba(255, 255, 255, 0.2)',
  },
});

export function createSportThemeOptions(
  mode: ColorMode,
  config: SportThemeConfig,
  primaryRgb: string
): ThemeOptions {
  const primaryColors = mode === 'light' ? config.primary.light : config.primary.dark;
  const inputStyles = getInputStyles(mode, primaryRgb);

  return {
    palette: {
      mode,
      primary: {
        ...primaryColors,
        contrastText: mode === 'light' ? '#ffffff' : '#000000',
      },
      secondary: {
        ...config.secondary,
        contrastText: '#ffffff',
      },
      background:
        mode === 'light'
          ? { default: config.lightBackground, paper: '#ffffff' }
          : { default: DARK_MODE_BACKGROUNDS.default, paper: DARK_MODE_BACKGROUNDS.paper },
      ...config.extraPalette,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: { background: config.appBarGradient },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 12px rgba(${primaryRgb}, 0.3)`,
            },
            transition: 'all 0.2s ease-in-out',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': inputStyles,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: inputStyles,
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateX(4px)',
              borderColor: config.primary.light.main,
              boxShadow: `0 4px 12px rgba(${primaryRgb}, 0.15)`,
            },
          },
        },
      },
    },
  };
}

export function createSportTheme(
  mode: ColorMode,
  config: SportThemeConfig,
  primaryRgb: string
) {
  return createTheme(
    deepmerge(baseThemeOptions, createSportThemeOptions(mode, config, primaryRgb))
  );
}
