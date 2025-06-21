import React, { useEffect, useState } from 'react';
import { getPendingApplications, approveTutorApplication } from '../../../../services/mongoRealm';

export default function PendingTutorApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionMsg, setActionMsg] = useState('');

  useEffect(() => {
    const fetchPending = async () => {
      try {
        setLoading(true);
        const apps = await getPendingApplications();
        setApplications(apps);
        setError(null);
      } catch (err) {
        console.error('Fetch applications error:', err);
        setError('Failed to load tutor applications');
      } finally {
        setLoading(false);
      }
    };
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    setActionMsg('');
    try {
      await approveTutorApplication(id);
      setApplications(applications.filter(app => app._id !== id));
      setActionMsg('Tutor approved and notified by email.');
    } catch (err) {
      setActionMsg('Approval failed.');
    }
  };

  if (loading) {
    return <p>Loading applications...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      {actionMsg && <div className="mb-2 text-green-600">{actionMsg}</div>}
      {applications.length === 0 ? (
        <div className="text-gray-600">No pending tutor applications.</div>
      ) : (
        <table className="min-w-full bg-white border rounded">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-t">
                <td className="px-4 py-2">{app.name}</td>
                <td className="px-4 py-2">{app.email}</td>
                <td className="px-4 py-2">{app.phone || '-'}</td>
                <td className="px-4 py-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleApprove(app._id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
