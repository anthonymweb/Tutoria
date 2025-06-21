import React from 'react';
import { FaCheck } from 'react-icons/fa';

const StudentPricingPage = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: '$9.99',
      period: 'per month',
      features: [
        '1 hour of tutoring per month',
        'Basic subject coverage',
        'Email support',
        'Standard response time',
      ],
      recommended: false,
    },
    {
      name: 'Standard',
      price: '$19.99',
      period: 'per month',
      features: [
        '5 hours of tutoring per month',
        'All subjects covered',
        'Priority support',
        '24/7 availability',
        'Study materials included',
      ],
      recommended: true,
    },
    {
      name: 'Premium',
      price: '$39.99',
      period: 'per month',
      features: [
        'Unlimited tutoring hours',
        'All subjects covered',
        'Premium support',
        '24/7 availability',
        'Study materials included',
        'Practice tests',
        'Progress tracking',
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Learning Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan to accelerate your learning journey
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.recommended
                  ? 'border-2 border-blue-500 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                    Recommended
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500"> {plan.period}</span>
                </p>
                <button
                  className={`mt-8 block w-full rounded-md py-2 px-4 text-center text-sm font-semibold ${
                    plan.recommended
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h4 className="text-sm font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <FaCheck className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base text-gray-500">
            Need a custom plan?{' '}
            <a href="/student/support" className="text-blue-500 hover:text-blue-600">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentPricingPage; 