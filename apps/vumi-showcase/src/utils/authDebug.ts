import { Auth, Amplify } from 'aws-amplify';

/**
 * Utility for logging the current Amplify Auth configuration 
 * to help debug authentication issues.
 */
export function debugAmplifyAuth() {
  try {
    // Get the current config
    console.log("--- Amplify Auth Debug Info ---");
    
    // Try to get the current config
    try {
      const currentConfig = Amplify.getConfig();
      console.log("Current Amplify config:", {
        Auth: {
          userPoolId: currentConfig.Auth?.userPoolId || 'Not set',
          region: currentConfig.Auth?.region || 'Not set',
          userPoolWebClientId: currentConfig.Auth?.userPoolWebClientId ? '***' : 'Not set',
          authenticationFlowType: currentConfig.Auth?.authenticationFlowType || 'Not specified'
        }
      });
    } catch (configError) {
      console.error("Error retrieving Amplify config:", configError);
    }
    
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
    
    // Check authentication status
    Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("✅ User is authenticated:", {
          username: user.username,
          hasAttributes: !!user.attributes,
          email: user.attributes?.email?.replace(/^(.{3}).*(@.*)$/, "$1***$2") || 'Not available',
        });
      })
      .catch(error => {
        console.log("❌ No authenticated user:", error);
      });
      
    // Try to get credentials without using the full currentCredentials() call
    // which might trigger the 400 Bad Request
    Auth.currentSession()
      .then(session => {
        console.log("✅ Session available:", {
          isValid: session.isValid() ? 'Yes' : 'No',
          hasIdToken: !!session.getIdToken(),
          hasAccessToken: !!session.getAccessToken(),
        });
        
        // Now we can safely try to get credentials
        Auth.currentCredentials()
          .then(credentials => {
            if (credentials.identityId) {
              console.log("✅ Credentials available:", {
                identityId: credentials.identityId.substring(0, 10) + '...',
              });
            } else {
              console.log("⚠️ Credentials available but no identity ID");
            }
          })
          .catch(error => {
            console.log("❌ Error getting AWS credentials:", error);
            console.log("This is likely due to an invalid or missing Identity Pool ID, which is fine if you're not using AWS services directly.");
          });
      })
      .catch(error => {
        console.log("❌ No active session:", error);
      });
      
  } catch (error) {
    console.error("Error in auth debugging:", error);
  }
}
