import React from 'react';

const FavoriteTutorsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Favorite Tutors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Placeholder for favorite tutors list */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">No favorite tutors yet. Start adding tutors to your favorites!</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteTutorsPage; 