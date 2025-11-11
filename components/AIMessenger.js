// components/AIMessenger.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AIMessenger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Sample initial messages
  const initialMessages = [
    {
      id: 1,
      text: "👋 Hello! I'm your AI assistant. How can I help you with your profile today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ];

  useEffect(() => {
    if (messages.length === 0) {
      setMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Simulate AI response (replace with actual Gemini API call)
  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Sample responses - replace with actual Gemini API integration
    const responses = [
      "That's a great question! Let me help you optimize your profile.",
      "I can assist you with creating an amazing GitHub profile. What specific aspect would you like to improve?",
      "Based on your query, I recommend focusing on showcasing your key skills and projects.",
      "Would you like me to help you generate some creative markdown for your profile?",
      "I can provide tips on how to make your profile stand out to recruiters and collaborators.",
      "Let me help you create a stunning GitHub profile that showcases your unique skills!",
      "I'm here to help you build an impressive developer portfolio. What would you like to work on?",
      "Great question! I can assist with markdown formatting, skill showcases, and profile optimization."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      id: Date.now(),
      text: randomResponse,
      sender: 'ai',
      timestamp: new Date()
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now(),
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Animation variants
  const messengerVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      x: -100
    },
    visible: { 
      scale: 1,
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      scale: 0,
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  const chatWindowVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      x: -100
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      x: -100,
      transition: {
        duration: 0.3
      }
    },
    minimized: {
      scale: 0.9,
      y: 20,
      height: "60px",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    }
  };

  const iconVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 0.6,
        rotate: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }
      }
    },
    pulse: {
      scale: [1, 1.15, 1],
      boxShadow: [
        "0 20px 40px rgba(59, 130, 246, 0.3)",
        "0 20px 50px rgba(59, 130, 246, 0.5)",
        "0 20px 40px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <>
      {/* Floating Messenger Icon - Now on LEFT side */}
      <motion.div
        className="fixed bottom-6 left-6 z-50"
        initial="hidden"
        animate="visible"
        variants={messengerVariants}
      >
        <motion.button
          className={`relative w-16 h-16 rounded-2xl shadow-2xl border-2 backdrop-blur-xl ${
            isOpen 
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-white/30' 
              : 'bg-gradient-to-br from-brand to-brand-light border-white/40'
          } flex items-center justify-center group overflow-hidden`}
          onClick={() => setIsOpen(!isOpen)}
          variants={iconVariants}
          whileHover="hover"
          whileTap={{ scale: 0.9 }}
          animate={messages.length > 1 && !isOpen ? "pulse" : "idle"}
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-brand/80 to-brand-light/80"
            animate={{
              background: [
                "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
                "linear-gradient(135deg, #06B6D4 0%, #10B981 100%)",
                "linear-gradient(135deg, #10B981 0%, #3B82F6 100%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform"
            initial={{ x: "-100%" }}
            whileHover={{ x: "200%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Notification badge */}
          {messages.length > 1 && !isOpen && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              <span className="text-white text-xs font-bold">
                {messages.length - 1}
              </span>
            </motion.div>
          )}

          {/* Animated icon */}
          <motion.div
            className="relative z-10"
            animate={{
              rotate: isOpen ? 180 : 0
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.svg
              className="w-7 h-7 text-white drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              )}
            </motion.svg>
          </motion.div>

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 left-6 w-80 h-96 z-50 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-xl bg-white/95 dark:bg-dark-800/95 overflow-hidden"
            variants={chatWindowVariants}
            initial="hidden"
            animate={isMinimized ? "minimized" : "visible"}
            exit="exit"
            style={{
              height: isMinimized ? "60px" : "384px"
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand to-brand-light p-4 text-white relative">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-50"
                animate={{
                  background: [
                    "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                    "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)",
                    "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",
                  ],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <motion.svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{
                        scale: [1, 1.2, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </motion.svg>
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-sm">AI Profile Assistant</h3>
                    <motion.p 
                      className="text-xs opacity-90"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {isTyping ? "🤔 Thinking..." : "🟢 Online & Ready"}
                    </motion.p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <motion.button
                    onClick={toggleMinimize}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={isMinimized ? "Expand" : "Minimize"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isMinimized ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      )}
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={clearChat}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Clear chat"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages Container - Hidden when minimized */}
            {!isMinimized && (
              <motion.div 
                ref={chatContainerRef}
                className="h-64 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white/50 to-white/30 dark:from-dark-700/50 dark:to-dark-800/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-2xl px-4 py-3 backdrop-blur-sm border ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-brand to-brand-light text-white border-brand/30 rounded-br-none shadow-lg'
                            : 'bg-white/80 dark:bg-dark-600/80 text-dark-600 dark:text-light-400 border-light-300/50 dark:border-dark-500/50 rounded-bl-none shadow-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <motion.p 
                          className={`text-xs mt-2 ${
                            message.sender === 'user' ? 'text-blue-100' : 'text-dark-400 dark:text-light-500'
                          }`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </motion.p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white/80 dark:bg-dark-600/80 text-dark-600 dark:text-light-400 rounded-2xl rounded-bl-none px-4 py-3 backdrop-blur-sm border border-light-300/50 dark:border-dark-500/50 shadow-md">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-brand rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-brand rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-brand rounded-full"
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <span className="text-xs text-dark-400 dark:text-light-500">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </motion.div>
            )}

            {/* Input Area - Hidden when minimized */}
            {!isMinimized && (
              <motion.div 
                className="border-t border-light-300/50 dark:border-dark-600/50 p-4 bg-white/80 dark:bg-dark-700/80 backdrop-blur-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <motion.textarea
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about profiles, skills, or markdown..."
                      className="w-full px-4 py-3 text-sm border border-light-300/50 dark:border-dark-600/50 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-brand/30 bg-white dark:bg-dark-600 text-dark-600 dark:text-light-400 placeholder-dark-400 dark:placeholder-light-500 backdrop-blur-sm transition-all duration-200"
                      rows="1"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-4 py-3 bg-gradient-to-r from-brand to-brand-light text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg"
                    whileHover={{ 
                      scale: !inputMessage.trim() || isLoading ? 1 : 1.05,
                      boxShadow: !inputMessage.trim() || isLoading ? "0 4px 15px rgba(59, 130, 246, 0.3)" : "0 8px 25px rgba(59, 130, 246, 0.5)"
                    }}
                    whileTap={{ scale: !inputMessage.trim() || isLoading ? 1 : 0.95 }}
                  >
                    {isLoading ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ scale: 1.1 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </motion.svg>
                    )}
                  </motion.button>
                </div>
                <motion.p 
                  className="text-xs text-dark-400 dark:text-light-500 mt-3 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  💫 Powered by Gemini AI • Ask about profiles, skills, or markdown
                </motion.p>
              </motion.div>
            )}

            {/* Minimized state */}
            {isMinimized && (
              <motion.div 
                className="h-full flex items-center justify-between px-4 bg-gradient-to-r from-brand/10 to-brand-light/10 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-brand to-brand-light rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-700 dark:text-light-300">AI Assistant</p>
                    <p className="text-xs text-dark-400 dark:text-light-500">{messages.length} messages</p>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIMessenger;