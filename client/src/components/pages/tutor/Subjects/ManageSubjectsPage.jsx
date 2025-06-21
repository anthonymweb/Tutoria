import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaUpload, FaStar, FaCheck, FaTimes } from 'react-icons/fa';

const ManageSubjectsPage = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: 'Mathematics',
      level: 'Advanced',
      credibilityScore: 95,
      certifications: [
        {
          id: 1,
          name: 'Advanced Mathematics Certification',
          issuer: 'Cambridge University',
          date: '2023-01-15',
          verified: true
        }
      ]
    },
    {
      id: 2,
      name: 'Physics',
      level: 'Intermediate',
      credibilityScore: 88,
      certifications: []
    }
  ]);

  const [newSubject, setNewSubject] = useState({
    name: '',
    level: 'Beginner'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSubject = () => {
    if (newSubject.name.trim()) {
      setSubjects([
        ...subjects,
        {
          id: Date.now(),
          name: newSubject.name,
          level: newSubject.level,
          credibilityScore: 0,
          certifications: []
        }
      ]);
      setNewSubject({ name: '', level: 'Beginner' });
      setShowAddForm(false);
    }
  };

  const handleRemoveSubject = (subjectId) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  const handleUploadCertification = (subjectId) => {
    // Implement file upload logic here
    console.log('Upload certification for subject:', subjectId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Manage Subjects & Skills
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={() => setShowAddForm(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaPlus className="-ml-1 mr-2 h-5 w-5" />
              Add Subject
            </button>
          </div>
        </div>

        {/* Add Subject Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-white shadow sm:rounded-lg"
          >
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Add New Subject
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="subject-name" className="block text-sm font-medium text-gray-700">
                    Subject Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="subject-name"
                      id="subject-name"
                      value={newSubject.name}
                      onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="subject-level" className="block text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <div className="mt-1">
                    <select
                      id="subject-level"
                      name="subject-level"
                      value={newSubject.level}
                      onChange={(e) => setNewSubject({ ...newSubject, level: e.target.value })}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Subject
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Subjects List */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
                    <button
                      onClick={() => handleRemoveSubject(subject.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Level: {subject.level}</p>
                  
                  {/* Credibility Score */}
                  <div className="mt-4">
                    <div className="flex items-center">
                      <FaStar className="h-5 w-5 text-yellow-400" />
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        Credibility Score: {subject.credibilityScore}%
                      </span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-indigo-600 h-2.5 rounded-full"
                        style={{ width: `${subject.credibilityScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900">Certifications</h4>
                    <ul className="mt-2 space-y-2">
                      {subject.certifications.map((cert) => (
                        <li key={cert.id} className="flex items-center text-sm">
                          {cert.verified ? (
                            <FaCheck className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <FaTimes className="h-4 w-4 text-red-500 mr-2" />
                          )}
                          <span className="text-gray-600">{cert.name}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleUploadCertification(subject.id)}
                      className="mt-2 inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FaUpload className="mr-1.5 h-4 w-4" />
                      Upload Certification
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubjectsPage; 