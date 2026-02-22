import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';

/**
 * Custom hook for optimized cursor tracking
 * Uses requestAnimationFrame and motion values for 60fps performance
 * 
 * How it works:
 * 1. Tracks mouse position only when needed (lazy listeners)
 * 2. Uses Framer Motion's useMotionValue for non-state updates
 * 3. Debounces listener registration to prevent memory leaks
 * 4. Returns motion values that don't trigger re-renders
 */
export const useCursorPosition = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isMovingRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (!isMovingRef.current) {
        isMovingRef.current = true;
      }

      // Update motion values directly without triggering re-renders
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(lastX);
        cursorY.set(lastY);
      });
    };

    const handleMouseLeave = () => {
      isMovingRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY]);

  return { cursorX, cursorY, isMoving: isMovingRef.current };
};

/**
 * Hook for element-specific cursor distance calculation
 * Enables magnetic button effects and proximity-based interactions
 */
export const useCursorDistance = (elementRef, cursorX, cursorY) => {
  const distanceX = useMotionValue(0);
  const distanceY = useMotionValue(0);
  const distance = useMotionValue(0);

  useEffect(() => {
    const updateDistance = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dX = cursorX.get() - centerX;
      const dY = cursorY.get() - centerY;
      const dist = Math.sqrt(dX * dX + dY * dY);

      distanceX.set(dX);
      distanceY.set(dY);
      distance.set(dist);
    };

    const unsubscribeX = cursorX.onChange(() => updateDistance());
    const unsubscribeY = cursorY.onChange(() => updateDistance());

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY, distanceX, distanceY, distance, elementRef]);

  return { distanceX, distanceY, distance };
};
