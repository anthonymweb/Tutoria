import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionPreferences = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    sessionTypes: {
      online: true,
      physical: false
    },
    availability: {
      monday: { start: '09:00', end: '17:00', enabled: true },
      tuesday: { start: '09:00', end: '17:00', enabled: true },
      wednesday: { start: '09:00', end: '17:00', enabled: true },
      thursday: { start: '09:00', end: '17:00', enabled: true },
      friday: { start: '09:00', end: '17:00', enabled: true },
      saturday: { start: '10:00', end: '14:00', enabled: true },
      sunday: { start: '', end: '', enabled: false }
    },
    sessionLength: 60, // in minutes
    preferredLocation: '',
    maxDistance: 10, // in kilometers
    minNoticePeriod: 24, // in hours
    maxStudentsPerSession: 1
  });

  const handleSessionTypeChange = (type) => {
    setPreferences(prev => ({
      ...prev,
      sessionTypes: {
        ...prev.sessionTypes,
        [type]: !prev.sessionTypes[type]
      }
    }));
  };

  const handleAvailabilityChange = (day, field, value) => {
    setPreferences(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [field]: value
        }
      }
    }));
  };

  const handleToggleDay = (day) => {
    setPreferences(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          enabled: !prev.availability[day].enabled
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!preferences.sessionTypes.online && !preferences.sessionTypes.physical) {
      alert('Please select at least one session type');
      return;
    }

    // Store in localStorage
    const onboardingData = JSON.parse(localStorage.getItem('tutorOnboarding') || '{}');
    localStorage.setItem('tutorOnboarding', JSON.stringify({
      ...onboardingData,
      sessionPreferences: preferences
    }));
    navigate('/tutor/onboarding/payment');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Session Preferences</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure how you want to conduct your tutoring sessions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Session Types */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Session Types</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.sessionTypes.online}
                onChange={() => handleSessionTypeChange('online')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Online Sessions</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.sessionTypes.physical}
                onChange={() => handleSessionTypeChange('physical')}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Physical Sessions</span>
            </label>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Availability</h3>
          <div className="space-y-4">
            {Object.entries(preferences.availability).map(([day, schedule]) => (
              <div key={day} className="flex items-center justify-between">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={schedule.enabled}
                    onChange={() => handleToggleDay(day)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {day}
                  </span>
                </label>
                {schedule.enabled && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="time"
                      value={schedule.start}
                      onChange={(e) => handleAvailabilityChange(day, 'start', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span>to</span>
                    <input
                      type="time"
                      value={schedule.end}
                      onChange={(e) => handleAvailabilityChange(day, 'end', e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Session Settings */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Session Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Session Length (minutes)
              </label>
              <select
                value={preferences.sessionLength}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  sessionLength: parseInt(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Maximum Students per Session
              </label>
              <select
                value={preferences.maxStudentsPerSession}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  maxStudentsPerSession: parseInt(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value={1}>1 student</option>
                <option value={2}>2 students</option>
                <option value={3}>3 students</option>
                <option value={4}>4 students</option>
                <option value={5}>5 students</option>
              </select>
            </div>

            {preferences.sessionTypes.physical && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Preferred Location
                  </label>
                  <input
                    type="text"
                    value={preferences.preferredLocation}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      preferredLocation: e.target.value
                    }))}
                    placeholder="e.g., Kampala, Entebbe"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum Travel Distance (km)
                  </label>
                  <input
                    type="number"
                    value={preferences.maxDistance}
                    onChange={(e) => setPreferences(prev => ({
                      ...prev,
                      maxDistance: parseInt(e.target.value)
                    }))}
                    min="1"
                    max="50"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Notice Period (hours)
              </label>
              <select
                value={preferences.minNoticePeriod}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  minNoticePeriod: parseInt(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value={1}>1 hour</option>
                <option value={2}>2 hours</option>
                <option value={4}>4 hours</option>
                <option value={12}>12 hours</option>
                <option value={24}>24 hours</option>
                <option value={48}>48 hours</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/tutor/onboarding/verification')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Next: Payment Setup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionPreferences; 