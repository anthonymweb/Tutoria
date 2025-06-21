import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaVideo, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaVideoSlash,
  FaChalkboardTeacher,
  FaStop,
  FaFlag,
  FaClock,
  FaExpand,
  FaCompress,
  FaComments
} from 'react-icons/fa';

const TutorSessionRoom = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sessionDuration, setSessionDuration] = useState(60); // in minutes
  const [showReportModal, setShowReportModal] = useState(false);
  const videoRef = useRef(null);
  const whiteboardRef = useRef(null);

  // Mock session data - replace with actual data from your backend
  const sessionData = {
    id: sessionId,
    student: {
      name: 'John Smith',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    subject: 'Mathematics',
    topic: 'Calculus',
    startTime: new Date().toISOString()
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= sessionDuration * 60) {
          clearInterval(timer);
          handleEndSession();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sessionDuration]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    // Implement session end logic
    navigate('/tutor');
  };

  const handleReportIssue = () => {
    setShowReportModal(true);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Session Room</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Session room content for session {sessionId} will go here</p>
      </div>
    </div>
  );
};

export default TutorSessionRoom; 