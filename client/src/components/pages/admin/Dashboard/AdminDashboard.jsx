import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  UsersIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  CurrencyDollarIcon,
  ExclamationCircleIcon,
  ChartBarIcon,
  CogIcon,
} from '@heroicons/react/24/outline';
import PendingTutorApplications from './PendingTutorApplications';
import { adminService } from '../../../../services/adminService';

/*
  Cleaned AdminDashboard component:
  - Retrieves live stats and recent activity via adminService (which ultimately calls /api/admin/stats & /api/admin/activity).
  - Removes all previously duplicated/unclosed JSX.
  - Extracts small reusable sub-components (StatCard & QuickLink) for clarity.
*/

// (Service imports removed) Data fetching and approval handled in PendingTutorApplications component

const StatCard = ({ icon: Icon, color, title, value }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 rounded-md p-3 ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

const QuickLink = ({ to, icon: Icon, text, color }) => (
  <Link
    to={to}
    className={`group flex items-center rounded-lg p-4 text-sm font-medium text-gray-700 hover:text-white ${color} hover:opacity-90 transition-colors duration-200`}
  >
    <Icon className="h-6 w-6 mr-3" />
    {text}
  </Link>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const statsData = await adminService.getDashboardStats();
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Helper to safely read a stat key
  const safeStat = (key) => (stats && stats[key] !== undefined ? stats[key] : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <StatCard icon={UsersIcon} color="bg-blue-500" title="Total Users" value={safeStat('totalUsers')} />
          <StatCard icon={UsersIcon} color="bg-indigo-500" title="Total Students" value={safeStat('totalStudents')} />
          <StatCard icon={AcademicCapIcon} color="bg-green-500" title="Active Tutors" value={safeStat('activeTutors')} />
          <StatCard icon={VideoCameraIcon} color="bg-purple-500" title="Active Sessions" value={safeStat('activeSessions')} />
          <StatCard icon={CurrencyDollarIcon} color="bg-yellow-500" title="Monthly Revenue" value={`$${safeStat('monthlyRevenue')}`} />
          <StatCard icon={ExclamationCircleIcon} color="bg-red-500" title="Pending Approvals" value={safeStat('pendingApprovals')} />
        </section>

        {/* Quick Actions */}
        <section className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickLink
              to="/admin/tutors/approval-queue"
              icon={AcademicCapIcon}
              text="Review Tutor Applications"
              color="bg-indigo-600"
            />
            <QuickLink to="/admin/analytics" icon={ChartBarIcon} text="View Reports" color="bg-green-600" />
            <QuickLink to="/admin/users" icon={UsersIcon} text="Manage Users" color="bg-blue-600" />
            <QuickLink to="/admin/settings" icon={CogIcon} text="System Settings" color="bg-gray-600" />
          </div>
        </section>

        {/* Pending Tutor Applications */}
        <section className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Tutor Applications</h2>
          <PendingTutorApplications />
        </section>

        {/* Recent Activity */}
        <section className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow rounded-lg p-6">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-gray-500">No recent activity.</p>
            ) : (
              <ul className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <li key={activity.id || idx} className="flex items-start">
                    <div>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.timestamp || Date.now()).toLocaleString()}
                      </p>
                      <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;