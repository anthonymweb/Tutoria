import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Expertise = () => {
  const navigate = useNavigate();
  const [expertise, setExpertise] = useState([]);
  const [newExpertise, setNewExpertise] = useState({
    field: '',
    level: 'beginner',
    yearsOfExperience: 0,
    description: ''
  });

  const expertiseLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const handleChange = (e) => {
    setNewExpertise({
      ...newExpertise,
      [e.target.name]: e.target.value
    });
  };

  const addExpertise = () => {
    if (!newExpertise.field) {
      alert('Please enter a field of expertise');
      return;
    }

    setExpertise([...expertise, { ...newExpertise, id: Date.now() }]);
    setNewExpertise({
      field: '',
      level: 'beginner',
      yearsOfExperience: 0,
      description: ''
    });
  };

  const removeExpertise = (id) => {
    setExpertise(expertise.filter(exp => exp.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expertise.length === 0) {
      alert('Please add at least one field of expertise');
      return;
    }

    // Store in localStorage
    const onboardingData = JSON.parse(localStorage.getItem('tutorOnboarding') || '{}');
    localStorage.setItem('tutorOnboarding', JSON.stringify({
      ...onboardingData,
      expertise
    }));
    navigate('/tutor/onboarding/verification');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Expertise</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add your areas of expertise and experience level for each.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Add Expertise</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Field/Subject
              </label>
              <input
                type="text"
                name="field"
                value={newExpertise.field}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Mathematics, Programming, Music"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expertise Level
              </label>
              <select
                name="level"
                value={newExpertise.level}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {expertiseLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={newExpertise.yearsOfExperience}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={newExpertise.description}
                onChange={handleChange}
                rows={2}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Brief description of your expertise..."
              />
            </div>
          </div>

          <button
            type="button"
            onClick={addExpertise}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Add Expertise
          </button>
        </div>

        {/* List of Added Expertise */}
        {expertise.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Your Expertise</h3>
            <div className="space-y-4">
              {expertise.map((exp) => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{exp.field}</h4>
                    <p className="text-sm text-gray-600">
                      Level: {exp.level} | Experience: {exp.yearsOfExperience} years
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-500 mt-1">{exp.description}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeExpertise(exp.id)}
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
            onClick={() => navigate('/tutor/onboarding/personal')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Next: Verification
          </button>
        </div>
      </form>
    </div>
  );
};

export default Expertise; 