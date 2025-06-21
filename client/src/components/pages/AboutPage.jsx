import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaChalkboardTeacher, FaUsers, FaLaptopCode, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaGraduationCap className="h-8 w-8 text-indigo-600" />,
    title: 'Expert Tutors',
    description: 'Learn from qualified tutors with proven expertise in their fields.',
  },
  {
    icon: <FaChalkboardTeacher className="h-8 w-8 text-indigo-600" />,
    title: 'Interactive Learning',
    description: 'Engage in live sessions with real-time feedback and personalized attention.',
  },
  {
    icon: <FaUsers className="h-8 w-8 text-indigo-600" />,
    title: 'Community',
    description: 'Join a vibrant community of learners and educators.',
  },
  {
    icon: <FaLaptopCode className="h-8 w-8 text-indigo-600" />,
    title: 'Modern Platform',
    description: 'Experience seamless learning with our cutting-edge technology.',
  },
  {
    icon: <FaChartLine className="h-8 w-8 text-indigo-600" />,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed analytics and insights.',
  },
  {
    icon: <FaShieldAlt className="h-8 w-8 text-indigo-600" />,
    title: 'Secure Environment',
    description: 'Learn in a safe and secure environment with verified tutors.',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl"
            >
              About Tutoria
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 max-w-2xl mx-auto text-xl text-gray-500"
            >
              Empowering learners and educators through innovative online tutoring
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="py-16 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Making Quality Education Accessible
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We believe that everyone deserves access to quality education. Our platform connects passionate tutors with eager learners, creating meaningful learning experiences that drive personal and professional growth.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-50 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-indigo-700"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-200">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage; 