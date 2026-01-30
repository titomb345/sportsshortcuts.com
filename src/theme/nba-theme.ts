import { createSportTheme } from './create-sport-theme';

const NBA_CONFIG = {
  primary: {
    light: { main: '#17408B', light: '#2c5aa8', dark: '#102d61' },
    dark: { main: '#6b9fe8', light: '#9cc4ff', dark: '#3d7ad6' },
  },
  secondary: { main: '#C9082A', light: '#e02e4e', dark: '#8f061e' },
  appBarGradient: 'linear-gradient(135deg, #17408B 0%, #C9082A 100%)',
  lightBackground: '#faf5f0',
  extraPalette: {
    warning: { main: '#f58426', light: '#f9a35a', dark: '#c66a1e' },
  },
};

const NBA_PRIMARY_RGB = '23, 64, 139';

export const getNbaTheme = (mode: 'light' | 'dark') =>
  createSportTheme(mode, NBA_CONFIG, NBA_PRIMARY_RGB);

export const nbaTheme = getNbaTheme('light');
