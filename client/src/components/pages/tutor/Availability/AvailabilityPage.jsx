import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaSync, FaGoogle, FaPlus, FaTrash } from 'react-icons/fa';

const AvailabilityPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([
    {
      id: 1,
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true
    },
    {
      id: 2,
      day: 'Wednesday',
      startTime: '10:00',
      endTime: '18:00',
      isAvailable: true
    },
    {
      id: 3,
      day: 'Friday',
      startTime: '09:00',
      endTime: '16:00',
      isAvailable: true
    }
  ]);

  const [bufferTime, setBufferTime] = useState(15); // minutes
  const [isGoogleCalendarSynced, setIsGoogleCalendarSynced] = useState(false);

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const handleAddTimeSlot = () => {
    const newSlot = {
      id: Date.now(),
      day: 'Monday',
      startTime: '09:00',
      endTime: '17:00',
      isAvailable: true
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const handleRemoveTimeSlot = (slotId) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== slotId));
  };

  const handleUpdateTimeSlot = (slotId, field, value) => {
    setTimeSlots(timeSlots.map(slot =>
      slot.id === slotId ? { ...slot, [field]: value } : slot
    ));
  };

  const handleToggleAvailability = (slotId) => {
    setTimeSlots(timeSlots.map(slot =>
      slot.id === slotId ? { ...slot, isAvailable: !slot.isAvailable } : slot
    ));
  };

  const handleSyncGoogleCalendar = () => {
    // Implement Google Calendar sync
    setIsGoogleCalendarSynced(!isGoogleCalendarSynced);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Manage Availability
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <button
              onClick={handleSyncGoogleCalendar}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isGoogleCalendarSynced ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              {isGoogleCalendarSynced ? 'Synced with Google Calendar' : 'Sync with Google Calendar'}
            </button>
            <button
              onClick={handleAddTimeSlot}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add Time Slot
            </button>
          </div>
        </div>

        {/* Buffer Time Setting */}
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Session Buffer Time</h3>
          <p className="mt-1 text-sm text-gray-500">
            Set the minimum time required between sessions
          </p>
          <div className="mt-4 flex items-center">
            <input
              type="number"
              min="0"
              max="60"
              value={bufferTime}
              onChange={(e) => setBufferTime(parseInt(e.target.value))}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-20 sm:text-sm border-gray-300 rounded-md"
            />
            <span className="ml-2 text-sm text-gray-500">minutes</span>
          </div>
        </div>

        {/* Time Slots */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Weekly Schedule</h3>
          <div className="mt-4 bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {timeSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={slot.day}
                        onChange={(e) => handleUpdateTimeSlot(slot.id, 'day', e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        {daysOfWeek.map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) => handleUpdateTimeSlot(slot.id, 'startTime', e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) => handleUpdateTimeSlot(slot.id, 'endTime', e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleAvailability(slot.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          slot.isAvailable
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {slot.isAvailable ? 'Available' : 'Unavailable'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemoveTimeSlot(slot.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar Preview */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">Calendar Preview</h3>
          <div className="mt-4 bg-white shadow rounded-lg p-6">
            <div className="aspect-w-16 aspect-h-9">
              {/* Add calendar component here */}
              <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <FaCalendarAlt className="h-12 w-12 text-gray-400" />
                <span className="ml-2 text-gray-500">Calendar Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage; 