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

export const routes: Route[] = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/creators',
    component: CreatorListingPage
  },
  {
    path: '/creator/:id',
    component: CreatorProfilePage
  },
  {
    path: '/gigs',
    component: GigsListingPage
  },
  {
    path: '/gig/:id',
    component: GigDetailPage,
    protected: true // Protect gig detail page for proposals
  },
  {
    path: '/post-gig',
    component: PostGigForm,
    protected: true // Protect post gig page
  },
  {
    path: '/studios',
    component: StudiosListingPage
  },
  {
    path: '/studio/:id',
    component: StudioProfilePage
  },
  {
    path: '/plans',
    component: BusinessPlansPage
  },
  {
    path: '/profile',
    component: ProfilePage,
    protected: true // Protect profile page
  },
  {
    path: '/how-it-works',
    component: HowItWorksPage
  },
  {
    path: '/payment/success',
    component: PaymentResultPage,
    props: { status: 'success' },
    protected: true // Protect payment pages
  },
  {
    path: '/payment/cancel',
    component: PaymentResultPage,
    props: { status: 'cancel' },
    protected: true
  }
];