import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaPaperclip, FaTimes } from 'react-icons/fa';
import { auth } from '../../firebase';

const getConversationId = (user1, user2) => {
  return [user1, user2].sort().join(':');
};

const Chat = ({ recipientId, onClose, userType, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load messages from localStorage
    const conversationId = getConversationId(currentUserId, recipientId);
    const storedMessages = JSON.parse(localStorage.getItem(`messages_${conversationId}`) || '[]');
    setMessages(storedMessages);
    setLoading(false);
    scrollToBottom();
  }, [currentUserId, recipientId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && attachments.length === 0) return;

    try {
      const conversationId = getConversationId(currentUserId, recipientId);
      const newMessageObj = {
        id: Date.now().toString(),
        conversationId,
        sender: currentUserId,
        recipient: recipientId,
        content: newMessage,
        attachments: [], // We'll handle attachments later
        timestamp: new Date().toISOString()
      };

      // Update messages in localStorage
      const updatedMessages = [...messages, newMessageObj];
      localStorage.setItem(`messages_${conversationId}`, JSON.stringify(updatedMessages));
      
      setMessages(updatedMessages);
      setNewMessage('');
      setAttachments([]);
      scrollToBottom();
    } catch (error) {
      setError('Error sending message');
      console.error('Error sending message:', error);
    }
  };

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle file attachment
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  // Remove attachment
  const removeAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Update message display logic
  const isOwnMessage = (message) => {
    return message.sender === currentUserId;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-0 right-4 w-96 bg-white rounded-t-lg shadow-lg"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-t-lg">
        <h3 className="font-medium">Chat</h3>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          <FaTimes />
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-4 ${isOwnMessage(message) ? 'text-right' : 'text-left'}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    isOwnMessage(message)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.content}</p>
                  {message.attachments?.map((attachment, index) => (
                    <div key={index} className="mt-2">
                      {attachment.type === 'image' ? (
                        <img
                          src={attachment.url}
                          alt={attachment.name}
                          className="max-w-xs rounded"
                        />
                      ) : (
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm underline"
                        >
                          {attachment.name}
                        </a>
                      )}
                    </div>
                  ))}
                  <span className="text-xs opacity-75 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="cursor-pointer">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <FaPaperclip className="text-gray-500 hover:text-blue-600" />
          </label>
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Chat;