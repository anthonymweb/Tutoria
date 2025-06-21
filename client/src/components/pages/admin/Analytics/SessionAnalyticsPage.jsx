import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaVideo,
  FaClock,
  FaStar,
  FaChartLine,
  FaCalendarAlt,
  FaDownload,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const SessionAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('sessions');

  // Mock data for session metrics
  const metrics = {
    totalSessions: {
      value: 500,
      growth: 25,
      previous: 400
    },
    averageDuration: {
      value: '45 min',
      growth: 10,
      previous: '41 min'
    },
    completionRate: {
      value: '95%',
      growth: 5,
      previous: '90%'
    },
    averageRating: {
      value: 4.8,
      growth: 8,
      previous: 4.4
    }
  };

  // Mock data for session trends
  const sessionTrends = [
    { date: '2024-01', sessions: 400, duration: '41 min', rating: 4.4 },
    { date: '2024-02', sessions: 500, duration: '45 min', rating: 4.8 }
  ];

  // Mock data for top subjects
  const topSubjects = [
    { subject: 'Mathematics', sessions: 150, percentage: 30 },
    { subject: 'Physics', sessions: 100, percentage: 20 },
    { subject: 'Chemistry', sessions: 75, percentage: 15 },
    { subject: 'Biology', sessions: 50, percentage: 10 }
  ];

  // Mock data for session distribution
  const sessionDistribution = [
    { time: 'Morning (6AM-12PM)', sessions: 100, percentage: 20 },
    { time: 'Afternoon (12PM-6PM)', sessions: 200, percentage: 40 },
    { time: 'Evening (6PM-12AM)', sessions: 150, percentage: 30 },
    { time: 'Night (12AM-6AM)', sessions: 50, percentage: 10 }
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
              Session Analytics
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Track session metrics and performance
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
                  <FaVideo className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Sessions
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.totalSessions.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.totalSessions.growth)}`}>
                        {getGrowthIcon(metrics.totalSessions.growth)}
                        <span className="ml-1">{metrics.totalSessions.growth}%</span>
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
                  <FaClock className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Duration
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.averageDuration.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.averageDuration.growth)}`}>
                        {getGrowthIcon(metrics.averageDuration.growth)}
                        <span className="ml-1">{metrics.averageDuration.growth}%</span>
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
                  <FaChartLine className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Completion Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.completionRate.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.completionRate.growth)}`}>
                        {getGrowthIcon(metrics.completionRate.growth)}
                        <span className="ml-1">{metrics.completionRate.growth}%</span>
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
                  <FaStar className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Average Rating
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.averageRating.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.averageRating.growth)}`}>
                        {getGrowthIcon(metrics.averageRating.growth)}
                        <span className="ml-1">{metrics.averageRating.growth}%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Session Trends */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Session Trends</h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sessions
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sessionTrends.map((trend, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.sessions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {trend.rating}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Top Subjects */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Top Subjects</h3>
            <div className="mt-4">
              <div className="space-y-4">
                {topSubjects.map((subject, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{subject.subject}</p>
                        <p className="text-sm text-gray-500">{subject.sessions} sessions</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {subject.percentage}%
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${subject.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Session Distribution */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Session Distribution</h3>
            <div className="mt-4">
              <div className="space-y-4">
                {sessionDistribution.map((distribution, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{distribution.time}</p>
                        <p className="text-sm text-gray-500">{distribution.sessions} sessions</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {distribution.percentage}%
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${distribution.percentage}%` }}
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

export default SessionAnalyticsPage; 