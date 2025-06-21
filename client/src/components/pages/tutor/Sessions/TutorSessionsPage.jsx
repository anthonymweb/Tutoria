import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaVideo, FaUser, FaClock, FaMapMarkerAlt, FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

const TutorSessionsPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState({ upcoming: [], past: [], requests: [] });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await api.get('/tutor/sessions');
        const all = res.data?.sessions || [];
        const upcoming = all.filter(s => s.status === 'confirmed' || s.status === 'scheduled');
        const past = all.filter(s => s.status === 'completed');
        const requests = all.filter(s => s.status === 'pending');
        setSessions({ upcoming, past, requests });
      } catch (err) {
        console.error('Tutor sessions fetch error:', err);
      }
    };
    fetchSessions();
  }, []);

  const handleAcceptRequest = async (sessionId) => {
    try {
      await api.put(`/sessions/${sessionId}`, { status: 'confirmed' });
      toast.success('Session accepted');
      setSessions(prev => {
        const reqs = prev.requests.filter(s => s._id !== sessionId);
        const accepted = prev.requests.find(s => s._id === sessionId);
        if (accepted) accepted.status = 'confirmed';
        return {
          ...prev,
          requests: reqs,
          upcoming: [...prev.upcoming, accepted]
        };
      });
    } catch (err) {
      console.error(err);
      toast.error('Failed to accept');
    }
  };

  const handleRejectRequest = async (sessionId) => {
    try {
      await api.put(`/sessions/${sessionId}`, { status: 'cancelled' });
      toast.info('Session declined');
      setSessions(prev => ({ ...prev, requests: prev.requests.filter(s => s._id !== sessionId) }));
    } catch (err) {
      console.error(err);
      toast.error('Failed to decline');
    }
  };

  const renderSessionCard = (session) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow rounded-lg p-6 mb-4"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{session.subject}</h3>
          <p className="text-sm text-gray-500">with {session.studentName}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          session.status === 'confirmed' ? 'bg-green-100 text-green-800' :
          session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center text-sm text-gray-500">
          <FaCalendarAlt className="mr-2" />
          {session.date} at {session.time}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FaClock className="mr-2" />
          {session.duration}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FaVideo className="mr-2" />
          {session.mode}
        </div>
        {session.mode === 'Physical' && (
          <div className="flex items-center text-sm text-gray-500">
            <FaMapMarkerAlt className="mr-2" />
            Location TBD
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end space-x-3">
        {session.status === 'pending' && activeTab === 'requests' ? (
          <>
            <button
              onClick={() => handleAcceptRequest(session.id)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaCheck className="mr-2" />
              Accept
            </button>
            <button
              onClick={() => handleRejectRequest(session.id)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTimes className="mr-2" />
              Reject
            </button>
          </>
        ) : session.status === 'confirmed' ? (
          <Link
            to={`/tutor/sessions/${session.id}`}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaVideo className="mr-2" />
            Join Session
          </Link>
        ) : (
          <Link
            to={`/tutor/students/${session.studentId}`}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaUser className="mr-2" />
            View Student
          </Link>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Sessions
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/tutor/sessions/requests"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaCalendarAlt className="mr-2" />
            View All Requests
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`${
              activeTab === 'upcoming'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Upcoming Sessions
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`${
              activeTab === 'past'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Past Sessions
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`${
              activeTab === 'requests'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Session Requests
          </button>
        </nav>
      </div>

      {/* Session List */}
      <div className="space-y-4">
        {sessions[activeTab].length > 0 ? (
          sessions[activeTab].map(session => renderSessionCard(session))
        ) : (
          <div className="text-center py-12">
            <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No sessions</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'upcoming' ? 'You have no upcoming sessions.' :
               activeTab === 'past' ? 'You have no past sessions.' :
               'You have no pending session requests.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorSessionsPage;