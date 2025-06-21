import React, { useState } from 'react';
import { submitTutorApplication } from '../../../services/mongoRealm';
import { motion } from 'framer-motion';
import { FaFileUpload, FaCheckCircle } from 'react-icons/fa';

const TutorApplicationForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    qualifications: '',
    experience: '',
    education: '',
    phone: '',
    hourlyRate: '',
    availability: '',
    cv: null
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
      setFileName(files[0].name);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const result = await submitTutorApplication(form);
      if (result.insertedId) {
        setSuccess(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error('Error submitting application', err);
      setError(err.message || 'Submission error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-50 via-blue-50 to-indigo-100 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10"
      >
        {success ? (
          <div className="flex flex-col items-center space-y-6">
            <FaCheckCircle className="text-green-500" size={64} />
            <h2 className="text-3xl font-bold text-center text-gray-800">Application Submitted!</h2>
            <p className="text-gray-600 text-center max-w-md">
              Thank you for applying to become a tutor. Our team will review your application and get back to you within 3–5 business days.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center mb-8">
              Tutor Application
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject(s) you want to tutor</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mathematics, Physics..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., 3 years"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Education</label>
                <textarea
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., BSc in Mathematics"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Qualifications</label>
                <textarea
                  name="qualifications"
                  value={form.qualifications}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Briefly describe your qualifications and experience"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., +1234567890"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate</label>
                <input
                  type="text"
                  name="hourlyRate"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., $25/hour"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                <textarea
                  name="availability"
                  value={form.availability}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Mon-Fri 9am-5pm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Upload CV / Resume</label>
                <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <FaFileUpload className="text-indigo-600 mr-3" size={24} />
                  <span className="text-gray-600">{fileName || 'Drag & drop or click to upload'}</span>
                  <input
                    type="file"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default TutorApplicationForm;
