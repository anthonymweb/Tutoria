import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaGraduationCap,
  FaClock,
  FaDollarSign
} from 'react-icons/fa';

const FindTutorPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  // Mock data for subjects
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History',
    'Computer Science'
  ];

  // Mock data for education levels
  const educationLevels = [
    'High School',
    'Undergraduate',
    'Graduate',
    'Professional'
  ];

  // Mock data for tutors
  const tutors = [
    {
      id: 1,
      name: 'John Doe',
      subject: 'Mathematics',
      rating: 4.8,
      reviews: 120,
      hourlyRate: 45,
      experience: '5 years',
      education: 'MSc in Mathematics',
      availability: 'Mon-Fri, 9AM-5PM',
      image: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Jane Smith',
      subject: 'Physics',
      rating: 4.9,
      reviews: 95,
      hourlyRate: 50,
      experience: '7 years',
      education: 'PhD in Physics',
      availability: 'Mon-Sat, 10AM-8PM',
      image: 'https://via.placeholder.com/150'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Find a Tutor
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Search for qualified tutors in your subject area
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by subject, tutor name, or keywords..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Subject Filter */}
              <div className="w-full md:w-48">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="w-full md:w-48">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">All Levels</option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Search
              </button>
            </div>

            {/* Price Range Filter */}
            <div className="flex items-center space-x-4">
              <FaDollarSign className="text-gray-400" />
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full"
              />
              <span className="text-sm text-gray-600">
                Max: ${priceRange[1]}/hour
              </span>
            </div>
          </form>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {tutor.name}
                    </h3>
                    <p className="text-sm text-gray-500">{tutor.subject}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{tutor.rating} ({tutor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaGraduationCap className="mr-2" />
                    <span>{tutor.education}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaClock className="mr-2" />
                    <span>{tutor.availability}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaDollarSign className="mr-2" />
                    <span>${tutor.hourlyRate}/hour</span>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/student/find-tutor/${tutor.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindTutorPage; 