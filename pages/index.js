import React, { useContext, useEffect, useRef, useState } from "react";
import LandingLayout from "../components/layouts/LandingLayout";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { StateContext } from "./_app";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import AIMessenger from '../components/AIMessenger';

import {
  outerContainer,
  heroItem,
  slideUpContainer,
  slideFromLeft,
  slideFromRight,
  slideFromBottom,
  scaleUp,
  fadeIn,
} from "../lib/framerMotion";

// Floating particles component
const FloatingParticles = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-brand/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, -30, 0],
            x: [null, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Animated background gradient
const AnimatedGradient = () => {
  const gradientVariants = {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
  };

  return (
    <motion.div
      className="absolute inset-0 opacity-30"
      variants={gradientVariants}
      animate="animate"
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        background: "linear-gradient(-45deg, #3B82F6, #8B5CF6, #06B6D4, #10B981)",
        backgroundSize: "400% 400%",
      }}
    />
  );
};

// Skill card component
const SkillCard = ({ icon, name, delay = 0 }) => (
  <motion.div
    className="group relative bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm rounded-2xl p-4 border border-light-200 dark:border-dark-600 hover:border-brand/50 transition-all duration-300 cursor-pointer"
    whileHover={{ 
      scale: 1.05, 
      y: -5,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)"
    }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      delay 
    }}
    viewport={{ once: true }}
  >
    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-brand to-brand-light rounded-xl group-hover:scale-110 transition-transform duration-300">
      <img src={icon} alt={name} className="w-6 h-6" />
    </div>
    <p className="text-center text-sm font-medium text-dark-600 dark:text-light-400 group-hover:text-brand transition-colors">
      {name}
    </p>
  </motion.div>
);

// Social link component
const SocialLink = ({ icon, name, darkIcon, delay = 0 }) => (
  <motion.div
    className="group relative"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ 
      type: "spring", 
      stiffness: 200, 
      damping: 15,
      delay 
    }}
    viewport={{ once: true }}
  >
    <div className="relative bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm rounded-2xl p-4 border border-light-200 dark:border-dark-600 hover:border-brand/50 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl">
      <div className="w-8 h-8 mx-auto relative">
        <img
          src={icon}
          className="w-full h-full dark:hidden scale-100 group-hover:scale-110 transition-transform duration-300"
          alt={name}
        />
        {darkIcon && (
          <img
            src={darkIcon}
            className="w-full h-full hidden dark:block scale-100 group-hover:scale-110 transition-transform duration-300"
            alt={name}
          />
        )}
      </div>
    </div>
  </motion.div>
);

// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand to-brand-light origin-left z-50"
      style={{ scaleX }}
    />
  );
};

export default function Home() {
  const router = useRouter();
  const { state, dispatch } = useContext(StateContext);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.5, 0]);

  const codeString = `Hi 👋 My name is Peter Parker
=============================

Web Developer
-------------

* 🌍  I'm based in London, England
* 🖥️  See my portfolio at [peterparker.com](http://peterparker.com)
* ✉️  You can contact me at [peter@pparker.com](mailto:peter@pparker.com)
* 🚀  I'm currently working on [peterparker.com](http://peterparker.com)
* 🧠  I'm learning a new JavaScript framework
* 🤝  I'm open to collaborating on interesting JavaScript projects
* ⚡  I moonlight as a super hero`;

  // Skills data
  const skills = [
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg", name: "JavaScript" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg", name: "TypeScript" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg", name: "React" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vuejs-colored.svg", name: "Vue.js" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg", name: "Node.js" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg", name: "Python" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/tailwindcss-colored.svg", name: "Tailwind" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/graphql-colored.svg", name: "GraphQL" },
  ];

  // Socials data
  const socials = [
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg", name: "GitHub" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/twitter.svg", name: "Twitter" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg", name: "LinkedIn" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/youtube.svg", name: "YouTube" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/instagram.svg", name: "Instagram" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/facebook.svg", name: "Facebook" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/discord.svg", name: "Discord" },
    { icon: "https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/twitch.svg", name: "Twitch" },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeString);
    // You can add a toast notification here
    alert('Code copied to clipboard!');
  };

  return (
    <>
      <ScrollProgress />
      <AIMessenger />
      
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="w-full flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700 min-h-screen relative overflow-hidden">
        <AnimatedGradient />
        <FloatingParticles />
        
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.article
          initial="hidden"
          animate="visible"
          variants={heroItem}
          transition={{ type: "spring", duration: 1, bounce: 0.3 }}
          className="container mx-auto px-4 sm:px-6 flex flex-col items-center gap-y-8 text-center relative z-10"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm rounded-full border border-light-300 dark:border-dark-600 text-sm text-dark-600 dark:text-light-400 mb-4"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Trusted by 10,000+ developers worldwide
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            Tạo hồ sơ nổi bật
            <br />
            <motion.span 
              className="text-brand bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              tuyệt vời trong vài phút
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-dark-600 dark:text-light-400 max-w-2xl leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Biến đổi GitHub của bạn với markdown ấn tượng, thể hiện kỹ năng và kết nối cộng đồng chỉ trong vài cú nhấp.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 mt-8"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              onClick={() => router.push("/create-profile")}
              className="group relative bg-gradient-to-r from-brand to-brand-light text-white px-6 py-3 rounded-xl font-semibold text-base shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                🚀 Create Your Profile
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.a
              href="https://www.facebook.com/queen2kxx"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm border border-light-300 dark:border-dark-600 text-dark-700 dark:text-light-300 px-6 py-3 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:border-brand/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                Star on GitHub
              </span>
            </motion.a>
          </motion.div>

          <motion.a
            className="group bg-white/60 dark:bg-dark-700/60 backdrop-blur-sm border border-light-300 dark:border-dark-600 text-dark-600 dark:text-light-400 px-4 py-2 rounded-full font-medium mt-6 hover:border-red-400 hover:text-red-500 transition-all duration-300"
            href="https://github.com/sponsors/danielcranney"
            rel="noopener noreferrer"
            target="_blank"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="flex items-center gap-2">
              <motion.svg
                className="w-4 h-4 text-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
              </motion.svg>
              Support this project
            </span>
          </motion.a>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-dark-400 dark:border-light-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-dark-400 dark:bg-light-400 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.article>
      </section>

      {/* Enhanced Preview Section */}
      <section className="w-full flex items-center bg-white dark:bg-dark-800 py-20 relative overflow-hidden">
        <motion.article
          initial="hidden"
          whileInView="visible"
          variants={slideUpContainer}
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-4 sm:px-6 flex flex-col items-center"
        >
          <motion.div
            className="w-full max-w-4xl relative"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Browser frame */}
            <div className="bg-light-200 dark:bg-dark-700 rounded-t-2xl p-4 border-b border-light-300 dark:border-dark-600">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
            
            <motion.div
              className="relative rounded-b-2xl overflow-hidden shadow-2xl shadow-dark-900/10 border border-light-200 dark:border-dark-700"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/screenshot.png"
                className="w-full h-auto"
                alt="ProfileMe.dev interface preview"
              />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform"
                initial={{ x: "-100%" }}
                whileInView={{ x: "200%" }}
                transition={{ duration: 1.5, delay: 1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </motion.article>
      </section>

      {/* Enhanced Skills Section */}
      <section className="w-full flex items-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-dark-900 dark:to-dark-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        
        <article className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row w-full items-center gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromLeft}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
              className="flex flex-col w-full lg:w-2/5 items-center lg:items-start gap-6"
            >
              <div>
                <motion.span 
                  className="text-brand font-semibold text-sm mb-3 block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  FEATURES
                </motion.span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Showcase your{" "}
                  <span className="text-brand bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                    superpowers
                  </span>
                </h2>
              </div>
              <p className="text-lg text-dark-600 dark:text-light-400 text-center lg:text-left leading-relaxed">
                From frontend to backend, mobile to DevOps - showcase 60+ technologies 
                with beautiful, animated icons that make your skills pop.
              </p>
              
              <motion.button
                onClick={() => router.push("/create-profile#skills")}
                className="group bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm border border-light-300 dark:border-dark-600 text-dark-700 dark:text-light-300 px-4 py-2 rounded-lg font-medium hover:border-brand/50 hover:text-brand transition-all duration-300 mt-4"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Explore all skills
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromRight}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
              className="w-full lg:w-3/5"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <SkillCard
                    key={skill.name}
                    icon={skill.icon}
                    name={skill.name}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </article>
      </section>

      {/* Enhanced Socials Section */}
      <section className="w-full flex items-center bg-white dark:bg-dark-800 py-20 relative overflow-hidden">
        <article className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row-reverse w-full items-center gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromRight}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
              className="flex flex-col w-full lg:w-2/5 items-center lg:items-end gap-6"
            >
              <div className="text-center lg:text-right">
                <motion.span 
                  className="text-brand font-semibold text-sm mb-3 block"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  CONNECT
                </motion.span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Share your{" "}
                  <span className="text-brand bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                    digital presence
                  </span>
                </h2>
              </div>
              <p className="text-lg text-dark-600 dark:text-light-400 text-center lg:text-right leading-relaxed">
                Connect all your social profiles in one place. From GitHub to Twitter, 
                LinkedIn to YouTube - make it easy for visitors to find and follow you.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromLeft}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
              className="w-full lg:w-3/5"
            >
              <div className="grid grid-cols-4 gap-4">
                {socials.map((social, index) => (
                  <SocialLink
                    key={social.name}
                    icon={social.icon}
                    name={social.name}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </article>
      </section>

      {/* Enhanced Stats Section */}
      <section className="w-full flex items-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-dark-900 dark:to-dark-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-slate-300 dark:bg-dots-slate-700 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.8))]"></div>
        
        <article className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row w-full items-center justify-center gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromLeft}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
              className="flex w-full lg:w-1/2 flex-col items-center lg:items-start gap-6"
            >
              <div>
                <motion.span 
                  className="text-brand font-semibold text-sm mb-3 block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  ANALYTICS
                </motion.span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Impress with{" "}
                  <span className="text-brand bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                    live stats
                  </span>
                </h2>
              </div>
              <p className="text-lg text-dark-600 dark:text-light-400 text-center lg:text-left leading-relaxed">
                Showcase your GitHub activity, contribution graphs, and coding stats 
                with beautiful, real-time visualizations that update automatically.
              </p>
              
              <div className="flex gap-4 mt-4">
                {[
                  { number: "2.5k", label: "Commits" },
                  { number: "150+", label: "Repositories" },
                  { number: "98%", label: "Activity" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-3 bg-white/80 dark:bg-dark-700/80 backdrop-blur-sm rounded-lg border border-light-200 dark:border-dark-600"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <div className="text-xl font-bold text-brand">{stat.number}</div>
                    <div className="text-xs text-dark-600 dark:text-light-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromRight}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <motion.div
                className="relative w-full max-w-md"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
              >
                <div className="dark:hidden block">
                  <Image
                    src="/stats-illustration.svg"
                    width={400}
                    height={300}
                    className="w-full h-auto drop-shadow-xl"
                    alt="Statistics illustration"
                  />
                </div>
                <div className="hidden dark:block">
                  <Image
                    src="/stats-illustration-dark.svg"
                    width={400}
                    height={300}
                    className="w-full h-auto drop-shadow-xl"
                    alt="Statistics illustration"
                  />
                </div>
                
                {/* Floating elements around the illustration */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </article>
      </section>

      {/* Enhanced Code Snippet Section */}
      <section className="w-full flex items-center bg-white dark:bg-dark-800 py-20 relative overflow-hidden">
        <article className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromBottom}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3 }}
              className="flex w-full flex-col items-center gap-6 text-center"
            >
              <div>
                <motion.span 
                  className="text-brand font-semibold text-sm mb-3 block"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  GET STARTED
                </motion.span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  Copy. Paste.{" "}
                  <span className="text-brand bg-gradient-to-r from-brand to-brand-light bg-clip-text text-transparent">
                    Impress.
                  </span>
                </h2>
              </div>
              <p className="text-lg text-dark-600 dark:text-light-400 max-w-2xl leading-relaxed">
                Generate your perfect GitHub profile in minutes. Copy the markdown, 
                paste it into your README, and watch your profile transform instantly.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromBottom}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 1, bounce: 0.3, delay: 0.2 }}
              className="w-full relative"
            >
              {/* Mac-style window */}
              <div className="bg-gradient-to-b from-light-200 to-light-300 dark:from-dark-700 dark:to-dark-600 rounded-t-xl p-3 border-b border-light-300 dark:border-dark-500 shadow-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 shadow-sm"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-sm"></div>
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm"></div>
                </div>
              </div>
              
              <div className="relative rounded-b-xl overflow-hidden shadow-xl border border-light-200 dark:border-dark-700">
                <SyntaxHighlighter 
                  language="markdown" 
                  style={nord}
                  showLineNumbers
                  customStyle={{
                    padding: '2rem 1.5rem 1.5rem',
                    fontSize: '0.85rem',
                    lineHeight: '1.5',
                    borderRadius: '0 0 0.75rem 0.75rem',
                    margin: 0,
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily: 'Monaco, Consolas, "Liberation Mono", monospace',
                    }
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
                
                {/* Copy button */}
                <motion.button
                  onClick={handleCopyCode}
                  className="absolute top-3 right-3 bg-white/90 dark:bg-dark-600/90 backdrop-blur-sm border border-light-300 dark:border-dark-500 text-dark-600 dark:text-light-400 px-3 py-1.5 rounded text-sm font-medium hover:bg-brand hover:text-white hover:border-brand transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Copy Code
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={slideFromBottom}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.3, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 mt-6"
            >
              <motion.button
                onClick={() => router.push("/create-profile")}
                className="group relative bg-gradient-to-r from-brand to-brand-light text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  ✨ Start Creating Now
                  <motion.svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </article>
      </section>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};