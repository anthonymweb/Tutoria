import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGraduationCap, FaChalkboardTeacher, FaBook, FaUsers, FaCheckCircle, FaStar, FaShieldAlt, FaComments, FaDollarSign, FaRocket, FaCalendarAlt, FaChartLine, FaSearch,
} from 'react-icons/fa';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const LandingPage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote: "Tutoria transformed my learning experience. Finding a tutor was incredibly easy, and the personalized sessions helped me ace my exams!",
      author: "Alice Johnson",
      title: "High School Student",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 2,
      quote: "As a tutor, Tutoria provides an excellent platform to connect with students. The tools are intuitive, and the support is fantastic.",
      author: "Mark Davis",
      title: "Experienced Tutor",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 3,
      quote: "I highly recommend Tutoria. The variety of subjects and the quality of tutors are unmatched. It's truly a game-changer for online education.",
      author: "Sarah Lee",
      title: "University Student",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
  ];

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const stats = [
    { number: "1000+", label: "Active Students", icon: FaUsers },
    { number: "500+", label: "Qualified Tutors", icon: FaChalkboardTeacher },
    { number: "50+", label: "Subjects Covered", icon: FaBook },
    { number: "98%", label: "Satisfaction Rate", icon: FaCheckCircle }
  ];

  const features = [
    {
      name: "Expert Tutors",
      description: "Connect with certified and experienced tutors across various subjects, ensuring high-quality education.",
      icon: FaGraduationCap,
    },
    {
      name: "Personalized Learning",
      description: "Receive one-on-one sessions tailored to your unique learning style and academic goals.",
      icon: FaStar,
    },
    {
      name: "Flexible Scheduling",
      description: "Book sessions at your convenience, anytime and anywhere, to fit your busy lifestyle.",
      icon: FaCalendarAlt,
    },
    {
      name: "Secure Payments",
      description: "Enjoy hassle-free and secure transactions with our integrated payment system.",
      icon: FaShieldAlt,
    },
    {
      name: "Interactive Classrooms",
      description: "Utilize our virtual classroom with whiteboard, chat, and video for an engaging experience.",
      icon: FaComments,
    },
    {
      name: "Progress Tracking",
      description: "Monitor your learning journey and academic improvements with detailed progress reports.",
      icon: FaChartLine,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
   
      
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden pt-14 bg-gradient-to-br from-indigo-50 to-blue-100">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
              {/* Multi-colored Tutoria heading */}
              <h1 className="text-5xl font-extrabold mb-4 flex space-x-1">
                <span className="text-red-500">T</span>
                <span className="text-orange-500">u</span>
                <span className="text-yellow-500">t</span>
                <span className="text-green-500">o</span>
                <span className="text-blue-500">r</span>
                <span className="text-indigo-500">i</span>
                <span className="text-purple-500">a</span>
              </h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              >
                Learn Anything Anywhere Anytime.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="mt-6 text-lg leading-8 text-gray-600"
              >
                Connect with expert tutors from around the globe for subjects ranging from math and science to languages and arts. Your learning journey, personalized.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
                className="mt-10 flex items-center gap-x-6"
              >
                <Link
                  to="/student-landing"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Start Learning
                </Link>
                <Link to="/tutor-landing" className="text-sm font-semibold leading-6 text-gray-900 flex items-center group">
                  Become a Tutor <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
              className="relative mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow"
            >
              <img
                className="w-full max-w-lg rounded-xl shadow-xl ring-1 ring-gray-900/5 lg:max-w-none"
                src="https://plus.unsplash.com/premium_photo-1683141015555-0afc82d90be9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHR1dG9yaW5nfGVufDB8fDB8fHww"
                alt="Students learning together"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        {/* <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center lg:max-w-none lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex flex-col items-center justify-center"
                >
                  <stat.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <p className="text-5xl font-bold tracking-tight text-gray-900">{stat.number}</p>
                  <p className="mt-2 text-lg leading-8 text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div> */}

        {/* How It Works Section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Simple Steps</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Your Learning Journey Starts Here
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Getting started with personalized tutoring is easy. Follow these simple steps to connect with expert educators and achieve your goals.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex flex-col text-center items-center"
                >
                  <div className="relative text-indigo-600 mb-6">
                    <FaUsers className="h-16 w-16 mx-auto" />
                    <span className="absolute -top-4 -right-4 bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">1</span>
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">Create Your Profile</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Sign up as a student or tutor and complete your profile. It's quick, easy, and your first step towards success.
                  </dd>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex flex-col text-center items-center"
                >
                  <div className="relative text-indigo-600 mb-6">
                    <FaSearch className="h-16 w-16 mx-auto" />
                    <span className="absolute -top-4 -right-4 bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">2</span>
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">Find Your Perfect Match</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Browse our extensive network of qualified tutors or students. Use filters to find your ideal learning partner.
                  </dd>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex flex-col text-center items-center"
                >
                  <div className="relative text-indigo-600 mb-6">
                    <FaRocket className="h-16 w-16 mx-auto" />
                    <span className="absolute -top-4 -right-4 bg-indigo-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold text-lg">3</span>
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">Start Your Session</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    Connect in our interactive virtual classroom. Begin your personalized learning journey and achieve your academic goals.
                  </dd>
                </motion.div>
              </dl>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">Why Tutoria?</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The Best Platform for Online Tutoring
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Discover the key features that make Tutoria your top choice for both learning and teaching online.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex flex-col"
                  >
                    <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-8 w-8 flex-none text-indigo-600" aria-hidden="true" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">What Our Users Say</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by Students and Tutors Worldwide
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Don't just take our word for it. Hear from those who have experienced the difference with Tutoria.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 place-items-center lg:mx-0 lg:max-w-none">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={testimonials[currentTestimonial].id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative isolate bg-white px-10 py-12 shadow-lg ring-1 ring-gray-900/5 sm:rounded-3xl sm:px-12 w-full md:w-3/4 lg:w-2/3"
                >
                  <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                    <p>"{testimonials[currentTestimonial].quote}"</p>
                  </blockquote>
                  <figcaption className="mt-10 flex items-center justify-center gap-x-6">
                    <img className="h-16 w-16 rounded-full bg-gray-50" src={testimonials[currentTestimonial].avatar} alt="" />
                    <div className="text-base">
                      <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</div>
                      <div className="mt-1 text-gray-500">{testimonials[currentTestimonial].title}</div>
                    </div>
                  </figcaption>
                  <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
                    <button onClick={handlePrevTestimonial} className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`h-2 w-2 rounded-full ${index === currentTestimonial ? 'bg-indigo-600' : 'bg-indigo-200'}`}
                        aria-label={`Testimonial ${index + 1}`}
                      />
                    ))}
                    <button onClick={handleNextTestimonial} className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200">
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
                  </div>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Learning?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Join Tutoria today and embark on a journey of personalized education. Whether you're a student seeking guidance or a tutor ready to share your expertise, your next step starts here.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/role-selection"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
            <Link to="/role-selection" className="text-sm font-semibold leading-6 text-white flex items-center group">
              Learn more <span aria-hidden="true" className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#8d958453-cefd-4ae2-bc59-ea167f7fd6ad)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="8d958453-cefd-4ae2-bc59-ea167f7fd6ad">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage; 