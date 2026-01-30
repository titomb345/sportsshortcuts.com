import { createSportTheme } from './create-sport-theme';

const NFL_CONFIG = {
  primary: {
    light: { main: '#013369', light: '#1a4a8f', dark: '#012347' },
    dark: { main: '#5c9ce6', light: '#8fc1ff', dark: '#2d7ad4' },
  },
  secondary: { main: '#d50a0a', light: '#e53939', dark: '#9a0707' },
  appBarGradient: 'linear-gradient(135deg, #013369 0%, #d50a0a 100%)',
  lightBackground: '#f5f7fa',
};

const NFL_PRIMARY_RGB = '1, 51, 105';

export const getNflTheme = (mode: 'light' | 'dark') =>
  createSportTheme(mode, NFL_CONFIG, NFL_PRIMARY_RGB);

export const nflTheme = getNflTheme('light');
