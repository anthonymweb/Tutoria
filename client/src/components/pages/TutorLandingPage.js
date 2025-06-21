import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaClock,
  FaChartLine,
  FaMoneyBillWave,
  FaUsers,
  FaLaptop,
  FaStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaUserPlus,
  FaFileAlt,
  FaVideo,
  FaChalkboardTeacher,
  FaChevronDown
} from 'react-icons/fa';

const TutorLandingPage = () => {
  const benefits = [
    {
      icon: FaMoneyBillWave,
      title: 'Competitive Earnings',
      description: 'Set your own rates and earn what you deserve for your expertise.'
    },
    {
      icon: FaClock,
      title: 'Flexible Schedule',
      description: 'Choose your own hours and work from anywhere in the world.'
    },
    {
      icon: FaUsers,
      title: 'Global Reach',
      description: 'Connect with students worldwide and expand your teaching impact.'
    },
    {
      icon: FaChartLine,
      title: 'Career Growth',
      description: 'Build your reputation and grow your tutoring business.'
    },
    {
      icon: FaLaptop,
      title: 'Modern Platform',
      description: 'Access our advanced teaching tools and interactive features.'
    },
    {
      icon: FaStar,
      title: 'Student Reviews',
      description: 'Build your profile with authentic student testimonials.'
    }
  ];

  const applicationSteps = [
    {
      icon: FaUserPlus,
      title: 'Create Profile',
      description: 'Sign up and complete your professional profile with your qualifications and expertise.'
    },
    {
      icon: FaFileAlt,
      title: 'Submit Documents',
      description: 'Upload your certifications, degrees, and teaching credentials for verification.'
    },
    {
      icon: FaVideo,
      title: 'Demo Session',
      description: 'Conduct a sample teaching session to showcase your teaching style.'
    },
    {
      icon: FaCheckCircle,
      title: 'Get Approved',
      description: 'Once approved, start accepting students and begin your teaching journey.'
    }
  ];

  const successStories = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Mathematics Tutor',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The platform has allowed me to reach students globally while maintaining a perfect work-life balance.',
      rating: 5,
      earnings: '$5,000+ monthly'
    },
    {
      name: 'Prof. Michael Chen',
      role: 'Physics Tutor',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The teaching tools and student management features have made my tutoring experience seamless and efficient.',
      rating: 5,
      earnings: '$4,500+ monthly'
    },
    {
      name: 'Dr. Emily Davis',
      role: 'Language Tutor',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'I\'ve been able to build a successful tutoring business while pursuing my passion for teaching.',
      rating: 5,
      earnings: '$6,000+ monthly'
    }
  ];

  const stats = [
    { label: 'Active Tutors', value: '1,000+' },
    { label: 'Average Rating', value: '4.8/5' },
    { label: 'Monthly Earnings', value: '$3,000+' },
    { label: 'Student Success', value: '95%' }
  ];

  const faqs = [
    {
      question: 'What qualifications do I need?',
      answer: 'We require a minimum of a bachelor\'s degree in your subject area, teaching experience, and relevant certifications. However, we also consider exceptional candidates with proven expertise.'
    },
    {
      question: 'How much can I earn?',
      answer: 'Earnings vary based on your experience, subject, and hours worked. Our tutors typically earn between $30-100 per hour, with top tutors earning $5,000+ monthly.'
    },
    {
      question: 'What teaching tools are available?',
      answer: 'Our platform provides video conferencing, screen sharing, virtual whiteboard, file sharing, and progress tracking tools to enhance your teaching experience.'
    },
    {
      question: 'How do I get paid?',
      answer: 'We offer secure, automated payments on a weekly basis. You can choose between bank transfer, PayPal, or other payment methods available in your region.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Teaching"
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Share Your Knowledge, Build Your Future
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Join our community of expert tutors and transform your teaching passion into a rewarding career. Set your own schedule, earn competitive rates, and make a global impact.
          </p>
          <div className="mt-10">
            <Link to="/tutor/apply">
              <button className="inline-block px-6 py-3 bg-white text-indigo-700 font-semibold rounded-md shadow hover:bg-indigo-50 transition">
                Become a Tutor
              </button>
            </Link>
            <Link to="/login">
              <button className="inline-block ml-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition">
                Login to Start
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      {/* <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-extrabold text-indigo-600">{stat.value}</div>
                <div className="mt-2 text-base text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Teach With Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover the advantages of joining our tutoring platform
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Process Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How to Get Started
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join our community in four simple steps
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500 text-center">{step.description}</p>
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <FaChevronDown className="h-6 w-6 text-indigo-500 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Meet some of our successful tutors
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {successStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={story.image}
                      alt={story.name}
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{story.name}</h4>
                      <p className="text-sm text-gray-500">{story.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">
                    <FaQuoteLeft className="inline-block mr-2 text-indigo-500" />
                    {story.quote}
                  </p>
                  <p className="text-indigo-600 font-medium">
                    {story.earnings}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about becoming a tutor
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-lg"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  <p className="mt-2 text-base text-gray-500">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start teaching?</span>
            <span className="block text-indigo-200">Join our community of expert tutors today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/tutor/apply">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                  Apply Now
                </button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/tutor/support">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorLandingPage;