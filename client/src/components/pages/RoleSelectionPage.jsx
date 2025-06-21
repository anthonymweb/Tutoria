import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';

const RoleSelectionPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8">
              Choose Your Path
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Select how you want to use our platform
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Student Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaGraduationCap className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Student</h2>
                <p className="text-gray-600 mb-6">
                  Find the perfect tutor to help you achieve your learning goals
                </p>
                <Link
                  to="/student-landing"
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Continue as Student
                </Link>
              </motion.div>

              {/* Tutor Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaChalkboardTeacher className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Tutor</h2>
                <p className="text-gray-600 mb-6">
                  Share your knowledge and earn by teaching students
                </p>
                <Link
                  to="/tutor-landing"
                  className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Continue as Tutor
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default RoleSelectionPage; 