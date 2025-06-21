import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBook, FaCalendarAlt, FaComments, FaUser, FaCog, FaChartLine, FaStar, FaWallet, FaArrowUp, FaClock } from 'react-icons/fa';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

const TutorSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const navigation = [
    { path: '/tutor', name: 'Dashboard', icon: FaHome },
    { path: '/tutor/subjects', name: 'Subjects', icon: FaBook },
    { path: '/tutor/sessions', name: 'Sessions', icon: FaCalendarAlt },
    { path: '/tutor/messages', name: 'Messages', icon: FaComments },
    { path: '/tutor/profile', name: 'Profile', icon: FaUser },
    { path: '/tutor/analytics', name: 'Analytics', icon: FaChartLine },
    { path: '/tutor/reviews', name: 'Feedback', icon: FaStar },
    { path: '/tutor/wallet', name: 'Wallet', icon: FaWallet },
    { path: '/tutor/upgrade', name: 'Upgrade', icon: FaArrowUp },
    { path: '/tutor/calendar', name: 'Availability', icon: FaClock },
    { path: '/tutor/support', name: 'Support', icon: FaCog }
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
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.name : ''}
              >
                <item.icon className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSidebar; 