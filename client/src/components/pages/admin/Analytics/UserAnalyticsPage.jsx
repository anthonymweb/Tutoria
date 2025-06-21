import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaChartLine,
  FaCalendarAlt,
  FaDownload,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const UserAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Mock data for user metrics
  const metrics = {
    totalUsers: {
      value: 1000,
      growth: 20,
      previous: 833
    },
    activeStudents: {
      value: 750,
      growth: 15,
      previous: 652
    },
    activeTutors: {
      value: 250,
      growth: 25,
      previous: 200
    },
    averageSessionsPerUser: {
      value: 4.5,
      growth: 10,
      previous: 4.1
    }
  };

  // Mock data for user growth trends
  const userGrowthTrends = [
    { date: '2024-01', total: 800, students: 600, tutors: 200 },
    { date: '2024-02', total: 1000, students: 750, tutors: 250 }
  ];

  // Mock data for user engagement
  const userEngagement = [
    { metric: 'Daily Active Users', value: 500, growth: 15 },
    { metric: 'Weekly Active Users', value: 800, growth: 20 },
    { metric: 'Monthly Active Users', value: 1000, growth: 25 },
    { metric: 'Average Session Duration', value: '45 min', growth: 10 }
  ];

  // Mock data for user demographics
  const userDemographics = [
    { category: 'Age 18-24', percentage: 40 },
    { category: 'Age 25-34', percentage: 35 },
    { category: 'Age 35-44', percentage: 15 },
    { category: 'Age 45+', percentage: 10 }
  ];

  const getGrowthColor = (value) => {
    return value > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getGrowthIcon = (value) => {
    return value > 0 ? <FaArrowUp /> : <FaArrowDown />;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              User Analytics
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Track user growth and engagement metrics
            </p>
          </div>
          <div className="flex space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="year">Last Year</option>
            </select>
            <button
              onClick={() => console.log('Exporting analytics')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaDownload className="mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaUsers className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.totalUsers.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.totalUsers.growth)}`}>
                        {getGrowthIcon(metrics.totalUsers.growth)}
                        <span className="ml-1">{metrics.totalUsers.growth}%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaUserGraduate className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Students
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.activeStudents.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.activeStudents.growth)}`}>
                        {getGrowthIcon(metrics.activeStudents.growth)}
                        <span className="ml-1">{metrics.activeStudents.growth}%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaChalkboardTeacher className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Tutors
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.activeTutors.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.activeTutors.growth)}`}>
                        {getGrowthIcon(metrics.activeTutors.growth)}
                        <span className="ml-1">{metrics.activeTutors.growth}%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaChartLine className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Avg. Sessions/User
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.averageSessionsPerUser.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.averageSessionsPerUser.growth)}`}>
                        {getGrowthIcon(metrics.averageSessionsPerUser.growth)}
                        <span className="ml-1">{metrics.averageSessionsPerUser.growth}%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* User Growth Trends */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">User Growth Trends</h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Users
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tutors
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userGrowthTrends.map((trend, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.total}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.students}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.tutors}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Engagement */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">User Engagement</h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userEngagement.map((engagement, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {engagement.metric}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {engagement.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`${getGrowthColor(engagement.growth)}`}>
                          {getGrowthIcon(engagement.growth)}
                          {engagement.growth}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Demographics */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">User Demographics</h3>
            <div className="mt-4">
              <div className="space-y-4">
                {userDemographics.map((demographic, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{demographic.category}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {demographic.percentage}%
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${demographic.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalyticsPage; 