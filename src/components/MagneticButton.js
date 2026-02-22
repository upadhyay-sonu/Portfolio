import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useCursorPosition, useCursorDistance } from '../hooks/useCursorPosition';

/**
 * MAGNETIC BUTTON COMPONENT
 * 
 * How it works:
 * 1. Detects cursor proximity using distance calculation
 * 2. Calculates magnetic pull force based on distance
 * 3. Moves button toward cursor within magnetic radius
 * 4. Uses motion values for GPU-accelerated 60fps performance
 * 5. Spring physics for natural elastic feel
 * 
 * Performance: O(1) calculation per frame, no re-renders
 */
export const MagneticButton = ({
  children,
  magneticRadius = 150,
  onlyTextMagnetic = false,
  springConfig = { stiffness: 300, damping: 20 },
  onClick,
  className = '',
}) => {
  const buttonRef = useRef(null);
  const { cursorX, cursorY } = useCursorPosition();
  const { distanceX, distanceY, distance } = useCursorDistance(buttonRef, cursorX, cursorY);

  // Calculate magnetic pull offset
  const pullX = useTransform(distanceX, (x) => {
    // No pull outside magnetic radius
    const dist = distance.get();
    if (dist > magneticRadius) return 0;
    
    // Pull strength decreases with distance
    const strength = 1 - dist / magneticRadius;
    return (x * strength) / dist * 25;
  });

  const pullY = useTransform(distanceY, (y) => {
    const dist = distance.get();
    if (dist > magneticRadius) return 0;
    
    const strength = 1 - dist / magneticRadius;
    return (y * strength) / dist * 25;
  });

  // Calculate glow intensity based on proximity
  const glowOpacity = useTransform(distance, (d) => {
    if (d > magneticRadius) return 0;
    return (1 - d / magneticRadius) * 0.8;
  });

  const buttonContent = (
    <motion.div
      ref={buttonRef}
      style={{
        x: pullX,
        y: pullY,
      }}
      transition={springConfig}
      className={`relative ${className}`}
    >
      {children}

      {/* Glow effect on proximity */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)',
        }}
      />
    </motion.div>
  );

  if (onlyTextMagnetic) {
    return (
      <button
        onClick={onClick}
        className={`relative ${className}`}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      style={{
        x: pullX,
        y: pullY,
      }}
      transition={springConfig}
      className={`relative ${className}`}
    >
      {children}

      {/* Glow effect on proximity */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl pointer-events-none"
        style={{
          opacity: glowOpacity,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6), transparent)',
        }}
      />
    </motion.button>
  );
};

export default MagneticButton;
