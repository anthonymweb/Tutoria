import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaVideo, FaMapMarkerAlt, FaCreditCard, FaMobileAlt, FaWallet } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookSessionPage = () => {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tutor, setTutor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMode, setSelectedMode] = useState('online');
  const [selectedDuration, setSelectedDuration] = useState('60');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const durations = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit Card', icon: FaCreditCard },
    { id: 'mobile', name: 'Mobile Money', icon: FaMobileAlt },
    { id: 'wallet', name: 'Wallet Balance', icon: FaWallet }
  ];

  // Fetch tutor details
  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await axios.get(`/api/tutor-profile/${tutorId}`);
        setTutor(response.data.tutor);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tutor details:', error);
        toast.error('Error loading tutor details');
        setLoading(false);
      }
    };

    fetchTutorDetails();
  }, [tutorId]);

  // Fetch available slots when date is selected
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!selectedDate) return;

      try {
        const response = await axios.get(`/api/book-session/tutor/${tutorId}/availability`, {
          params: { date: selectedDate }
        });
        setAvailableSlots(response.data.availableSlots);
      } catch (error) {
        console.error('Error fetching available slots:', error);
        toast.error('Error loading available time slots');
      }
    };

    fetchAvailableSlots();
  }, [tutorId, selectedDate]);

  const calculateTotal = () => {
    if (!tutor) return 0;
    return (tutor.hourlyRate * parseInt(selectedDuration)) / 60;
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedDuration) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedMode === 'physical' && !location) {
      toast.error('Please provide a location for physical session');
      return;
    }

    try {
      const startTime = new Date(`${selectedDate}T${selectedTime}`);
      const response = await axios.post(`/api/book-session/tutor/${tutorId}/book`, {
        startTime,
        duration: parseInt(selectedDuration),
        subject: tutor.subjects[0], // You might want to let students select a subject
        type: selectedMode,
        notes,
        location: selectedMode === 'physical' ? location : undefined
      });

      toast.success('Session booked successfully!');
      navigate(`/student/sessions/${response.data.session.id}`);
    } catch (error) {
      console.error('Error booking session:', error);
      toast.error(error.response?.data?.message || 'Error booking session');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Tutor not found</h2>
          <p className="mt-2 text-gray-600">The tutor you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-8">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : tutor ? (
                  <>
                    <div className="flex items-center mb-6">
                      <img
                        className="h-16 w-16 rounded-full object-cover"
                        src={tutor.user.profileImage}
                        alt={tutor.user.name}
                      />
                      <div className="ml-4">
                        <h1 className="text-2xl font-bold text-gray-900">{tutor.user.name}</h1>
                        <p className="text-gray-500">{tutor.subjects.join(', ')}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Select Date</label>
                        <div className="mt-2">
                          <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      </div>

                      {/* Time Selection */}
                      {selectedDate && availableSlots.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Select Time</label>
                          <div className="mt-2 grid grid-cols-3 gap-4">
                            {availableSlots.map((time) => (
                              <button
                                key={time}
                                className={`p-3 border rounded-lg text-center ${
                                  selectedTime === time
                                    ? 'border-indigo-500 bg-indigo-50'
                                    : 'border-gray-300 hover:border-indigo-500'
                                }`}
                                onClick={() => setSelectedTime(time)}
                              >
                                <FaClock className="mx-auto h-5 w-5 text-gray-400" />
                                <span className="mt-1 block text-sm font-medium text-gray-900">
                                  {time}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Duration Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Session Duration</label>
                        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {durations.map((duration) => (
                            <button
                              key={duration.value}
                              className={`p-3 border rounded-lg text-center ${
                                selectedDuration === duration.value
                                  ? 'border-indigo-500 bg-indigo-50'
                                  : 'border-gray-300 hover:border-indigo-500'
                              }`}
                              onClick={() => setSelectedDuration(duration.value)}
                            >
                              <span className="block text-sm font-medium text-gray-900">
                                {duration.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Mode Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Session Mode</label>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <button
                            className={`p-4 border rounded-lg text-center ${
                              selectedMode === 'online'
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300 hover:border-indigo-500'
                            }`}
                            onClick={() => setSelectedMode('online')}
                          >
                            <FaVideo className="mx-auto h-6 w-6 text-gray-400" />
                            <span className="mt-2 block text-sm font-medium text-gray-900">Online</span>
                          </button>
                          <button
                            className={`p-4 border rounded-lg text-center ${
                              selectedMode === 'physical'
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-300 hover:border-indigo-500'
                            }`}
                            onClick={() => setSelectedMode('physical')}
                          >
                            <FaMapMarkerAlt className="mx-auto h-6 w-6 text-gray-400" />
                            <span className="mt-2 block text-sm font-medium text-gray-900">Physical</span>
                          </button>
                        </div>
                      </div>

                      {/* Location for Physical Sessions */}
                      {selectedMode === 'physical' && (
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter meeting location"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                      )}

                      {/* Notes */}
                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add any specific requirements or topics you'd like to cover"
                          rows="3"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Payment Method */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <div className="mt-2 grid grid-cols-3 gap-4">
                          {paymentMethods.map((method) => (
                            <button
                              key={method.id}
                              className={`p-4 border rounded-lg text-center ${
                                selectedPayment === method.id
                                  ? 'border-indigo-500 bg-indigo-50'
                                  : 'border-gray-300 hover:border-indigo-500'
                              }`}
                              onClick={() => setSelectedPayment(method.id)}
                            >
                              <method.icon className="mx-auto h-6 w-6 text-gray-400" />
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                {method.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-bold text-gray-900">Tutor not found</h2>
                    <p className="mt-2 text-gray-600">The tutor you're looking for doesn't exist or has been removed.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Session Duration</span>
                    <span className="text-sm font-medium text-gray-900">
                      {selectedDuration} minutes
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Price per hour</span>
                    <span className="text-sm font-medium text-gray-900">${tutor.hourlyRate}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-medium text-gray-900">
                        ${calculateTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime || !selectedDuration}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Confirm Booking
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

export default BookSessionPage; 