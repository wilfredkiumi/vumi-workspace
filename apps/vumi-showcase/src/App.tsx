import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'ui';
import { AuthProvider, configureAuth, WorkspaceProfileProvider } from '@vumi/shared';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import ShowcaseListingPage from './ShowcaseListingPage';
import Layout from './components/Layout';
import EventDetailPage from './EventDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import { logEnvVariables } from './utils/envDebug';
import { AppProvider } from './context/AppContext';
import { debugAmplifyAuth } from './utils/authDebug';

// Debug environment variables in development
if (import.meta.env.DEV) {
  logEnvVariables();
  
  // Log authentication configuration
  console.log('Auth Configuration:', {
    region: import.meta.env.VITE_COGNITO_REGION || 'Not set',
    userPoolId: import.meta.env.VITE_USER_POOL_ID ? '***' : 'Not set',
    userPoolWebClientId: import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID ? '***' : 'Not set',
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID ? '***' : 'Not set'
  });
}

// Configure Auth with environment variables
const authConfig = {
  region: import.meta.env.VITE_COGNITO_REGION,
  userPoolId: import.meta.env.VITE_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_USER_POOL_WEB_CLIENT_ID,
  // Only include identity pool ID if it's provided and looks valid
  ...(import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID && 
     import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID.includes(':') && {
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID
  })
};

// Validate config before calling configureAuth
if (!authConfig.region || !authConfig.userPoolId || !authConfig.userPoolWebClientId) {
  console.error('Missing required auth configuration. Please check your .env file');
} else {
  configureAuth(authConfig);
}

// Create router with routes - addressing React Router warnings by adding future flags
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<ShowcaseListingPage />} />
      <Route path="/events" element={<ShowcaseListingPage />} />
      <Route path="/events/:eventId" element={<EventDetailPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

function App() {
  // Additional logging for debugging
  useEffect(() => {
    console.log('App mounted - Auth should be configured by now');
    
    // Debug authentication if needed - allow more time to initialize
    if (import.meta.env.DEV) {
      setTimeout(() => {
        debugAmplifyAuth();
      }, 3000);
    }
  }, []);
  
  return (
    <ThemeProvider defaultTheme="showcase" defaultColorMode="light">
      <AuthProvider>
        <WorkspaceProfileProvider appId="showcase">
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        </WorkspaceProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;