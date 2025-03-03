import { fetchAuthSession } from '@aws-amplify/auth';
import { AWS_CONFIG } from '../config/aws-config';
import { Creator, User } from '../models';

const API_URL = AWS_CONFIG.API_ENDPOINT;

/**
 * Base API request function with authentication
 */
async function apiRequest<T>(
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  body?: any
): Promise<T> {
  try {
    // Get the current authenticated user's session
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString() || '';
    
    // Prepare headers with authentication
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    
    // Prepare request options
    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    };
    
    // Make the request
    const response = await fetch(`${API_URL}${endpoint}`, options);
    
    // Check if the request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }
    
    // Parse and return the response data
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * User API functions
 */
export const userApi = {
  // Get user profile
  getProfile: async (userId: string): Promise<User> => {
    return apiRequest<User>(`users/${userId}`);
  },
  
  // Update user profile
  updateProfile: async (userId: string, userData: Partial<User>): Promise<User> => {
    return apiRequest<User>(`users/${userId}`, 'PUT', userData);
  },
  
  // List users with optional filters
  listUsers: async (filters?: Record<string, any>): Promise<User[]> => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return apiRequest<User[]>(`users${queryParams}`);
  }
};

/**
 * Creator API functions
 */
export const creatorApi = {
  // Get creator profile
  getProfile: async (creatorId: string): Promise<Creator> => {
    return apiRequest<Creator>(`creators/${creatorId}`);
  },
  
  // Create creator profile
  createProfile: async (creatorData: Omit<Creator, 'id'>): Promise<Creator> => {
    return apiRequest<Creator>('creators', 'POST', creatorData);
  },
  
  // Update creator profile
  updateProfile: async (creatorId: string, creatorData: Partial<Creator>): Promise<Creator> => {
    return apiRequest<Creator>(`creators/${creatorId}`, 'PUT', creatorData);
  },
  
  // List creators with optional filters
  listCreators: async (filters?: Record<string, any>): Promise<Creator[]> => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return apiRequest<Creator[]>(`creators${queryParams}`);
  },
  
  // Get creator by user ID
  getCreatorByUserId: async (userId: string): Promise<Creator> => {
    return apiRequest<Creator>(`creators/user/${userId}`);
  }
};

/**
 * Showcase Events API functions
 */
export const showcaseApi = {
  // Get showcase event
  getEvent: async (eventId: string): Promise<any> => {
    return apiRequest<any>(`showcases/${eventId}`);
  },
  
  // Create showcase event
  createEvent: async (eventData: any): Promise<any> => {
    return apiRequest<any>('showcases', 'POST', eventData);
  },
  
  // Update showcase event
  updateEvent: async (eventId: string, eventData: any): Promise<any> => {
    return apiRequest<any>(`showcases/${eventId}`, 'PUT', eventData);
  },
  
  // List showcase events
  listEvents: async (filters?: Record<string, any>): Promise<any[]> => {
    const queryParams = filters ? `?${new URLSearchParams(filters).toString()}` : '';
    return apiRequest<any[]>(`showcases${queryParams}`);
  }
};

/**
 * Event Tickets API functions
 */
export const ticketApi = {
  // Get ticket
  getTicket: async (ticketId: string): Promise<any> => {
    return apiRequest<any>(`tickets/${ticketId}`);
  },
  
  // Create ticket
  createTicket: async (ticketData: any): Promise<any> => {
    return apiRequest<any>('tickets', 'POST', ticketData);
  },
  
  // Update ticket
  updateTicket: async (ticketId: string, ticketData: any): Promise<any> => {
    return apiRequest<any>(`tickets/${ticketId}`, 'PUT', ticketData);
  },
  
  // List tickets for an event
  listTicketsForEvent: async (eventId: string): Promise<any[]> => {
    return apiRequest<any[]>(`tickets/event/${eventId}`);
  },
  
  // List tickets for a user
  listTicketsForUser: async (userId: string): Promise<any[]> => {
    return apiRequest<any[]>(`tickets/user/${userId}`);
  }
};