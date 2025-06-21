import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState({
    type: '',
    file: null,
    description: ''
  });

  const documentTypes = [
    { value: 'certificate', label: 'Certificate' },
    { value: 'degree', label: 'Degree' },
    { value: 'license', label: 'Professional License' },
    { value: 'portfolio', label: 'Portfolio Link' },
    { value: 'testimonial', label: 'Testimonial' },
    { value: 'other', label: 'Other' }
  ];

  const handleDocumentChange = (e) => {
    const { name, value, files } = e.target;
    setNewDocument({
      ...newDocument,
      [name]: files ? files[0] : value
    });
  };

  const addDocument = () => {
    if (!newDocument.type || (!newDocument.file && newDocument.type !== 'portfolio')) {
      alert('Please select a document type and upload a file');
      return;
    }

    setDocuments([...documents, { ...newDocument, id: Date.now() }]);
    setNewDocument({
      type: '',
      file: null,
      description: ''
    });
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (documents.length === 0) {
      alert('Please add at least one verification document');
      return;
    }

    // Store in localStorage
    const onboardingData = JSON.parse(localStorage.getItem('tutorOnboarding') || '{}');
    localStorage.setItem('tutorOnboarding', JSON.stringify({
      ...onboardingData,
      documents
    }));
    navigate('/tutor/onboarding/session-preferences');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Verification Documents</h1>
        <p className="mt-2 text-sm text-gray-600">
          Upload documents to verify your expertise and qualifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Add Document</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Document Type
              </label>
              <select
                name="type"
                value={newDocument.type}
                onChange={handleDocumentChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select document type</option>
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {newDocument.type === 'portfolio' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Portfolio Link
                </label>
                <input
                  type="url"
                  name="file"
                  value={newDocument.file || ''}
                  onChange={handleDocumentChange}
                  placeholder="https://..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Upload File
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleDocumentChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="mt-1 block w-full"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Accepted formats: PDF, DOC, DOCX, JPG, PNG
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={newDocument.description}
                onChange={handleDocumentChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Brief description of the document..."
              />
            </div>

            <button
              type="button"
              onClick={addDocument}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Add Document
            </button>
          </div>
        </div>

        {/* List of Added Documents */}
        {documents.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Your Documents</h3>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {documentTypes.find(t => t.value === doc.type)?.label}
                    </h4>
                    {doc.type === 'portfolio' ? (
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        {doc.file}
                      </a>
                    ) : (
                      <p className="text-sm text-gray-600">
                        {doc.file?.name}
                      </p>
                    )}
                    {doc.description && (
                      <p className="text-sm text-gray-500 mt-1">{doc.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate('/tutor/onboarding/expertise')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Next: Session Preferences
          </button>
        </div>
      </form>
    </div>
  );
};

export default Verification; 