import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaSearch, FaCalendarAlt, FaComments, FaVideo, FaStar, FaChartLine } from 'react-icons/fa';
import api from '../../../../services/api';

const StudentDashboard = () => {
  const defaultStats = [
    { id: 1, name: 'Total Sessions', value: 0, icon: FaCalendarAlt },
    { id: 2, name: 'Hours Learned', value: 0, icon: FaCalendarAlt },
    { id: 3, name: 'Average Rating', value: 0, icon: FaStar }
  ];

  const [stats, setStats] = useState(defaultStats);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/student/dashboard');
        const { sessions = [], averageRating = 0 } = res.data || {};

        const totalSessions = sessions.length;
        const hoursLearned = sessions.reduce((acc, s) => acc + (s.duration || 0) / 60, 0);

        setStats([
          { ...defaultStats[0], value: totalSessions },
          { ...defaultStats[1], value: hoursLearned },
          { ...defaultStats[2], value: Number(averageRating).toFixed(1) }
        ]);

        setUpcomingSessions(sessions.slice(0, 3));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchDashboard();
  }, []);

  const journeySteps = [
    {
      id: 1,
      name: 'Find Tutor',
      description: 'Search for qualified tutors',
      icon: FaSearch,
      path: '/student/find-tutor',
      status: 'active'
    },
    {
      id: 2,
      name: 'Book Session',
      description: 'Schedule your learning time',
      icon: FaCalendarAlt,
      path: upcomingSessions[0] ? `/student/find-tutor/${upcomingSessions[0].tutorId}/book` : '/student/find-tutor',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Chat',
      description: 'Communicate with your tutor',
      icon: FaComments,
      path: '/student/messages',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Attend Session',
      description: 'Join your learning session',
      icon: FaVideo,
      path: upcomingSessions[0] ? `/student/sessions/${upcomingSessions[0].id}` : '#',
      status: 'pending'
    },
    {
      id: 5,
      name: 'Rate & Review',
      description: 'Share your feedback',
      icon: FaStar,
      path: '/student/feedback',
      status: 'pending'
    },
    {
      id: 6,
      name: 'Track Progress',
      description: 'Monitor your learning journey',
      icon: FaChartLine,
      path: '/student/analytics',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Welcome to Your Learning Journey
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/student/find-tutor"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Find a Tutor
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Learning Journey */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your Learning Journey
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {journeySteps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white overflow-hidden shadow rounded-lg ${
                step.status === 'active' ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <Link 
                to={step.path} 
                className={`block hover:bg-gray-50 ${step.path === '#' ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={(e) => step.path === '#' && e.preventDefault()}
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <step.icon className={`h-6 w-6 ${
                        step.status === 'active' ? 'text-indigo-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {step.name}
                        </dt>
                        <dd>
                          <div className="text-sm text-gray-900">
                            {step.description}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Upcoming Sessions
        </h3>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingSessions.map((session) => (
                      <tr key={session.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {session.tutorName}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{session.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {session.date} at {session.time}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            session.mode === 'Online' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {session.mode}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {session.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/student/sessions/${session.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Join Session
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;