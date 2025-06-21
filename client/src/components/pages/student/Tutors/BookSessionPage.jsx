import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaVideo,
  FaChalkboardTeacher,
  FaInfoCircle
} from 'react-icons/fa';

const BookSessionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [subject, setSubject] = useState('');
  const [notes, setNotes] = useState('');

  // Mock data for tutor
  const tutor = {
    id: id,
    name: 'John Doe',
    subject: 'Mathematics',
    hourlyRate: 45,
    image: 'https://via.placeholder.com/150',
    availableSlots: [
      {
        date: '2024-03-20',
        times: ['09:00', '10:00', '11:00', '14:00', '15:00']
      },
      {
        date: '2024-03-21',
        times: ['10:00', '11:00', '13:00', '14:00', '15:00']
      }
    ]
  };

  // Mock data for subjects
  const subjects = [
    'Calculus',
    'Linear Algebra',
    'Statistics',
    'Differential Equations'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement booking logic
    toast.success('Session booked successfully!');
    navigate('/student/sessions');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Book a Session
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Schedule a tutoring session with {tutor.name}
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tutor Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="h-16 w-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {tutor.name}
                  </h3>
                  <p className="text-sm text-gray-500">{tutor.subject} Tutor</p>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  {tutor.availableSlots.map((slot) => (
                    <button
                      key={slot.date}
                      type="button"
                      onClick={() => setSelectedDate(slot.date)}
                      className={`${
                        selectedDate === slot.date
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300'
                      } p-4 border rounded-lg text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      <FaCalendarAlt className="mx-auto h-6 w-6 text-gray-400" />
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        {new Date(slot.date).toLocaleDateString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Time
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-4">
                    {tutor.availableSlots
                      .find((slot) => slot.date === selectedDate)
                      ?.times.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`${
                            selectedTime === time
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-300'
                          } p-4 border rounded-lg text-center hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                          <FaClock className="mx-auto h-6 w-6 text-gray-400" />
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            {time}
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Duration Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Session Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={90}>1.5 hours</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Select a subject</option>
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Any specific topics or questions you'd like to cover?"
                />
              </div>

              {/* Session Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Session Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="text-gray-900">{duration} minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rate</span>
                    <span className="text-gray-900">
                      ${tutor.hourlyRate}/hour
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">
                      ${((duration / 60) * tutor.hourlyRate).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Book Session
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSessionPage; 