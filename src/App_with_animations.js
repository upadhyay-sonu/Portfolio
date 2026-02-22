import React from 'react';
import { AdvancedPortfolioHero } from './components/AdvancedPortfolioHero';
import { MagneticButton } from './components/MagneticButton';
import { FloatingCard } from './components/FloatingCard';
import { InteractiveBackground } from './components/InteractiveBackground';
import { AnimatedGradientText } from './components/AnimatedGradientText';
import { EdgeShiftUI } from './components/EdgeShiftUI';
import { useCursorPosition } from './hooks/useCursorPosition';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { motion } from 'framer-motion';
import './App.css';

/**
 * COMPLETE PORTFOLIO APP WITH ADVANCED ANIMATIONS
 * 
 * This demonstrates all animation components in action:
 * 1. Hero section with background parallax
 * 2. Floating card grid
 * 3. Magnetic buttons
 * 4. Animated gradients
 * 5. Edge shift UI
 * 6. Responsive and performance optimized
 */

function App() {
  const { isLowEndDevice, perfMetrics } = usePerformanceMonitor();

  return (
    <div className="w-full bg-slate-950 text-gray-100 overflow-x-hidden">
      {/* HERO SECTION */}
      <AdvancedPortfolioHero />

      {/* FEATURES SECTION */}
      <motion.section
        className="relative z-10 min-h-screen py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <InteractiveBackground
          enableParticles={!isLowEndDevice}
          particleCount={15}
          intensity={0.3}
        />

        <div className="max-w-6xl mx-auto relative z-20">
          <div className="text-center mb-16">
            <AnimatedGradientText
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-6"
              animation="shimmer"
              gradient="from-cyan-400 via-blue-500 to-purple-600"
            >
              Advanced Features
            </AnimatedGradientText>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience cutting-edge interactive animations optimized for
              performance
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                number: '01',
                title: 'Cursor Tracking',
                description:
                  'Elements respond to cursor position in real-time with zero re-renders',
                icon: '🖱️',
              },
              {
                number: '02',
                title: 'Parallax Effects',
                description:
                  'Multi-layer depth effect creates stunning visual hierarchy',
                icon: '📐',
              },
              {
                number: '03',
                title: 'Magnetic Buttons',
                description:
                  'Buttons pull toward cursor with spring-based physics',
                icon: '🧲',
              },
              {
                number: '04',
                title: 'Floating Cards',
                description:
                  'Cards follow cursor subtly with 3D rotation effects',
                icon: '🎴',
              },
              {
                number: '05',
                title: 'Animated Gradients',
                description:
                  'Smooth gradient animations with multiple effect variants',
                icon: '🌈',
              },
              {
                number: '06',
                title: 'Edge Shift',
                description:
                  'UI elements shift when cursor approaches viewport edges',
                icon: '↔️',
              },
            ].map((feature, idx) => (
              <FloatingCard
                key={idx}
                intensity={0.6}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300 group"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <div className="text-cyan-400 text-sm font-semibold tracking-widest mb-2">
                  {feature.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>

                {/* Hover border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      'radial-gradient(circle at center, rgba(59, 130, 246, 0.3), transparent 70%)',
                  }}
                />
              </FloatingCard>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SHOWCASE SECTION */}
      <motion.section
        className="relative z-10 min-h-screen py-20 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimatedGradientText
              as="h2"
              className="text-4xl md:text-5xl font-bold mb-6"
              animation="wave"
              gradient="from-purple-400 via-pink-400 to-cyan-400"
            >
              Interactive Showcase
            </AnimatedGradientText>
          </div>

          {/* Magnetic Buttons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { text: 'Explore Code', color: 'from-cyan-500 to-blue-600' },
              { text: 'View Projects', color: 'from-purple-500 to-pink-600' },
              { text: 'Contact Me', color: 'from-green-500 to-teal-600' },
              {
                text: 'Download CV',
                color: 'from-orange-500 to-red-600',
              },
            ].map((btn, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <MagneticButton
                  magneticRadius={250}
                  onClick={() => console.log(`Clicked: ${btn.text}`)}
                  className={`w-full px-8 py-6 bg-gradient-to-r ${btn.color} text-white font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 active:scale-95`}
                >
                  {btn.text}
                </MagneticButton>
              </motion.div>
            ))}
          </div>

          {/* CTA Section with Edge Shift */}
          <EdgeShiftUI strength={30}>
            <motion.div
              className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 rounded-3xl p-12 text-center backdrop-blur-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold mb-4">Ready to Build?</h3>
              <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                Integrate these production-ready components into your projects
                for stunning interactive animations.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <MagneticButton
                  magneticRadius={200}
                  className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all"
                >
                  Get Started
                </MagneticButton>

                <MagneticButton
                  magneticRadius={200}
                  className="px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-300 hover:bg-purple-500/10 font-semibold rounded-lg transition-all"
                >
                  Learn More
                </MagneticButton>
              </div>
            </motion.div>
          </EdgeShiftUI>
        </div>
      </motion.section>

      {/* PERFORMANCE STATS */}
      <motion.section
        className="relative z-10 min-h-screen py-20 px-6 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedGradientText
            as="h2"
            className="text-4xl md:text-5xl font-bold mb-16"
            animation="pulse"
            gradient="from-blue-400 via-cyan-400 to-teal-400"
          >
            Performance Optimized
          </AnimatedGradientText>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Target FPS', value: '60+' },
              { label: 'GPU Accelerated', value: '100%' },
              { label: 'No Re-renders', value: '✓' },
              { label: 'Bundle Size', value: '~40KB' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="p-6 rounded-xl bg-slate-800/50 border border-cyan-500/20"
                whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.6)' }}
              >
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Device Performance Status */}
          <div className="mt-16 p-8 rounded-2xl bg-slate-800/50 border border-cyan-500/20">
            <div className="mb-4">
              <span className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                isLowEndDevice
                  ? 'bg-red-500/20 text-red-300'
                  : 'bg-green-500/20 text-green-300'
              }`}>
                {isLowEndDevice ? '🔴 Low-End Device Mode' : '🟢 High Performance Mode'}
              </span>
            </div>

            <div className="text-left text-sm text-gray-300">
              <p className="mb-2">
                <strong>GPU:</strong> {perfMetrics.gpu}
              </p>
              <p className="mb-2">
                <strong>Memory:</strong> {perfMetrics.memory}
              </p>
              <p className="mb-2">
                <strong>Connection:</strong> {perfMetrics.connection}
              </p>
              <p>
                <strong>FPS:</strong> {perfMetrics.fps}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-900/50 border-t border-cyan-500/20 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p className="mb-4">
            Built with React • Framer Motion • Tailwind CSS
          </p>
          <p className="text-xs">
            © 2024 Advanced Animation System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
