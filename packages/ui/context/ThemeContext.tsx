import { createContext, useState  } from 'react';
import type { ThemeType, ColorMode } from '../types';

interface ThemeContextType {
  theme: ThemeType;
  colorMode: ColorMode;
  setTheme: (theme: ThemeType) => void;
  setColorMode: (mode: ColorMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('default');
  const [colorMode, setColorMode] = useState<ColorMode>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
