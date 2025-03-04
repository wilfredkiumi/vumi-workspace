import { Auth } from 'aws-amplify';

/**
 * Utility for logging the current Amplify Auth configuration 
 * to help debug authentication issues.
 */
export function debugAmplifyAuth() {
  try {
    // Get the current config
    console.log("--- Amplify Auth Debug Info ---");
    
    // Log environment variables (but censor sensitive values)
    console.log("Environment variables:");
    Object.entries(import.meta.env).forEach(([key, value]) => {
      if (key.includes('COGNITO') || key.includes('USER_POOL') || key.includes('AUTH')) {
        const displayValue = typeof value === 'string' && value.length > 4 
          ? `${value.substring(0, 4)}...` 
          : '[REDACTED]';
        console.log(`${key}: ${displayValue}`);
      }
    });
    
    // Attempt to get current credentials
    console.log("Checking auth state...");
    
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("✅ User is authenticated", {
          username: user.username,
          hasAttributes: !!user.attributes });
      })
      .catch(error => {
        console.log("❌ No authenticated user", error);
      });
      
    // Check configuration
    Auth.currentCredentials()
      .then(credentials => {
        console.log("✅ Credentials available:", {
          identityId: credentials.identityId ? 'Available' : 'Not available' });
      })
      .catch(error => {
        console.log("❌ No credentials available:", error);
      });
      
  } catch (error) {
    console.error("Error in auth debugging:", error);
  }
}
