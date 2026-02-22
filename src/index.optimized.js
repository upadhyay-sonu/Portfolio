import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.optimized.js';
import './global.css';

/**
 * OPTIMIZED REACT ENTRY POINT
 * 
 * Performance optimizations:
 * 1. React 18 concurrent rendering
 * 2. Lazy component loading
 * 3. Error recovery
 * 4. Performance monitoring
 */

// Enable Strict Mode only in development
const StrictMode = process.env.NODE_ENV === 'development' ? React.StrictMode : React.Fragment;

/**
 * Performance Monitoring Hook
 * Logs Core Web Vitals to console/analytics
 */
function initPerformanceMonitoring() {
  // Log Largest Contentful Paint (LCP)
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.log('LCP not supported');
  }

  // Log First Input Delay (FID)
  if ('PerformanceObserver' in window) {
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('FID:', entry.processingDuration);
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.log('FID not supported');
    }
  }

  // Log Cumulative Layout Shift (CLS)
  let clsValue = 0;
  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('CLS:', clsValue);
      }
    });
  });

  try {
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.log('CLS not supported');
  }
}

/**
 * Main React App Mount
 */
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found. Make sure index.html has <div id="root"></div>');
} else {
  // Enable performance monitoring in development
  if (process.env.NODE_ENV === 'development') {
    initPerformanceMonitoring();
  }

  // Create React root (React 18 API)
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  // Log to console that app is ready
  console.log('✅ Portfolio app loaded successfully');
}
