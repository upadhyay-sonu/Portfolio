import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveBackground } from './InteractiveBackground';
import { AnimatedGradientText, StaggeredText } from './AnimatedGradientText';
import { FloatingCard } from './FloatingCard';
import { MagneticButton } from './MagneticButton';
import { EdgeShiftUI } from './EdgeShiftUI';
import { usePerformanceMonitor } from '../hooks/usePerformanceMonitor';

/**
 * ADVANCED PORTFOLIO HERO
 * 
 * Complete hero section with all interactive features:
 * - Interactive background with parallax
 * - Animated gradient text
 * - Floating cards
 * - Magnetic buttons
 * - Edge shift UI
 * - Responsive and performance optimized
 */
export const AdvancedPortfolioHero = () => {
  const { isLowEndDevice, quality } = usePerformanceMonitor();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Interactive Background */}
      <InteractiveBackground
        enableParticles={quality.enableParticles}
        particleCount={isLowEndDevice ? 10 : 30}
        intensity={0.6}
        variant="gradient"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">
        <EdgeShiftUI strength={quality.enableParallax ? 40 : 0}>
          <div className="max-w-5xl mx-auto px-6 text-center">
            {/* Main Title with Animated Gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedGradientText
                as="h1"
                className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                animation="wave"
                duration={3}
                gradient="from-cyan-400 via-blue-500 to-purple-600"
              >
                Build Stunning Interfaces
              </AnimatedGradientText>
            </motion.div>

            {/* Subtitle with Stagger Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
                Interactive animations powered by cursor position & physics
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-6 justify-center mb-12 flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <MagneticButton
                magneticRadius={200}
                onClick={() => console.log('Explore')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              >
                Explore Projects
              </MagneticButton>

              <MagneticButton
                magneticRadius={200}
                onClick={() => console.log('Contact')}
                className="px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-300 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300"
              >
                Get in Touch
              </MagneticButton>
            </motion.div>

            {/* Floating Cards Grid */}
            {quality.enableFloatingCards && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  {
                    icon: '⚡',
                    title: 'Lightning Fast',
                    description: '60fps smooth animations',
                  },
                  {
                    icon: '🎯',
                    title: 'Interactive',
                    description: 'Cursor-driven effects',
                  },
                  {
                    icon: '📱',
                    title: 'Responsive',
                    description: 'Works on all devices',
                  },
                ].map((card, idx) => (
                  <FloatingCard
                    key={idx}
                    intensity={0.8}
                    className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 backdrop-blur-md hover:border-cyan-500/60 transition-colors"
                  >
                    <div className="text-4xl mb-3">{card.icon}</div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-400">{card.description}</p>
                  </FloatingCard>
                ))}
              </motion.div>
            )}

            {/* Stats Section */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[
                { number: '100+', label: 'Projects' },
                { number: '60fps', label: 'Performance' },
                { number: '∞', label: 'Possibilities' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </EdgeShiftUI>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="text-gray-400 text-sm mb-2">Scroll to explore</div>
        <svg
          className="w-6 h-6 text-cyan-400 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>

      {/* Performance indicator (dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-slate-900/90 text-cyan-400 px-4 py-2 rounded text-xs font-mono z-50">
          {isLowEndDevice ? '🔴 Low-End Device' : '🟢 High Performance'} Mode
        </div>
      )}
    </div>
  );
};

export default AdvancedPortfolioHero;
