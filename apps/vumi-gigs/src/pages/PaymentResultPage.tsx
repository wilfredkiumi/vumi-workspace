import { useEffect, useState  } from 'react';
import { useTheme, Button, Card } from 'ui';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';

interface PaymentResultPageProps {
  status: 'success' | 'cancel';
  type?: string;
  onBack: () => void;
}

export function PaymentResultPage({ status, type, onBack }: PaymentResultPageProps) {
  const { theme } = useTheme();
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Parse URL parameters to get payment details
    const urlParams = new URLSearchParams(window.location.search);
    const details: Record<string, string> = {};
    
    for (const [key, value] of urlParams.entries()) {
      details[key] = value;
    }
    
    setPaymentDetails(details);
  }, []);
  
  const getTitle = () => {
    if (status === 'success') {
      switch (type) {
        case 'subscription':
          return 'Subscription Successful';
        case 'tip':
          return 'Thank You for Your Support';
        default:
          return 'Payment Successful';
      }
    } else {
      return 'Payment Cancelled';
    }
  };
  
  const getMessage = () => {
    if (status === 'success') {
      switch (type) {
        case 'subscription':
          return 'Your subscription has been successfully processed. You now have access to all the features included in your plan.';
        case 'tip':
          return 'Your support means a lot to the creator. Thank you for your generosity!';
        default:
          return 'Your payment has been successfully processed. Thank you for your purchase.';
      }
    } else {
      return 'Your payment has been cancelled. No charges were made to your account.';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-2xl mx-auto">
        <Card theme={theme} colorMode={colorMode} className="p-8 text-center">
          <div className="flex justify-center mb-6">
            {status === 'success' ? (
              <CheckCircle className="h-20 w-20 text-green-500" />
            ) : (
              <XCircle className="h-20 w-20 text-red-500" />
            )}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {getTitle()}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {getMessage()}
          </p>
          
          {status === 'success' && (
            <div className="mb-8 text-left bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Payment Details
              </h3>
              <ul className="space-y-2">
                {Object.entries(paymentDetails).map(([key, value]) => {
                  // Skip internal parameters
                  if (key === 'type' || key === 'status') return null;
                  
                  return (
                    <li key={key} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </span>
                      <span className="text-gray-800 dark:text-white font-medium">
                        {value}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          
          <Button
            theme={theme}
            variant="primary"
            colorMode={colorMode}
            onClick={onBack}
            className="flex items-center mx-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </Card>
      </div>
    </div>
  );
}