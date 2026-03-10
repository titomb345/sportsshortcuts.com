import { createContext } from 'react';

type ColorMode = 'light' | 'dark';
type Sport = 'nfl' | 'nba' | null;

export interface ColorModeContextType {
  mode: ColorMode;
  toggleColorMode: () => void;
  sport: Sport;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  sport: null,
});
