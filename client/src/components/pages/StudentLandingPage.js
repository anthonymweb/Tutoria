import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaClock,
  FaChartLine,
  FaUserFriends,
  FaLaptop,
  FaStar,
  FaQuoteLeft,
  FaUsers,
  FaBook,
  FaCheckCircle,
  FaSearch,
  FaCalendarAlt,
  FaVideo,
  FaChevronDown
} from 'react-icons/fa';

const StudentLandingPage = () => {
  const features = [
    {
      icon: FaGraduationCap,
      title: 'Expert Tutors',
      description: 'Learn from qualified tutors with proven expertise in their fields.'
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Personalized Learning',
      description: 'Get customized learning plans tailored to your goals and pace.'
    },
    {
      icon: FaClock,
      title: 'Flexible Scheduling',
      description: 'Book sessions that fit your schedule, anytime, anywhere.'
    },
    {
      icon: FaChartLine,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics and feedback.'
    },
    {
      icon: FaUserFriends,
      title: 'Interactive Sessions',
      description: 'Engage in live, interactive sessions with your tutors.'
    },
    {
      icon: FaLaptop,
      title: 'Online Learning',
      description: 'Access quality education from the comfort of your home.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'High School Student',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The personalized attention and flexible scheduling have made learning so much more effective for me.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'College Student',
      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The quality of tutors and the interactive learning environment have helped me excel in my studies.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Professional Learner',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      quote: 'The platform has made it easy to balance my professional development with my busy schedule.',
      rating: 5
    }
  ];

  const stats = [
    { label: 'Active Students', value: '10,000+' },
    { label: 'Expert Tutors', value: '1,000+' },
    { label: 'Subjects', value: '50+' },
    { label: 'Success Rate', value: '95%' }
  ];

  const howItWorks = [
    {
      icon: FaSearch,
      title: 'Find Your Tutor',
      description: 'Browse through our extensive list of qualified tutors and find the perfect match for your learning needs.'
    },
    {
      icon: FaCalendarAlt,
      title: 'Book a Session',
      description: 'Choose a convenient time slot and schedule your learning session with just a few clicks.'
    },
    {
      icon: FaVideo,
      title: 'Start Learning',
      description: 'Connect with your tutor through our interactive platform and begin your learning journey.'
    },
    {
      icon: FaChartLine,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics and regular feedback from your tutor.'
    }
  ];

  const subjects = [
    { name: 'Mathematics', icon: '📐' },
    { name: 'Physics', icon: '⚛️' },
    { name: 'Chemistry', icon: '🧪' },
    { name: 'Biology', icon: '🧬' },
    { name: 'Computer Science', icon: '💻' },
    { name: 'Languages', icon: '🌍' },
    { name: 'Business', icon: '💼' },
    { name: 'Arts', icon: '🎨' }
  ];

  const faqs = [
    {
      question: 'How do I find the right tutor?',
      answer: 'You can browse through our tutor profiles, filter by subject, experience level, and ratings. Each tutor has a detailed profile with their qualifications, teaching style, and student reviews.'
    },
    {
      question: 'What subjects do you offer?',
      answer: 'We offer a wide range of subjects from K-12 to university level, including mathematics, sciences, languages, business, and more. Check our subject categories for a complete list.'
    },
    {
      question: 'How are the sessions conducted?',
      answer: 'Sessions are conducted through our interactive online platform, which includes video conferencing, screen sharing, and a virtual whiteboard. You can also schedule in-person sessions if available in your area.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'Our pricing varies based on the tutor\'s experience, subject, and session duration. You can view detailed pricing information on each tutor\'s profile.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="Students learning"
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Transform Your Learning Journey
          </h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            Connect with expert tutors, schedule flexible sessions, and achieve your academic goals with personalized learning experiences.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/signup">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Login
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

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our Platform?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Experience the best in online tutoring with our comprehensive features
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Get started with your learning journey in four simple steps
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {howItWorks.map((step, index) => (
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
                  {index < howItWorks.length - 1 && (
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

      {/* Subject Categories Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Popular Subjects
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find expert tutors for any subject you need
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {subjects.map((subject, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="text-3xl mb-2">{subject.icon}</div>
                  <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of satisfied students who have transformed their learning experience
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">
                    <FaQuoteLeft className="inline-block mr-2 text-indigo-500" />
                    {testimonial.quote}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about our platform
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
                  className="bg-gray-50 rounded-lg p-6"
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
            <span className="block">Ready to start learning?</span>
            <span className="block text-indigo-200">Find your perfect tutor today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/signup">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                  Sign Up
                </button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/login">
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLandingPage;
