import React from 'react';
import { useParams } from 'react-router-dom';

const StudentProfilePage = () => {
  const { studentId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Student {studentId}'s profile and progress will go here</p>
      </div>
    </div>
  );
};

export default StudentProfilePage; 