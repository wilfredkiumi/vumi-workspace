import { useState } from 'react';
import { ThemeProvider, Header, Footer } from 'ui';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthModal } from './components/auth/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import CreatorListingPage from './CreatorListingPage';
import CreatorProfilePage from './CreatorProfilePage';
import Layout from './components/Layout';
import { MeetingProvider } from '@vumi/shared';import { VideoMeetingPage } from '@vumi/shared';

// Import all actual pages (not placeholders)
import GigsListingPage from './GigsListingPage';ge';
import GigDetailPage from './GigDetailPage';
import StudiosListingPage from './pages/StudiosListingPage';';
import StudioProfilePage from './pages/StudioProfilePage';
import BusinessPlansPage from './pages/BusinessPlansPage';Page';
import HowItWorksPage from './pages/HowItWorksPage';tWorksPage';
import PostGigForm from './PostGigForm';
import LoginPage from './pages/LoginPage';import LoginPage from './pages/LoginPage';

function AppContent() {
  const { state, dispatch } = useApp();
  const [showAuthModal, setShowAuthModal] = useState(false);  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLogin = () => { {
    setShowAuthModal(true);setShowAuthModal(true);
  };  };

  const handleAuthSuccess = () => {() => {
    setShowAuthModal(false);
    dispatch({ type: 'LOGIN', payload: { userName: 'Jane Smith' } });dispatch({ type: 'LOGIN', payload: { userName: 'Jane Smith' } });
  };  };

  const handleColorModeChange = (mode: 'light' | 'dark') => { (mode: 'light' | 'dark') => {
    // Handle color mode change
    console.log('Color mode changed to:', mode);console.log('Color mode changed to:', mode);
  };  };

  const handleNavigation = (path: string) => {
    // Reset selections when navigating to main sections when navigating to main sections
    if (path === '/') {
      dispatch({ type: 'SELECT_CREATOR', payload: null }); });
      dispatch({ type: 'SELECT_GIG', payload: null });
      dispatch({ type: 'SELECT_STUDIO', payload: null }); dispatch({ type: 'SELECT_STUDIO', payload: null });
    }    }

    // Extract the main path without params
    const mainPath = path.split('/')[1] || 'home';
    dispatch({ type: 'SET_VIEW', payload: mainPath });dispatch({ type: 'SET_VIEW', payload: mainPath });
  };  };

  // Find the current route based on the view
  const currentRoute = routes.find(route => {
    const routePath = route.path.split('/')[1] || 'home';[1] || 'home';
    return routePath === state.currentView;eturn routePath === state.currentView;
  });  });

  // Get the component to render
  const CurrentComponent = currentRoute?.component || routes[0].component;  const CurrentComponent = currentRoute?.component || routes[0].component;

  // Prepare props based on the current viewrent view
  const getComponentProps = () => {> {
    switch (state.currentView) {entView) {
      case 'creators':tors':
        return {
          onCreatorSelect: (id: string) => {
            dispatch({ type: 'SELECT_CREATOR', payload: id });
            dispatch({ type: 'SET_VIEW', payload: 'creator' }); dispatch({ type: 'SET_VIEW', payload: 'creator' });
          }}
        };
      case 'creator':tor':
        return {
          selectedCreatorId: state.selectedCreatorId,Id: state.selectedCreatorId,
          onBack: () => {
            dispatch({ type: 'SELECT_CREATOR', payload: null });
            dispatch({ type: 'SET_VIEW', payload: 'creators' }); dispatch({ type: 'SET_VIEW', payload: 'creators' });
          }}
        };
      case 'gigs':':
        return {
          onGigSelect: (id: string) => {
            dispatch({ type: 'SELECT_GIG', payload: id });
            dispatch({ type: 'SET_VIEW', payload: 'gig' }); dispatch({ type: 'SET_VIEW', payload: 'gig' });
          }}
        };
      case 'gig'::
        return {
          gigId: state.selectedGigId || '',lectedGigId || '',
          onBack: () => {
            dispatch({ type: 'SELECT_GIG', payload: null });
            dispatch({ type: 'SET_VIEW', payload: 'gigs' }); dispatch({ type: 'SET_VIEW', payload: 'gigs' });
          }}
        };
      case 'studios':ios':
        return {
          onStudioSelect: (id: string) => {
            dispatch({ type: 'SELECT_STUDIO', payload: id });
            dispatch({ type: 'SET_VIEW', payload: 'studio' }); dispatch({ type: 'SET_VIEW', payload: 'studio' });
          }}
        };
      case 'studio':io':
        return {
          studioId: state.selectedStudioId || '',.selectedStudioId || '',
          onBack: () => {
            dispatch({ type: 'SELECT_STUDIO', payload: null });
            dispatch({ type: 'SET_VIEW', payload: 'studios' }); dispatch({ type: 'SET_VIEW', payload: 'studios' });
          }}
        };
      case 'post-gig':-gig':
        return {
          onCancel: () => dispatch({ type: 'SET_VIEW', payload: 'home' })onCancel: () => dispatch({ type: 'SET_VIEW', payload: 'home' })
        };
      default:
        return currentRoute?.props || {};   return currentRoute?.props || {};
    }}
  };  };

  const renderComponent = () => {
    if (currentRoute?.protected) {tRoute?.protected) {
      return (
        <ProtectedRoute>
          <CurrentComponent {...getComponentProps()} />nt {...getComponentProps()} />
        </ProtectedRoute></ProtectedRoute>
      ); );
    }
    return <CurrentComponent {...getComponentProps()} />;return <CurrentComponent {...getComponentProps()} />;
  };  };

  return (
    <div className="flex flex-col min-h-screen">Name="flex flex-col min-h-screen">
      <Header 
        onColorModeChange={handleColorModeChange}ndleColorModeChange}
        onLogin={handleLogin}
        isLoggedIn={state.isLoggedIn}dIn}
        userName={state.userName}serName}
        currentApp="gigs"
        onNavigation={handleNavigation}onNavigation={handleNavigation}
      />/>
      
      <main className="flex-1">-1">
        {renderComponent()}erComponent()}
      </main></main>
      
      <Footer />      <Footer />

      {showAuthModal && (al && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}al(false)}
          onSuccess={handleAuthSuccess}onSuccess={handleAuthSuccess}
        />/>
      )}
    </div></div>
  ); );
}}

// Create a wrapper component for StudioProfilePage to properly use the navigate hook StudioProfilePage to properly use the navigate hook
function StudioProfileWrapper() {
  const navigate = useNavigate();const navigate = useNavigate();
  
  return (
    <StudioProfilePage Page 
      studioId="" 
      onBack={() => navigate("/studios")}onBack={() => navigate("/studios")}
    />/>
  ); );
}}

// Create router with future flags
const router = createBrowserRouter(rRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<CreatorListingPage />} />
      <Route path="/creators" element={<CreatorListingPage />} />path="/creators" element={<CreatorListingPage />} />
      <Route 
        path="/creators/:creatorId" 
        element={<CreatorProfilePage />}element={<CreatorProfilePage />}
      />
      <Route path="/gigs" element={<GigsListingPage />} />path="/gigs" element={<GigsListingPage />} />
      <Route 
        path="/gigs/:gigId" 
        element={<GigDetailPage />} // Remove the hardcoded gigId propelement={<GigDetailPage />} // Remove the hardcoded gigId prop
      />
      <Route path="/login" element={<LoginPage />} /> path="/login" element={<LoginPage />} />
      <Route
        path="/post-gig"st-gig"
        element={
          <ProtectedRoute>
            <PostGigForm />
          </ProtectedRoute> </ProtectedRoute>
        }}
      />
      <Route path="/studios" element={<StudiosListingPage />} />
      <Route path="/studios/:studioId" element={<StudioProfileWrapper />} />eWrapper />} />
      <Route path="/plans" element={<BusinessPlansPage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} /> path="/how-it-works" element={<HowItWorksPage />} />
    </Route>  <Route 
  ),     path="/meeting/:meetingId" 
  {nt={
    future: {
      v7_startTransition: true       <VideoMeetingPage />
    }       </ProtectedRoute>
  }      }
);      />

function App() {
  return (
    <ThemeProvider defaultTheme="gigs" defaultColorMode="light">
      <AuthProvider>ion: true
        <AppProvider>
          <MeetingProvider>
            <RouterProvider router={router} />
          </MeetingProvider>
        </AppProvider>tion App() {
      </AuthProvider> return (
    </ThemeProvider>    <ThemeProvider defaultTheme="gigs" defaultColorMode="light">
  );>



export default App;}        <AppProvider>
          <RouterProvider router={router} />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;