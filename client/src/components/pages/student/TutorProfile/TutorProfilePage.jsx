import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaVideo, FaMapMarkerAlt, FaGraduationCap, FaClock, FaCalendarAlt, FaComment } from 'react-icons/fa';

const TutorProfilePage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMode, setSelectedMode] = useState('online');

  // Mock data - replace with actual data from your backend
  const tutor = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    rating: 4.8,
    reviews: 128,
    subjects: ['Calculus', 'Linear Algebra', 'Statistics'],
    mode: 'online',
    price: 25,
    availability: 'Mon-Fri, 9AM-5PM',
    bio: 'PhD in Mathematics with 10 years of teaching experience. Specializing in advanced calculus and linear algebra.',
    education: [
      {
        degree: 'PhD in Mathematics',
        institution: 'Stanford University',
        year: '2015'
      },
      {
        degree: 'MSc in Applied Mathematics',
        institution: 'MIT',
        year: '2012'
      }
    ],
    experience: [
      {
        position: 'Senior Mathematics Tutor',
        company: 'Tutoria',
        duration: '2018-Present'
      },
      {
        position: 'Mathematics Professor',
        company: 'University of California',
        duration: '2015-2018'
      }
    ],
    reviews: [
      {
        id: 1,
        student: 'John Doe',
        rating: 5,
        comment: 'Excellent tutor! Very patient and knowledgeable.',
        date: '2024-03-15'
      },
      {
        id: 2,
        student: 'Jane Smith',
        rating: 4,
        comment: 'Great teaching style and very helpful.',
        date: '2024-03-10'
      }
    ]
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Tutor Info */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex items-center">
                  <img
                    className="h-24 w-24 rounded-full object-cover"
                    src={tutor.image}
                    alt={tutor.name}
                  />
                  <div className="ml-6">
                    <h1 className="text-2xl font-bold text-gray-900">{tutor.name}</h1>
                    <div className="flex items-center mt-2">
                      <FaStar className="h-5 w-5 text-yellow-400" />
                      <span className="ml-1 text-lg text-gray-600">
                        {tutor.rating} ({tutor.reviews.length} reviews)
                      </span>
                    </div>
                    <div className="mt-2 flex items-center text-gray-500">
                      {tutor.mode === 'online' ? (
                        <FaVideo className="h-5 w-5 text-green-500 mr-2" />
                      ) : (
                        <FaMapMarkerAlt className="h-5 w-5 text-blue-500 mr-2" />
                      )}
                      <span>{tutor.mode}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">About</h2>
                  <p className="mt-2 text-gray-600">{tutor.bio}</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">Subjects</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tutor.subjects.map(subject => (
                      <span
                        key={subject}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">Education</h2>
                  <div className="mt-2 space-y-4">
                    {tutor.education.map((edu, index) => (
                      <div key={index} className="flex items-start">
                        <FaGraduationCap className="h-5 w-5 text-indigo-500 mt-1" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{edu.degree}</p>
                          <p className="text-sm text-gray-500">{edu.institution}</p>
                          <p className="text-sm text-gray-500">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">Experience</h2>
                  <div className="mt-2 space-y-4">
                    {tutor.experience.map((exp, index) => (
                      <div key={index} className="flex items-start">
                        <FaClock className="h-5 w-5 text-indigo-500 mt-1" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{exp.position}</p>
                          <p className="text-sm text-gray-500">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
                  <div className="mt-2 space-y-4">
                    {tutor.reviews.map(review => (
                      <div key={review.id} className="border-b border-gray-200 pb-4">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <FaStar key={i} className="h-4 w-4 text-yellow-400" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                        <p className="mt-1 text-sm font-medium text-gray-900">- {review.student}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Book a Session</h2>
                <div className="mt-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mode</label>
                    <div className="mt-2 space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-indigo-600"
                          name="mode"
                          value="online"
                          checked={selectedMode === 'online'}
                          onChange={(e) => setSelectedMode(e.target.value)}
                        />
                        <span className="ml-2">Online</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-indigo-600"
                          name="mode"
                          value="physical"
                          checked={selectedMode === 'physical'}
                          onChange={(e) => setSelectedMode(e.target.value)}
                        />
                        <span className="ml-2">Physical</span>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Price per hour</span>
                      <span className="text-sm font-medium text-gray-900">${tutor.price}</span>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-sm font-medium text-gray-900">Total</span>
                      <span className="text-sm font-medium text-gray-900">${tutor.price}</span>
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Book Session
                  </button>

                  <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center">
                    <FaComment className="h-5 w-5 mr-2" />
                    Message Tutor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TutorProfilePage; 