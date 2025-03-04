// @ts-nocheck
import { post } from '@aws-amplify/api';

// Define PostOperation interface
interface PostOperation {
  data?: any;
}

// Define PostOperation interface
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

import { Gig, Creator, Application, User } from '../models';
import { PostOperation } from "../../services/api-types.js";
import { PostOperation } from "../../services/api-types.js";
import { PostOperation } from "../../services/api-types.js";

// User API
export const getUser = async (id: string): Promise<User | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.getUser,
// @ts-ignore
        variables: { id }
      }
    });
    return (response as any).data?.getUser || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const createUser = async (input: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: mutations.createUser,
// @ts-ignore
        variables: { input }
      }
    });
    return (response as any).data?.createUser || null;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const updateUser = async (input: Partial<User> & { id: string }): Promise<User | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: mutations.updateUser,
// @ts-ignore
        variables: { input }
      }
    });
    return (response as any).data?.updateUser || null;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};

// Gig API
export const listGigs = async (filter?: any, limit?: number): Promise<Gig[]> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.listGigs,
// @ts-ignore
        variables: { filter, limit }
      }
    });
    return (response as any).data?.listGigs.items || [];
  } catch (error) {
    console.error('Error listing gigs:', error);
    return [];
  }
};

export const getGig = async (id: string): Promise<Gig | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.getGig,
// @ts-ignore
        variables: { id }
      }
    });
    return (response as any).data?.getGig || null;
  } catch (error) {
    console.error('Error fetching gig:', error);
    return null;
  }
};

export const createGig = async (input: Omit<Gig, 'id'>): Promise<Gig | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: mutations.createGig,
// @ts-ignore
        variables: { input }
      }
    });
    return (response as any).data?.createGig || null;
  } catch (error) {
    console.error('Error creating gig:', error);
    return null;
  }
};

export const updateGig = async (input: Partial<Gig> & { id: string }): Promise<Gig | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: mutations.updateGig,
// @ts-ignore
        variables: { input }
      }
    });
    return (response as any).data?.updateGig || null;
  } catch (error) {
    console.error('Error updating gig:', error);
    return null;
  }
};

export const deleteGig = async (id: string): Promise<boolean> => {
  try {
    await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: mutations.deleteGig,
// @ts-ignore
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
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.listCreators,
// @ts-ignore
        variables: { filter, limit }
      }
    });
    return (response as any).data?.listCreators.items || [];
  } catch (error) {
    console.error('Error listing creators:', error);
    return [];
  }
};

export const getCreator = async (id: string): Promise<Creator | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.getCreator,
// @ts-ignore
        variables: { id }
      }
    });
    return (response as any).data?.getCreator || null;
  } catch (error) {
    console.error('Error fetching creator:', error);
    return null;
  }
};

// Application API
export const createApplication = async (input: Omit<Application, 'id' | 'createdAt' | 'updatedAt'>): Promise<Application | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: mutations.createApplication,
// @ts-ignore
        variables: { input }
      }
    });
    return (response as any).data?.createApplication || null;
  } catch (error) {
    console.error('Error creating application:', error);
    return null;
  }
};

export const getApplication = async (id: string): Promise<Application | null> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.getApplication,
// @ts-ignore
        variables: { id }
      }
    });
    return (response as any).data?.getApplication || null;
  } catch (error) {
    console.error('Error fetching application:', error);
    return null;
  }
};

export const listApplicationsByGig = async (gigId: string): Promise<Application[]> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.listApplications,
// @ts-ignore
        variables: { filter: { gigId: { eq: gigId } } }
      }
    });
    return (response as any).data?.listApplications.items || [];
  } catch (error) {
    console.error('Error listing applications by gig:', error);
    return [];
  }
};

export const listApplicationsByUser = async (userId: string): Promise<Application[]> => {
  try {
    const response = await post({
      apiName: 'WorkspaceAPI',
      path: '/graphql',
      options: {
        body: queries.listApplications,
// @ts-ignore
        variables: { filter: { userId: { eq: userId } } }
      }
    });
    return (response as any).data?.listApplications.items || [];
  } catch (error) {
    console.error('Error listing applications by user:', error);
    return [];
  }
};