import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaSearch, FaCalendarAlt, FaComments, FaUser, FaWallet, FaChartLine, FaStar, FaQuestionCircle, FaArrowUp, FaDollarSign, FaIdBadge, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const StudentSidebar = ({ isCollapsed = true, setIsCollapsed }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/student', icon: FaHome },
    { name: 'Find Tutor', href: '/student/find-tutor', icon: FaSearch },
    { name: 'Sessions', href: '/student/sessions', icon: FaCalendarAlt },
    { name: 'Messages', href: '/student/messages', icon: FaComments },
    { name: 'Wallet', href: '/student/wallet', icon: FaWallet },
    { name: 'Analytics', href: '/student/analytics', icon: FaChartLine },
    { name: 'Profile', href: '/student/profile', icon: FaUser },
    { name: 'Support', href: '/student/support', icon: FaQuestionCircle },
    { name: 'Feedback', href: '/student/feedback', icon: FaStar },
    { name: 'Upgrade', href: '/student/upgrade', icon: FaArrowUp },
    { name: 'Pricing', href: '/student/pricing', icon: FaDollarSign }
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
              <FaChevronRight className="h-5 w-5" />
            ) : (
              <FaChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  location.pathname === item.href
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

export default StudentSidebar; 