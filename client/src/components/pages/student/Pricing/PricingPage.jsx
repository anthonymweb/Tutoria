import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  // Mock data - replace with actual data from your backend
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for beginners',
      monthlyPrice: 49,
      yearlyPrice: 470,
      features: [
        { name: '5 hours of tutoring per month', included: true },
        { name: 'Access to basic learning materials', included: true },
        { name: 'Email support', included: true },
        { name: 'Progress tracking', included: true },
        { name: 'Group sessions', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced learning materials', included: false },
        { name: 'Certificate of completion', included: false }
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Best for serious learners',
      monthlyPrice: 99,
      yearlyPrice: 950,
      features: [
        { name: '15 hours of tutoring per month', included: true },
        { name: 'Access to all learning materials', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Advanced progress tracking', included: true },
        { name: 'Group sessions', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced learning materials', included: true },
        { name: 'Certificate of completion', included: false }
      ],
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For dedicated students',
      monthlyPrice: 199,
      yearlyPrice: 1900,
      features: [
        { name: 'Unlimited tutoring hours', included: true },
        { name: 'Access to all learning materials', included: true },
        { name: '24/7 priority support', included: true },
        { name: 'Advanced progress tracking', included: true },
        { name: 'Group sessions', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced learning materials', included: true },
        { name: 'Certificate of completion', included: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Choose the perfect plan for your learning journey
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative bg-white rounded-lg p-1 flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              } relative py-2 px-6 rounded-md text-sm font-medium transition-colors duration-200`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`${
                billingCycle === 'yearly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              } relative py-2 px-6 rounded-md text-sm font-medium transition-colors duration-200`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.popular
                  ? 'border-2 border-indigo-500 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2">
                  <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-4 text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </p>
                <button
                  className={`mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700 ${
                    plan.popular ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                  }`}
                >
                  Get started
                </button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature.name} className="flex space-x-3">
                      {feature.included ? (
                        <FaCheck
                          className="flex-shrink-0 h-5 w-5 text-green-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaTimes
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-gray-500' : 'text-gray-400'
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-12 max-w-3xl mx-auto">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Can I change plans later?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  What payment methods do you accept?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  We accept all major credit cards, PayPal, and mobile money payments.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Is there a refund policy?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.
                </dd>
              </div>
              <div>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  Can I cancel my subscription?
                </dt>
                <dd className="mt-2 text-base text-gray-500">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-indigo-50 rounded-lg">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to start learning?</span>
              <span className="block text-indigo-600">Choose your plan today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get started
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage; 