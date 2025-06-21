import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationCircleIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';

const AdminSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    analytics: false,
    payments: false,
    disputes: false,
  });

  // Expand parent menu if a sub-link is active
  useEffect(() => {
    setOpenMenus((prev) => ({
      ...prev,
      analytics: location.pathname.startsWith('/admin/analytics'),
      payments: location.pathname.startsWith('/admin/payments'),
      disputes: location.pathname.startsWith('/admin/disputes'),
    }));
  }, [location.pathname]);

  const handleMenuToggle = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Users', href: '/admin/users', icon: UsersIcon },
    { name: 'All Users', href: '/admin/users/all', icon: UsersIcon },
    { name: 'User Details', href: '/admin/users/details', icon: UsersIcon },
    { name: 'Tutors', href: '/admin/tutors', icon: AcademicCapIcon },
    { name: 'All Tutors', href: '/admin/tutors/all', icon: AcademicCapIcon },
    { name: 'Tutor Details', href: '/admin/tutors/details', icon: AcademicCapIcon },
    { name: 'Tutor Approval Queue', href: '/admin/tutors/approval-queue', icon: AcademicCapIcon },
    { name: 'Students', href: '/admin/students', icon: UsersIcon },
    { name: 'All Students', href: '/admin/students/all', icon: UsersIcon },
    { name: 'Sessions', href: '/admin/sessions', icon: VideoCameraIcon },
    { name: 'All Sessions', href: '/admin/sessions/all', icon: VideoCameraIcon },
    { name: 'Session Details', href: '/admin/sessions/details', icon: VideoCameraIcon },
    { name: 'Session Overview', href: '/admin/sessions/overview', icon: VideoCameraIcon },
    {
      name: 'Payments',
      icon: CurrencyDollarIcon,
      expandable: true,
      key: 'payments',
      subLinks: [
        { name: 'Payout Requests', href: '/admin/payments/payouts' },
        { name: 'Transaction Logs', href: '/admin/payments/transactions' },
      ],
    },
    {
      name: 'Analytics',
      icon: ChartBarIcon,
      expandable: true,
      key: 'analytics',
      subLinks: [
        { name: 'Platform', href: '/admin/analytics/platform' },
        { name: 'Revenue', href: '/admin/analytics/revenue' },
        { name: 'Users', href: '/admin/analytics/users' },
        { name: 'Sessions', href: '/admin/analytics/sessions' },
      ],
    },
    {
      name: 'Disputes',
      icon: ExclamationCircleIcon,
      expandable: true,
      key: 'disputes',
      subLinks: [
        { name: 'All Disputes', href: '/admin/disputes' },
        { name: 'Dispute Details', href: '/admin/disputes/details' },
        { name: 'Dispute Center', href: '/admin/disputes/center' },
      ],
    },
    { name: 'Settings', href: '/admin/settings', icon: CogIcon },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out top-16 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              item.expandable ? (
                <div key={item.name}>
                  <button
                    onClick={() => handleMenuToggle(item.key)}
                    className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none ${
                      openMenus[item.key] || location.pathname.startsWith(item.href || item.subLinks[0].href.split('/').slice(0, 3).join('/')) 
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? item.name : ''}
                  >
                    <item.icon className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                    {!isCollapsed && <span className="flex-1 text-left">{item.name}</span>}
                    {!isCollapsed && (
                      openMenus[item.key] ? (
                        <ChevronUpIcon className="h-4 w-4 ml-2" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                      )
                    )}
                  </button>
                  {/* Sub-links */}
                  {!isCollapsed && openMenus[item.key] && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subLinks.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          className={`block px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                            location.pathname === sub.href
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  title={isCollapsed ? item.name : ''}
                >
                  <item.icon className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Version info */}
        <div className={`p-4 border-t border-gray-200 ${isCollapsed ? 'text-center' : ''}`}>
          <p className="text-xs text-gray-500">
            {isCollapsed ? 'v1.0' : 'Version 1.0.0'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar; 