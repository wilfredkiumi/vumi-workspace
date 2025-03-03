import { useTheme } from 'ui';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const { theme, colorMode } = useTheme();
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {description || "This page is under development. Check back soon for updates!"}
          </p>
        </div>
      </div>
    </div>
  );
}
