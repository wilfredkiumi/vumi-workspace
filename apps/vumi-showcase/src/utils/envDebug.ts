// Utility function to log environment variables
export function logEnvVariables() {
  console.log('Environment Variables:');
  
  // List all environment variables that start with VITE_
  Object.keys(import.meta.env).forEach(key => {
    if (key.startsWith('VITE_')) {
      // For security, don't log the actual values in production
      if (import.meta.env.PROD) {
        console.log(`- ${key}: [REDACTED IN PRODUCTION]`);
      } else {
        // Only show first few characters of potentially sensitive values
        const value = import.meta.env[key];
        const displayValue = typeof value === 'string' && value.length > 8
          ? `${value.substring(0, 4)}...` 
          : value;
        
        console.log(`- ${key}: ${displayValue}`);
      }
    }
  });
}
