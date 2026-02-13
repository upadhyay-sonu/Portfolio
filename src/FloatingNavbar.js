import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, GraduationCap, FileText, Mail } from 'lucide-react';

const FloatingNavbar = () => {
  const [position, setPosition] = useState({ x: 0, y: 30 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lightAngle, setLightAngle] = useState({ x: 0, y: 0 });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  const floatingAnimationRef = useRef(null);

  // Floating animation - organic, smooth movement (faster)
  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.0004; // Increased speed (2x faster)
      const x = Math.sin(time) * 80 + Math.sin(time * 0.9) * 60;
      const y = Math.cos(time * 1.1) * 70 + Math.sin(time * 0.7) * 50;

      setPosition({ x, y });
      floatingAnimationRef.current = requestAnimationFrame(animate);
    };

    floatingAnimationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(floatingAnimationRef.current);
  }, []);

  // Mouse tracking for tilt and lighting
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!navRef.current) return;

      const rect = navRef.current.getBoundingClientRect();
      const navCenterX = rect.left + rect.width / 2;
      const navCenterY = rect.top + rect.height / 2;

      // Distance from mouse to navbar center
      const dx = e.clientX - navCenterX;
      const dy = e.clientY - navCenterY;

      // Tilt effect based on proximity
      const distance = Math.sqrt(dx * dx + dy * dy);
      const proximityFactor = Math.max(0, 1 - distance / 300); // Closer proximity radius

      // Smooth tilt (increased intensity)
      setTilt({
        x: (dy / rect.height) * proximityFactor * 25,
        y: -(dx / rect.width) * proximityFactor * 25,
      });

      // Light reflection follows cursor
      setLightAngle({
        x: (e.clientY / window.innerHeight) * 100,
        y: (e.clientX / window.innerWidth) * 100,
      });

      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems = [
    { label: 'Projects', href: '#projects', icon: Rocket },
    { label: 'Skills', href: '#skills', icon: Zap },
    { label: 'Education', href: '#education', icon: GraduationCap },
    { label: 'CV', href: '#cv', icon: FileText },
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveDropdown(null);
  };

  return (
    <motion.div
      ref={navRef}
      className="fixed z-50 pointer-events-auto"
      style={{
        top: `${position.y}px`,
        left: `50%`,
        x: '-50%',
        perspective: 1200,
      }}
      animate={{
        x: '-50%',
      }}
    >
      {/* Glow background orb */}
      <div
        className="absolute inset-0 rounded-3xl blur-3xl opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightAngle.y}% ${lightAngle.x}%, rgba(52, 211, 255, 0.6), rgba(168, 85, 247, 0.3), transparent)`,
          width: '120%',
          height: '120%',
          left: '-10%',
          top: '-10%',
        }}
      />

      {/* Main navbar container with 3D effect */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative"
      >
        {/* 3D depth layers */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(20px)',
          }}
          className="relative px-8 py-4 rounded-2xl backdrop-blur-md bg-gradient-to-br from-slate-900/80 via-purple-900/40 to-slate-900/80 border border-cyan-500/30 shadow-2xl"
        >
          {/* Holographic shine effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.05) 25%,
                rgba(255, 255, 255, 0) 50%,
                rgba(255, 255, 255, 0.05) 75%,
                rgba(255, 255, 255, 0.1) 100%)`,
              animation: 'shimmer 3s infinite',
            }}
          />

          {/* Dynamic light reflection */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at ${lightAngle.y}% ${lightAngle.x}%, rgba(52, 211, 255, 0.4), transparent 60%)`,
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />

          {/* Navbar content */}
          <nav className="relative z-10 flex items-center gap-2 sm:gap-4">
            {/* Logo / Brand */}
            <motion.div
              className="mr-4 sm:mr-8 font-bold text-sm sm:text-lg bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              SK.
            </motion.div>

            {/* Navigation items */}
            {navItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
              <div key={idx} className="relative group">
                <motion.button
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-gray-200 group/nav transition-colors duration-300 flex items-center gap-1 sm:gap-2"
                  whileHover={{ 
                    scale: 1.1,
                    color: '#06b6d4',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{item.label}</span>

                  {/* Glow underline on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            );
            })}

            {/* Divider */}
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent mx-2 sm:mx-4" />

            {/* CTA Button */}
            <motion.a
              href="https://www.linkedin.com/in/sonukumar102/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-magenta-600 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center gap-2"
              whileHover={{ 
                scale: 1.08,
                boxShadow: '0 0 30px rgba(52, 211, 255, 0.8)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Connect</span>
            </motion.a>
          </nav>
        </div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full blur-sm"
            style={{
              left: `${20 + i * 30}%`,
              top: '50%',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        /* Smooth scrolling for navbar links */
        html {
          scroll-behavior: smooth;
        }

        /* GPU acceleration for floating navbar */
        [data-navbar] {
          will-change: transform;
          transform: translateZ(0);
        }
      `}</style>
    </motion.div>
  );
};

export default FloatingNavbar;
