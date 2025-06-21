import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaClock, FaGraduationCap } from 'react-icons/fa';
import SessionRequestModal from '../modals/SessionRequestModal';

const FindTutorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTutorId, setSelectedTutorId] = useState(null);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('/api/tutors');
        setTutors(response.data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTutors();
  }, []);

  const handleMessageTutor = (tutorId) => {
    navigate(`/student/messages?tutor=${tutorId}`);
  };

  const handleRequestSession = (tutorId) => {
    navigate(`/student/request-session/${tutorId}`);
  };

  const subjects = ['All Subjects', 'Mathematics', 'Physics', 'English', 'Literature', 'Chemistry', 'Biology'];
  const levels = ['All Levels', 'Primary', 'High School', 'University'];
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under UGX 20,000', value: 'under-20k' },
    { label: 'UGX 20,000 - 30,000', value: '20k-30k' },
    { label: 'Over UGX 30,000', value: 'over-30k' }
  ];

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || tutor.subjects.includes(selectedSubject);
    const matchesLevel = selectedLevel === 'all' || tutor.level === selectedLevel;
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'under-20k' && tutor.price < 20000) ||
                        (selectedPrice === '20k-30k' && tutor.price >= 20000 && tutor.price <= 30000) ||
                        (selectedPrice === 'over-30k' && tutor.price > 30000);

    return matchesSearch && matchesSubject && matchesLevel && matchesPrice;
  });

  if (loading) return <p>Loading tutors...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tutors by name or subject..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <select
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject === 'All Subjects' ? 'all' : subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map(level => (
                  <option key={level} value={level === 'All Levels' ? 'all' : level}>
                    {level}
                  </option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map(tutor => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md p-6 mb-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
                  <div className="flex items-center text-gray-600">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span>{tutor.rating} ({tutor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700">{tutor.bio}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tutor.subjects.map(subject => (
                  <span key={subject} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {subject}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-600">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{tutor.location}</span>
                </div>
                <div className="text-lg font-semibold text-indigo-600">UGX {tutor.price.toLocaleString()}/hr</div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex-1"
                  onClick={() => handleMessageTutor(tutor.id)}
                >
                  Message
                </button>
                <button 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg flex-1"
                  onClick={() => handleRequestSession(tutor.id)}
                >
                  Request Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <FaSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No tutors found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>
      <SessionRequestModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
        tutorId={selectedTutorId}
      />
    </div>
  );
};

export default FindTutorsPage;