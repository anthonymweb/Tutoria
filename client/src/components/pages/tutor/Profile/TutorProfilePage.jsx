import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaBook, FaLanguage, FaClock, FaDollarSign, FaEdit, FaSave } from 'react-icons/fa';

const TutorProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      location: 'New York, USA',
      timezone: 'America/New_York',
      bio: 'Experienced mathematics tutor with a passion for helping students achieve their academic goals.'
    },
    qualifications: [
      {
        id: 1,
        degree: 'Master of Science in Mathematics',
        institution: 'Stanford University',
        year: '2020',
        description: 'Specialized in Applied Mathematics'
      },
      {
        id: 2,
        degree: 'Bachelor of Science in Mathematics',
        institution: 'University of California, Berkeley',
        year: '2018',
        description: 'Minor in Computer Science'
      }
    ],
    subjects: [
      { id: 1, name: 'Mathematics', level: 'Advanced', yearsOfExperience: 5 },
      { id: 2, name: 'Physics', level: 'Intermediate', yearsOfExperience: 3 },
      { id: 3, name: 'Computer Science', level: 'Advanced', yearsOfExperience: 4 }
    ],
    languages: [
      { id: 1, language: 'English', proficiency: 'Native' },
      { id: 2, language: 'Spanish', proficiency: 'Fluent' },
      { id: 3, language: 'French', proficiency: 'Intermediate' }
    ],
    hourlyRate: 50,
    availability: {
      monday: { start: '09:00', end: '17:00' },
      tuesday: { start: '09:00', end: '17:00' },
      wednesday: { start: '09:00', end: '17:00' },
      thursday: { start: '09:00', end: '17:00' },
      friday: { start: '09:00', end: '17:00' },
      saturday: { start: '10:00', end: '14:00' },
      sunday: { start: '10:00', end: '14:00' }
    }
  });

  const handleSave = () => {
    // TODO: Implement save functionality with backend
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Profile Settings
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <FaSave className="mr-2" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <FaUser className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={profile.personalInfo.firstName}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={profile.personalInfo.lastName}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={profile.personalInfo.email}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={profile.personalInfo.phone}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={profile.personalInfo.location}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                value={profile.personalInfo.bio}
                disabled={!isEditing}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Qualifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <FaGraduationCap className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Qualifications</h3>
          </div>
          <div className="space-y-4">
            {profile.qualifications.map((qual) => (
              <div key={qual.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input
                      type="text"
                      value={qual.degree}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <input
                      type="text"
                      value={qual.institution}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    value={qual.description}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subjects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <FaBook className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Subjects</h3>
          </div>
          <div className="space-y-4">
            {profile.subjects.map((subject) => (
              <div key={subject.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      value={subject.name}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Level</label>
                    <select
                      value={subject.level}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <input
                      type="number"
                      value={subject.yearsOfExperience}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <FaLanguage className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Languages</h3>
          </div>
          <div className="space-y-4">
            {profile.languages.map((lang) => (
              <div key={lang.id} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Language</label>
                    <input
                      type="text"
                      value={lang.language}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Proficiency</label>
                    <select
                      value={lang.proficiency}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Fluent</option>
                      <option>Native</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Hourly Rate */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <FaDollarSign className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Hourly Rate</h3>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rate per Hour (USD)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                value={profile.hourlyRate}
                disabled={!isEditing}
                className="mt-1 block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <div className="flex items-center mb-4">
            <FaClock className="h-6 w-6 text-indigo-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Default Availability</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(profile.availability).map(([day, hours]) => (
              <div key={day} className="grid grid-cols-3 gap-4 items-center">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {day}
                </label>
                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                      type="time"
                      value={hours.start}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                      type="time"
                      value={hours.end}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorProfilePage; 