import type { ThemeType, ColorMode } from '../../types';

export interface CardProps {
  theme?: ThemeType;
  colorMode?: ColorMode;
  className?: string;
  children: React.ReactNode;
}

export function Card({ theme = 'default', colorMode = 'light', className = '', children }: CardProps) {
  // ...existing code...
}
