import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaCreditCard, FaMobileAlt, FaPlus, FaMinus, FaExchangeAlt, FaHistory } from 'react-icons/fa';

const WalletPage = () => {
  const [selectedTab, setSelectedTab] = useState('transactions');
  const [amount, setAmount] = useState('');

  // Mock data - replace with actual data from your backend
  const wallet = {
    balance: 250.00,
    transactions: [
      {
        id: 1,
        type: 'credit',
        amount: 100.00,
        description: 'Added funds via Credit Card',
        date: '2024-03-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'debit',
        amount: 25.00,
        description: 'Session with Dr. Sarah Johnson',
        date: '2024-03-14',
        status: 'completed'
      },
      {
        id: 3,
        type: 'credit',
        amount: 50.00,
        description: 'Added funds via Mobile Money',
        date: '2024-03-10',
        status: 'completed'
      }
    ],
    paymentMethods: [
      {
        id: 1,
        type: 'card',
        name: 'Visa ending in 4242',
        icon: FaCreditCard,
        isDefault: true
      },
      {
        id: 2,
        type: 'mobile',
        name: 'MTN Mobile Money',
        icon: FaMobileAlt,
        isDefault: false
      }
    ]
  };

  const handleAddFunds = (e) => {
    e.preventDefault();
    // Handle adding funds
    console.log('Adding funds:', amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Wallet Balance Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Wallet Balance</h2>
                <p className="mt-1 text-3xl font-bold text-indigo-600">
                  ${wallet.balance.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => setSelectedTab('add-funds')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FaPlus className="h-4 w-4 mr-2" />
                Add Funds
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedTab('transactions')}
                className={`${
                  selectedTab === 'transactions'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <FaHistory className="inline-block h-5 w-5 mr-2" />
                Transactions
              </button>
              <button
                onClick={() => setSelectedTab('payment-methods')}
                className={`${
                  selectedTab === 'payment-methods'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                <FaCreditCard className="inline-block h-5 w-5 mr-2" />
                Payment Methods
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
          {selectedTab === 'transactions' && (
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction History</h3>
                <div className="space-y-4">
                  {wallet.transactions.map((transaction) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div
                          className={`p-3 rounded-full ${
                            transaction.type === 'credit'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-red-100 text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? (
                            <FaPlus className="h-5 w-5" />
                          ) : (
                            <FaMinus className="h-5 w-5" />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${
                            transaction.type === 'credit'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.status}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'payment-methods' && (
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
                  <button className="text-indigo-600 hover:text-indigo-500">
                    Add New Method
                  </button>
                </div>
                <div className="space-y-4">
                  {wallet.paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <method.icon className="h-6 w-6 text-gray-400" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{method.name}</p>
                          {method.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <FaExchangeAlt className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'add-funds' && (
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add Funds</h3>
                <form onSubmit={handleAddFunds} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Payment Method
                    </label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      {wallet.paymentMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Funds
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WalletPage; 