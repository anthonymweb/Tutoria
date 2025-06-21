import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaStar, FaCrown, FaRocket, FaLock, FaUsers, FaChartLine, FaVideo, FaBook, FaBell } from 'react-icons/fa';

const TutorUpgradePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = {
    basic: {
      name: 'Basic',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        { name: 'Basic Profile', included: true },
        { name: 'Up to 5 Students', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Email Support', included: true },
        { name: 'Priority Support', included: false },
        { name: 'Advanced Analytics', included: false },
        { name: 'Custom Branding', included: false },
        { name: 'Group Sessions', included: false },
        { name: 'Premium Badge', included: false },
        { name: 'Featured Listing', included: false }
      ],
      icon: FaStar,
      color: 'bg-gray-500'
    },
    professional: {
      name: 'Professional',
      price: {
        monthly: 29.99,
        yearly: 299.99
      },
      features: [
        { name: 'Basic Profile', included: true },
        { name: 'Up to 20 Students', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Email Support', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Custom Branding', included: true },
        { name: 'Group Sessions', included: false },
        { name: 'Premium Badge', included: false },
        { name: 'Featured Listing', included: false }
      ],
      icon: FaCrown,
      color: 'bg-yellow-500'
    },
    premium: {
      name: 'Premium',
      price: {
        monthly: 49.99,
        yearly: 499.99
      },
      features: [
        { name: 'Basic Profile', included: true },
        { name: 'Unlimited Students', included: true },
        { name: 'Basic Analytics', included: true },
        { name: 'Email Support', included: true },
        { name: 'Priority Support', included: true },
        { name: 'Advanced Analytics', included: true },
        { name: 'Custom Branding', included: true },
        { name: 'Group Sessions', included: true },
        { name: 'Premium Badge', included: true },
        { name: 'Featured Listing', included: true }
      ],
      icon: FaRocket,
      color: 'bg-purple-500'
    }
  };

  const handleUpgrade = () => {
    // TODO: Implement upgrade functionality with backend
    console.log('Upgrading to:', selectedPlan, 'with', billingCycle, 'billing');
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Upgrade Your Teaching Experience
          </h2>
        <p className="mt-4 text-lg text-gray-500">
          Choose the perfect plan to grow your tutoring business
          </p>
        </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="relative bg-white rounded-lg p-1 shadow-sm">
          <div className="flex">
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
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
          </div>
        </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {Object.entries(plans).map(([key, plan]) => (
              <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-2xl border ${
              selectedPlan === key
                ? 'border-indigo-600 shadow-lg'
                : 'border-gray-200'
            } bg-white p-8`}
          >
            {selectedPlan === key && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-indigo-600 text-white">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center">
              <plan.icon className={`h-12 w-12 ${plan.color} text-white rounded-full p-2 mx-auto`} />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price[billingCycle]}
                </span>
                <span className="text-gray-500">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </p>
                </div>

            <ul className="mt-8 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                          {feature.included ? (
                    <FaCheck className="h-5 w-5 text-green-500 mr-3" />
                          ) : (
                    <FaTimes className="h-5 w-5 text-gray-300 mr-3" />
                          )}
                  <span className={`text-sm ${feature.included ? 'text-gray-900' : 'text-gray-500'}`}>
                          {feature.name}
                  </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <button
                onClick={() => setSelectedPlan(key)}
                className={`w-full py-3 px-4 rounded-md text-sm font-medium ${
                  selectedPlan === key
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                {selectedPlan === key ? 'Current Plan' : 'Select Plan'}
                    </button>
                </div>
              </motion.div>
            ))}
        </div>

      {/* Features Comparison */}
        <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Compare Features
          </h3>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Basic
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Professional
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Premium
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <FaUsers className="mr-2" />
                    Student Capacity
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Up to 5
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Up to 20
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Unlimited
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <FaChartLine className="mr-2" />
                    Analytics
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Basic
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Advanced
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Advanced +
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <FaVideo className="mr-2" />
                    Session Types
            </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  1-on-1
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  1-on-1 + Group
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  All Types
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <FaBook className="mr-2" />
                    Resources
            </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Basic
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Premium
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Premium +
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    <FaBell className="mr-2" />
                    Support
          </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Email
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  Priority
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  24/7 Priority
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleUpgrade}
          disabled={selectedPlan === 'basic'}
          className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
            selectedPlan === 'basic'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          <FaLock className="mr-2" />
          {selectedPlan === 'basic' ? 'Current Plan' : 'Upgrade Now'}
        </button>
        <p className="mt-4 text-sm text-gray-500">
          {selectedPlan === 'basic'
            ? 'You are currently on the Basic plan'
            : `You will be upgraded to the ${plans[selectedPlan].name} plan`}
        </p>
      </div>
    </div>
  );
};

export default TutorUpgradePage; 