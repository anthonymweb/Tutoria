import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaVideo,
  FaUser,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaClock,
  FaBook,
  FaExclamationTriangle,
  FaDownload,
  FaSearch,
  FaFilter,
  FaEye,
  FaTimes
} from 'react-icons/fa';

const SessionOverviewPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    subject: 'all',
    date: 'all'
  });

  // Mock data for sessions
  const sessions = [
    {
      id: 1,
      tutor: 'John Doe',
      student: 'Alice Johnson',
      subject: 'Mathematics',
      topic: 'Calculus',
      date: '2024-02-15',
      time: '14:00',
      duration: 60,
      status: 'ongoing',
      recording: 'recording.mp4',
      issues: []
    },
    {
      id: 2,
      tutor: 'Jane Smith',
      student: 'Bob Wilson',
      subject: 'Physics',
      topic: 'Mechanics',
      date: '2024-02-15',
      time: '15:30',
      duration: 45,
      status: 'scheduled',
      recording: null,
      issues: ['Student no-show']
    }
  ];

  const handleJoinSession = (sessionId) => {
    // Implement join session logic
    console.log('Joining session:', sessionId);
  };

  const handleViewRecording = (session) => {
    setSelectedSession(session);
  };

  const handleReportIssue = (sessionId) => {
    // Implement report issue logic
    console.log('Reporting issue for session:', sessionId);
  };

  const handleExportReport = () => {
    // Implement export report logic
    console.log('Exporting session report');
  };

  const filteredSessions = sessions.filter(session =>
    (session.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.status === 'all' || session.status === filters.status) &&
    (filters.subject === 'all' || session.subject === filters.subject) &&
    (filters.date === 'all' || session.date === filters.date)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Session Overview
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Monitor and manage all tutoring sessions
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search sessions..."
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
                  <option value="scheduled">Scheduled</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="canceled">Canceled</option>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
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

        {/* Sessions List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredSessions.map((session) => (
                <li key={session.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaVideo className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {session.subject} - {session.topic}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {session.tutor} → {session.student}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        {session.status === 'ongoing' && (
                          <button
                            onClick={() => handleJoinSession(session.id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                          >
                            <FaEye className="mr-2" />
                            Join Session
                          </button>
                        )}
                        {session.recording && (
                          <button
                            onClick={() => handleViewRecording(session)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <FaVideo className="mr-2" />
                            View Recording
                          </button>
                        )}
                        <button
                          onClick={() => handleReportIssue(session.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                        >
                          <FaExclamationTriangle className="mr-2" />
                          Report Issue
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Date & Time</p>
                        <div className="mt-1 flex items-center">
                          <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-900">
                            {session.date} at {session.time}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Duration</p>
                        <div className="mt-1 flex items-center">
                          <FaClock className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-900">
                            {session.duration} minutes
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Status</p>
                        <p className={`mt-1 text-sm ${
                          session.status === 'ongoing' ? 'text-green-600' :
                          session.status === 'completed' ? 'text-blue-600' :
                          session.status === 'canceled' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Issues</p>
                        <p className="mt-1 text-sm text-gray-900">
                          {session.issues.length > 0 ? session.issues.join(', ') : 'None'}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recording Viewer Modal */}
        {selectedSession && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Session Recording: {selectedSession.subject} - {selectedSession.topic}
                </h3>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4">
                <video
                  controls
                  className="w-full rounded-lg"
                  src={selectedSession.recording}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedSession(null)}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionOverviewPage; 