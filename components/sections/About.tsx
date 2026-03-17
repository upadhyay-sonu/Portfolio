'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Code2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 backdrop-blur-md p-8 flex items-center justify-center">
              <div className="text-center">
                <Code2 className="w-12 h-12 text-cyan-400 mx-auto mb-4 transition-all duration-200" />
                <p className="text-gray-400 text-sm">Full Stack Developer & AI/ML Enthusiast</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I am a passionate full-stack developer with expertise in Python, React, and Machine Learning.
              With a strong foundation in both AI/ML and web development, I create innovative solutions
              that bridge the gap between advanced algorithms and user-friendly interfaces.
            </p>

            <div className="space-y-4">
              {[
                "Python & Data Science Expert",
                "React & Frontend Specialist",
                "Machine Learning & AI Innovator",
                "Full-Stack Development Mastery",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <CheckCircle className="text-cyan-400 w-4 h-4 flex-shrink-0 transition-all duration-200" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-400 text-sm pt-4 border-t border-cyan-500/20">
              When I'm not coding, I'm exploring new technologies, contributing to open-source projects,
              and staying updated with the latest industry trends.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
