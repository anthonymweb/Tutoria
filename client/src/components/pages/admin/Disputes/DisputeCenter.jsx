import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaExclamationTriangle,
  FaUser,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaFileUpload,
  FaClock
} from 'react-icons/fa';

const DisputeCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    priority: 'all'
  });

  // Mock data for disputes
  const disputes = [
    {
      id: 1,
      student: 'Alice Johnson',
      tutor: 'John Doe',
      subject: 'Mathematics',
      sessionDate: '2024-02-15',
      type: 'refund',
      amount: 50,
      status: 'pending',
      priority: 'high',
      description: 'Student claims tutor did not show up for the session',
      evidence: ['screenshot1.png', 'chat_log.txt'],
      createdAt: '2024-02-15 14:30',
      lastUpdated: '2024-02-15 15:00'
    },
    {
      id: 2,
      student: 'Bob Wilson',
      tutor: 'Jane Smith',
      subject: 'Physics',
      sessionDate: '2024-02-14',
      type: 'quality',
      amount: 0,
      status: 'in_review',
      priority: 'medium',
      description: 'Student claims the session quality was poor',
      evidence: ['recording.mp4', 'feedback.txt'],
      createdAt: '2024-02-14 16:00',
      lastUpdated: '2024-02-15 10:00'
    }
  ];

  const handleResolve = (disputeId, resolution) => {
    // Implement dispute resolution logic
    console.log('Resolving dispute:', disputeId, 'with resolution:', resolution);
  };

  const handleUploadEvidence = (disputeId) => {
    // Implement evidence upload logic
    console.log('Uploading evidence for dispute:', disputeId);
  };

  const handleEscalate = (disputeId) => {
    // Implement escalation logic
    console.log('Escalating dispute:', disputeId);
  };

  const filteredDisputes = disputes.filter(dispute =>
    (dispute.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dispute.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.status === 'all' || dispute.status === filters.status) &&
    (filters.type === 'all' || dispute.type === filters.type) &&
    (filters.priority === 'all' || dispute.priority === filters.priority)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600';
      case 'in_review':
        return 'text-blue-600';
      case 'resolved':
        return 'text-green-600';
      case 'escalated':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Dispute Center
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage and resolve student-tutor disputes
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search disputes..."
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
                  <option value="in_review">In Review</option>
                  <option value="resolved">Resolved</option>
                  <option value="escalated">Escalated</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="refund">Refund</option>
                  <option value="quality">Quality</option>
                  <option value="behavior">Behavior</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Disputes List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredDisputes.map((dispute) => (
                <li key={dispute.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaExclamationTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {dispute.type.charAt(0).toUpperCase() + dispute.type.slice(1)} Dispute
                          </h3>
                          <p className="text-sm text-gray-500">
                            {dispute.student} vs {dispute.tutor}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleUploadEvidence(dispute.id)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FaFileUpload className="mr-2" />
                          Upload Evidence
                        </button>
                        <button
                          onClick={() => handleEscalate(dispute.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <FaExclamationTriangle className="mr-2" />
                          Escalate
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Session Date</p>
                        <div className="mt-1 flex items-center">
                          <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-900">
                            {dispute.sessionDate}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Amount</p>
                        <div className="mt-1 flex items-center">
                          <FaMoneyBillWave className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-900">
                            ${dispute.amount}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className={`mt-1 text-sm ${getStatusColor(dispute.status)}`}>
                          {dispute.status.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Priority</p>
                        <p className={`mt-1 text-sm ${getPriorityColor(dispute.priority)}`}>
                          {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Description</p>
                      <p className="mt-1 text-sm text-gray-900">{dispute.description}</p>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Evidence</p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {dispute.evidence.map((file, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {file}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleResolve(dispute.id, 'reject')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                      >
                        <FaTimes className="mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleResolve(dispute.id, 'approve')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                      >
                        <FaCheck className="mr-2" />
                        Approve
                      </button>
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

export default DisputeCenter; 