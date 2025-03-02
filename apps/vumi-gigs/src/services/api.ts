import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import { Gig, Creator, Application, User } from '../models';

// User API
export const getUser = async (id: string): Promise<User | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ getUser: User }>>(
      graphqlOperation(queries.getUser, { id })
    );
    return response.data?.getUser || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const createUser = async (input: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ createUser: User }>>(
      graphqlOperation(mutations.createUser, { input })
    );
    return response.data?.createUser || null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const updateUser = async (input: Partial<User> & { id: string }): Promise<User | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ updateUser: User }>>(
      graphqlOperation(mutations.updateUser, { input })
    );
    return response.data?.updateUser || null;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

// Gig API
export const listGigs = async (filter?: any, limit?: number): Promise<Gig[]> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ listGigs: { items: Gig[] } }>>(
      graphqlOperation(queries.listGigs, { filter, limit })
    );
    return response.data?.listGigs.items || [];
  } catch (error) {
    console.error('Error listing gigs:', error);
    return [];
  }
};

export const getGig = async (id: string): Promise<Gig | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ getGig: Gig }>>(
      graphqlOperation(queries.getGig, { id })
    );
    return response.data?.getGig || null;
  } catch (error) {
    console.error('Error fetching gig:', error);
    return null;
  }
};

export const createGig = async (input: Omit<Gig, 'id'>): Promise<Gig | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ createGig: Gig }>>(
      graphqlOperation(mutations.createGig, { input })
    );
    return response.data?.createGig || null;
  } catch (error) {
    console.error('Error creating gig:', error);
    return null;
  }
};

export const updateGig = async (input: Partial<Gig> & { id: string }): Promise<Gig | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ updateGig: Gig }>>(
      graphqlOperation(mutations.updateGig, { input })
    );
    return response.data?.updateGig || null;
  } catch (error) {
    console.error('Error updating gig:', error);
    return null;
  }
};

export const deleteGig = async (id: string): Promise<boolean> => {
  try {
    await API.graphql<GraphQLQuery<{ deleteGig: { id: string } }>>(
      graphqlOperation(mutations.deleteGig, { input: { id } })
    );
    return true;
  } catch (error) {
    console.error('Error deleting gig:', error);
    return false;
  }
};

// Creator API
export const listCreators = async (filter?: any, limit?: number): Promise<Creator[]> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ listCreators: { items: Creator[] } }>>(
      graphqlOperation(queries.listCreators, { filter, limit })
    );
    return response.data?.listCreators.items || [];
  } catch (error) {
    console.error('Error listing creators:', error);
    return [];
  }
};

export const getCreator = async (id: string): Promise<Creator | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ getCreator: Creator }>>(
      graphqlOperation(queries.getCreator, { id })
    );
    return response.data?.getCreator || null;
  } catch (error) {
    console.error('Error fetching creator:', error);
    return null;
  }
};

// Application API
export const createApplication = async (input: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ createApplication: Application }>>(
      graphqlOperation(mutations.createApplication, { input })
    );
    return response.data?.createApplication || null;
  } catch (error) {
    console.error('Error creating application:', error);
    return null;
  }
};

export const getApplication = async (id: string): Promise<Application | null> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ getApplication: Application }>>(
      graphqlOperation(queries.getApplication, { id })
    );
    return response.data?.getApplication || null;
  } catch (error) {
    console.error('Error fetching application:', error);
    return null;
  }
};

export const listApplicationsByGig = async (gigId: string): Promise<Application[]> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ listApplications: { items: Application[] } }>>(
      graphqlOperation(queries.listApplications, { 
        filter: { gigId: { eq: gigId } } 
      })
    );
    return response.data?.listApplications.items || [];
  } catch (error) {
    console.error('Error listing applications by gig:', error);
    return [];
  }
};

export const listApplicationsByUser = async (userId: string): Promise<Application[]> => {
  try {
    const response = await API.graphql<GraphQLQuery<{ listApplications: { items: Application[] } }>>(
      graphqlOperation(queries.listApplications, { 
        filter: { userId: { eq: userId } } 
      })
    );
    return response.data?.listApplications.items || [];
  } catch (error) {
    console.error('Error listing applications by user:', error);
    return [];
  }
};

// Subscriptions
export const onCreateGig = (callback: (gig: Gig) => void) => {
  return API.graphql<GraphQLSubscription<{ onCreateGig: Gig }>>(
    graphqlOperation(subscriptions.onCreateGig)
  ).subscribe({
    next: ({ value }) => callback(value.data?.onCreateGig as Gig),
    error: (error) => console.error('Subscription error:', error)
  });
};

export const onUpdateGig = (callback: (gig: Gig) => void) => {
  return API.graphql<GraphQLSubscription<{ onUpdateGig: Gig }>>(
    graphqlOperation(subscriptions.onUpdateGig)
  ).subscribe({
    next: ({ value }) => callback(value.data?.onUpdateGig as Gig),
    error: (error) => console.error('Subscription error:', error)
  });
};

export const onCreateApplication = (gigId: string, callback: (application: Application) => void) => {
  return API.graphql<GraphQLSubscription<{ onCreateApplication: Application }>>(
    graphqlOperation(subscriptions.onCreateApplication, { gigId })
  ).subscribe({
    next: ({ value }) => callback(value.data?.onCreateApplication as Application),
    error: (error) => console.error('Subscription error:', error)
  });
};