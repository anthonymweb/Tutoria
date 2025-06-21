import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaHistory, FaWallet, FaStar, FaUserEdit, FaClock, FaVideo, FaBook, FaChartLine, FaCog } from 'react-icons/fa';
import api from '../../../../services/api';

const TutorDashboard = () => {
  const defaultStats = [
    { id: 1, name: 'Upcoming Sessions', value: 0, icon: FaCalendarAlt, color: 'text-blue-600' },
    { id: 2, name: 'Total Earnings', value: '$0', icon: FaWallet, color: 'text-green-600' },
    { id: 3, name: 'Average Rating', value: 0, icon: FaStar, color: 'text-yellow-600' },
    { id: 4, name: 'Total Hours', value: 0, icon: FaClock, color: 'text-purple-600' }
  ];

  const [stats, setStats] = useState(defaultStats);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentEarnings, setRecentEarnings] = useState([]);
  const [quickLinks, setQuickLinks] = useState([
    {
      id: 1,
      name: 'Manage Profile',
      icon: FaUserEdit,
      path: '/tutor/profile',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Set Availability',
      icon: FaCalendarAlt,
      path: '/tutor/calendar',
      color: 'bg-green-500'
    },
    {
      id: 3,
      name: 'Manage Subjects',
      icon: FaBook,
      path: '/tutor/subjects',
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'View Analytics',
      icon: FaChartLine,
      path: '/tutor/analytics',
      color: 'bg-yellow-500'
    }
  ]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/tutor/dashboard');
        const data = res.data || {};

        setStats([
          { ...defaultStats[0], value: data.upcomingSessionsCount || 0 },
          { ...defaultStats[1], value: `$${data.totalEarnings || 0}` },
          { ...defaultStats[2], value: (data.averageRating || 0).toFixed(1) },
          { ...defaultStats[3], value: data.totalHours || 0 }
        ]);

        setUpcomingSessions(data.upcomingSessions || []);
        setRecentEarnings(data.recentEarnings || []);
      } catch (err) {
        console.error('Tutor dashboard fetch error:', err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Hey lovely Tutor
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            to="/tutor/sessions/requests"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Session Requests
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
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

      {/* Quick Links */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Quick Actions
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                to={link.path}
                className={`relative block w-full rounded-lg border border-gray-300 p-6 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${link.color}`}
              >
                <div className="flex items-center">
                  <link.icon className="h-6 w-6 text-white" />
                  <span className="ml-3 text-white font-medium">{link.name}</span>
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
                        Student
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
                        Status
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
                              {session.studentName}
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {session.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            to={`/tutor/active-session/${session.id}`}
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

      {/* Recent Earnings */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Earnings
        </h3>
        <div className="mt-4 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentEarnings.map((earning) => (
                      <tr key={earning.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {earning.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {earning.studentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${earning.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            earning.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {earning.status}
                          </span>
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

export default TutorDashboard;