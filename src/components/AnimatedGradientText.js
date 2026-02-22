import React from 'react';
import { motion } from 'framer-motion';

/**
 * ANIMATED GRADIENT TEXT
 * 
 * Features:
 * 1. Smooth gradient animation
 * 2. Character-by-character stagger effect
 * 3. Multiple animation variants
 * 4. Responsive typography
 * 5. Performance optimized with GPU acceleration
 */
export const AnimatedGradientText = ({
  children,
  as = 'h1',
  className = '',
  animation = 'wave', // 'wave' | 'shimmer' | 'pulse' | 'breathe'
  staggerDelay = 0.05,
  duration = 2,
  gradient = 'from-cyan-400 via-purple-400 to-pink-400',
}) => {
  const variants = {
    wave: {
      animate: {
        backgroundPosition: ['0% center', '100% center'],
      },
      transition: {
        duration,
        repeat: Infinity,
      },
    },
    shimmer: {
      animate: {
        backgroundPosition: ['200% center', '-200% center'],
      },
      transition: {
        duration,
        repeat: Infinity,
      },
    },
    pulse: {
      animate: {
        opacity: [0.6, 1, 0.6],
      },
      transition: {
        duration,
        repeat: Infinity,
      },
    },
    breathe: {
      animate: {
        scale: [1, 1.05, 1],
        opacity: [0.8, 1, 0.8],
      },
      transition: {
        duration: duration + 1,
        repeat: Infinity,
      },
    },
  };

  const animationVariant = variants[animation] || variants.wave;
  const Component = motion[as];

  return (
    <Component
      {...animationVariant}
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      style={{
        backgroundSize: '200% center',
        willChange: 'background-position, opacity, transform',
      }}
    >
      {children}
    </Component>
  );
};

/**
 * CHARACTER STAGGER ANIMATION
 * Animates each character individually with stagger effect
 */
export const StaggeredText = ({
  children,
  className = '',
  staggerDelay = 0.05,
  duration = 0.8,
}) => {
  const characters = Array.from(children);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        duration,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {characters.map((char, idx) => (
        <motion.span key={idx} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedGradientText;
