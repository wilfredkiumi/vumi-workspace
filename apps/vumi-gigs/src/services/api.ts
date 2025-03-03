import { post, get } from '@aws-amplify/api';
import { GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';
import { Gig, Creator, Application, User } from '../models';

// User API
export const getUser = async (id: string): Promise<User | null> => {
  try {
    const response = await post<GraphQLQuery<{ getUser: User }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.getUser,
        variables: { id }
      }
    });
    return response.data?.getUser || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const createUser = async (input: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | null> => {
  try {
    const response = await post<GraphQLQuery<{ createUser: User }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: mutations.createUser,
        variables: { input }
      }
    });
    return response.data?.createUser || null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const updateUser = async (input: Partial<User> & { id: string }): Promise<User | null> => {
  try {
    const response = await post<GraphQLQuery<{ updateUser: User }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: mutations.updateUser,
        variables: { input }
      }
    });
    return response.data?.updateUser || null;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

// Gig API
export const listGigs = async (filter?: any, limit?: number): Promise<Gig[]> => {
  try {
    const response = await post<GraphQLQuery<{ listGigs: { items: Gig[] } }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.listGigs,
        variables: { filter, limit }
      }
    });
    return response.data?.listGigs.items || [];
  } catch (error) {
    console.error('Error listing gigs:', error);
    return [];
  }
};

export const getGig = async (id: string): Promise<Gig | null> => {
  try {
    const response = await post<GraphQLQuery<{ getGig: Gig }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.getGig,
        variables: { id }
      }
    });
    return response.data?.getGig || null;
  } catch (error) {
    console.error('Error fetching gig:', error);
    return null;
  }
};

export const createGig = async (input: Omit<Gig, 'id'>): Promise<Gig | null> => {
  try {
    const response = await post<GraphQLQuery<{ createGig: Gig }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: mutations.createGig,
        variables: { input }
      }
    });
    return response.data?.createGig || null;
  } catch (error) {
    console.error('Error creating gig:', error);
    return null;
  }
};

export const updateGig = async (input: Partial<Gig> & { id: string }): Promise<Gig | null> => {
  try {
    const response = await post<GraphQLQuery<{ updateGig: Gig }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: mutations.updateGig,
        variables: { input }
      }
    });
    return response.data?.updateGig || null;
  } catch (error) {
    console.error('Error updating gig:', error);
    return null;
  }
};

export const deleteGig = async (id: string): Promise<boolean> => {
  try {
    await post<GraphQLQuery<{ deleteGig: { id: string } }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: mutations.deleteGig,
        variables: { input: { id } }
      }
    });
    return true;
  } catch (error) {
    console.error('Error deleting gig:', error);
    return false;
  }
};

// Creator API
export const listCreators = async (filter?: any, limit?: number): Promise<Creator[]> => {
  try {
    const response = await post<GraphQLQuery<{ listCreators: { items: Creator[] } }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.listCreators,
        variables: { filter, limit }
      }
    });
    return response.data?.listCreators.items || [];
  } catch (error) {
    console.error('Error listing creators:', error);
    return [];
  }
};

export const getCreator = async (id: string): Promise<Creator | null> => {
  try {
    const response = await post<GraphQLQuery<{ getCreator: Creator }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.getCreator,
        variables: { id }
      }
    });
    return response.data?.getCreator || null;
  } catch (error) {
    console.error('Error fetching creator:', error);
    return null;
  }
};

// Application API
export const createApplication = async (input: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application | null> => {
  try {
    const response = await post<GraphQLQuery<{ createApplication: Application }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: mutations.createApplication,
        variables: { input }
      }
    });
    return response.data?.createApplication || null;
  } catch (error) {
    console.error('Error creating application:', error);
    return null;
  }
};

export const getApplication = async (id: string): Promise<Application | null> => {
  try {
    const response = await post<GraphQLQuery<{ getApplication: Application }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.getApplication,
        variables: { id }
      }
    });
    return response.data?.getApplication || null;
  } catch (error) {
    console.error('Error fetching application:', error);
    return null;
  }
};

export const listApplicationsByGig = async (gigId: string): Promise<Application[]> => {
  try {
    const response = await post<GraphQLQuery<{ listApplications: { items: Application[] } }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.listApplications,
        variables: { filter: { gigId: { eq: gigId } } }
      }
    });
    return response.data?.listApplications.items || [];
  } catch (error) {
    console.error('Error listing applications by gig:', error);
    return [];
  }
};

export const listApplicationsByUser = async (userId: string): Promise<Application[]> => {
  try {
    const response = await post<GraphQLQuery<{ listApplications: { items: Application[] } }>>({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        query: queries.listApplications,
        variables: { filter: { userId: { eq: userId } } }
      }
    });
    return response.data?.listApplications.items || [];
  } catch (error) {
    console.error('Error listing applications by user:', error);
    return [];
  }
};