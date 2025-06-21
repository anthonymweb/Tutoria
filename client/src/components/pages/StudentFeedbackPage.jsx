import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaPaperPlane } from 'react-icons/fa';

const StudentFeedbackPage = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data for past reviews (replace with actual data from backend)
  const pastReviews = [
    {
      id: 1,
      tutorName: 'Dr. Jane Doe',
      subject: 'Mathematics',
      rating: 5,
      comment: 'Excellent tutor! Very clear explanations and patient.',
      date: '2024-03-10',
    },
    {
      id: 2,
      tutorName: 'Mr. John Smith',
      subject: 'Physics',
      rating: 4,
      comment: 'Good session, helped me understand complex topics.',
      date: '2024-03-05',
    },
  ];

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);
    // In a real application, send this data to your backend API
    console.log('Submitting feedback:', { rating, comment });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitted(true);
    setLoading(false);
    setRating(0);
    setComment('');
  };

  const renderStars = (currentRating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`h-6 w-6 cursor-pointer ${index < currentRating ? 'text-yellow-400' : 'text-gray-300'}`}
        onClick={() => setRating(index + 1)}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Rate & Review
            </h2>
          </div>
        </div>

        {/* Feedback Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Submit New Feedback</h3>
          {
            submitted ? (
              <div className="text-center py-4 text-green-600 font-medium">
                Thank you for your feedback! Your review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(rating)}
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comments</label>
                  <textarea
                    id="comment"
                    rows="4"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <FaPaperPlane className="-ml-1 mr-2 h-5 w-5" />
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </form>
            )
          }
        </motion.div>

        {/* Past Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Past Reviews</h3>
          {
            pastReviews.length === 0 ? (
              <p className="text-gray-500">You haven't submitted any reviews yet.</p>
            ) : (
              <div className="space-y-6">
                {pastReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-lg font-medium text-gray-900">{review.tutorName} - {review.subject}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-600">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            )
          }
        </motion.div>
      </div>
    </div>
  );
};

export default StudentFeedbackPage; 