import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaVideo, FaMapMarkerAlt, FaFilter, FaSearch } from 'react-icons/fa';
import api from '../../../../services/api';

const FindTutorsPage = () => {
  const [filters, setFilters] = useState({
    category: '',
    subject: '',
    rating: '',
    mode: ''
  });

  const [categories, setCategories] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [tutors, setTutors] = useState([]);

  // Fetch tutors on mount and when filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Optionally fetch categories/subjects if backend provides
        const tutorRes = await api.get('/tutors', {
          params: {
            subject: filters.subject,
            rating: filters.rating,
            mode: filters.mode,
            status: 'active'
          }
        });
        setTutors(tutorRes.data.tutors || []);
        // Build unique categories/subjects arrays from tutors
        const allSubjects = new Set();
        const allCategories = new Set();
        (tutorRes.data.tutors || []).forEach(t => {
          (t.subjects || []).forEach(s => allSubjects.add(s));
          allCategories.add(t.primaryCategory || 'General');
        });
        setSubjects(Array.from(allSubjects));
        setCategories(Array.from(allCategories));
      } catch (err) {
        console.error('Fetch tutors error', err);
      }
    };
    fetchData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Tutors</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button className="text-indigo-600 hover:text-indigo-500">
              <FaFilter className="h-5 w-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Mode</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={filters.mode}
                onChange={(e) => handleFilterChange('mode', e.target.value)}
              >
                <option value="">Any Mode</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              placeholder="Search tutors by name, subject, or expertise..."
            />
          </div>
        </div>

        {/* Tutor Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={tutor.image}
                      alt={tutor.name}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{tutor.name}</h3>
                    <div className="flex items-center mt-1">
                      <FaStar className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-600">
                        {tutor.rating} ({tutor.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{tutor.bio}</p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map(subject => (
                      <span
                        key={subject}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    {tutor.mode === 'online' ? (
                      <FaVideo className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <FaMapMarkerAlt className="h-5 w-5 text-blue-500 mr-2" />
                    )}
                    <span>{tutor.mode}</span>
                  </div>
                  <div className="text-lg font-medium text-gray-900">
                    ${tutor.price}/hr
                  </div>
                </div>
                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Request Session
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Message
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FindTutorsPage;