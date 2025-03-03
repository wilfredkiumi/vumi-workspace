/**
 * Utility to help debug environment variable issues
 */
export function logEnvVariables() {
  console.log('Environment Variables Status:');
  console.log('VITE_COGNITO_REGION:', import.meta.env.VITE_COGNITO_REGION || '❌ Missing');
  console.log('VITE_USER_POOL_ID:', import.meta.env.VITE_USER_POOL_ID ? '✅ Present' : '❌ Missing');
  console.log('VITE_USER_POOL_WEB_CLIENT_ID:', import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID ? '✅ Present' : '❌ Missing');
  console.log('VITE_COGNITO_IDENTITY_POOL_ID:', import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID ? '✅ Present' : '❌ Missing');
  
  // Check if Vite is properly loading .env.local
  console.log('Build mode:', import.meta.env.MODE);
  console.log('Development:', import.meta.env.DEV);
}
