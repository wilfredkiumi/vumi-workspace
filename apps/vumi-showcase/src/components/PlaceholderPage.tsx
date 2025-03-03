import { ReactNode } from 'react';
import { useTheme } from 'ui';

interface PlaceholderPageProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
}

export function PlaceholderPage({ 
  title = 'Coming Soon', 
  message = 'This page is under construction.', 
  icon
}: PlaceholderPageProps) {
  const { theme, colorMode } = useTheme();
  
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        {icon && <div className="text-6xl mb-4 flex justify-center">{icon}</div>}
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {message}
        </p>
      </div>
    </div>
  );
}
