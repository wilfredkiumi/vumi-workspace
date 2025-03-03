import React, { useState } from 'react';
import { Button } from 'ui';
import { usePayment } from '../hooks/usePayment';
import { useAuth } from '../contexts/AuthContext';

interface PaymentButtonProps {
  type: 'subscription' | 'tip' | 'checkout';
  planId?: string;
  creatorId?: string;
  amount?: number;
  currency?: string;
  items?: Array<{
    name: string;
    description?: string;
    amount: number;
    quantity: number;
  }>;
  buttonText: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  metadata?: Record<string, string>;
  successUrl?: string;
  cancelUrl?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  onError?: (error: Error) => void;
}

export function PaymentButton({
  type,
  planId,
  creatorId,
  amount,
  currency = 'USD',
  items,
  buttonText,
  variant = 'primary',
  className = '',
  metadata,
  successUrl,
  cancelUrl,
  onSuccess,
  onCancel,
  onError
}: PaymentButtonProps) {
  const { isAuthenticated } = useAuth();
  const { loading, createSubscription, createTip, createCheckout, redirectToCheckout } = usePayment();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    if (!isAuthenticated) {
      // Redirect to login or show login modal
      alert('Please log in to continue with payment');
      return;
    }

    try {
      setIsProcessing(true);
      
      // Default URLs
      const defaultSuccessUrl = `${window.location.origin}/payment/success`;
      const defaultCancelUrl = `${window.location.origin}/payment/cancel`;
      
      let response;
      
      switch (type) {
        case 'subscription':
          if (!planId) {
            throw new Error('Plan ID is required for subscription payments');
          }
          
          response = await createSubscription({
            planId,
            successUrl: successUrl || defaultSuccessUrl,
            cancelUrl: cancelUrl || defaultCancelUrl,
            metadata
          });
          break;
          
        case 'tip':
          if (!creatorId || !amount) {
            throw new Error('Creator ID and amount are required for tip payments');
          }
          
          response = await createTip({
            creatorId,
            amount,
            currency,
            successUrl: successUrl || defaultSuccessUrl,
            cancelUrl: cancelUrl || defaultCancelUrl,
            metadata
          });
          break;
          
        case 'checkout':
          if (!items || items.length === 0) {
            throw new Error('Items are required for checkout payments');
          }
          
          response = await createCheckout({
            items,
            successUrl: successUrl || defaultSuccessUrl,
            cancelUrl: cancelUrl || defaultCancelUrl,
            metadata
          });
          break;
          
        default:
          throw new Error(`Unsupported payment type: ${type}`);
      }
      
      // Redirect to Stripe Checkout
      redirectToCheckout(response.url);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (onError) {
        onError(error instanceof Error ? error : new Error('Payment processing failed'));
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      disabled={loading || isProcessing}
      className={className}
    >
      {isProcessing ? 'Processing...' : buttonText}
    </Button>
  );
}