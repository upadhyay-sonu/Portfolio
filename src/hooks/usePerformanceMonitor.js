import { useEffect, useRef, useState } from 'react';

/**
 * Performance monitoring hook for detecting low-end devices
 * Automatically disables heavy animations on low-end devices
 * 
 * Detection criteria:
 * - GPU: Checks WebGL capabilities
 * - Memory: Checks available device memory
 * - CPU: Measures frame rendering time
 * - Connection: Detects slow network (for data-heavy animations)
 */
export const usePerformanceMonitor = () => {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const [perfMetrics, setPerfMetrics] = useState({
    fps: 60,
    gpu: 'unknown',
    memory: 'unknown',
    connection: 'fast',
  });

  useEffect(() => {
    // Check GPU capabilities using WebGL
    const checkGPU = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'unknown';

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          return gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        }
        return 'webgl-supported';
      } catch (e) {
        return 'no-webgl';
      }
    };

    // Check device memory
    const checkMemory = () => {
      if (navigator.deviceMemory) {
        return `${navigator.deviceMemory}GB`;
      }
      return 'unknown';
    };

    // Check connection speed
    const checkConnection = () => {
      if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.effectiveType === '4g' || connection.effectiveType === '5g') {
          return 'fast';
        }
        if (connection.effectiveType === '3g') {
          return 'slow';
        }
        if (connection.effectiveType === '2g') {
          return 'very-slow';
        }
      }
      return 'unknown';
    };

    // Measure FPS
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;
      }

      // Sample for 2 seconds
      if (frameCount < 120) {
        requestAnimationFrame(measureFPS);
      }
    };

    requestAnimationFrame(measureFPS);

    // Determine if low-end device
    const memory = checkMemory();
    const connection = checkConnection();
    const isLowMemory = memory !== 'unknown' && parseInt(memory) <= 2;
    const isSlowConnection = connection === 'slow' || connection === 'very-slow';

    const lowEnd = isLowMemory || isSlowConnection || fps < 50;

    setPerfMetrics({
      fps,
      gpu: checkGPU(),
      memory,
      connection,
    });

    setIsLowEndDevice(lowEnd);
  }, []);

  return {
    isLowEndDevice,
    perfMetrics,
    // Adaptive quality levels
    quality: {
      enableParallax: !isLowEndDevice,
      enableMagneticButtons: !isLowEndDevice,
      enableFloatingCards: !isLowEndDevice,
      enableGradients: true,
      enableParticles: !isLowEndDevice,
      animationFramerate: isLowEndDevice ? 30 : 60,
      blurAmount: isLowEndDevice ? 'blur-sm' : 'blur-md',
    },
  };
};

/**
 * Hook for throttling animations based on device capability
 */
export const useAdaptiveAnimation = (isLowEnd) => {
  return {
    transitionDuration: isLowEnd ? 0.8 : 0.3,
    springStiffness: isLowEnd ? 200 : 300,
    springDamping: isLowEnd ? 30 : 20,
    enableInstantTransform: isLowEnd,
  };
};
