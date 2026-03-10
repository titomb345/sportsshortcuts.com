import { useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { ColorModeContext } from './ColorModeContext';

type ColorMode = 'light' | 'dark';
type Sport = 'nfl' | 'nba' | null;

interface SportColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  bgDefault: string;
  bgPaper: string;
  bgInput: string;
  textPrimary: string;
  textSecondary: string;
  textDisabled: string;
  divider: string;
  appBarGradient: string;
}

const NFL_LIGHT: SportColors = {
  primary: '#013369',
  primaryLight: '#1a4a8f',
  secondary: '#d50a0a',
  secondaryLight: '#e53939',
  accent: '#d50a0a',
  bgDefault: '#f5f7fa',
  bgPaper: '#ffffff',
  bgInput: '#ffffff',
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  textDisabled: '#999999',
  divider: '#e0e0e0',
  appBarGradient: 'linear-gradient(135deg, #013369 0%, #d50a0a 100%)',
};

const NFL_DARK: SportColors = {
  primary: '#5c9ce6',
  primaryLight: '#8fc1ff',
  secondary: '#e53939',
  secondaryLight: '#ff6b6b',
  accent: '#e53939',
  bgDefault: '#121212',
  bgPaper: '#1e1e1e',
  bgInput: '#2d2d2d',
  textPrimary: '#e0e0e0',
  textSecondary: '#a0a0a0',
  textDisabled: '#666666',
  divider: '#333333',
  appBarGradient: 'linear-gradient(135deg, #013369 0%, #d50a0a 100%)',
};

const NBA_LIGHT: SportColors = {
  primary: '#17408B',
  primaryLight: '#2c5aa8',
  secondary: '#f58426',
  secondaryLight: '#f9a35a',
  accent: '#f58426',
  bgDefault: '#faf5f0',
  bgPaper: '#ffffff',
  bgInput: '#ffffff',
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  textDisabled: '#999999',
  divider: '#e0e0e0',
  appBarGradient: 'linear-gradient(135deg, #17408B 0%, #f58426 100%)',
};

const NBA_DARK: SportColors = {
  primary: '#6b9fe8',
  primaryLight: '#9cc4ff',
  secondary: '#f9a35a',
  secondaryLight: '#ffc48a',
  accent: '#f9a35a',
  bgDefault: '#121212',
  bgPaper: '#1e1e1e',
  bgInput: '#2d2d2d',
  textPrimary: '#e0e0e0',
  textSecondary: '#a0a0a0',
  textDisabled: '#666666',
  divider: '#333333',
  appBarGradient: 'linear-gradient(135deg, #17408B 0%, #f58426 100%)',
};

const DEFAULT_LIGHT: SportColors = {
  primary: '#0d2137',
  primaryLight: '#1a3a5c',
  secondary: '#c0392b',
  secondaryLight: '#e74c3c',
  accent: '#c0392b',
  bgDefault: '#f7f8fa',
  bgPaper: '#ffffff',
  bgInput: '#ffffff',
  textPrimary: '#1a1a1a',
  textSecondary: '#666666',
  textDisabled: '#999999',
  divider: '#e0e0e0',
  appBarGradient: 'linear-gradient(135deg, #0d2137 0%, #1a3a5c 100%)',
};

const DEFAULT_DARK: SportColors = {
  primary: '#7eadd4',
  primaryLight: '#a8c8e8',
  secondary: '#e74c3c',
  secondaryLight: '#ff6b5a',
  accent: '#e74c3c',
  bgDefault: '#121212',
  bgPaper: '#1e1e1e',
  bgInput: '#2d2d2d',
  textPrimary: '#e0e0e0',
  textSecondary: '#a0a0a0',
  textDisabled: '#666666',
  divider: '#333333',
  appBarGradient: 'linear-gradient(135deg, #0d2137 0%, #1a3a5c 100%)',
};

function getColors(sport: Sport, mode: ColorMode): SportColors {
  if (sport === 'nfl') return mode === 'light' ? NFL_LIGHT : NFL_DARK;
  if (sport === 'nba') return mode === 'light' ? NBA_LIGHT : NBA_DARK;
  return mode === 'light' ? DEFAULT_LIGHT : DEFAULT_DARK;
}

function applyColors(colors: SportColors) {
  const root = document.documentElement;
  root.style.setProperty('--sport-primary', colors.primary);
  root.style.setProperty('--sport-primary-light', colors.primaryLight);
  root.style.setProperty('--sport-secondary', colors.secondary);
  root.style.setProperty('--sport-secondary-light', colors.secondaryLight);
  root.style.setProperty('--sport-accent', colors.accent);
  root.style.setProperty('--sport-bg-default', colors.bgDefault);
  root.style.setProperty('--sport-bg-paper', colors.bgPaper);
  root.style.setProperty('--sport-bg-input', colors.bgInput);
  root.style.setProperty('--sport-text-primary', colors.textPrimary);
  root.style.setProperty('--sport-text-secondary', colors.textSecondary);
  root.style.setProperty('--sport-text-disabled', colors.textDisabled);
  root.style.setProperty('--sport-divider', colors.divider);
  root.style.setProperty('--sport-appbar-gradient', colors.appBarGradient);
}

export function SportThemeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mode, setMode] = useState<ColorMode>(() => {
    const saved = localStorage.getItem('colorMode');
    return (saved as ColorMode) || 'light';
  });

  const sport: Sport = useMemo(() => {
    if (location.pathname.startsWith('/nfl')) return 'nfl';
    if (location.pathname.startsWith('/nba')) return 'nba';
    return null;
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  useEffect(() => {
    const colors = getColors(sport, mode);
    applyColors(colors);
    document.documentElement.style.backgroundColor = colors.bgDefault;
  }, [sport, mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode, sport }}>
      {children}
    </ColorModeContext.Provider>
  );
}
