import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaWallet, FaMoneyBillWave, FaHistory, FaCreditCard, FaMobileAlt, FaUniversity } from 'react-icons/fa';
import api from '../../../../services/api';

const TutorWalletPage = () => {
  const [selectedWithdrawalMethod, setSelectedWithdrawalMethod] = useState('bank');
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  const defaultWallet = { availableBalance: 0, pendingClearance: 0, totalEarned: 0, nextPayout: null };
  const [walletStats, setWalletStats] = useState(defaultWallet);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get('/tutor/earnings');
        const data = res.data || {};
        setWalletStats({
          availableBalance: data.availableBalance || 0,
          pendingClearance: data.pendingClearance || 0,
          totalEarned: data.totalEarned || 0,
          nextPayout: data.nextPayout || null
        });
        setTransactions(data.transactions || []);
      } catch (err) {
        console.error('Tutor wallet fetch error:', err);
      }
    };

    fetchWallet();
  }, []);

  const withdrawalMethods = [
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: FaUniversity,
      processingTime: '2-3 business days'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: FaMobileAlt,
      processingTime: 'Instant'
    },
    {
      id: 'card',
      name: 'Credit Card',
      icon: FaCreditCard,
      processingTime: '1-2 business days'
    }
  ];

  const handleWithdrawal = (e) => {
    e.preventDefault();
    // Implement withdrawal logic
    console.log('Withdrawing:', withdrawalAmount, 'via', selectedWithdrawalMethod);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Wallet & Earnings
            </h2>
          </div>
        </div>

        {/* Wallet Stats */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaWallet className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Available Balance
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          ${walletStats.availableBalance.toFixed(2)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaMoneyBillWave className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Pending Clearance
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          ${walletStats.pendingClearance.toFixed(2)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaHistory className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Earned
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          ${walletStats.totalEarned.toFixed(2)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FaMoneyBillWave className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Next Payout
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {walletStats.nextPayout}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Withdraw Earnings
              </h3>
              <form onSubmit={handleWithdrawal} className="mt-5">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                      Amount
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0.00"
                        min="0"
                        max={walletStats.availableBalance}
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="withdrawal-method" className="block text-sm font-medium text-gray-700">
                      Withdrawal Method
                    </label>
                    <select
                      id="withdrawal-method"
                      name="withdrawal-method"
                      value={selectedWithdrawalMethod}
                      onChange={(e) => setSelectedWithdrawalMethod(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      {withdrawalMethods.map((method) => (
                        <option key={method.id} value={method.id}>
                          {method.name} ({method.processingTime})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-5">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Withdraw Funds
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="mt-8">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Transaction History
          </h3>
          <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                              {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              transaction.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
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
    </div>
  );
};

export default TutorWalletPage;