import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaMoneyBillWave,
  FaUser,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaSearch,
  FaFilter,
  FaDownload,
  FaMobile,
  FaCreditCard,
  FaWallet
} from 'react-icons/fa';

const TransactionLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    method: 'all',
    date: 'all',
    amount: 'all'
  });

  // Mock data for transactions
  const transactions = [
    {
      id: 1,
      type: 'top-up',
      amount: 100,
      method: 'MTN Mobile Money',
      user: 'Alice Johnson',
      userType: 'student',
      date: '2024-02-15 14:30',
      status: 'completed',
      reference: 'MTN-123456',
      balance: 500
    },
    {
      id: 2,
      type: 'session_payment',
      amount: 50,
      method: 'Credit Card',
      user: 'Bob Wilson',
      userType: 'student',
      date: '2024-02-15 13:00',
      status: 'completed',
      reference: 'CC-789012',
      balance: 200
    },
    {
      id: 3,
      type: 'payout',
      amount: 500,
      method: 'Bank Transfer',
      user: 'John Doe',
      userType: 'tutor',
      date: '2024-02-15 12:00',
      status: 'completed',
      reference: 'BT-345678',
      balance: 1000
    }
  ];

  const handleExportReport = () => {
    // Implement export report logic
    console.log('Exporting transaction report');
  };

  const filteredTransactions = transactions.filter(transaction =>
    (transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.reference.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.type === 'all' || transaction.type === filters.type) &&
    (filters.method === 'all' || transaction.method === filters.method) &&
    (filters.date === 'all' || transaction.date.startsWith(filters.date)) &&
    (filters.amount === 'all' || transaction.amount >= parseInt(filters.amount))
  );

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'top-up':
        return <FaWallet className="h-6 w-6 text-green-600" />;
      case 'session_payment':
        return <FaMoneyBillWave className="h-6 w-6 text-blue-600" />;
      case 'payout':
        return <FaMoneyBillWave className="h-6 w-6 text-indigo-600" />;
      default:
        return <FaMoneyBillWave className="h-6 w-6 text-gray-600" />;
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'MTN Mobile Money':
      case 'Airtel Money':
        return <FaMobile className="h-4 w-4" />;
      case 'Credit Card':
        return <FaCreditCard className="h-4 w-4" />;
      case 'Bank Transfer':
        return <FaMoneyBillWave className="h-4 w-4" />;
      default:
        return <FaWallet className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Transaction Logs
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              View and manage all platform transactions
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
            <button
              onClick={handleExportReport}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaDownload className="mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 bg-white shadow rounded-lg p-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="top-up">Top-up</option>
                  <option value="session_payment">Session Payment</option>
                  <option value="payout">Payout</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Method</label>
                <select
                  value={filters.method}
                  onChange={(e) => setFilters({ ...filters, method: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="MTN Mobile Money">MTN Mobile Money</option>
                  <option value="Airtel Money">Airtel Money</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Amount</label>
                <select
                  value={filters.amount}
                  onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="50">$50+</option>
                  <option value="100">$100+</option>
                  <option value="500">$500+</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Transactions List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <li key={transaction.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {transaction.type.split('_').map(word => 
                              word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {transaction.user} ({transaction.userType})
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-lg font-medium ${
                          transaction.type === 'payout' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {transaction.type === 'payout' ? '-' : '+'}${transaction.amount}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Method</p>
                        <div className="mt-1 flex items-center">
                          {getMethodIcon(transaction.method)}
                          <span className="ml-1 text-sm text-gray-900">
                            {transaction.method}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date & Time</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {transaction.date}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Reference</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {transaction.reference}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Balance</p>
                        <p className="mt-1 text-sm text-gray-900">
                          ${transaction.balance}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionLogsPage; 