import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const PricingPage = () => {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      period: 'forever',
      features: [
        '2 sessions per week',
        'Limited chat features',
        'Basic booking system',
        'Standard tutor access',
      ],
      buttonText: 'Get Started',
      buttonLink: '/role-selection',
    },
    {
      name: 'Premium',
      price: 'UGX',
      period: 'per month',
      features: [
        'Unlimited sessions',
        'Advanced tutor filters',
        'Wallet analytics',
        'Tutor priority access',
        'Advanced chat features',
        'Premium booking system',
        'Admin-defined thresholds',
        'Custom monetization logic',
      ],
      buttonText: 'Upgrade Now',
      buttonLink: '/role-selection',
      popular: true,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
              Choose Your Learning Plan
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Start with our free plan and upgrade when you're ready for more
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-2">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600"> {plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <FaCheck className="h-5 w-5 text-indigo-600 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={plan.buttonLink}
                      className={`block w-full text-center py-3 px-6 rounded-lg font-semibold ${
                        plan.popular
                          ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                          : 'bg-gray-100 text-indigo-600 hover:bg-gray-200'
                      } transition-all duration-300`}
                    >
                      {plan.buttonText}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">What's included in the Basic plan?</h3>
              <p className="text-gray-600">
                The Basic plan includes 2 sessions per week, limited chat features, and basic booking capabilities. It's perfect for students who are just starting their learning journey.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">What are the benefits of Premium?</h3>
              <p className="text-gray-600">
                Premium members get unlimited sessions, advanced tutor filters, wallet analytics, priority access to tutors, and enhanced chat and booking features. Plus, you get access to admin-defined thresholds and custom monetization logic.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Can I upgrade my plan later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade from Basic to Premium at any time. Your new features will be available immediately after upgrading.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">How do I pay for Premium?</h3>
              <p className="text-gray-600">
                Premium plans are billed monthly in UGX. We accept all major credit cards and mobile money payments.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingPage; 