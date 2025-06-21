import React, { useState } from 'react';
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

const RevenueAnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('30days');

  // Mock data for demonstration
  const revenueStats = [
    {
      name: 'Total Revenue',
      value: '$1,234,567',
      change: '+18.2%',
      trend: 'up',
      icon: CurrencyDollarIcon,
      color: 'bg-green-500',
    },
    {
      name: 'Monthly Recurring Revenue (MRR)',
      value: '$45,231',
      change: '+5.1%',
      trend: 'up',
      icon: ChartBarIcon,
      color: 'bg-blue-500',
    },
    {
      name: 'Average Transaction Value',
      value: '$75.50',
      change: '-0.5%',
      trend: 'down',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500',
    },
    {
      name: 'Refunds Issued',
      value: '$1,200',
      change: '+2.0%',
      trend: 'up',
      icon: ExclamationCircleIcon,
      color: 'bg-red-500',
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: '2024-03-15',
      description: 'Tutoring Session: Math with John Doe',
      amount: '+$50.00',
      status: 'completed',
    },
    {
      id: 2,
      date: '2024-03-14',
      description: 'Subscription Fee: Jane Smith (Monthly)',
      amount: '+$25.00',
      status: 'completed',
    },
    {
      id: 3,
      date: '2024-03-14',
      description: 'Refund: Session Cancellation - User ID 123',
      amount: '-$30.00',
      status: 'refunded',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Detailed insights into platform revenue and financial performance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Range Selector */}
        <div className="flex justify-end mb-6">
          <select
            id="dateRange"
            name="dateRange"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
            <option value="all">All Time</option>
          </select>
        </div>

        {/* Revenue Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {revenueStats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                        <div
                          className={`ml-2 flex items-baseline text-sm font-semibold ${
                            stat.trend === 'up'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {stat.trend === 'up' ? (
                            <ArrowUpIcon className="h-4 w-4 flex-shrink-0 self-center" />
                          ) : (
                            <ArrowDownIcon className="h-4 w-4 flex-shrink-0 self-center" />
                          )}
                          <span className="ml-1">{stat.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Revenue Trend Chart (Placeholder) */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Revenue Trend</h3>
          <div className="mt-4 h-64 flex items-center justify-center bg-gray-50 text-gray-400 rounded-md">
            [Revenue Trend Chart Placeholder]
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.description}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                          transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalyticsPage; 