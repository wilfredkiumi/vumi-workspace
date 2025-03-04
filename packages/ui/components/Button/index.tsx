import type { ThemeType, ColorMode } from '../../types';

export interface ButtonProps {
  theme?: ThemeType;
  colorMode?: ColorMode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({ 
  theme = 'default', 
  colorMode = 'light',
  variant = 'primary',
  className = '',
  children,
  onClick,
  type = 'button'
}: ButtonProps) {
  // ...existing code...
}
