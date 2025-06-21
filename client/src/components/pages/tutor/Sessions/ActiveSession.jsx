import React from 'react';
import { useParams } from 'react-router-dom';

const ActiveSession = () => {
  const { sessionId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Active Session: {sessionId}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>This is the active session room for session {sessionId}.</p>
      </div>
    </div>
  );
};

export default ActiveSession; 