import { useState } from 'react';
import { paymentApi, SubscriptionRequest, TipRequest, CheckoutRequest, PaymentResponse } from '../services/paymentApi';

interface UsePaymentResult {
  loading: boolean;
  error: Error | null;
  createSubscription: (request: SubscriptionRequest) => Promise<PaymentResponse>;
  createTip: (request: TipRequest) => Promise<PaymentResponse>;
  createCheckout: (request: CheckoutRequest) => Promise<PaymentResponse>;
  redirectToCheckout: (url: string) => void;
}

/**
 * Hook for handling payment operations
 */
export function usePayment(): UsePaymentResult {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const createSubscription = async (subscriptionDetails: {
    planId: string;
    successUrl: string;
    cancelUrl: string;
  }) => {
    setLoading(true);
    
    try {
      // In a real app, this would make an API call to your payment processor
      console.log('Creating subscription:', subscriptionDetails);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful response
      setLoading(false);
      return {
        success: true,
        url: subscriptionDetails.successUrl + '?demo=true',
      };
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const createTip = async (request: TipRequest): Promise<PaymentResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      // Add default URLs if not provided
      const fullRequest = {
        ...request,
        successUrl: request.successUrl || `${window.location.origin}/payment/success`,
        cancelUrl: request.cancelUrl || `${window.location.origin}/payment/cancel`
      };
      
      const response = await paymentApi.createTip(fullRequest);
      return response;
    } catch (err) {
      console.error('Error creating tip:', err);
      setError(err instanceof Error ? err : new Error('Failed to create tip'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createCheckout = async (request: CheckoutRequest): Promise<PaymentResponse> => {
    try {
      setLoading(true);
      setError(null);
      
      // Add default URLs if not provided
      const fullRequest = {
        ...request,
        successUrl: request.successUrl || `${window.location.origin}/payment/success`,
        cancelUrl: request.cancelUrl || `${window.location.origin}/payment/cancel`
      };
      
      const response = await paymentApi.createCheckout(fullRequest);
      return response;
    } catch (err) {
      console.error('Error creating checkout:', err);
      setError(err instanceof Error ? err : new Error('Failed to create checkout'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const redirectToCheckout = (url: string) => {
    window.location.href = url;
  };

  return {
    loading,
    error,
    createSubscription,
    createTip,
    createCheckout,
    redirectToCheckout
  };
}