import { GraphQLQuery } from '@aws-amplify/api';
import { Creator, User, Gig, Application } from '../types/index.js';

export interface PostOperation {
  data?: any;
}

export interface GetUserResponse {
  data?: {
    getUser: User;
  };
}

export interface CreateUserResponse {
  data?: {
    createUser: User;
  };
}

export interface UpdateUserResponse {
  data?: {
    updateUser: User;
  };
}

export interface ListGigsResponse {
  data?: {
    listGigs: {
      items: Gig[];
    };
  };
}

export interface GetGigResponse {
  data?: {
    getGig: Gig;
  };
}

export interface CreateGigResponse {
  data?: {
    createGig: Gig;
  };
}

export interface UpdateGigResponse {
  data?: {
    updateGig: Gig;
  };
}

export interface DeleteGigResponse {
  data?: {
    deleteGig: {
      id: string;
    };
  };
}

export interface ListCreatorsResponse {
  data?: {
    listCreators: {
      items: Creator[];
    };
  };
}

export interface GetCreatorResponse {
  data?: {
    getCreator: Creator;
  };
}

export interface CreateApplicationResponse {
  data?: {
    createApplication: Application;
  };
}

export interface GetApplicationResponse {
  data?: {
    getApplication: Application;
  };
}

export interface ListApplicationsResponse {
  data?: {
    listApplications: {
      items: Application[];
    };
  };
}