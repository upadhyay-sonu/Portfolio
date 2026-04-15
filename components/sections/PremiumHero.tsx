'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SiReact, SiPython, SiNodedotjs, SiDocker, SiTensorflow } from 'react-icons/si';
import { HiSparkles } from 'react-icons/hi2';
import { FiArrowRight } from 'react-icons/fi';

export default function PremiumHero() {
  const techStack = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
    // Duplicate for infinite scroll effect
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  ];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,217,255,0.15),transparent_50%)]"></div>
        {/* Subtle animated moving grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PG1hdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)]"
          style={{ backgroundSize: '40px 40px' }}
        />
        {/* Animated Particles/Orbs */}
        <motion.div
           animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] left-[15%] w-72 h-72 bg-purple-600/30 rounded-full blur-[100px]"
        />
        <motion.div
           animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] right-[15%] w-72 h-72 bg-cyan-600/30 rounded-full blur-[100px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          {/* Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-max px-4 py-2 rounded-full glass-dark border border-cyan-500/30 flex items-center space-x-2 shadow-[0_0_15px_rgba(0,217,255,0.2)]"
          >
            <HiSparkles className="text-cyan-400" />
            <span className="text-sm font-medium text-cyan-50">Available for New Opportunities</span>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              I Build <span className="gradient-text">Intelligent,</span> Scalable & Visually <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Stunning</span> Digital Experiences
            </h1>
            <p className="text-lg md:text-xl text-gray-400 font-medium max-w-xl">
              Full Stack Developer | AI/ML Engineer | SaaS Builder
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(0, 217, 255, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden group bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all duration-300"
            >
              <span className="relative z-10">View Projects</span>
              <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl font-bold glass flex items-center justify-center border border-white/20 hover:border-white/40 transition-all duration-300"
            >
              Hire Me
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column: Visuals */}
        <motion.div
           initial={{ opacity: 0, x: 50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
           className="relative flex justify-center items-center"
        >
          {/* Profile Image with 3D Float effect */}
          <motion.div 
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-2"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ rotateX: 10, rotateY: -10, scale: 1.05 }}
            style={{ perspective: 1000 }}
          >
            {/* Glowing Border Rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 animate-spin-slow opacity-50 blur-md" style={{ animationDuration: '8s' }} />
            <div className="absolute inset-1 rounded-full bg-black z-10" />
            
            <div className="relative z-20 w-full h-full rounded-full overflow-hidden border-2 border-white/10 glass-dark">
              <Image
                src="/profile_4d.png"
                alt="Sonu Kumar"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -right-8 top-12 z-30 glass-dark px-4 py-2 rounded-xl border border-white/10 shadow-xl flex items-center space-x-2"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold">AI Projects Built</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -left-12 bottom-20 z-30 glass-dark px-4 py-2 rounded-xl border border-white/10 shadow-xl flex items-center space-x-2"
            >
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-xs font-semibold">Full Stack Developer</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech Stack Strip (Horizontal Scrolling) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/5 bg-black/50 backdrop-blur-md py-4">
        <div className="flex w-[200%] gap-12 whitespace-nowrap overflow-hidden">
          <motion.div
            className="flex items-center space-x-12 px-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 20,
            }}
          >
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors group">
                <tech.icon className="text-2xl transition-transform group-hover:scale-110" style={{ color: tech.color }} />
                <span className="text-sm font-semibold tracking-wider font-mono">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
