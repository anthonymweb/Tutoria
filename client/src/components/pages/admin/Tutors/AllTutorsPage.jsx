import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaStar,
  FaMoneyBillWave,
  FaBan,
  FaExclamationTriangle,
  FaEnvelope,
  FaSearch,
  FaFilter,
  FaSort
} from 'react-icons/fa';
import { getAllTutors } from '../../../../services/mongoRealm';

const AllTutorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    rating: 'all',
    subject: 'all'
  });

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const data = await getAllTutors();
        setTutors(data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tutors.');
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleSuspend = (tutorId) => {
    // Implement suspend logic
    console.log('Suspending tutor:', tutorId);
  };

  const handleWarn = (tutorId) => {
    // Implement warning logic
    console.log('Warning tutor:', tutorId);
  };

  const handleMessage = (tutorId) => {
    // Implement message logic
    console.log('Messaging tutor:', tutorId);
  };

  const filteredTutors = tutors.filter(tutor =>
    (tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.status === 'all' || tutor.status === filters.status) &&
    (filters.rating === 'all' || tutor.rating >= parseFloat(filters.rating)) &&
    (filters.subject === 'all' || tutor.subject === filters.subject)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              All Tutors
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Manage and monitor tutor accounts
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tutors..."
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
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Rating</label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <select
                  value={filters.subject}
                  onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="all">All</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tutors List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredTutors.map((tutor) => (
                <li key={tutor._id || tutor.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaUser className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {tutor.name}
                          </h3>
                          <p className="text-sm text-gray-500">{tutor.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleMessage(tutor.id)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <FaEnvelope className="mr-2" />
                          Message
                        </button>
                        <button
                          onClick={() => handleWarn(tutor.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                        >
                          <FaExclamationTriangle className="mr-2" />
                          Warn
                        </button>
                        <button
                          onClick={() => handleSuspend(tutor.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                        >
                          <FaBan className="mr-2" />
                          Suspend
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Subject</p>
                        <p className="mt-1 text-sm text-gray-900">{tutor.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Rating</p>
                        <div className="mt-1 flex items-center">
                          <FaStar className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-900">{tutor.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Earnings</p>
                        <div className="mt-1 flex items-center">
                          <FaMoneyBillWave className="h-4 w-4 text-green-500" />
                          <span className="ml-1 text-sm text-gray-900">${tutor.earnings}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className={`mt-1 text-sm ${
                          tutor.status === 'active' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {tutor.status.charAt(0).toUpperCase() + tutor.status.slice(1)}
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

export default AllTutorsPage;