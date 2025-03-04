import { Amplify, Auth } from 'aws-amplify';

let isAmplifyConfigured = false;

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

    const hasValidCredentials = 
      !!config.region && 
      !!config.userPoolId && 
      /^[\w-]+_[A-Za-z0-9]+$/.test(config.userPoolId) &&
      !!config.userPoolWebClientId &&
      config.userPoolWebClientId.length > 10;
    
    if (!hasValidCredentials) {
      console.warn('Invalid or missing Auth configuration parameters. Using mock authentication.');
      isAmplifyConfigured = true;
      return;
    }
    
    console.log('Configuring Auth with credentials from environment variables');
    
    try {
      const authConfig: any = {
        region: config.region,
        userPoolId: config.userPoolId,
        userPoolWebClientId: config.userPoolWebClientId,
        authenticationFlowType: 'USER_SRP_AUTH'
      };
      
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

class AuthService {
  private static instance: AuthService;
  
  private constructor() {}
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }
  
  private checkConfig() {
    if (!isAmplifyConfigured) {
      console.warn('Auth is not configured. Please make sure configureAuth() is called with valid credentials.');
    }
    return isAmplifyConfigured;
  }

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
        return null;
      }
      console.error('Error getting current user:', error);
      return null;
    }
  }
  
  private formatUser(user: any) {
    if (!user) return null;
    
    return {
      id: user.username || user.attributes?.sub,
      username: user.username || '',
      email: user.attributes?.email || '',
      name: user.attributes?.name || '',
      avatar: user.attributes?.picture || null,
      attributes: user.attributes || {},
      createdAt: user.createdAt || new Date().toISOString(),
    };
  }
  
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

// Export singleton instance with bound methods
export const authService = {
  signUp: AuthService.getInstance().signUp.bind(AuthService.getInstance()),
  confirmSignUp: AuthService.getInstance().confirmSignUp.bind(AuthService.getInstance()),
  signIn: AuthService.getInstance().signIn.bind(AuthService.getInstance()),
  signOut: AuthService.getInstance().signOut.bind(AuthService.getInstance()),
  getCurrentUser: AuthService.getInstance().getCurrentUser.bind(AuthService.getInstance()),
  forgotPassword: AuthService.getInstance().forgotPassword.bind(AuthService.getInstance()),
  resetPassword: AuthService.getInstance().resetPassword.bind(AuthService.getInstance()),
  changePassword: AuthService.getInstance().changePassword.bind(AuthService.getInstance()),
  updateUserAttributes: AuthService.getInstance().updateUserAttributes.bind(AuthService.getInstance())
};
