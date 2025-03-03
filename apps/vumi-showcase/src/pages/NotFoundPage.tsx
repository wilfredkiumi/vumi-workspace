import { useNavigate } from 'react-router-dom';
import { Button, useTheme } from 'ui';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { theme, colorMode } = useTheme();

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button
          theme={theme}
          variant="primary" 
          colorMode={colorMode}
          onClick={() => navigate('/')}
          className="px-6 py-3"
        >
          Return to Homepage
        </Button>
      </div>
    </div>
  );
}
