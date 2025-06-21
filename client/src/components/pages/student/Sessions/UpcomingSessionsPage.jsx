import React from 'react';

const UpcomingSessionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Sessions</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <p className="text-gray-600">No upcoming sessions scheduled.</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionsPage; 