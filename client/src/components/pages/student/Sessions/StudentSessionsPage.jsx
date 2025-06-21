import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaCalendarAlt, FaClock, FaUser, FaBook, FaMapMarkerAlt, FaStar, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

const StudentSessionsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [sessions, setSessions] = useState({
    upcoming: [],
    past: [],
    cancelled: []
  });
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line
  }, [activeTab]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/sessions', {
        params: {
          role: 'student'
        }
      });
      const { sessions: fetchedSessions } = response.data;
      setSessions({
        upcoming: fetchedSessions.filter(s => s.status === 'scheduled' || s.status === 'confirmed'),
        past: fetchedSessions.filter(s => s.status === 'completed'),
        cancelled: fetchedSessions.filter(s => s.status === 'cancelled')
      });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Error loading sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSession = (session) => {
    // For online sessions, redirect to the session room
    // For physical sessions, show location info
    if (session.type === 'online') {
      navigate(`/student/session/${session._id}`);
    } else {
      toast.info(`Physical session location: ${session.location}`);
    }
  };

  const handleCancelSession = async (sessionId) => {
    if (!window.confirm('Are you sure you want to cancel this session?')) return;
    try {
      await api.put(`/api/sessions/${sessionId}/cancel`);
      toast.success('Session cancelled successfully');
      fetchSessions();
    } catch (error) {
      console.error('Error cancelling session:', error);
      toast.error(error.response?.data?.message || 'Error cancelling session');
    }
  };

  const handleRateSession = (session) => {
    setSelectedSession(session);
    setShowRatingModal(true);
  };

  const submitRating = async () => {
    if (!rating || !review) {
      toast.error('Please provide both rating and review');
      return;
    }
    try {
      await api.post(`/api/sessions/${selectedSession._id}/review`, {
        rating,
        review
      });
      toast.success('Thank you for your feedback!');
      setShowRatingModal(false);
      setRating(0);
      setReview('');
      fetchSessions();
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Error submitting rating');
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getStatusBadge = (status) => {
    const badges = {
      scheduled: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              My Sessions
            </h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['upcoming', 'past', 'cancelled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab} Sessions
              </button>
            ))}
          </nav>
        </div>

        {/* Sessions List */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : sessions[activeTab].length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No {activeTab} sessions</h3>
              <p className="mt-2 text-gray-500">You don't have any {activeTab} sessions at the moment.</p>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {sessions[activeTab].map((session) => {
                  const { date, time } = formatDateTime(session.startTime);
                  return (
                    <li key={session._id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={session.tutor.user.profileImage}
                              alt={session.tutor.user.name}
                              className="h-10 w-10 rounded-full"
                            />
                            <div className="ml-4">
                              <h3 className="text-sm font-medium text-gray-900">
                                {session.tutor.user.name}
                              </h3>
                              <p className="text-sm text-gray-500">{session.subject}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <FaCalendarAlt className="mr-1.5 h-4 w-4" />
                              {date}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FaClock className="mr-1.5 h-4 w-4" />
                              {time}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <FaBook className="mr-1.5 h-4 w-4" />
                              {session.duration} min
                            </div>
                            {session.type === 'physical' && (
                              <div className="flex items-center text-sm text-gray-500">
                                <FaMapMarkerAlt className="mr-1.5 h-4 w-4" />
                                {session.location}
                              </div>
                            )}
                            {getStatusBadge(session.status)}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-3">
                          {/* Join Session Button (Online) */}
                          {activeTab === 'upcoming' && session.type === 'online' && (
                            <button
                              onClick={() => handleJoinSession(session)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <FaVideo className="mr-2 h-4 w-4" />
                              Join Session
                            </button>
                          )}
                          {/* View Details Button (Physical) */}
                          {activeTab === 'upcoming' && session.type === 'physical' && (
                            <button
                              onClick={() => handleJoinSession(session)}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <FaMapMarkerAlt className="mr-2 h-4 w-4" />
                              View Details
                            </button>
                          )}
                          {/* Cancel Session Button */}
                          {activeTab === 'upcoming' && (
                            <button
                              onClick={() => handleCancelSession(session._id)}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <FaTimes className="mr-2 h-4 w-4" />
                              Cancel
                            </button>
                          )}
                          {/* Rate Session Button */}
                          {activeTab === 'past' && !session.rating && (
                            <button
                              onClick={() => handleRateSession(session)}
                              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              <FaStar className="mr-2 h-4 w-4" />
                              Rate Session
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rate Your Session</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <div className="mt-1 flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows="3"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Share your experience..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRating}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSessionsPage;