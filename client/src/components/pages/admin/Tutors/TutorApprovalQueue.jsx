import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaGraduationCap,
  FaFileAlt,
  FaCheck,
  FaTimes,
  FaStar,
  FaDownload,
  FaEye
} from 'react-icons/fa';
import { getPendingApplications, approveTutorApplication, rejectTutorApplication } from '../../../../services/mongoRealm';
import { toast } from 'react-toastify';
const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

const TutorApprovalQueue = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMsg, setActionMsg] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    setError('');
    try {
      const apps = await getPendingApplications();
      setApplications(apps);
    } catch (err) {
      setError('Failed to fetch applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (applicationId) => {
    setActionMsg('');
    try {
      await approveTutorApplication(applicationId);
    } catch (err) {
      console.error('Error approving tutor:', err);
    }
    setApplications(applications.filter(app => app._id !== applicationId));
    setActionMsg('Tutor approved');
    toast.success('Tutor approved');
  };

  const handleReject = async (applicationId) => {
    setActionMsg('');
    try {
      await rejectTutorApplication(applicationId);
      setApplications(applications.filter(app => app._id !== applicationId));
      setActionMsg('Tutor rejected and notified by email.');
      toast.success('Tutor rejected and notified by email.');
    } catch (err) {
      setActionMsg('Rejection failed.');
      toast.error('Rejection failed.');
    }
  };

  const handleViewDocuments = (application) => {
    setSelectedApplication(application);
  };

  const handleDownload = (docType, idx) => {
    if (!selectedApplication) return;
    let url = `${SERVER_URL}/api/applications/${selectedApplication._id}/documents/${docType}`;
    if (docType === 'certifications') {
      url += `/${idx}`;
    }
    window.open(url, '_blank');
  };

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Tutor Approval Queue
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Review and manage tutor applications
            </p>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Applications List */}
        <div className="mt-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {applications.map((application) => (
                <li key={application._id} className="bg-white">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaUser className="h-6 w-6 text-indigo-600" />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {application.name}
                          </h3>
                          <p className="text-sm text-gray-500">{application.email}</p>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleViewDocuments(application)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <FaEye className="mr-2" />
                          View Documents
                        </button>
                        <button
                          onClick={() => handleApprove(application._id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FaCheck className="mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(application._id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <FaTimes className="mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Subject</p>
                        <p className="mt-1 text-sm text-gray-900">{application.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Experience</p>
                        <p className="mt-1 text-sm text-gray-900">{application.experience}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Education</p>
                        <p className="mt-1 text-sm text-gray-900">{application.education}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Document Viewer Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Documents for {selectedApplication.name}
                </h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Resume</h4>
                  <div className="mt-1 flex items-center">
                    <FaFileAlt className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedApplication.cvName}
                    </span>
                    <button onClick={() => handleDownload('resume')} className="ml-4 text-indigo-600 hover:text-indigo-900">
                      <FaDownload className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Certifications</h4>
                  <div className="mt-1 space-y-2">
                    {selectedApplication.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <FaGraduationCap className="h-5 w-5 text-gray-400" />
                        <span className="ml-2 text-sm text-gray-900">{cert}</span>
                        <button onClick={() => handleDownload('certifications', index)} className="ml-4 text-indigo-600 hover:text-indigo-900">
                          <FaDownload className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">ID Proof</h4>
                  <div className="mt-1 flex items-center">
                    <FaFileAlt className="h-5 w-5 text-gray-400" />
                    <span className="ml-2 text-sm text-gray-900">
                      {selectedApplication.idProofName}
                    </span>
                    <button onClick={() => handleDownload('idProof')} className="ml-4 text-indigo-600 hover:text-indigo-900">
                      <FaDownload className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => handleReject(selectedApplication._id)}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Reject Application
                </button>
                <button
                  onClick={() => handleApprove(selectedApplication._id)}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Approve Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorApprovalQueue;