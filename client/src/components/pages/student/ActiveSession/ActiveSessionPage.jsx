import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaComments, FaFileAlt, FaMapMarkerAlt, FaPhone, FaTimes } from 'react-icons/fa';

const ActiveSessionPage = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'tutor', text: 'Hello! How are you today?', time: '14:00' },
    { id: 2, sender: 'student', text: 'Hi! I\'m good, thanks for asking.', time: '14:01' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock data - replace with actual data from your backend
  const session = {
    id: 1,
    tutor: {
      name: 'Dr. Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    },
    subject: 'Mathematics',
    topic: 'Calculus - Derivatives',
    mode: 'online',
    startTime: '14:00',
    duration: 60,
    location: 'Zoom Meeting Room'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'student',
          text: newMessage,
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={session.tutor.image}
              alt={session.tutor.name}
            />
            <div className="ml-3">
              <h1 className="text-lg font-medium text-white">{session.tutor.name}</h1>
              <p className="text-sm text-gray-300">{session.subject} - {session.topic}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-white text-lg font-medium">
              {formatTime(sessionTime)}
            </div>
            <button className="text-gray-300 hover:text-white">
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Video Area */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-black">
              {/* Replace with actual video component */}
              <div className="h-full flex items-center justify-center text-white">
                <FaVideo className="h-16 w-16 text-gray-600" />
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-75 p-4">
              <div className="flex items-center justify-center space-x-4">
                <button
                  className={`p-3 rounded-full ${
                    isMuted ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <FaMicrophoneSlash className="h-6 w-6 text-white" />
                  ) : (
                    <FaMicrophone className="h-6 w-6 text-white" />
                  )}
                </button>
                <button
                  className={`p-3 rounded-full ${
                    isVideoOff ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? (
                    <FaVideoSlash className="h-6 w-6 text-white" />
                  ) : (
                    <FaVideo className="h-6 w-6 text-white" />
                  )}
                </button>
                <button
                  className={`p-3 rounded-full ${
                    isChatOpen ? 'bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setIsChatOpen(!isChatOpen)}
                >
                  <FaComments className="h-6 w-6 text-white" />
                </button>
                <button
                  className={`p-3 rounded-full ${
                    isNotesOpen ? 'bg-indigo-500' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setIsNotesOpen(!isNotesOpen)}
                >
                  <FaFileAlt className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          {isChatOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 320 }}
              exit={{ width: 0 }}
              className="bg-gray-800 border-l border-gray-700"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Chat</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'student' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${
                          message.sender === 'student'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className="text-xs opacity-75 mt-1">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Notes Sidebar */}
          {isNotesOpen && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 320 }}
              exit={{ width: 0 }}
              className="bg-gray-800 border-l border-gray-700"
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Session Notes</h2>
                </div>
                <div className="flex-1 p-4">
                  <textarea
                    className="w-full h-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Take notes during your session..."
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveSessionPage; 