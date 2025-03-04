import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import type { ThemeType, ColorMode } from '../types';

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return {
    theme: context.theme as ThemeType,
    colorMode: context.colorMode as ColorMode,
    setTheme: context.setTheme,
    setColorMode: context.setColorMode
  };
}
