// filepath: /Users/wilfred/vumi-workspace/apps/vumi-gigs/src/mock-router.ts
/**
 * Mock implementation of react-router-dom for development
 * This file provides the types and basic functionality to prevent build errors
 */

// useParams hook
// @ts-nocheck
export function useParams<T extends Record<string, string>>(): T {
  return {} as T;
}

// useNavigate hook
export function useNavigate() {
  return (path: string) => {
    console.log('Navigate to:', path);
  };
}

// useLocation hook
export interface Location {
  pathname: string;
  search: string;
  hash: string;
  state: any;
  key: string;
}

export function useLocation(): Location {
  return {
    pathname: '/',
    search: '',
    hash: '',
    state: null,
    key: 'default' };
}

// Link component
export interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Link(props: LinkProps) {
  return props.children;
}

// Outlet component
export function Outlet() {
  return null;
}

// Navigate component
export interface NavigateProps {
  to: string;
  replace?: boolean;
  state?: any;
}

export function Navigate(props: NavigateProps) {
  return null;
}
