import { Route } from '../types';
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
    component: GigDetailPage
  },
  {
    path: '/post-gig',
    component: PostGigForm
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
    component: ProfilePage
  },
  {
    path: '/payment/success',
    component: PaymentResultPage,
    props: { status: 'success' }
  },
  {
    path: '/payment/cancel',
    component: PaymentResultPage,
    props: { status: 'cancel' }
  }
];