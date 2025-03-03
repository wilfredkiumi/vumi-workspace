import { Amplify, Auth } from 'aws-amplify';

// Keep track of whether Amplify has been configured
let isAmplifyConfigured = false;

// Configure Amplify with Cognito settings
export function configureAuth(config: {
  region?: string;
  userPoolId?: string;
  userPoolWebClientId?: string;
  identityPoolId?: string;
}) {
  try {
    if (isAmplifyConfigured) {
      console.log('Auth already configured, skipping');
      return;
    }
    
    console.log('Auth configuration received:', {
      region: config.region || 'undefined',
      userPoolId: config.userPoolId ? '***' : 'undefined',
      userPoolWebClientId: config.userPoolWebClientId ? '***' : 'undefined',
      identityPoolId: config.identityPoolId ? '***' : 'undefined'
    });

    // Check if we have real credentials and they look valid
    const hasValidCredentials = 
      !!config.region && 
      !!config.userPoolId && 
      /^[\w-]+_[A-Za-z0-9]+$/.test(config.userPoolId) &&
      !!config.userPoolWebClientId &&
      config.userPoolWebClientId.length > 10;
    
    if (!hasValidCredentials) {
      console.warn('Invalid or missing Auth configuration parameters. Using mock authentication.');
      // Mark as configured so we don't try again
      isAmplifyConfigured = true;
      return;
    }
    
    // Proceed with Amplify configuration
    console.log('Configuring Auth with credentials from environment variables');
    
    try {
      const authConfig: any = {
        region: config.region,
        userPoolId: config.userPoolId,
        userPoolWebClientId: config.userPoolWebClientId,
        // Change to USER_SRP_AUTH flow which is the default and widely enabled
        authenticationFlowType: 'USER_SRP_AUTH'
      };
      
      // Only add identity pool if it's provided and looks valid
      if (config.identityPoolId && config.identityPoolId.includes(':')) {
        authConfig.identityPoolId = config.identityPoolId;
        console.log('Including Identity Pool ID in Auth configuration');
      } else if (config.identityPoolId) {
        console.warn('Invalid Identity Pool ID format, skipping:', config.identityPoolId);
      } else {
        console.log('No Identity Pool ID provided, authentication will work but some AWS services might be limited');
      }
      
      Amplify.configure({
        Auth: authConfig
      });
      
      console.log('Auth configuration complete');
      isAmplifyConfigured = true;
    } catch (configError) {
      console.error('Error in Amplify.configure:', configError);
      isAmplifyConfigured = false;
    }
  } catch (error) {
    console.error('Error configuring Auth:', error);
    isAmplifyConfigured = false;
  }
}

// Determine if we're in development mode
const isDevelopment = () => {
  return process.env.NODE_ENV === 'development' || 
    (typeof import.meta !== 'undefined' && import.meta.env?.DEV === true);
};

// Create a mock user for development
const createMockUser = (email?: string) => {
  return {
    username: 'test-user',
    attributes: {
      email: email || 'test@example.com',
      name: 'Demo User',
      sub: '123456789',
      picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  };
};

// Create a mock session for development
const createMockSession = () => {
  return {
    getIdToken: () => ({
      getJwtToken: () => 'mock-jwt-token-' + Date.now()
    })
  };
};

// AuthService class
class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  // Singleton pattern
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  // Check if Auth is configured
  private checkConfig() {
    if (!isAmplifyConfigured) {
      console.warn('Auth is not configured. Please make sure configureAuth() is called with valid credentials.');
    }
    return isAmplifyConfigured;
  }

  // Sign up
  public async signUp(username: string, password: string, attributes?: Record<string, any>) {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      const result = await Auth.signUp({
        username,
        password,
        attributes: attributes || {}
      });
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  }
  
  // Confirm sign up
  public async confirmSignUp(username: string, code: string) {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      return await Auth.confirmSignUp(username, code);
    } catch (error) {
      console.error('Error confirming sign up:', error);
      throw error;
    }
  }
  
  // Sign in
  public async signIn(username: string, password: string) {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      const user = await Auth.signIn(username, password);
      return this.formatUser(user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }
  
  // Sign out
  public async signOut() {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      await Auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
  
  // Get current user
  public async getCurrentUser() {
    if (!this.checkConfig()) {
      console.warn('Auth not properly configured, cannot get current user');
      return null;
    }
    
    try {
      const user = await Auth.currentAuthenticatedUser();
      return this.formatUser(user);
    } catch (error) {
      if (error === 'No current user' || error === 'The user is not authenticated') {
        // Not an error, just no authenticated user
        return null;
      }
      console.error('Error getting current user:', error);
      return null;
    }
  }
  
  // Format user data
  private formatUser(user: any) {
    if (!user) return null;
    
    // Format the user object to match our expected format
    return {
      id: user.username || user.attributes?.sub,
      username: user.username || '',
      email: user.attributes?.email || '',
      name: user.attributes?.name || '',
      avatar: user.attributes?.picture || null,
      attributes: user.attributes || {},
      createdAt: user.createdAt || new Date().toISOString(),
      // Add any other properties we want to expose
    };
  }
  
  // Forgot password
  public async forgotPassword(username: string) {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      return await Auth.forgotPassword(username);
    } catch (error) {
      console.error('Error in forgot password flow:', error);
      throw error;
    }
  }
  
  // Reset password
  public async resetPassword(username: string, code: string, newPassword: string) {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      return await Auth.forgotPasswordSubmit(username, code, newPassword);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
  
  // Change password
  public async changePassword(oldPassword: string, newPassword: string) {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      const user = await Auth.currentAuthenticatedUser();
      return await Auth.changePassword(user, oldPassword, newPassword);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
  
  // Update user attributes
  public async updateUserAttributes(attributes: Record<string, any>) {
    if (!this.checkConfig()) {
      throw new Error('Auth not configured');
    }
    
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, attributes);
      return result;
    } catch (error) {
      console.error('Error updating user attributes:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();
