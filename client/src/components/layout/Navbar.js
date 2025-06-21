import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaUser, FaBell, FaCog, FaSignOutAlt, FaBook, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  // Check if we're on a public page
  const isPublicPage = ['/', '/about', '/pricing', '/login', '/signup', '/forgot-password', '/becometutor', '/student-landing', '/tutor-landing'].includes(location.pathname);
  
  // Only show these links on public pages
  const publicNavLinks = [
    { to: '/', label: 'Home', icon: FaBook },
    { to: '/about', label: 'About', icon: FaGraduationCap },
    { to: '/becometutor', label: 'Become a Tutor', icon: FaChalkboardTeacher },
    { to: '/student-landing', label: 'Find Tutors', icon: FaBook },
    { to: '/tutor-landing', label: 'Tutor Dashboard', icon: FaChalkboardTeacher }
  ];

  // Show these links when user is logged in
  const privateNavLinks = {
    student: [
      { to: '/student/dashboard', label: 'Dashboard', icon: FaBook },
      { to: '/student/find-tutor', label: 'Find Tutor', icon: FaBook },
      { to: '/student/sessions', label: 'Sessions', icon: FaBook },
      { to: '/student/messages', label: 'Messages', icon: FaBook }
    ],
    tutor: [
      { to: '/tutor/dashboard', label: 'Dashboard', icon: FaChalkboardTeacher },
      { to: '/tutor/sessions', label: 'Sessions', icon: FaBook },
      { to: '/tutor/messages', label: 'Messages', icon: FaBook },
      { to: '/tutor/calendar', label: 'Calendar', icon: FaBook }
    ],
    admin: [
      { to: '/admin/dashboard', label: 'Dashboard', icon: FaBook },
      { to: '/admin/users', label: 'Users', icon: FaBook },
      { to: '/admin/tutors', label: 'Tutors', icon: FaBook },
      { to: '/admin/sessions', label: 'Sessions', icon: FaBook }
    ]
  };

  const navLinks = isPublicPage ? publicNavLinks : privateNavLinks[currentUser?.role] || [];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to={currentUser ? `/${currentUser.role}` : '/'} className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors duration-200">
                Tutoria
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    location.pathname === link.to
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200`}
                >
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {currentUser && !isPublicPage ? (
              <>
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full relative"
                  onClick={() => navigate(`/${currentUser.role}/notifications`)}
                >
                  <FaBell className="h-5 w-5" />
                  {notifications.length > 0 && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </button>

                <div className="relative profile-dropdown">
                  <button
                    onClick={toggleProfile}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <FaUser className="h-4 w-4 text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          <Link
                            to={`/${currentUser.role}/profile`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaUser className="mr-3 h-4 w-4" />
                            Profile
                          </Link>
                          <Link
                            to={`/${currentUser.role}/settings`}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FaCog className="mr-3 h-4 w-4" />
                            Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <FaSignOutAlt className="mr-3 h-4 w-4" />
                            {isLoading ? 'Logging out...' : 'Logout'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${
                    location.pathname === '/login'
                      ? 'text-indigo-600'
                      : 'text-gray-500 hover:text-gray-700'
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`${
                    location.pathname === '/signup'
                      ? 'bg-indigo-700'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    location.pathname === link.to
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <link.icon className="h-5 w-5 mr-3" />
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 