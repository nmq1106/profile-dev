import React, { useState, useContext, useEffect, useRef } from "react";
import { StateContext } from "../../pages/_app";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const ThemeSwitch = () => {
  const { state, dispatch } = useContext(StateContext);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ripples, setRipples] = useState([]);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const switchRef = useRef(null);
  const particlesRef = useRef([]);

  // Enhanced animation variants
  const switchVariants = {
    light: {
      x: 0,
      rotate: 0,
      scale: 1,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.6
      }
    },
    dark: {
      x: "calc(100% - 2.25rem)",
      rotate: 180,
      scale: 1,
      background: "linear-gradient(135deg, #1e3a8a 0%, #7e22ce 100%)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.1,
      rotate: currentTheme === "dark" ? 190 : -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const containerVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.8,
      y: 20 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.3
      }
    }
  };

  const iconVariants = {
    sun: {
      initial: { scale: 0, rotate: -180, opacity: 0 },
      animate: { 
        scale: 1, 
        rotate: 0, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 15,
          duration: 0.5
        }
      },
      exit: { 
        scale: 0, 
        rotate: 180, 
        opacity: 0,
        transition: {
          duration: 0.3
        }
      }
    },
    moon: {
      initial: { scale: 0, rotate: 180, opacity: 0 },
      animate: { 
        scale: 1, 
        rotate: 0, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 15,
          duration: 0.5
        }
      },
      exit: { 
        scale: 0, 
        rotate: -180, 
        opacity: 0,
        transition: {
          duration: 0.3
        }
      }
    }
  };

  const backgroundGlowVariants = {
    light: {
      background: "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.2) 100%)",
      boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    dark: {
      background: "linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(126, 34, 206, 0.3) 100%)",
      boxShadow: "0 8px 32px rgba(30, 58, 138, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.05)"
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 12px 40px rgba(102, 126, 234, 0.5)",
      transition: {
        duration: 0.3
      }
    }
  };

  // Particle system for advanced effects
  const createParticles = (count) => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 56,
      y: Math.random() * 32,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 2
    }));
  };

  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(createParticles(8));
  }, []);

  const renderThemeIcon = () => {
    if (!mounted) return null;

    const SunIcon = () => (
      <motion.div
        key="sun"
        className="relative"
        variants={iconVariants.sun}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.svg
          className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </motion.svg>
        
        {/* Sun rays */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 0.8, 0],
              x: `-50% calc(-50% + ${Math.cos((i * 60 * Math.PI) / 180) * 12}px)`,
              y: `-50% calc(-50% + ${Math.sin((i * 60 * Math.PI) / 180) * 12}px)`,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    );

    const MoonIcon = () => (
      <motion.div
        key="moon"
        className="relative"
        variants={iconVariants.moon}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.svg
          className="w-4 sm:w-5 h-4 sm:h-5 text-blue-200"
          fill="currentColor"
          viewBox="0 0 24 24"
          animate={{
            rotate: [0, -5, 5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
        </motion.svg>

        {/* Stars around moon */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: `-50% calc(-50% + ${Math.cos((i * 90 * Math.PI) / 180) * 16}px)`,
              y: `-50% calc(-50% + ${Math.sin((i * 90 * Math.PI) / 180) * 16}px)`,
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>
    );

    return currentTheme === "dark" ? <MoonIcon /> : <SunIcon />;
  };

  const handleThemeToggle = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);

    // Create ripple effect
    const newRipple = {
      id: Date.now(),
      x: 50,
      y: 50,
      size: 0
    };
    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    // Create particles explosion
    const particleCount = currentTheme === "dark" ? 12 : 8;
    const newParticles = createParticles(particleCount);
    setParticles(newParticles);

    // Smooth transition with delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setTheme(currentTheme === "dark" ? "light" : "dark");
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <motion.div 
        className="flex relative mr-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-14 sm:w-16 h-8 sm:h-9 bg-gradient-to-r from-light-300 to-light-400 dark:from-dark-600 dark:to-dark-700 rounded-2xl animate-pulse shadow-lg"></div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="flex relative mr-auto"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Main container with enhanced glow */}
      <motion.div
        className="absolute w-full h-8 -translate-y-1/2 top-1/2 rounded-2xl backdrop-blur-xl"
        variants={backgroundGlowVariants}
        animate={currentTheme}
        whileHover="hover"
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          animate={{
            opacity: isHovered ? 1 : 0,
            background: [
              "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 100%)",
              "linear-gradient(135deg, rgba(168, 85, 247, 0.3) 0%, rgba(59, 130, 246, 0.2) 100%)",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: particle.size,
              height: particle.size,
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity,
            }}
            animate={{
              y: [particle.y, particle.y - 20],
              opacity: [particle.opacity, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      <motion.button
        ref={switchRef}
        aria-label="change theme"
        onClick={handleThemeToggle}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="w-14 sm:w-16 h-8 sm:h-9 relative overflow-hidden rounded-2xl group"
        whileHover="hover"
        whileTap="tap"
        disabled={isAnimating}
      >
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute rounded-full bg-white/40"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              size: [0, 100],
              opacity: [0.8, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Main toggle button with enhanced gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl shadow-2xl"
          variants={switchVariants}
          animate={currentTheme === "dark" ? "dark" : "light"}
          style={{
            originX: 0,
            originY: 0.5,
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "200%" : "-100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Inner glow */}
          <motion.div
            className="absolute inset-1 rounded-xl bg-white/10"
            animate={{
              opacity: isHovered ? 0.3 : 0.1,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Theme icon container */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {renderThemeIcon()}
          </AnimatePresence>
        </div>

        {/* Click wave effect */}
        {isAnimating && (
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/50"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </motion.button>

      {/* Enhanced tooltip */}
      <motion.div
        className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-dark-800 to-dark-900 text-white text-xs px-3 py-2 rounded-lg shadow-2xl opacity-0 pointer-events-none whitespace-nowrap border border-dark-600/50 backdrop-blur-sm"
        animate={{
          opacity: isHovered ? 1 : 0,
          y: isHovered ? -8 : -4,
          scale: isHovered ? 1 : 0.9,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30 
        }}
      >
        Switch to {currentTheme === "dark" ? "light" : "dark"} mode
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-3 h-3 bg-dark-800 rotate-45 border-r border-b border-dark-600/50"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
        />
      </motion.div>

      {/* Ambient light effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl opacity-0"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          background: currentTheme === "dark" 
            ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(251, 191, 36, 0.4) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

export default ThemeSwitch;