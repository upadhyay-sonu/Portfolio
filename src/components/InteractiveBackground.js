import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useCursorPosition } from '../hooks/useCursorPosition';
import { useMultiLayerParallax } from '../hooks/useParallax';

/**
 * INTERACTIVE BACKGROUND COMPONENT
 * 
 * Features:
 * 1. Multi-layer parallax background
 * 2. Animated gradient that responds to cursor
 * 3. Particle effects (optional)
 * 4. Responsive and mobile-safe
 * 5. GPU-accelerated transforms
 * 
 * How it works:
 * - Uses 4 layers with increasing parallax intensity
 * - Gradient animates continuously + responds to cursor
 * - Particles float and pulse with subtle motion
 * - All animations use GPU-accelerated transforms
 */
export const InteractiveBackground = ({
  enableParticles = true,
  particleCount = 20,
  intensity = 0.5,
  variant = 'gradient', // 'gradient' | 'mesh' | 'vortex'
}) => {
  const { cursorX, cursorY } = useCursorPosition();
  const layers = useMultiLayerParallax(cursorX, cursorY, [0.2, 0.4, 0.6, 0.8]);

  // Gradient rotation based on cursor
  const gradientRotate = useTransform(
    [cursorX, cursorY],
    ([x, y]) => {
      const angle = Math.atan2(y - window.innerHeight / 2, x - window.innerWidth / 2);
      return (angle * 180) / Math.PI;
    }
  );

  // Gradient scale based on cursor movement
  const gradientScale = useTransform(
    [cursorX, cursorY],
    ([x, y]) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      const maxDistance = Math.sqrt(
        Math.pow(centerX, 2) + Math.pow(centerY, 2)
      );
      return 1 + (distance / maxDistance) * 0.5;
    }
  );

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-slate-950" />

      {/* Animated gradient background layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: variant === 'gradient' 
            ? 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), transparent 50%)'
            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2))',
          rotate: gradientRotate,
          scale: gradientScale,
        }}
      />

      {/* Parallax layers */}
      {layers.map((layer, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0 pointer-events-none"
          style={{
            x: layer.x,
            y: layer.y,
            background: `radial-gradient(circle at ${50 + idx * 10}% ${50 + idx * 8}%, 
              ${idx % 2 === 0 ? 'rgba(168, 85, 247, 0.1)' : 'rgba(59, 130, 246, 0.1)'}, 
              transparent 60%)`,
            zIndex: idx,
            willChange: 'transform',
          }}
        />
      ))}

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.15), transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(236, 72, 153, 0.15), transparent 50%)',
            'radial-gradient(circle at 50% 20%, rgba(236, 72, 153, 0.15), transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(236, 72, 153, 0.15), transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      />

      {/* Floating particles */}
      {enableParticles && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: `rgba(${59 + Math.random() * 50}, ${130 + Math.random() * 50}, 246, 0.8)`,
                borderRadius: '50%',
                filter: 'blur(1px)',
              }}
              animate={{
                y: [0, -100 - Math.random() * 100, -200],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      )}

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, transparent 30%, rgba(15, 23, 42, 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
