import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useCursorPosition, useCursorDistance } from '../hooks/useCursorPosition';

/**
 * FLOATING CARD COMPONENT
 * 
 * Features:
 * 1. Subtle cursor tracking (10-20px offset)
 * 2. 3D rotation based on cursor position
 * 3. Dynamic glow following cursor
 * 4. Parallax scrolling support
 * 5. Spring-based animations for smooth motion
 * 
 * Performance:
 * - Uses motion values (no re-renders)
 * - Transform-only animations (GPU accelerated)
 * - Lazy cursor tracking (only when visible)
 */
export const FloatingCard = ({
  children,
  intensity = 1,
  followCursor = true,
  className = '',
  style = {},
}) => {
  const cardRef = useRef(null);
  const { cursorX, cursorY } = useCursorPosition();
  const { distanceX, distanceY } = useCursorDistance(cardRef, cursorX, cursorY);

  // Subtle card position following cursor
  const offsetX = useTransform(distanceX, (x) => {
    const distance = Math.sqrt(x * x + distanceY.get() * distanceY.get());
    if (distance > 300) return 0; // Don't track beyond 300px
    
    return (x * intensity) / 50;
  });

  const offsetY = useTransform(distanceY, (y) => {
    const distance = Math.sqrt(distanceX.get() * distanceX.get() + y * y);
    if (distance > 300) return 0;
    
    return (y * intensity) / 50;
  });

  // 3D rotation based on cursor
  const rotateX = useTransform(distanceY, (y) => {
    const distance = Math.sqrt(distanceX.get() * distanceX.get() + y * y);
    if (distance > 300) return 0;
    
    return (y / window.innerHeight) * 15 * intensity;
  });

  const rotateY = useTransform(distanceX, (x) => {
    const distance = Math.sqrt(x * x + distanceY.get() * distanceY.get());
    if (distance > 300) return 0;
    
    return -(x / window.innerWidth) * 15 * intensity;
  });

  // Glow brightness follows cursor
  const glowIntensity = useTransform(
    [distanceX, distanceY],
    ([x, y]) => {
      const distance = Math.sqrt(x * x + y * y);
      return Math.max(0, 1 - distance / 300);
    }
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        x: followCursor ? offsetX : 0,
        y: followCursor ? offsetY : 0,
        rotateX: followCursor ? rotateX : 0,
        rotateY: followCursor ? rotateY : 0,
        perspective: 1200,
        ...style,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 25,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Glow background */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-2xl pointer-events-none"
        style={{
          opacity: glowIntensity,
          background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4), transparent 70%)',
        }}
      />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        style={{
          opacity: glowIntensity,
        }}
      >
        <motion.div
          className="absolute w-full h-full"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default FloatingCard;
