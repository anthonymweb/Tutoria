import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TutorApplicationForm from './TutorApplicationForm';
import { FaCheckCircle, FaGraduationCap, FaBriefcase, FaClock, FaMoneyBillWave, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BecomeTutorPage = () => {
  const navigate = useNavigate();
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    checkApplicationStatus();
  }, []);

  const checkApplicationStatus = async () => {
    // TODO: Wire up real status check via mongoRealm.js if needed
    setApplicationStatus(null); // Always allow to apply for now
  };


  const fileToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleApply = () => {
    setShowForm(true);
  };

  const benefits = [
    {
      icon: <FaGraduationCap className="text-blue-600" />,
      title: 'Share Your Knowledge',
      description: 'Teach subjects you\'re passionate about and help students achieve their goals.'
    },
    {
      icon: <FaBriefcase className="text-blue-600" />,
      title: 'Flexible Schedule',
      description: 'Set your own hours and work from anywhere with an internet connection.'
    },
    {
      icon: <FaMoneyBillWave className="text-blue-600" />,
      title: 'Competitive Earnings',
      description: 'Set your own rates and earn what you deserve for your expertise.'
    },
    {
      icon: <FaShieldAlt className="text-blue-600" />,
      title: 'Secure Platform',
      description: 'Our platform ensures safe and secure payments for all sessions.'
    },
    {
      icon: <FaHeadset className="text-blue-600" />,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our dedicated support team.'
    }
  ];

  const requirements = [
    'Bachelor\'s degree or higher in your subject area',
    'Teaching or tutoring experience preferred',
    'Strong communication skills',
    'Reliable internet connection',
    'Valid government-issued ID',
    'Professional references',
    'Background check clearance'
  ];

  if (showForm) {
    return <TutorApplicationForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Become a Tutor</h1>
          <p className="text-lg md:text-xl text-gray-700 text-center mb-10">
            Share your knowledge, earn competitive rates, and make a difference in students' lives
          </p>

          <div className="text-center my-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
              onClick={handleApply}
            >
              Apply Now
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Why Become a Tutor?</h2>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="mt-1">{benefit.icon}</div>
                  <div>
                    <h3 className="font-semibold">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Requirements</h2>
            <ul className="space-y-4">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-10 mt-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">1. Apply</h3>
              <p className="text-gray-600">Complete our application form and submit required documents</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">2. Get Verified</h3>
              <p className="text-gray-600">We'll review your application and verify your credentials</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-3">3. Start Teaching</h3>
              <p className="text-gray-600">Set your schedule, create your profile, and start accepting students</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
            onClick={handleApply}
          >
            Start Your Application
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BecomeTutorPage;