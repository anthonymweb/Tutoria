import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaReply, FaChartLine, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const TutorFeedbackPage = () => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [replyText, setReplyText] = useState('');

  // Mock data - replace with actual data from your backend
  const feedbackStats = {
    averageRating: 4.8,
    totalReviews: 48,
    ratingDistribution: {
      5: 35,
      4: 10,
      3: 2,
      2: 1,
      1: 0
    }
  };

  const reviews = [
    {
      id: 1,
      studentName: 'John Smith',
      rating: 5,
      date: '2024-03-15',
      comment: 'Excellent teaching style! Very patient and explains concepts clearly.',
      studentImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      subject: 'Mathematics',
      hasReply: false
    },
    {
      id: 2,
      studentName: 'Emma Wilson',
      rating: 4,
      date: '2024-03-14',
      comment: 'Great session, but sometimes the pace was a bit fast.',
      studentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      subject: 'Physics',
      hasReply: true,
      reply: 'Thank you for the feedback! I\'ll make sure to adjust the pace in our next session.'
    }
  ];

  const handleReply = (reviewId) => {
    // Implement reply logic
    console.log('Replying to review:', reviewId, replyText);
    setReplyText('');
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Ratings & Reviews
            </h2>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Average Rating */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaStar className="h-12 w-12 text-yellow-400" />
                </div>
                <div className="ml-5">
                  <div className="text-3xl font-bold text-gray-900">
                    {feedbackStats.averageRating}
                  </div>
                  <div className="text-sm text-gray-500">
                    Average Rating
                  </div>
                </div>
              </div>

              {/* Total Reviews */}
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaChartLine className="h-12 w-12 text-indigo-600" />
                </div>
                <div className="ml-5">
                  <div className="text-3xl font-bold text-gray-900">
                    {feedbackStats.totalReviews}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total Reviews
                  </div>
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="col-span-1 lg:col-span-1">
                <h4 className="text-sm font-medium text-gray-900">Rating Distribution</h4>
                <div className="mt-2 space-y-2">
                  {Object.entries(feedbackStats.ratingDistribution).reverse().map(([rating, count]) => (
                    <div key={rating} className="flex items-center">
                      <div className="flex items-center w-24">
                        <span className="text-sm text-gray-600">{rating} stars</span>
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{
                            width: `${(count / feedbackStats.totalReviews) * 100}%`
                          }}
                        />
                      </div>
                      <div className="ml-2 w-8 text-sm text-gray-600">
                        {count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Reviews</h3>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="space-y-6">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={review.studentImage}
                      alt={review.studentName}
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900">
                            {review.studentName}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {review.subject} • {review.date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.comment}</p>

                      {review.hasReply ? (
                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <FaReply className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-600">{review.reply}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4">
                          <textarea
                            rows={2}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                          />
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={() => handleReply(review.id)}
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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

export default TutorFeedbackPage; 