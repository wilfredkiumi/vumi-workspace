import { Amplify, Auth } from 'aws-amplify';

// Configure Amplify with Cognito settings
Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_COGNITO_REGION,
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID,
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
  }
});

export const authService = {
  // Sign in a user
  signIn: async (email: string, password: string) => {
    try {
      const user = await Auth.signIn(email, password);
      return user;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },

  // Sign up a new user
  signUp: async (email: string, password: string, attributes: Record<string, string>) => {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          ...attributes,
        },
      });
      return user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  // Confirm sign up with verification code
  confirmSignUp: async (email: string, code: string) => {
    try {
      return await Auth.confirmSignUp(email, code);
    } catch (error) {
      console.error("Error confirming sign up:", error);
      throw error;
    }
  },

  // Sign out the current user
  signOut: async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  },

  // Get the current authenticated user
  getCurrentUser: async () => {
    try {
      return await Auth.currentAuthenticatedUser();
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },

  // Get the current session
  getCurrentSession: async () => {
    try {
      return await Auth.currentSession();
    } catch (error) {
      console.error("Error getting current session:", error);
      return null;
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      return await Auth.forgotPassword(email);
    } catch (error) {
      console.error("Error initiating forgot password flow:", error);
      throw error;
    }
  },

  // Reset password with verification code
  resetPassword: async (email: string, code: string, newPassword: string) => {
    try {
      return await Auth.forgotPasswordSubmit(email, code, newPassword);
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },

  // Change password for authenticated user
  changePassword: async (oldPassword: string, newPassword: string) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return await Auth.changePassword(user, oldPassword, newPassword);
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};
