import React, { useState, useEffect } from 'react';
import ChatList from '../../../chat/ChatList';
import Chat from '../../../chat/Chat';

const StudentMessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [conversations, setConversations] = useState([]); // assuming conversations state is defined somewhere
  const [currentUserId, setCurrentUserId] = useState(null); // assuming currentUserId state is defined somewhere
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tutorId = urlParams.get('tutor');
    
    if (tutorId) {
      // Find or create conversation with this tutor
      const conversation = conversations.find(c => c.participants.includes(tutorId));
      if (conversation) {
        setSelectedChat(conversation);
      } else {
        // Create new conversation
        const newConversation = {
          id: `new-${Date.now()}`,
          participants: [currentUserId, tutorId]
        };
        setSelectedChat(newConversation);
      }
    }
  }, [conversations, currentUserId]);
  
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-full md:w-1/3 border-r border-gray-200">
        <ChatList 
          onSelectChat={setSelectedChat} 
          selectedChatId={selectedChat?.id}
          userType="student"
        />
      </div>
      
      <div className="hidden md:flex flex-1">
        {selectedChat ? (
          <Chat 
            recipientId={selectedChat.tutor.id} 
            userType="student"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMessagesPage;