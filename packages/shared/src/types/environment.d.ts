/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'ui' {
  import { ReactNode } from 'react';
  
  export interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: string;
    theme?: string;
    colorMode?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
  }

  export interface CardProps {
    children: ReactNode;
    className?: string;
    theme?: string;
    colorMode?: string;
    onClick?: () => void;
  }

  export function Button(props: ButtonProps): JSX.Element;
  export function Card(props: CardProps): JSX.Element;
}
