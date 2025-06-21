import React, { useState } from 'react';

const AvailabilityPage = () => {
  const [availability, setAvailability] = useState({
    monday: { start: '09:00', end: '17:00', available: true },
    tuesday: { start: '09:00', end: '17:00', available: true },
    wednesday: { start: '09:00', end: '17:00', available: true },
    thursday: { start: '09:00', end: '17:00', available: true },
    friday: { start: '09:00', end: '17:00', available: true },
    saturday: { start: '09:00', end: '17:00', available: false },
    sunday: { start: '09:00', end: '17:00', available: false }
  });

  const handleTimeChange = (day, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleAvailabilityToggle = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        available: !prev[day].available
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Set Your Availability</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          {Object.entries(availability).map(([day, schedule]) => (
            <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={schedule.available}
                  onChange={() => handleAvailabilityToggle(day)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-lg font-medium capitalize">{day}</label>
              </div>
              {schedule.available && (
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                      type="time"
                      value={schedule.start}
                      onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                      type="time"
                      value={schedule.end}
                      onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button
            type="button"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityPage; 