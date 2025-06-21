import React from 'react';

const StudentFeedbackPage = () => (
  <div className="min-h-screen bg-gray-50 py-6">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Feedback</h2>
      <p className="text-gray-600 mb-6">Let us know your thoughts, suggestions, or issues below. Your feedback helps us improve your experience!</p>
      <form className="bg-white shadow rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
          <textarea id="feedback" name="feedback" rows={5} className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Type your feedback here..." />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">Submit</button>
      </form>
    </div>
  </div>
);

export default StudentFeedbackPage;
