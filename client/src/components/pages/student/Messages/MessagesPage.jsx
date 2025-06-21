import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPaperPlane, FaEllipsisV, FaPaperclip, FaSmile } from 'react-icons/fa';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with actual data from your backend
  const chats = [
    {
      id: 1,
      tutor: {
        id: 1,
        name: 'Dr. Sarah Johnson',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        subject: 'Mathematics',
        isOnline: true
      },
      lastMessage: {
        text: 'Let me know if you have any questions about the calculus problems.',
        time: '10:30 AM',
        isRead: true
      }
    },
    {
      id: 2,
      tutor: {
        id: 2,
        name: 'Prof. Michael Chen',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        subject: 'Physics',
        isOnline: false
      },
      lastMessage: {
        text: 'The lab report looks great! Keep up the good work.',
        time: 'Yesterday',
        isRead: false
      }
    }
  ];

  const messages = selectedChat
    ? [
        {
          id: 1,
          sender: 'tutor',
          text: 'Hello! How can I help you today?',
          time: '10:00 AM'
        },
        {
          id: 2,
          sender: 'student',
          text: 'Hi! I have some questions about the calculus problems.',
          time: '10:05 AM'
        },
        {
          id: 3,
          sender: 'tutor',
          text: "Sure, I'd be happy to help. Which problems are you struggling with?",
          time: '10:10 AM'
        },
        {
          id: 4,
          sender: 'student',
          text: "I'm having trouble with the integration by parts method.",
          time: '10:15 AM'
        },
        {
          id: 5,
          sender: 'tutor',
          text: 'Let me explain that concept to you. Integration by parts is based on the product rule for differentiation...',
          time: '10:20 AM'
        }
      ]
    : [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="flex h-[calc(100vh-12rem)]">
            {/* Chat List */}
            <div className="w-1/3 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              <div className="overflow-y-auto h-full">
                {chats.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      selectedChat?.id === chat.id ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 relative">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={chat.tutor.image}
                          alt={chat.tutor.name}
                        />
                        {chat.tutor.isOnline && (
                          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">
                            {chat.tutor.name}
                          </h3>
                          <p className="text-xs text-gray-500">{chat.lastMessage.time}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {chat.lastMessage.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={selectedChat.tutor.image}
                          alt={selectedChat.tutor.name}
                        />
                        <div className="ml-4">
                          <h2 className="text-lg font-medium text-gray-900">
                            {selectedChat.tutor.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {selectedChat.tutor.subject}
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <FaEllipsisV className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          msg.sender === 'student' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.sender === 'student'
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm">{msg.text}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.sender === 'student'
                                ? 'text-indigo-200'
                                : 'text-gray-500'
                            }`}
                          >
                            {msg.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <FaPaperclip className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 mx-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <FaSmile className="h-5 w-5" />
                      </button>
                      <button
                        type="submit"
                        className="ml-4 p-2 text-indigo-600 hover:text-indigo-500"
                      >
                        <FaPaperPlane className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">Select a chat to start messaging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage; 