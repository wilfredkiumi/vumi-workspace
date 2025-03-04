// @ts-nocheck
import { Check, X } from 'lucide-react';
import { CreatorPlan, ProfileMode } from './types';
import { Button } from './index';

interface CreatorPlansProps {
  colorMode?: string;
  theme?: string;
  plans: CreatorPlan[];
  currentPlan?: ProfileMode;
  onSelectPlan: (planId: string) => void;
}

export function CreatorPlans({ 
  
  
  plans,
  currentPlan,
  onSelectPlan
, theme = "gigs", colorMode = "light" }: CreatorPlansProps) {
  const handleSelectPlan = (planId: string) => {
    onSelectPlan(planId);
  };
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Select the plan that best fits your needs and take your creator profile to the next level.
          </p>
        </div>

        <div className="mt-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
          {plans.map((plan) => {
            const isCurrentPlan = currentPlan === plan.mode;
            const isPremium = plan.mode === ProfileMode.PREMIUM;
            const isPro = plan.mode === ProfileMode.PRO;
            
            return (
              <div 
                key={plan.id}
                className={`relative p-8 bg-white dark:bg-gray-800 border rounded-xl shadow-sm flex flex-col
                  ${plan.popular ? 'border-2 border-primary-500 dark:border-primary-400' : 'border-gray-200 dark:border-gray-700'}
                  ${isCurrentPlan ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''}
                `}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 bg-primary-500 dark:bg-primary-400 text-white text-xs font-medium rounded-full transform translate-x-2 -translate-y-2">
                    POPULAR
                  </div>
                )}
                
                {plan.recommended && (
                  <div className="absolute top-0 right-0 -mt-3 mr-3 px-3 py-1 bg-yellow-500 text-white text-xs font-medium rounded-full transform translate-x-2 -translate-y-2">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">{plan.description}</p>
                </div>
                
                <div className="mt-2 mb-6">
                  <span className="text-4xl font-extrabold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">/{plan.billingPeriod}</span>
                </div>
                
                <ul className="mt-6 space-y-4 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mr-2" />
                      )}
                      <span className="text-gray-600 dark:text-gray-300">
                        {feature.name}
                        {feature.limit && (
                          <span className="text-gray-500 dark:text-gray-400 ml-1">
                            ({feature.limit})
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button
                    theme={theme}
                    variant={isPremium || isPro ? "primary" : "secondary"}
                    colorMode={colorMode}
                    className="w-full"
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    {isCurrentPlan ? 'Current Plan' : 'Select Plan'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}