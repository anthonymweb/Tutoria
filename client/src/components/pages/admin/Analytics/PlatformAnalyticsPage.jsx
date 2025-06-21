import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaServer,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock,
  FaDownload,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { adminService } from '../../../../services/adminService';

const PlatformAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('performance');

  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [errorAnalytics, setErrorAnalytics] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoadingAnalytics(true);
      setErrorAnalytics('');
      try {
        const data = await adminService.getAnalytics();
        setAnalyticsData(data);
      } catch (err) {
        setErrorAnalytics('Failed to fetch analytics');
      } finally {
        setLoadingAnalytics(false);
      }
    };
    fetchAnalytics();
  }, [timeRange]);

  // Mock data for platform metrics
  const metrics = {
    uptime: {
      value: '99.9%',
      growth: 0.1,
      previous: '99.8%'
    },
    responseTime: {
      value: '150ms',
      growth: -10,
      previous: '167ms'
    },
    errorRate: {
      value: '0.1%',
      growth: -20,
      previous: '0.13%'
    },
    activeUsers: {
      value: '1.2k',
      growth: 15,
      previous: '1.0k'
    }
  };

  // Mock data for system health
  const systemHealth = [
    { component: 'API Server', status: 'healthy', responseTime: '120ms', uptime: '99.9%' },
    { component: 'Database', status: 'healthy', responseTime: '80ms', uptime: '99.9%' },
    { component: 'Video Service', status: 'healthy', responseTime: '200ms', uptime: '99.8%' },
    { component: 'Payment Gateway', status: 'healthy', responseTime: '150ms', uptime: '99.9%' }
  ];

  // Mock data for error logs
  const errorLogs = [
    { timestamp: '2024-02-20 10:15:23', component: 'API Server', error: 'Connection timeout', severity: 'low' },
    { timestamp: '2024-02-20 09:45:12', component: 'Video Service', error: 'Stream buffer overflow', severity: 'medium' },
    { timestamp: '2024-02-19 23:30:45', component: 'Database', error: 'Query timeout', severity: 'low' }
  ];

  // Mock data for resource usage
  const resourceUsage = [
    { resource: 'CPU', usage: 45, threshold: 80 },
    { resource: 'Memory', usage: 60, threshold: 85 },
    { resource: 'Storage', usage: 75, threshold: 90 },
    { resource: 'Network', usage: 30, threshold: 70 }
  ];

  const getGrowthColor = (value) => {
    return value > 0 ? 'text-green-500' : 'text-red-500';
  };

  const getGrowthIcon = (value) => {
    return value > 0 ? <FaArrowUp /> : <FaArrowDown />;
  };

  const getStatusColor = (status) => {
    return status === 'healthy' ? 'text-green-500' : 'text-red-500';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'text-yellow-500',
      medium: 'text-orange-500',
      high: 'text-red-500'
    };
    return colors[severity] || 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Platform Analytics
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Track platform performance and health metrics
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

        {/* Live Analytics Data */}
        <div className="mt-4">
          {loadingAnalytics && <p>Loading analytics data...</p>}
          {errorAnalytics && <p className="text-red-500">{errorAnalytics}</p>}
          {analyticsData && (
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium">Analytics Data</h3>
              <pre className="mt-2 text-sm overflow-x-auto">{JSON.stringify(analyticsData, null, 2)}</pre>
            </div>
          )}
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
                  <FaServer className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Uptime
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.uptime.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.uptime.growth)}`}>
                        {getGrowthIcon(metrics.uptime.growth)}
                        <span className="ml-1">{metrics.uptime.growth}%</span>
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
                      Response Time
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.responseTime.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.responseTime.growth)}`}>
                        {getGrowthIcon(metrics.responseTime.growth)}
                        <span className="ml-1">{Math.abs(metrics.responseTime.growth)}%</span>
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
                  <FaExclamationTriangle className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Error Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.errorRate.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.errorRate.growth)}`}>
                        {getGrowthIcon(metrics.errorRate.growth)}
                        <span className="ml-1">{Math.abs(metrics.errorRate.growth)}%</span>
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
                      Active Users
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {metrics.activeUsers.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${getGrowthColor(metrics.activeUsers.growth)}`}>
                        {getGrowthIcon(metrics.activeUsers.growth)}
                        <span className="ml-1">{metrics.activeUsers.growth}%</span>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* System Health */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">System Health</h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Component
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Response Time
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Uptime
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {systemHealth.map((component, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {component.component}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`${getStatusColor(component.status)}`}>
                          {component.status === 'healthy' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                          <span className="ml-2">{component.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {component.responseTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {component.uptime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Error Logs */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Error Logs</h3>
            <div className="mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Component
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Error
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {errorLogs.map((log, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.component}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.error}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Resource Usage</h3>
            <div className="mt-4">
              <div className="space-y-4">
                {resourceUsage.map((resource, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{resource.resource}</p>
                        <p className="text-sm text-gray-500">{resource.usage}% used</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Threshold: {resource.threshold}%
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          resource.usage > resource.threshold
                            ? 'bg-red-500'
                            : resource.usage > resource.threshold * 0.8
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${resource.usage}%` }}
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

export default PlatformAnalyticsPage; 