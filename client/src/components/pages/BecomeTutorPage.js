import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitTutorApplication } from '../../services/mongoRealm';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUpload, FaCheckCircle, FaArrowRight, FaArrowLeft, FaUser, FaBook, FaClock, FaMoneyBillWave } from 'react-icons/fa';

const BecomeTutorPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subjects: [],
    experience: '',
    education: '',
    bio: '',
    hourlyRate: '',
    availability: [],
    idDocument: null,
    certificates: []
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, value]
        : prev.subjects.filter(subject => subject !== value)
    }));
  };

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      availability: checked
        ? [...prev.availability, value]
        : prev.availability.filter(time => time !== value)
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => {
      let { idDocument, certificates } = prev;
      files.forEach((file) => {
        if (!idDocument) {
          idDocument = file;
        } else {
          certificates = [...certificates, file];
        }
      });
      return { ...prev, idDocument, certificates };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await submitTutorApplication(formData);
      if (result.insertedId) {
        setStep(4); // Success step
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaUser className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600" />
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                  required
                />
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <label className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                  required
                />
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <label className="block text-gray-700 mb-2 font-medium">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaBook className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600" />
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Teaching Information</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <label className="block text-gray-700 mb-4 font-medium">Subjects</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {['Mathematics', 'Science', 'English', 'Programming', 'History', 'Art'].map(subject => (
                    <label key={subject} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                      <input
                        type="checkbox"
                        value={subject}
                        checked={formData.subjects.includes(subject)}
                        onChange={handleSubjectChange}
                        className="form-checkbox h-5 w-5 text-purple-600 rounded"
                      />
                      <span className="text-gray-700">{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <label className="block text-gray-700 mb-2 font-medium">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                    required
                  />
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <label className="block text-gray-700 mb-2 font-medium">Education</label>
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                    rows="3"
                    required
                  />
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                <label className="block text-gray-700 mb-2 font-medium">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                  rows="4"
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FaClock className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600" />
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Availability & Documents</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <label className="block text-gray-700 mb-2 font-medium">Hourly Rate (UGX)</label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/50"
                    required
                  />
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <label className="block text-gray-700 mb-4 font-medium">Availability</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['Morning', 'Afternoon', 'Evening', 'Weekend'].map(time => (
                      <label key={time} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-50 transition-colors">
                        <input
                          type="checkbox"
                          value={time}
                          checked={formData.availability.includes(time)}
                          onChange={handleAvailabilityChange}
                          className="form-checkbox h-5 w-5 text-purple-600 rounded"
                        />
                        <span className="text-gray-700">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <label className="block text-gray-700 mb-4 font-medium">Upload Documents</label>
                <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label
                    htmlFor="document-upload"
                    className="cursor-pointer"
                  >
                    <FaUpload className="mx-auto text-4xl text-purple-400 mb-4" />
                    <p className="text-gray-600 mb-2">Drag and drop your files here, or click to browse</p>
                    <p className="text-sm text-gray-500">Upload your ID document and certificates</p>
                  </label>
                </div>
                {(formData.idDocument || formData.certificates.length > 0) && (
                  <div className="mt-4">
                    <p className="text-gray-700 mb-2">Selected files:</p>
                    <ul className="space-y-2">
                      {formData.idDocument && (
                        <li className="flex items-center gap-2 text-gray-600">
                          <FaCheckCircle className="text-green-500" />
                          ID Document: {formData.idDocument.name}
                        </li>
                      )}
                      {formData.certificates.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <FaCheckCircle className="text-green-500" />
                          Certificate {index + 1}: {doc.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-6" />
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-8">
              Thank you for your interest in becoming a tutor. We will review your application and get back to you within 2-3 business days.
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Return to Home
            </button>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 via-white to-blue-50">
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              Become a Tutor
            </h1>
            <p className="text-xl text-gray-700">Share your knowledge and earn while making a difference</p>
          </motion.div>

          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      stepNumber === step
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : stepNumber < step
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stepNumber < step ? <FaCheckCircle /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div className={`w-24 h-1 ${
                        stepNumber < step ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {renderStep()}

              {step < 4 && (
                <div className="mt-8 flex justify-between">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300"
                    >
                      <FaArrowLeft />
                      Previous
                    </button>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl ml-auto"
                    >
                      Next
                      <FaArrowRight />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl ml-auto disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BecomeTutorPage; 