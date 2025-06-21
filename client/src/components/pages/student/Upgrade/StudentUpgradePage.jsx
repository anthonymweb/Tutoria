import React, { useState } from 'react';
import { FaCrown, FaCheck, FaTimes, FaStar, FaUsers, FaChartLine, FaVideo, FaCalendarAlt } from 'react-icons/fa';

const StudentUpgradePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      features: [
        { name: 'Basic Profile', included: true },
        { name: 'Up to 2 Sessions/Month', included: true },
        { name: 'Basic Progress Tracking', included: true },
        { name: 'Standard Support', included: true },
        { name: 'Premium Tutors', included: false },
        { name: 'Unlimited Sessions', included: false },
        { name: 'Advanced Analytics', included: false },
        { name: 'Priority Support', included: false }
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$19.99/month',
      features: [
        { name: 'Basic Profile', included: true },
        { name: 'Unlimited Sessions', included: true },
        { name: 'Basic Progress Tracking', included: true },
        { name: 'Standard Support', included: true },
        { name: 'Premium Tutors', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Study Materials', included: true }
      ]
    }
  ];

  const benefits = [
    {
      icon: FaStar,
      title: 'Premium Tutors',
      description: 'Access to our top-rated tutors and exclusive content'
    },
    {
      icon: FaUsers,
      title: 'Unlimited Sessions',
      description: 'Book as many sessions as you need to achieve your goals'
    },
    {
      icon: FaChartLine,
      title: 'Advanced Analytics',
      description: 'Track your progress with detailed analytics and insights'
    },
    {
      icon: FaVideo,
      title: 'Priority Support',
      description: 'Get faster responses and dedicated support for your needs'
    }
  ];

  const handleUpgrade = () => {
    // Implement upgrade logic
    console.log('Upgrading to:', selectedPlan);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Upgrade Your Learning Experience
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Unlock premium features and accelerate your learning journey
          </p>
        </div>

        {/* Benefits */}
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  selectedPlan === plan.id ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <div className="px-6 py-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    {plan.id === 'premium' && (
                      <FaCrown className="h-8 w-8 text-yellow-400" />
                    )}
                  </div>
                  <p className="mt-4 text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {plan.id === 'premium' ? 'Billed monthly' : 'Forever free'}
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          {feature.included ? (
                            <FaCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <FaTimes className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                        <p className={`ml-3 text-base ${
                          feature.included ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {feature.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                        plan.id === 'premium'
                          ? 'bg-indigo-600 hover:bg-indigo-700'
                          : 'bg-gray-600 hover:bg-gray-700'
                      }`}
                    >
                      {plan.id === 'premium' ? 'Upgrade Now' : 'Current Plan'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            Frequently Asked Questions
          </h3>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-medium text-gray-900">
                Can I switch plans later?
              </h4>
              <p className="mt-2 text-base text-gray-500">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h4 className="text-lg font-medium text-gray-900">
                What payment methods do you accept?
              </h4>
              <p className="mt-2 text-base text-gray-500">
                We accept all major credit cards, PayPal, and bank transfers. All payments are secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentUpgradePage; 