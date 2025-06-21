import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { auth } from '../../firebase';

const ChatList = ({ onSelectChat, currentUserId, userType }) => {
  const [chats, setChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load chats from localStorage
    const loadChats = () => {
      try {
        // Get all message keys from localStorage
        const messageKeys = Object.keys(localStorage).filter(key => key.startsWith('messages_'));
        
        // Process each conversation
        const chatList = messageKeys.map(key => {
          const messages = JSON.parse(localStorage.getItem(key));
          const conversationId = key.replace('messages_', '');
          const [user1, user2] = conversationId.split(':');
          
          // Get the other user's ID
          const otherUserId = user1 === currentUserId ? user2 : user1;
          
          // Get the last message
          const lastMessage = messages[messages.length - 1];
          
          return {
            id: conversationId,
            userId: otherUserId,
            lastMessage: lastMessage?.content || 'No messages yet',
            timestamp: lastMessage?.timestamp || new Date().toISOString(),
            unreadCount: 0 // We'll implement this later if needed
          };
        });

        // Sort chats by most recent message
        chatList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        setChats(chatList);
        setLoading(false);
      } catch (error) {
        setError('Error loading chats');
        console.error('Error loading chats:', error);
        setLoading(false);
      }
    };

    loadChats();
  }, [currentUserId]);

  const filteredChats = chats.filter(chat => {
    const searchLower = searchQuery.toLowerCase();
    return (
      chat.userId.toLowerCase().includes(searchLower) ||
      chat.lastMessage.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : filteredChats.length === 0 ? (
          <div className="text-center text-gray-500 p-4">
            {searchQuery ? 'No chats found' : 'No chats yet'}
          </div>
        ) : (
          <AnimatePresence>
            {filteredChats.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => onSelectChat(chat.userId)}
                className="p-4 border-b hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <FaUserCircle className="text-3xl text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{chat.userId}</h3>
                      <span className="text-xs text-gray-500">
                        {new Date(chat.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ChatList;