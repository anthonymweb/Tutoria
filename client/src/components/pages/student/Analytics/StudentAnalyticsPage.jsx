import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaChartLine, FaCheckCircle, FaHourglassHalf, FaBookOpen } from 'react-icons/fa';
import api from '../../../../services/api';

const StudentAnalyticsPage = () => {
  const defaultStats = { totalHours: 0, completedSessions: 0, subjectsEnrolled: 0, averageScore: 0 };
  const [learningStats, setLearningStats] = useState(defaultStats);
  const [recentProgress, setRecentProgress] = useState([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/student/analytics');
        const data = res.data?.data || {};
        setLearningStats({
          totalHours: data.totalHours || 0,
          completedSessions: data.completedSessions || 0,
          subjectsEnrolled: data.subjects?.length || 0,
          averageScore: `${(data.averageRating || 0).toFixed(1) * 20}%`
        });
        // Build recent progress list from subjects progress
        const progress = (data.subjects || []).map((s, idx) => ({
          id: idx,
          title: `Progress in ${s.name}: ${s.progress.toFixed(0)}%`,
          date: new Date().toISOString().split('T')[0],
          icon: FaBookOpen,
          color: 'text-blue-500'
        }));
        setRecentProgress(progress);
      } catch (err) {
        console.error('Analytics fetch error:', err);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Your Learning Progress
            </h2>
          </div>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white overflow-hidden shadow rounded-lg p-5"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                <FaChartLine className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Hours Learned</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{learningStats.totalHours}</dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white overflow-hidden shadow rounded-lg p-5"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <FaCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completed Sessions</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{learningStats.completedSessions}</dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white overflow-hidden shadow rounded-lg p-5"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                <FaBookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Subjects Enrolled</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{learningStats.subjectsEnrolled}</dd>
                </dl>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white overflow-hidden shadow rounded-lg p-5"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <FaChartLine className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Score</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{learningStats.averageScore}</dd>
                </dl>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Progress Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="flow-root">
            <ul role="list" className="-mb-8">
              {recentProgress.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentProgress.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center ring-8 ring-white`}
                        >
                          <activity.icon className="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            {activity.title} <Link to="#" className="font-medium text-gray-900"></Link>
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          <time dateTime={activity.date}>{activity.date}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentAnalyticsPage;