import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminService } from '../../../../services/adminService';

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const data = await adminService.getUserById(userId);
        setUser(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <div className="p-6 text-center">Loading user details...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">User not found.</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Details: {user.name}</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Name:</p>
            <p>{user.name}</p>
          </div>
          <div>
            <p className="font-semibold">Email:</p>
            <p>{user.email}</p>
          </div>
          <div>
            <p className="font-semibold">Role:</p>
            <p>{user.role}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p>{user.status}</p>
          </div>
          <div>
            <p className="font-semibold">Last Login:</p>
            <p>{new Date(user.lastLogin).toLocaleString()}</p>
          </div>
          <div>
            <p className="font-semibold">Created At:</p>
            <p>{new Date(user.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;