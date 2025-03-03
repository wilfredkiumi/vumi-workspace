import { fetchAuthSession } from '@aws-amplify/auth';

// Payment API endpoints
const PAYMENT_API_BASE_URL = 'https://ehuypydqz5.execute-api.us-east-1.amazonaws.com/prod';
const SUBSCRIPTION_ENDPOINT = `${PAYMENT_API_BASE_URL}/payments/stripe/subscribe`;
const TIP_ENDPOINT = `${PAYMENT_API_BASE_URL}/payments/stripe/tip`;
const WEBHOOK_ENDPOINT = `${PAYMENT_API_BASE_URL}/payments/stripe/webhooks`;
const CHECKOUT_ENDPOINT = `${PAYMENT_API_BASE_URL}/payments/stripe/checkout`;

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
    const response = await fetch(endpoint, options);
    
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

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export interface SubscriptionRequest {
  planId: string;
  customerId?: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface TipRequest {
  creatorId: string;
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutRequest {
  items: {
    name: string;
    description?: string;
    amount: number;
    quantity: number;
  }[];
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface PaymentResponse {
  sessionId: string;
  url: string;
}

/**
 * Payment API functions
 */
export const paymentApi = {
  /**
   * Create a subscription checkout session
   * @param request Subscription request data
   * @returns Payment session data
   */
  createSubscription: async (request: SubscriptionRequest): Promise<PaymentResponse> => {
    return apiRequest<PaymentResponse>(SUBSCRIPTION_ENDPOINT, 'POST', request);
  },
  
  /**
   * Create a tip checkout session
   * @param request Tip request data
   * @returns Payment session data
   */
  createTip: async (request: TipRequest): Promise<PaymentResponse> => {
    return apiRequest<PaymentResponse>(TIP_ENDPOINT, 'POST', request);
  },
  
  /**
   * Create a general checkout session
   * @param request Checkout request data
   * @returns Payment session data
   */
  createCheckout: async (request: CheckoutRequest): Promise<PaymentResponse> => {
    return apiRequest<PaymentResponse>(CHECKOUT_ENDPOINT, 'POST', request);
  },
  
  /**
   * Verify a webhook signature
   * @param signature Stripe signature
   * @param payload Webhook payload
   * @returns Verification result
   */
  verifyWebhook: async (signature: string, payload: any): Promise<{ valid: boolean }> => {
    return apiRequest<{ valid: boolean }>(WEBHOOK_ENDPOINT, 'POST', {
      signature,
      payload
    });
  }
};

/**
 * Subscription plans API
 */
export const subscriptionPlansApi = {
  /**
   * Get all available subscription plans
   * @returns List of subscription plans
   */
  getPlans: async (): Promise<SubscriptionPlan[]> => {
    return apiRequest<SubscriptionPlan[]>(`${PAYMENT_API_BASE_URL}/plans`, 'GET');
  },
  
  /**
   * Get a specific subscription plan
   * @param planId Plan ID
   * @returns Subscription plan details
   */
  getPlan: async (planId: string): Promise<SubscriptionPlan> => {
    return apiRequest<SubscriptionPlan>(`${PAYMENT_API_BASE_URL}/plans/${planId}`, 'GET');
  }
};

/**
 * Customer subscription API
 */
export const customerSubscriptionApi = {
  /**
   * Get customer subscription details
   * @param customerId Customer ID
   * @returns Subscription details
   */
  getSubscription: async (customerId: string): Promise<any> => {
    return apiRequest<any>(`${PAYMENT_API_BASE_URL}/customers/${customerId}/subscription`, 'GET');
  },
  
  /**
   * Cancel customer subscription
   * @param customerId Customer ID
   * @returns Cancellation result
   */
  cancelSubscription: async (customerId: string): Promise<{ success: boolean }> => {
    return apiRequest<{ success: boolean }>(
      `${PAYMENT_API_BASE_URL}/customers/${customerId}/subscription`, 
      'DELETE'
    );
  }
};