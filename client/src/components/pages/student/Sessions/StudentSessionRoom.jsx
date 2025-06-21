import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaVideo,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaComments,
  FaChalkboardTeacher,
  FaTimes,
  FaPaperclip,
  FaSmile,
  FaExclamationTriangle,
  FaSpinner
} from 'react-icons/fa';
import api from '../../../../services/api';
import { useSocket } from '../../../../contexts/SocketContext';

const StudentSessionRoom = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const socket = useSocket();
  
  // State for media controls
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [error, setError] = useState(null);

  // State for session data
  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [participants, setParticipants] = useState([]);

  // Refs for media elements
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const chatRef = useRef(null);
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const whiteboardRef = useRef(null);

  // Whiteboard state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pen');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [lastPoint, setLastPoint] = useState(null);
  const whiteboardContext = useRef(null);

  // Fetch session details
  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        const response = await api.get(`/api/sessions/${sessionId}`);
        setSession(response.data.session);
        
        // Join session room via socket
        socket.emit('join-session', { sessionId });
      } catch (error) {
        console.error('Error fetching session:', error);
        setError('Failed to load session details');
        toast.error('Failed to load session details');
      }
    };

    fetchSessionDetails();
  }, [sessionId, socket]);

  // Initialize WebRTC
  useEffect(() => {
    const initializeMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        localStream.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Initialize WebRTC connection
        initializePeerConnection();
      } catch (error) {
        console.error('Error accessing media devices:', error);
        setError('Failed to access camera/microphone');
        toast.error('Please allow camera and microphone access');
      } finally {
        setIsConnecting(false);
      }
    };

    initializeMedia();

    return () => {
      // Cleanup
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, []);

  // Initialize whiteboard
  useEffect(() => {
    if (whiteboardRef.current) {
      const canvas = whiteboardRef.current;
      const context = canvas.getContext('2d');
      whiteboardContext.current = context;

      // Set canvas size
      const resizeCanvas = () => {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }
  }, [isWhiteboardOpen]);

  // Socket event handlers
  useEffect(() => {
    if (!socket) return;

    socket.on('session-joined', ({ participants: newParticipants }) => {
      setParticipants(newParticipants);
    });

    socket.on('chat-message', (message) => {
      setMessages(prev => [...prev, message]);
      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    });

    socket.on('peer-joined', ({ peerId }) => {
      // Handle new peer joining
      console.log('Peer joined:', peerId);
    });

    socket.on('peer-left', ({ peerId }) => {
      // Handle peer leaving
      console.log('Peer left:', peerId);
    });

    return () => {
      socket.off('session-joined');
      socket.off('chat-message');
      socket.off('peer-joined');
      socket.off('peer-left');
    };
  }, [socket]);

  // Whiteboard event handlers
  const handleWhiteboardMouseDown = (e) => {
    if (!whiteboardContext.current) return;

    const rect = whiteboardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });

    if (currentTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        whiteboardContext.current.font = '20px Arial';
        whiteboardContext.current.fillStyle = currentColor;
        whiteboardContext.current.fillText(text, x, y);
        socket.emit('whiteboard-draw', {
          sessionId,
          type: 'text',
          text,
          x,
          y,
          color: currentColor
        });
      }
    }
  };

  const handleWhiteboardMouseMove = (e) => {
    if (!isDrawing || !whiteboardContext.current) return;

    const rect = whiteboardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const context = whiteboardContext.current;
    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(x, y);
    context.strokeStyle = currentTool === 'eraser' ? '#FFFFFF' : currentColor;
    context.lineWidth = currentTool === 'eraser' ? 20 : 2;
    context.lineCap = 'round';
    context.stroke();

    socket.emit('whiteboard-draw', {
      sessionId,
      type: 'line',
      from: lastPoint,
      to: { x, y },
      color: currentTool === 'eraser' ? '#FFFFFF' : currentColor,
      width: currentTool === 'eraser' ? 20 : 2
    });

    setLastPoint({ x, y });
  };

  const handleWhiteboardMouseUp = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  // Socket event handlers for whiteboard
  useEffect(() => {
    if (!socket) return;

    socket.on('whiteboard-draw', (data) => {
      if (!whiteboardContext.current) return;

      const context = whiteboardContext.current;
      context.beginPath();

      if (data.type === 'line') {
        context.moveTo(data.from.x, data.from.y);
        context.lineTo(data.to.x, data.to.y);
        context.strokeStyle = data.color;
        context.lineWidth = data.width;
        context.lineCap = 'round';
        context.stroke();
      } else if (data.type === 'text') {
        context.font = '20px Arial';
        context.fillStyle = data.color;
        context.fillText(data.text, data.x, data.y);
      }
    });

    socket.on('whiteboard-clear', () => {
      if (!whiteboardContext.current) return;
      const context = whiteboardContext.current;
      context.clearRect(0, 0, whiteboardRef.current.width, whiteboardRef.current.height);
    });

    socket.on('whiteboard-tool', (data) => {
      setCurrentTool(data.tool);
    });

    socket.on('whiteboard-color', (data) => {
      setCurrentColor(data.color);
    });

    return () => {
      socket.off('whiteboard-draw');
      socket.off('whiteboard-clear');
      socket.off('whiteboard-tool');
      socket.off('whiteboard-color');
    };
  }, [socket]);

  const initializePeerConnection = () => {
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    // Add local stream
    localStream.current.getTracks().forEach(track => {
      peerConnection.current.addTrack(track, localStream.current);
    });

    // Handle ICE candidates
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          sessionId,
          candidate: event.candidate
        });
      }
    };

    // Handle incoming tracks
    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: 'student',
        message: message.trim(),
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      socket.emit('chat-message', {
        sessionId,
        message: newMessage
      });

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      if (chatRef.current) {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOn(videoTrack.enabled);
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsAudioOn(audioTrack.enabled);
    }
  };

  const handleEndSession = async () => {
    if (window.confirm('Are you sure you want to end the session?')) {
      try {
        await api.put(`/api/sessions/${sessionId}/end`);
        navigate('/student/sessions');
      } catch (error) {
        console.error('Error ending session:', error);
        toast.error('Failed to end session');
      }
    }
  };

  if (error) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-lg font-medium">{error}</h3>
          <button
            onClick={() => navigate('/student/sessions')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Return to Sessions
          </button>
        </div>
      </div>
    );
  }

  if (isConnecting) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <FaSpinner className="mx-auto h-12 w-12 animate-spin" />
          <h3 className="mt-4 text-lg font-medium">Connecting to session...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Tutor Video */}
            <div className="bg-gray-800 rounded-lg overflow-hidden relative">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              {session?.tutor && (
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-medium">{session.tutor.user.name}</p>
                  <p className="text-sm text-gray-300">{session.subject}</p>
                </div>
              )}
            </div>

            {/* Student Video */}
            <div className="bg-gray-800 rounded-lg overflow-hidden relative">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-medium">You</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 p-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full ${
                isAudioOn ? 'bg-gray-700' : 'bg-red-500'
              } text-white hover:bg-gray-600 focus:outline-none`}
            >
              {isAudioOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full ${
                isVideoOn ? 'bg-gray-700' : 'bg-red-500'
              } text-white hover:bg-gray-600 focus:outline-none`}
            >
              {isVideoOn ? <FaVideo /> : <FaVideoSlash />}
            </button>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`p-3 rounded-full ${
                isChatOpen ? 'bg-indigo-500' : 'bg-gray-700'
              } text-white hover:bg-gray-600 focus:outline-none`}
            >
              <FaComments />
            </button>
            <button
              onClick={() => setIsWhiteboardOpen(!isWhiteboardOpen)}
              className={`p-3 rounded-full ${
                isWhiteboardOpen ? 'bg-indigo-500' : 'bg-gray-700'
              } text-white hover:bg-gray-600 focus:outline-none`}
            >
              <FaChalkboardTeacher />
            </button>
            <button
              onClick={handleEndSession}
              className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Sidebar */}
      {isChatOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          className="w-80 bg-gray-800 flex flex-col"
        >
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-medium">Chat</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <FaTimes />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'student' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'student'
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p>{msg.message}</p>
                  <p className="text-xs mt-1 opacity-75">{msg.timestamp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-white"
              >
                <FaPaperclip />
              </button>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-white"
              >
                <FaSmile />
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </form>
          </div>
        </motion.div>
      )}

      {/* Whiteboard Sidebar */}
      {isWhiteboardOpen && (
        <motion.div
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          className="w-96 bg-gray-800 flex flex-col"
        >
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-medium">Whiteboard</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  if (window.confirm('Clear the whiteboard?')) {
                    // Clear whiteboard
                    socket.emit('whiteboard-clear', { sessionId });
                  }
                }}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              >
                Clear
              </button>
              <button
                onClick={() => setIsWhiteboardOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Whiteboard Tools */}
          <div className="p-2 border-b border-gray-700 flex space-x-2">
            <button
              onClick={() => socket.emit('whiteboard-tool', { sessionId, tool: 'pen' })}
              className="p-2 text-white hover:bg-gray-700 rounded"
              title="Pen"
            >
              ✏️
            </button>
            <button
              onClick={() => socket.emit('whiteboard-tool', { sessionId, tool: 'eraser' })}
              className="p-2 text-white hover:bg-gray-700 rounded"
              title="Eraser"
            >
              🧹
            </button>
            <button
              onClick={() => socket.emit('whiteboard-tool', { sessionId, tool: 'text' })}
              className="p-2 text-white hover:bg-gray-700 rounded"
              title="Text"
            >
              T
            </button>
            <button
              onClick={() => socket.emit('whiteboard-tool', { sessionId, tool: 'shape' })}
              className="p-2 text-white hover:bg-gray-700 rounded"
              title="Shapes"
            >
              ⬡
            </button>
            <input
              type="color"
              onChange={(e) => socket.emit('whiteboard-color', { sessionId, color: e.target.value })}
              className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
            />
          </div>

          {/* Whiteboard Canvas */}
          <div className="flex-1 p-4">
            <canvas
              ref={whiteboardRef}
              className="bg-white rounded-lg w-full h-full"
              onMouseDown={handleWhiteboardMouseDown}
              onMouseMove={handleWhiteboardMouseMove}
              onMouseUp={handleWhiteboardMouseUp}
              onMouseLeave={handleWhiteboardMouseUp}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudentSessionRoom; 