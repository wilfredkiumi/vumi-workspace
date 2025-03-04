import type { ReactNode, FC } from 'react';

declare module 'ui' {
  export interface Theme {
    theme?: string;
    colorMode?: string;
  }

  export interface ButtonProps extends Theme {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }

  export interface CardProps extends Theme {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }

  export interface ThemeResult {
    theme: string;
    colorMode: string;
  }

  // Using proper FC typing
  export const Button: FC<ButtonProps>;
  export const Card: FC<CardProps>;
  export const useTheme: () => ThemeResult;
}
