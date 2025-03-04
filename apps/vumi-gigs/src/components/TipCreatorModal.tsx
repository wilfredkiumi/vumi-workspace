// @ts-nocheck
import { useState  } from 'react';
import { useTheme, Button, Card } from 'ui';
import { DollarSign, X } from 'lucide-react';
import { usePayment } from '../hooks/usePayment';
import { Creator } from '../models';

interface TipCreatorModalProps {
  creator: Creator;
  onClose: () => void;
  onSuccess?: () => void;
}

export function TipCreatorModal({ creator, onClose, onSuccess }: TipCreatorModalProps) {
  const { theme } = useTheme();
  const { loading, createTip, redirectToCheckout } = usePayment();
  
  const [amount, setAmount] = useState<number>(5);
  const [currency, setCurrency] = useState<string>('USD');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const predefinedAmounts = [5, 10, 20, 50, 100];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setAmount(value);
      setError(null);
    }
  };
  
  const handlePredefinedAmount = (value: number) => {
    setAmount(value);
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    try {
      const response = await createTip({
        creatorId: creator.id,
        amount: amount * 100, // Convert to cents for Stripe
        currency,
        successUrl: `${window.location.origin}/payment/success?type=tip&creatorId=${creator.id}`,
        cancelUrl: `${window.location.origin}/payment/cancel?type=tip&creatorId=${creator.id}`,
        metadata: {
          message,
          creatorName: creator.name,
          creatorUsername: creator.username
        }
      });
      
      // Redirect to Stripe Checkout
      redirectToCheckout(response.url);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating tip:', error);
      setError('Failed to process tip. Please try again.');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card theme={theme} colorMode={colorMode} className="max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Support {creator.name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Choose an amount
            </label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {predefinedAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`py-2 px-4 rounded-lg border ${
                    amount === value
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-200'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => handlePredefinedAmount(value)}
                >
                  ${value}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                min="1"
                step="0.01"
                value={amount}
                onChange={handleAmountChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                placeholder="Enter custom amount"
              />
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add a message (optional)
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Say something nice..."
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button
              theme={theme}
              variant="secondary"
              colorMode={colorMode}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              theme={theme}
              variant="primary"
              colorMode={colorMode}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Support with $${amount}`}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}