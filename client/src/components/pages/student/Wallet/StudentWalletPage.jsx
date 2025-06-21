import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaWallet,
  FaPlus,
  FaHistory,
  FaCreditCard,
  FaExchangeAlt,
  FaDownload
} from 'react-icons/fa';
import api from '../../../../services/api';

const StudentWalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get('/student/wallet');
        const { wallet } = res.data || {};
        if (wallet) {
          setBalance(wallet.balance || 0);
          setTransactions(wallet.transactions || []);
        }
      } catch (err) {
        console.error('Wallet fetch error:', err);
      }
    };

    fetchWallet();
  }, []);

  const handleAddFunds = () => {
    // Implement add funds functionality
    console.log('Add funds clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            My Wallet
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your wallet balance and transactions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Wallet Balance Card */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <FaWallet className="h-8 w-8 text-indigo-500" />
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    Wallet Balance
                  </h3>
                </div>
                <button
                  onClick={handleAddFunds}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaPlus className="mr-2" />
                  Add Funds
                </button>
              </div>

              <div className="text-center">
                <p className="text-4xl font-bold text-gray-900">
                  ${balance.toFixed(2)}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  Available Balance
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <Link
                  to="/student/wallet/payment-methods"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FaCreditCard className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      Payment Methods
                    </span>
                  </div>
                  <FaExchangeAlt className="h-5 w-5 text-gray-400" />
                </Link>

                <button
                  onClick={() => {/* Implement download statement */}}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <FaDownload className="h-5 w-5 text-gray-400" />
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      Download Statement
                    </span>
                  </div>
                  <FaExchangeAlt className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Transactions
                  </h3>
                  <FaHistory className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${
                            transaction.type === 'credit'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'credit' ? '+' : '-'}$
                          {transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="px-6 py-4 border-t border-gray-200">
                <button
                  onClick={() => {/* Implement view all transactions */}}
                  className="w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View All Transactions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentWalletPage; 