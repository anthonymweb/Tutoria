import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaSignOutAlt } from 'react-icons/fa';

const StudentNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear auth tokens here
    navigate('/student-landing');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/student" className="text-2xl font-bold text-indigo-600">
              TutorHub
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/student/messages" className="text-gray-600 hover:text-indigo-600 flex items-center mr-4">
              <FaEnvelope className="h-6 w-6" />
            </Link>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
            >
              <FaSignOutAlt className="inline mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;