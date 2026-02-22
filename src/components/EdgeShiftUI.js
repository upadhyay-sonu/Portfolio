import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useCursorPosition } from '../hooks/useCursorPosition';

/**
 * EDGE SHIFT UI COMPONENT
 * 
 * When mouse moves to one edge, UI elements smoothly shift toward the opposite side.
 * 
 * How it works:
 * 1. Detects cursor position relative to viewport edges
 * 2. Calculates edge proximity (0-1)
 * 3. Applies inverse displacement to UI elements
 * 4. Smooth spring animation for natural feel
 * 
 * Example: Mouse at left edge → elements shift right
 */
export const EdgeShiftUI = ({
  children,
  strength = 30,
  edgeThreshold = 100, // pixels from edge to activate
}) => {
  const { cursorX, cursorY } = useCursorPosition();
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  useEffect(() => {
    const calculateEdgeShift = () => {
      const x = cursorX.get();
      const y = cursorY.get();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Calculate distance from edges (0 = at edge, 1 = far from edge)
      const distFromLeft = Math.min(x, edgeThreshold) / edgeThreshold;
      const distFromRight = Math.min(windowWidth - x, edgeThreshold) / edgeThreshold;
      const distFromTop = Math.min(y, edgeThreshold) / edgeThreshold;
      const distFromBottom = Math.min(windowHeight - y, edgeThreshold) / edgeThreshold;

      // Calculate shift (inverse: if near left, shift right)
      const shiftX = (distFromRight - distFromLeft) * strength;
      const shiftY = (distFromBottom - distFromTop) * strength;

      offsetX.set(shiftX);
      offsetY.set(shiftY);
    };

    const unsubscribeX = cursorX.onChange(calculateEdgeShift);
    const unsubscribeY = cursorY.onChange(calculateEdgeShift);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY, offsetX, offsetY, edgeThreshold, strength]);

  return (
    <motion.div
      style={{
        x: offsetX,
        y: offsetY,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 30,
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
};

export default EdgeShiftUI;
