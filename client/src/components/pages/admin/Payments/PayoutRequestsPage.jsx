import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaMoneyBillWave,
  FaUser,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaHistory,
  FaExclamationTriangle,
  FaDownload
} from 'react-icons/fa';

const PayoutRequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    amount: 'all',
    date: 'all'
  });

  // Mock data for payout requests
  const payoutRequests = [
    {
      id: 1,
      tutor: 'John Doe',
      email: 'john@example.com',
      amount: 500,
      status: 'pending',
      requestDate: '2024-02-15',
      paymentMethod: 'Bank Transfer',
      accountDetails: '****1234',
      sessions: 25,
      totalEarnings: 1500,
      previousPayouts: [
        { date: '2024-01-15', amount: 400 },
        { date: '2023-12-15', amount: 350 }
      ]
    },
    {
      id: 2,
      tutor: 'Jane Smith',
      email: 'jane@example.com',
      amount: 750,
      status: 'approved',
      requestDate: '2024-02-14',
      paymentMethod: 'PayPal',
      accountDetails: 'jane@example.com',
      sessions: 35,
      totalEarnings: 2000,
      previousPayouts: [
        { date: '2024-01-20', amount: 600 },
        { date: '2023-12-20', amount: 550 }
      ]
    }
  ];

  const handleApprove = (requestId) => {
    // Implement approval logic
    console.log('Approving payout request:', requestId);
  };

  const handleReject = (requestId) => {
    // Implement rejection logic
    console.log('Rejecting payout request:', requestId);
  };

  const handleFlag = (requestId) => {
    // Implement flag logic
    console.log('Flagging payout request:', requestId);
  };

  const handleExportReport = () => {
    // Implement export report logic
    console.log('Exporting payout report');
  };

  const filteredRequests = payoutRequests.filter(request =>
    (request.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.status === 'all' || request.status === filters.status) &&
    (filters.amount === 'all' || request.amount >= parseInt(filters.amount)) &&
    (filters.date === 'all' || request.requestDate === filters.date)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Payout Requests
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage tutor payout requests and transactions
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search requests..."
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Amount</label>
                <select
                  value={filters.amount}
                  onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="100">$100+</option>
                  <option value="500">$500+</option>
                  <option value="1000">$1000+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Request Date</label>
                <input
                  type="date"
                  value={filters.date}
                  onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Payout Requests List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <li key={request.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaMoneyBillWave className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {request.tutor}
                          </h3>
                          <p className="text-sm text-gray-500">{request.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleFlag(request.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                        >
                          <FaExclamationTriangle className="mr-2" />
                          Flag
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <FaTimes className="mr-2" />
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                        >
                          <FaCheck className="mr-2" />
                          Approve
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Amount</p>
                        <div className="mt-1 flex items-center">
                          <FaMoneyBillWave className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-900">
                            ${request.amount}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Payment Method</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {request.paymentMethod}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className={`mt-1 text-sm ${
                          request.status === 'approved' ? 'text-green-600' :
                          request.status === 'rejected' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Request Date</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {request.requestDate}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        View Payout History
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payout History Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Payout History for {selectedRequest.tutor}
                </h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-900">Summary</h4>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Total Sessions</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {selectedRequest.sessions}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Earnings</p>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        ${selectedRequest.totalEarnings}
                      </p>
                    </div>
                  </div>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedRequest.previousPayouts.map((payout, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payout.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${payout.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoutRequestsPage; 