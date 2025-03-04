// @ts-nocheck
import { RouteObject } from 'react-router-dom';
// Define Route type locally
interface Route {
  path: string;
  element: React.ReactNode;
  layout?: React.ComponentType<{children: React.ReactNode}>;
}
import CreatorListingPage from '../CreatorListingPage';
import CreatorProfilePage from '../CreatorProfilePage';
import GigsListingPage from '../GigsListingPage';
import GigDetailPage from '../GigDetailPage';
import StudioProfilePage from '../StudioProfilePage';
import StudiosListingPage from '../StudiosListingPage';
import PostGigForm from '../PostGigForm';
import { BusinessPlansPage } from '../pages/BusinessPlansPage';
import { ProfilePage } from '../pages/ProfilePage';
import { PaymentResultPage } from '../pages/PaymentResultPage';
import HomePage from '../pages/HomePage';
import HowItWorksPage from '../pages/HowItWorksPage';
// // // // import { ProtectedRoute } from '../components/ProtectedRoute';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/creators',
    element: <CreatorListingPage />
  },
  {
    path: '/creator/:id',
    element: <CreatorProfilePage />
  },
  {
    path: '/gigs',
    element: <GigsListingPage />
  },
  {
    path: '/gig/:id',
    element: <GigDetailPage />,
    protected: true // Protect gig detail page for proposals
  },
  {
    path: '/post-gig',
    element: <PostGigForm />,
    protected: true // Protect post gig page
  },
  {
    path: '/studios',
    element: <StudiosListingPage />
  },
  {
    path: '/studio/:id',
    element: <StudioProfilePage />
  },
  {
    path: '/plans',
    element: <BusinessPlansPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    protected: true // Protect profile page
  },
  {
    path: '/how-it-works',
    element: <HowItWorksPage />
  },
  {
    path: '/payment/success',
    element: <PaymentResultPage status="success" />,
    protected: true // Protect payment pages
  },
  {
    path: '/payment/cancel',
    element: <PaymentResultPage status="cancel" />,
    protected: true
  }
];