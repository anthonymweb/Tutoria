import React, { useState, useEffect } from 'react';
import ChatList from '../../../chat/ChatList';
import Chat from '../../../chat/Chat';

const TutorMessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  
  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-full md:w-1/3 border-r border-gray-200">
        <ChatList 
          onSelectChat={setSelectedChat} 
          selectedChatId={selectedChat?.id}
          userType="tutor"
        />
      </div>
      
      <div className="hidden md:flex flex-1">
        {selectedChat ? (
          <Chat 
            recipientId={selectedChat.student.id} 
            userType="tutor"
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

export default TutorMessagesPage;