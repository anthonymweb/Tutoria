import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaChalkboardTeacher, FaDollarSign, FaCamera } from 'react-icons/fa';

const TutorProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    bio: 'Experienced mathematics tutor with a passion for teaching.',
    education: [
      {
        id: 1,
        degree: 'Master of Science',
        field: 'Mathematics',
        institution: 'Stanford University',
        year: '2020'
      }
    ],
    certifications: [
      {
        id: 1,
        name: 'Advanced Mathematics Teaching Certification',
        issuer: 'National Board of Professional Teaching Standards',
        year: '2021'
      }
    ],
    teachingModes: {
      online: true,
      physical: true,
      location: 'San Francisco, CA'
    },
    pricing: {
      baseRate: 50,
      subjects: [
        {
          id: 1,
          name: 'Mathematics',
          rate: 60
        },
        {
          id: 2,
          name: 'Physics',
          rate: 55
        }
      ]
    }
  });

  const [newEducation, setNewEducation] = useState({
    degree: '',
    field: '',
    institution: '',
    year: ''
  });

  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    year: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Implement profile update logic
    console.log('Updating profile:', profileData);
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.field && newEducation.institution && newEducation.year) {
      setProfileData({
        ...profileData,
        education: [...profileData.education, { id: Date.now(), ...newEducation }]
      });
      setNewEducation({ degree: '', field: '', institution: '', year: '' });
    }
  };

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuer && newCertification.year) {
      setProfileData({
        ...profileData,
        certifications: [...profileData.certifications, { id: Date.now(), ...newCertification }]
      });
      setNewCertification({ name: '', issuer: '', year: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Profile Settings
            </h2>
          </div>
        </div>

        <form onSubmit={handleProfileUpdate} className="mt-8 space-y-8">
          {/* Basic Information */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Education</h3>
              <div className="mt-6 space-y-4">
                {profileData.education.map((edu) => (
                  <div key={edu.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{edu.degree} in {edu.field}</h4>
                      <p className="text-sm text-gray-500">{edu.institution}, {edu.year}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProfileData({
                        ...profileData,
                        education: profileData.education.filter(e => e.id !== edu.id)
                      })}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Degree"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={newEducation.field}
                    onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    value={newEducation.institution}
                    onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={newEducation.year}
                    onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddEducation}
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Education
                </button>
              </div>
            </div>
          </div>

          {/* Teaching Modes */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Teaching Modes</h3>
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="online"
                    checked={profileData.teachingModes.online}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      teachingModes: { ...profileData.teachingModes, online: e.target.checked }
                    })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="online" className="ml-2 block text-sm text-gray-900">
                    Online Sessions
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="physical"
                    checked={profileData.teachingModes.physical}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      teachingModes: { ...profileData.teachingModes, physical: e.target.checked }
                    })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="physical" className="ml-2 block text-sm text-gray-900">
                    Physical Sessions
                  </label>
                </div>
                {profileData.teachingModes.physical && (
                  <div className="mt-4">
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      value={profileData.teachingModes.location}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        teachingModes: { ...profileData.teachingModes, location: e.target.value }
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Pricing</h3>
              <div className="mt-6 space-y-4">
                <div>
                  <label htmlFor="baseRate" className="block text-sm font-medium text-gray-700">
                    Base Rate (per hour)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="baseRate"
                      id="baseRate"
                      value={profileData.pricing.baseRate}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        pricing: { ...profileData.pricing, baseRate: parseFloat(e.target.value) }
                      })}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Subject-Specific Rates</h4>
                  {profileData.pricing.subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{subject.name}</span>
                      <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          value={subject.rate}
                          onChange={(e) => setProfileData({
                            ...profileData,
                            pricing: {
                              ...profileData.pricing,
                              subjects: profileData.pricing.subjects.map(s =>
                                s.id === subject.id ? { ...s, rate: parseFloat(e.target.value) } : s
                              )
                            }
                          })}
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-24 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TutorProfileSettings; 