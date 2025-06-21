import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaBook,
  FaCog,
  FaCamera,
  FaEdit,
  FaSave,
  FaSpinner,
  FaPlus,
  FaTrash
} from 'react-icons/fa';
import api from '../../../../services/api';

const StudentProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      image: ''
    },
    learning: {
      subjects: [],
      level: '',
      preferredMode: '',
      availability: {},
      goals: []
    },
    settings: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'Public',
        showProgress: true,
        showAchievements: true
      },
      preferences: {
        language: 'English',
        timezone: 'America/New_York',
        theme: 'Light'
      }
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/student/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      await api.put('/api/student/profile', profile);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/api/student/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile(prev => ({
        ...prev,
        personal: {
          ...prev.personal,
          image: response.data.imageUrl
        }
      }));
      toast.success('Profile image updated');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleAddSubject = () => {
    const subject = prompt('Enter subject name:');
    if (subject) {
      setProfile(prev => ({
        ...prev,
        learning: {
          ...prev.learning,
          subjects: [...prev.learning.subjects, subject]
        }
      }));
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    setProfile(prev => ({
      ...prev,
      learning: {
        ...prev.learning,
        subjects: prev.learning.subjects.filter(subject => subject !== subjectToRemove)
      }
    }));
  };

  const handleAddGoal = () => {
    const goal = prompt('Enter learning goal:');
    if (goal) {
      setProfile(prev => ({
        ...prev,
        learning: {
          ...prev.learning,
          goals: [...prev.learning.goals, goal]
        }
      }));
    }
  };

  const handleRemoveGoal = (goalToRemove) => {
    setProfile(prev => ({
      ...prev,
      learning: {
        ...prev.learning,
        goals: prev.learning.goals.filter(goal => goal !== goalToRemove)
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="relative h-32 bg-indigo-600">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  className="h-32 w-32 rounded-full border-4 border-white"
                  src={profile.personal.image || 'https://via.placeholder.com/150'}
                  alt={profile.personal.name}
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <FaCamera className="h-5 w-5 text-gray-600" />
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="pt-20 pb-6 px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.personal.name}
                </h1>
                <p className="text-gray-500">{profile.personal.email}</p>
              </div>
              <button
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {saving ? (
                  <FaSpinner className="h-4 w-4 mr-2 animate-spin" />
                ) : isEditing ? (
                  <FaSave className="h-4 w-4 mr-2" />
                ) : (
                  <FaEdit className="h-4 w-4 mr-2" />
                )}
                {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('personal')}
                className={`${
                  activeTab === 'personal'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaUser className="h-5 w-5 mr-2" />
                Personal Information
              </button>
              <button
                onClick={() => setActiveTab('learning')}
                className={`${
                  activeTab === 'learning'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaBook className="h-5 w-5 mr-2" />
                Learning Preferences
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`${
                  activeTab === 'settings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <FaCog className="h-5 w-5 mr-2" />
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'personal' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.personal.name}
                      onChange={(e) =>
                        setProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, name: e.target.value }
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.personal.email}
                      onChange={(e) =>
                        setProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, email: e.target.value }
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.personal.phone}
                      onChange={(e) =>
                        setProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, phone: e.target.value }
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      value={profile.personal.location}
                      onChange={(e) =>
                        setProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, location: e.target.value }
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      value={profile.personal.bio}
                      onChange={(e) =>
                        setProfile(prev => ({
                          ...prev,
                          personal: { ...prev.personal, bio: e.target.value }
                        }))
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'learning' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        Subjects
                      </h3>
                      {isEditing && (
                        <button
                          onClick={handleAddSubject}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
                        >
                          <FaPlus className="h-4 w-4 mr-1" />
                          Add Subject
                        </button>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profile.learning.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                        >
                          {subject}
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveSubject(subject)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800"
                            >
                              <FaTrash className="h-3 w-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Learning Level
                    </h3>
                    <select
                      value={profile.learning.level}
                      onChange={(e) =>
                        setProfile(prev => ({
                          ...prev,
                          learning: { ...prev.learning, level: e.target.value }
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Preferred Learning Mode
                    </h3>
                    <select
                      value={profile.learning.preferredMode}
                      onChange={(e) =>
                        setProfile(prev => ({
                          ...prev,
                          learning: { ...prev.learning, preferredMode: e.target.value }
                        }))
                      }
                      disabled={!isEditing}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="online">Online</option>
                      <option value="physical">Physical</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Availability
                    </h3>
                    <div className="mt-2 space-y-4">
                      {Object.entries(profile.learning.availability).map(
                        ([day, slots]) => (
                          <div key={day} className="flex items-center">
                            <span className="w-32 text-sm font-medium text-gray-500">
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </span>
                            <div className="flex-1">
                              {slots.map((slot, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 mr-2"
                                >
                                  {slot}
                                </span>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        Learning Goals
                      </h3>
                      {isEditing && (
                        <button
                          onClick={handleAddGoal}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
                        >
                          <FaPlus className="h-4 w-4 mr-1" />
                          Add Goal
                        </button>
                      )}
                    </div>
                    <ul className="mt-2 space-y-2">
                      {profile.learning.goals.map((goal) => (
                        <li
                          key={goal}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="text-gray-700">{goal}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveGoal(goal)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <FaTrash className="h-4 w-4" />
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Notifications
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profile.settings.notifications.email}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                notifications: {
                                  ...prev.settings.notifications,
                                  email: e.target.checked
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm text-gray-700">
                          Email Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profile.settings.notifications.push}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                notifications: {
                                  ...prev.settings.notifications,
                                  push: e.target.checked
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm text-gray-700">
                          Push Notifications
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profile.settings.notifications.sms}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                notifications: {
                                  ...prev.settings.notifications,
                                  sms: e.target.checked
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm text-gray-700">
                          SMS Notifications
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Privacy Settings
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Profile Visibility
                        </label>
                        <select
                          value={profile.settings.privacy.profileVisibility}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                privacy: {
                                  ...prev.settings.privacy,
                                  profileVisibility: e.target.value
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                          <option value="tutors">Tutors Only</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profile.settings.privacy.showProgress}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                privacy: {
                                  ...prev.settings.privacy,
                                  showProgress: e.target.checked
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm text-gray-700">
                          Show Learning Progress
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profile.settings.privacy.showAchievements}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                privacy: {
                                  ...prev.settings.privacy,
                                  showAchievements: e.target.checked
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-sm text-gray-700">
                          Show Achievements
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Preferences
                    </h3>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Language
                        </label>
                        <select
                          value={profile.settings.preferences.language}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                preferences: {
                                  ...prev.settings.preferences,
                                  language: e.target.value
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Timezone
                        </label>
                        <select
                          value={profile.settings.preferences.timezone}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                preferences: {
                                  ...prev.settings.preferences,
                                  timezone: e.target.value
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="America/New_York">Eastern Time</option>
                          <option value="America/Chicago">Central Time</option>
                          <option value="America/Denver">Mountain Time</option>
                          <option value="America/Los_Angeles">Pacific Time</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Theme
                        </label>
                        <select
                          value={profile.settings.preferences.theme}
                          onChange={(e) =>
                            setProfile(prev => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                preferences: {
                                  ...prev.settings.preferences,
                                  theme: e.target.value
                                }
                              }
                            }))
                          }
                          disabled={!isEditing}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentProfilePage; 