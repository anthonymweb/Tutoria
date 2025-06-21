import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendarAlt, FaClock, FaVideo, FaMapMarkerAlt, FaCheck, FaTimes, FaComments, FaStar } from 'react-icons/fa';

const SessionRequestsPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      student: {
        id: 'student1',
        name: 'John Smith',
        rating: 4.5,
        completedSessions: 12,
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      subject: 'Mathematics',
      topic: 'Calculus',
      date: '2024-03-20',
      time: '10:00 AM',
      duration: '1 hour',
      mode: 'Online',
      status: 'pending',
      message: 'I need help with integration techniques in calculus.'
    },
    {
      id: 2,
      student: {
        id: 'student2',
        name: 'Emma Wilson',
        rating: 4.8,
        completedSessions: 8,
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      subject: 'Physics',
      topic: 'Mechanics',
      date: '2024-03-22',
      time: '2:00 PM',
      duration: '1.5 hours',
      mode: 'Physical',
      status: 'pending',
      message: 'Looking for help with Newton\'s laws and their applications.'
    }
  ]);

  const handleAcceptRequest = (requestId) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'accepted' }
        : request
    ));
  };

  const handleDeclineRequest = (requestId) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: 'declined' }
        : request
    ));
  };

  const handleStartChat = (studentId) => {
    // Implement chat functionality
    console.log('Start chat with student:', studentId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Session Requests
            </h2>
          </div>
        </div>

        {/* Requests List */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-6">
            {requests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    {/* Student Profile */}
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={request.student.profileImage}
                        alt={request.student.name}
                      />
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {request.student.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <FaUser className="h-4 w-4 text-gray-400" />
                          <span className="ml-1 text-sm text-gray-500">
                            {request.student.completedSessions} sessions completed
                          </span>
                        </div>
                        <div className="flex items-center mt-1">
                          <FaStar className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1 text-sm text-gray-500">
                            {request.student.rating} rating
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Session Status */}
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'accepted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Session Details */}
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-900">
                        {request.date} at {request.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-900">
                        Duration: {request.duration}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {request.mode === 'Online' ? (
                        <FaVideo className="h-5 w-5 text-gray-400" />
                      ) : (
                        <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                      )}
                      <span className="ml-2 text-sm text-gray-900">
                        {request.mode} Session
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">
                        Subject: {request.subject}
                      </span>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{request.message}</p>
                  </div>

                  {/* Actions */}
                  {request.status === 'pending' && (
                    <div className="mt-6 flex items-center justify-end space-x-3">
                      <button
                        onClick={() => handleStartChat(request.student.id)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <FaComments className="mr-2 h-4 w-4" />
                        Chat
                      </button>
                      <button
                        onClick={() => handleDeclineRequest(request.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FaTimes className="mr-2 h-4 w-4" />
                        Decline
                      </button>
                      <button
                        onClick={() => handleAcceptRequest(request.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <FaCheck className="mr-2 h-4 w-4" />
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionRequestsPage; 