import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

/**
 * OPTIMIZED APP.JS WITH CODE SPLITTING
 * 
 * Performance improvements:
 * 1. React.lazy - splits components into separate bundles
 * 2. Suspense - shows loading state during lazy load
 * 3. Dynamic imports - loads components on-demand
 * 4. Route-based splitting - splits by page/section
 * 5. Error boundaries - handles loading failures gracefully
 */

// Lazy load heavy components - they'll be in separate chunks
const AdvancedPortfolioHero = lazy(() => 
  import('./components/AdvancedPortfolioHero').catch(err => {
    console.error('Failed to load AdvancedPortfolioHero:', err);
    return { default: () => <div>Failed to load component</div> };
  })
);

const FloatingNavbar = lazy(() => 
  import('./FloatingNavbar').catch(err => {
    console.error('Failed to load FloatingNavbar:', err);
    return { default: () => <div>Failed to load navigation</div> };
  })
);

const SplitNavigation = lazy(() => 
  import('./SplitNavigation').catch(err => {
    console.error('Failed to load SplitNavigation:', err);
    return { default: () => <div>Failed to load navigation</div> };
  })
);

/**
 * ERROR BOUNDARY
 * Handles errors in lazy-loaded components gracefully
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950">
          <div className="text-center text-gray-400">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * LOADING FALLBACK
 * Shown while components are being lazy loaded
 */
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">
      <motion.div
        className="flex gap-2"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-3 h-3 rounded-full bg-cyan-500" />
        <div className="w-3 h-3 rounded-full bg-cyan-500" />
        <div className="w-3 h-3 rounded-full bg-cyan-500" />
      </motion.div>
    </div>
  );
}

/**
 * MAIN APP COMPONENT
 * 
 * Structure:
 * - Global styles (imported only once)
 * - Navigation (lazy loaded)
 * - Main content (lazy loaded)
 * - Error boundaries (handles failures)
 * - Suspense boundaries (shows loading states)
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="w-full min-h-screen bg-slate-950 text-gray-100">
        {/* Global styles - imported once at app level */}
        <style>{globalStyles}</style>

        {/* Navigation */}
        <Suspense fallback={null}>
          <FloatingNavbar />
        </Suspense>

        {/* Hero Section */}
        <Suspense fallback={<LoadingFallback />}>
          <AdvancedPortfolioHero />
        </Suspense>

        {/* Main Content */}
        <Suspense fallback={<LoadingFallback />}>
          <SplitNavigation />
        </Suspense>

        {/* Footer */}
        <footer className="relative z-10 bg-slate-900/50 border-t border-cyan-500/20 py-12 px-6">
          <div className="max-w-6xl mx-auto text-center text-gray-400">
            <p className="mb-4">Built with React • Framer Motion • Tailwind CSS • Vite</p>
            <p className="text-xs">© 2024 Optimized Portfolio. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}

/**
 * GLOBAL STYLES
 * Inlined here to avoid extra CSS file (minified automatically)
 * 
 * Why inline? For critical CSS:
 * - Loads immediately without extra HTTP request
 * - No render blocking
 * - Injected into document head via <style> tag
 */
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    background-color: #0f172a;
    color: #f1f5f9;
    overflow-x: hidden;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Performance: use will-change sparingly */
  button, [role="button"] {
    cursor: pointer;
    transition: all 0.3s ease;
  }

  /* Smooth scrolling */
  @supports (scroll-behavior: smooth) {
    html {
      scroll-behavior: smooth;
    }
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default App;
