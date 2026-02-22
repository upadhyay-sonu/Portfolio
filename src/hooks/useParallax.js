import { useEffect, useRef } from 'react';
import { useMotionValue, useTransform } from 'framer-motion';

/**
 * Parallax hook for cursor-based depth effect
 * Creates multi-layer parallax with configurable intensity
 * 
 * Performance: Uses transform3d and will-change for GPU acceleration
 */
export const useParallax = (cursorX, cursorY, intensity = 20, elementRef = null) => {
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);

  useEffect(() => {
    const unsubscribeX = cursorX.onChange((x) => {
      const offsetX = (x / window.innerWidth - 0.5) * intensity;
      parallaxX.set(offsetX);
    });

    const unsubscribeY = cursorY.onChange((y) => {
      const offsetY = (y / window.innerHeight - 0.5) * intensity;
      parallaxY.set(offsetY);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY, parallaxX, parallaxY, intensity]);

  return { parallaxX, parallaxY };
};

/**
 * Multi-layer parallax effect for complex scenes
 * Better for creating depth hierarchy
 */
export const useMultiLayerParallax = (cursorX, cursorY, layers = [1, 2, 3, 4]) => {
  const paralaxLayers = layers.map(() => ({
    x: useMotionValue(0),
    y: useMotionValue(0),
  }));

  useEffect(() => {
    const unsubscribeX = cursorX.onChange((x) => {
      paralaxLayers.forEach((layer, idx) => {
        const intensity = (idx + 1) * 15;
        const offset = (x / window.innerWidth - 0.5) * intensity;
        layer.x.set(offset);
      });
    });

    const unsubscribeY = cursorY.onChange((y) => {
      paralaxLayers.forEach((layer, idx) => {
        const intensity = (idx + 1) * 15;
        const offset = (y / window.innerHeight - 0.5) * intensity;
        layer.y.set(offset);
      });
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [cursorX, cursorY, paralaxLayers]);

  return paralaxLayers;
};
