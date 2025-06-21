import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTutorById, approveTutorApplication, rejectTutorApplication } from '../../../../services/mongoRealm';

const TutorDetailsPage = () => {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    const fetchTutorDetails = async () => {
      setLoading(true);
      try {
        const data = await getTutorById(tutorId);
        setTutor(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch tutor details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDetails();
    // eslint-disable-next-line
  }, [tutorId]);

  const handleApprove = async () => {
    try {
      await approveTutorApplication(tutorId);
      setActionMsg('Tutor approved successfully.');
    } catch (err) {
      setActionMsg('Approval failed.');
    }
  };

  const handleReject = async () => {
    try {
      await rejectTutorApplication(tutorId);
      setActionMsg('Tutor rejected.');
    } catch (err) {
      setActionMsg('Rejection failed.');
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading tutor details...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  if (!tutor) {
    return <div className="p-6 text-center">Tutor not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tutor Details: {tutor.name}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{tutor.name}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{tutor.email}</p>
          </div>
          <div>
            <p className="font-semibold">Subjects:</p>
            <p>{tutor.subjects.join(', ')}</p>
          </div>
          <div>
            <p className="font-semibold">Rating:</p>
            <p>{tutor.rating} / 5</p>
          </div>
          <div>
            <p className="font-semibold">Bio:</p>
            <p>{tutor.bio}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p>{tutor.status}</p>
          </div>
          <div>
            <p className="font-semibold">Last Login:</p>
            <p>{new Date(tutor.lastLogin).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Created At:</p>
            <p>{new Date(tutor.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
      {actionMsg && <p className="mt-4 text-green-600">{actionMsg}</p>}
      <div className="mt-4 space-x-4">
        <button
          onClick={handleApprove}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >Approve Tutor</button>
        <button
          onClick={handleReject}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >Reject Tutor</button>
      </div>
    </div>
  );
};

export default TutorDetailsPage;