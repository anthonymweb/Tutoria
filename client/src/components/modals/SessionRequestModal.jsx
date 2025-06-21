import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMoneyBillWave, FaTimes } from 'react-icons/fa';
import axios from 'axios'; // Assuming axios is installed and imported correctly
import { currentUserId, currentUser } from '../auth'; // Assuming currentUserId and currentUser are available and imported correctly

const SessionRequestModal = ({ isOpen, onClose, tutorId }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(60);
  const [subject, setSubject] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add session request to backend API
      const response = await axios.post('/api/session-requests', {
        tutorId,
        studentId: currentUser.id, 
        date,
        time,
        duration,
        subject
      });
      
      // Show success message
      alert('Session request sent successfully!');
      onClose();
    } catch (error) {
      console.error('Error sending session request:', error);
      alert('Failed to send session request');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Request Session</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Time</label>
            <div className="relative">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              <FaClock className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Duration (minutes)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter subject"
              required
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Request Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SessionRequestModal;
