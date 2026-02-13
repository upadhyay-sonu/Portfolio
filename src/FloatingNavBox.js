import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Enhanced 3D Floating Navigation Box
 * Features: Floating motion, 3D rotation, dynamic color reflection
 */
const FloatingNavBox = ({ 
  label, 
  icon: IconComponent, 
  action, 
  baseX, 
  baseY, 
  animationPhase = 0,
  color = 'cyan'
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [rotation3D, setRotation3D] = useState({ x: 0, y: 0, z: 0 });
  const [lightAngle, setLightAngle] = useState({ x: 0, y: 0 });
  const [dynamicColor, setDynamicColor] = useState(color);
  const [isHovered, setIsHovered] = useState(false);
  const boxRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef(null);

  // Independent floating animation with unique phase
  useEffect(() => {
    const animate = () => {
      // Unique time offset for each box based on phase
      const time = (Date.now() * 0.0003) + animationPhase;
      
      // Slower, more deliberate movement
      const x = Math.sin(time) * 40 + Math.sin(time * 0.7) * 30;
      const y = Math.cos(time * 0.9) * 35 + Math.sin(time * 0.6) * 25;

      setPosition({ x, y });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animationPhase]);

  // 3D Continuous rotation with dynamic color reflection
  useEffect(() => {
    const rotate3D = () => {
      const time = (Date.now() * 0.0005) + animationPhase; // Slow rotation
      const rotX = Math.sin(time * 0.8) * 45; // ±45° on X axis
      const rotY = Math.cos(time * 1.1) * 45; // ±45° on Y axis
      const rotZ = Math.sin(time * 0.3) * 15; // ±15° on Z axis (subtle)

      setRotation3D({ x: rotX, y: rotY, z: rotZ });

      // Dynamic color reflection based on rotation
      // Calculate intensity based on Y rotation (front to back)
      const colorIntensity = (Math.sin(rotY * Math.PI / 180) + 1) / 2; // 0 to 1
      
      // Color palette that shifts with rotation
      const colors = {
        cyan: ['from-cyan-500', 'from-blue-500', 'from-purple-500'],
        purple: ['from-purple-500', 'from-pink-500', 'from-cyan-500'],
        green: ['from-green-500', 'from-emerald-400', 'from-teal-500'],
        blue: ['from-blue-500', 'from-indigo-500', 'from-purple-500'],
        pink: ['from-pink-500', 'from-rose-500', 'from-purple-500'],
      };
      
      const colorList = colors[color] || colors.cyan;
      const colorIdx = Math.floor(colorIntensity * (colorList.length - 1));
      setDynamicColor(colorList[colorIdx]);

      rotationRef.current = requestAnimationFrame(rotate3D);
    };

    rotationRef.current = requestAnimationFrame(rotate3D);
    return () => cancelAnimationFrame(rotationRef.current);
  }, [animationPhase, color]);

  // Mouse tracking for tilt and lighting
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!boxRef.current) return;

      const rect = boxRef.current.getBoundingClientRect();
      const boxCenterX = rect.left + rect.width / 2;
      const boxCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - boxCenterX;
      const dy = e.clientY - boxCenterY;

      // Tilt effect based on proximity
      const distance = Math.sqrt(dx * dx + dy * dy);
      const proximityFactor = Math.max(0, 1 - distance / 250);

      setTilt({
        x: (dy / rect.height) * proximityFactor * 20,
        y: -(dx / rect.width) * proximityFactor * 20,
      });

      // Light reflection follows cursor
      setLightAngle({
        x: (e.clientY / window.innerHeight) * 100,
        y: (e.clientX / window.innerWidth) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Color mapping for gradient effects with dynamic options
  const colorMap = {
    cyan: {
      text: 'text-cyan-400',
      border: 'border-cyan-500/50',
      light: 'rgba(52, 211, 255, 0.6)',
      alt1: 'rgba(59, 130, 246, 0.6)', // blue
      alt2: 'rgba(168, 85, 247, 0.6)', // purple
    },
    purple: {
      text: 'text-purple-400',
      border: 'border-purple-500/50',
      light: 'rgba(168, 85, 247, 0.6)',
      alt1: 'rgba(236, 72, 153, 0.6)', // pink
      alt2: 'rgba(52, 211, 255, 0.6)', // cyan
    },
    green: {
      text: 'text-green-400',
      border: 'border-green-500/50',
      light: 'rgba(16, 185, 129, 0.6)',
      alt1: 'rgba(34, 197, 94, 0.6)', // emerald
      alt2: 'rgba(20, 184, 166, 0.6)', // teal
    },
    blue: {
      text: 'text-blue-400',
      border: 'border-blue-500/50',
      light: 'rgba(59, 130, 246, 0.6)',
      alt1: 'rgba(99, 102, 241, 0.6)', // indigo
      alt2: 'rgba(168, 85, 247, 0.6)', // purple
    },
    pink: {
      text: 'text-pink-400',
      border: 'border-pink-500/50',
      light: 'rgba(236, 72, 153, 0.6)',
      alt1: 'rgba(244, 63, 94, 0.6)', // rose
      alt2: 'rgba(168, 85, 247, 0.6)', // purple
    },
  };

  const c = colorMap[color] || colorMap.cyan;
  
  // Get current glow color based on dynamic color
  const getGlowColor = () => {
    if (dynamicColor.includes('purple')) return c.light;
    if (dynamicColor.includes('blue')) return c.alt1;
    if (dynamicColor.includes('emerald') || dynamicColor.includes('teal')) return c.alt1;
    if (dynamicColor.includes('indigo')) return c.alt1;
    if (dynamicColor.includes('rose')) return c.alt1;
    return c.light;
  };

  const handleClick = () => {
    if (typeof action === 'string') {
      // If action is a URL, open in new tab
      if (action.startsWith('http')) {
        window.open(action, '_blank', 'noopener,noreferrer');
      } else {
        // If action is a hash, scroll to section
        const element = document.querySelector(action);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (typeof action === 'function') {
      // If action is a function, call it
      action();
    }
  };

  return (
    <motion.div
      ref={boxRef}
      className="fixed pointer-events-auto"
      style={{
        top: `${baseY}px`,
        left: `${baseX}px`,
        perspective: 1200,
        zIndex: 40,
      }}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow background orb */}
      <div
        className="absolute inset-0 rounded-2xl blur-2xl opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${lightAngle.y}% ${lightAngle.x}%, ${c.light}, transparent)`,
          width: '140%',
          height: '140%',
          left: '-20%',
          top: '-20%',
        }}
      />

      {/* Main 3D box container with continuous rotation */}
      <motion.div
        animate={{
          rotateX: isHovered ? rotation3D.x + tilt.x * 0.5 : rotation3D.x,
          rotateY: isHovered ? rotation3D.y + tilt.y * 0.5 : rotation3D.y,
          rotateZ: rotation3D.z,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        className="relative"
      >
        {/* Outer 3D box structure */}
        <div
          style={{
            transformStyle: 'preserve-3d',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Front face with content */}
          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(25px)',
            }}
            className={`relative px-6 py-4 rounded-2xl backdrop-blur-md bg-gradient-to-br from-slate-900/90 via-purple-900/50 to-slate-900/90 border ${c.border} shadow-2xl cursor-pointer transition-all duration-300 group w-full`}
            whileHover={{
              scale: isHovered ? 1.1 : 1.0,
              boxShadow: `0 0 40px ${getGlowColor()}`,
            }}
            whileTap={{ scale: 0.92 }}
          >
          {/* Holographic shine effect */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.15) 0%,
                rgba(255, 255, 255, 0.05) 25%,
                rgba(255, 255, 255, 0) 50%,
                rgba(255, 255, 255, 0.05) 75%,
                rgba(255, 255, 255, 0.15) 100%)`,
            }}
          />

          {/* Dynamic light reflection */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-20"
            style={{
              background: `radial-gradient(circle at ${lightAngle.y}% ${lightAngle.x}%, rgba(255, 255, 255, 0.2), transparent 60%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-2 min-w-[80px]">
            {IconComponent && (
              <IconComponent className={`w-6 h-6 ${c.text}`} />
            )}
            <span className="text-xs sm:text-sm font-semibold text-gray-100 text-center whitespace-nowrap">
              {label}
            </span>
          </div>

          {/* Pulsing glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
            animate={{
              boxShadow: [
                `inset 0 0 20px ${getGlowColor()}, 0 0 15px ${getGlowColor()}`,
                `inset 0 0 30px ${getGlowColor()}, 0 0 25px ${getGlowColor()}`,
                `inset 0 0 20px ${getGlowColor()}, 0 0 15px ${getGlowColor()}`,
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
            
          {/* Dynamic reflection overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `linear-gradient(135deg, 
                ${getGlowColor().replace('0.6)', '0.3)')} 0%,
                transparent 40%,
                transparent 60%,
                ${getGlowColor().replace('0.6)', '0.2)')} 100%)`,
              opacity: isHovered ? 0.8 : 0.4,
              transition: 'opacity 0.3s ease',
            }}
          />
          </motion.button>

          {/* Back face (shadow depth) */}
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(-15px)',
              position: 'absolute',
              inset: 0,
              borderRadius: '1rem',
              background: `linear-gradient(135deg, 
                ${getGlowColor().replace('0.6)', '0.3)')} 0%,
                transparent 50%)`,
              border: `1px solid ${c.border}`,
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Side depth layers */}
          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(-8px) rotateY(90deg)',
              position: 'absolute',
              width: '20px',
              height: '100%',
              right: '-10px',
              top: 0,
              background: `linear-gradient(to right, ${getGlowColor().replace('0.6)', '0.4)')}, transparent)`,
              borderRadius: '0 1rem 1rem 0',
            }}
          />

          <div
            style={{
              transformStyle: 'preserve-3d',
              transform: 'translateZ(-8px) rotateY(-90deg)',
              position: 'absolute',
              width: '20px',
              height: '100%',
              left: '-10px',
              top: 0,
              background: `linear-gradient(to left, ${getGlowColor().replace('0.6)', '0.4)')}, transparent)`,
              borderRadius: '1rem 0 0 1rem',
            }}
          />
        </div>
      </motion.div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full blur-sm`}
            style={{
              left: `${30 + i * 40}%`,
              top: '50%',
              background: c.light,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingNavBox;
