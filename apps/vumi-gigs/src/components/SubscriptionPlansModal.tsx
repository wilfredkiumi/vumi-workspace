// @ts-nocheck
import { useState, useEffect  } from 'react';
import { useTheme, Button, Card } from 'ui';
import { X, Check } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import { subscriptionPlansApi, SubscriptionPlan } from '../services/paymentApi';

interface SubscriptionPlansModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  currentPlanId?: string;
}

export function SubscriptionPlansModal({ onClose, onSuccess, currentPlanId }: SubscriptionPlansModalProps) {
  const { theme } = useTheme();
  const { loading: paymentLoading, createSubscription, redirectToCheckout } = usePayment();
  
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>('month');
  
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const plansData = await subscriptionPlansApi.getPlans();
        setPlans(plansData);
        
        // Set the first plan as selected by default if no current plan
        if (!currentPlanId && plansData.length > 0) {
          setSelectedPlanId(plansData[0].id);
        }
      } catch (error) {
        console.error('Error fetching subscription plans:', error);
        setError('Failed to load subscription plans. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, [currentPlanId]);
  
  const handleSelectPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setError(null);
  };
  
  const handleSubscribe = async () => {
    if (!selectedPlanId) {
      setError('Please select a plan to continue');
      return;
    }
    
    try {
      const response = await createSubscription({
        planId: selectedPlanId,
        successUrl: `${window.location.origin}/payment/success?type=subscription&planId=${selectedPlanId}`,
        cancelUrl: `${window.location.origin}/payment/cancel?type=subscription&planId=${selectedPlanId}`,
        metadata: {
          billingInterval
        }
      });
      
      // Redirect to Stripe Checkout
      redirectToCheckout(response.url);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      setError('Failed to process subscription. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card theme={theme} colorMode={colorMode} className="max-w-4xl w-full p-6">
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card theme={theme} colorMode={colorMode} className="max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Choose a Subscription Plan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="mb-8 flex justify-center">
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium ${
                billingInterval === 'month'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setBillingInterval('month')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium ${
                billingInterval === 'year'
                  ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={() => setBillingInterval('year')}
            >
              Yearly <span className="text-green-500 font-semibold">(Save 20%)</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans
            .filter(plan => plan.interval === billingInterval)
            .map((plan) => {
              const isCurrentPlan = plan.id === currentPlanId;
              const isSelected = plan.id === selectedPlanId;
              
              return (
                <div
                  key={plan.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500 dark:ring-blue-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                  onClick={() => handleSelectPlan(plan.id)}
                >
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      /{billingInterval}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    theme={theme}
                    variant={isSelected ? "primary" : "secondary"}
                    colorMode={colorMode}
                    className="w-full"
                    disabled={isCurrentPlan}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {isCurrentPlan ? 'Current Plan' : isSelected ? 'Selected' : 'Select'}
                  </Button>
                </div>
              );
            })}
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            theme={theme}
            variant="secondary"
            colorMode={colorMode}
            onClick={onClose}
            disabled={paymentLoading}
          >
            Cancel
          </Button>
          <Button
            theme={theme}
            variant="primary"
            colorMode={colorMode}
            onClick={handleSubscribe}
            disabled={!selectedPlanId || paymentLoading}
          >
            {paymentLoading ? 'Processing...' : 'Subscribe Now'}
          </Button>
        </div>
      </Card>
    </div>
  );
}