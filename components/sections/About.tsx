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
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl p-4 flex flex-col items-center justify-center h-auto border border-cyan-500/30 backdrop-blur-md hover:scale-[1.02] transition-all duration-500">
              <div className="w-full flex justify-center bg-black/20 p-2 rounded-xl">
                <img
                  src="/profile_4d.png"
                  alt="Profile"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
              <div className="text-center mt-4">
                <div className="text-cyan-400 text-3xl mb-2">{`</>`}</div>
                <p className="text-sm text-gray-400">
                  Full Stack Developer & AI/ML Enthusiast
                </p>
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
              I am a passionate full-stack developer with a strong focus on building scalable, high-performance web applications and intelligent systems. My expertise spans Python, React, and Machine Learning, allowing me to seamlessly integrate powerful backend logic with intuitive, user-centric interfaces.
            </p>

            <p className="text-gray-400 text-base leading-relaxed">
              With a solid foundation in both AI/ML and modern web development, I specialize in transforming complex ideas into real-world solutions that are efficient, reliable, and visually engaging. I enjoy solving challenging problems, optimizing performance, and continuously improving user experience through clean and maintainable code.
            </p>

            <div className="space-y-4">
              {[
                "🔹 Python & Data Science Expert",
                "🔹 React & Frontend Specialist",
                "🔹 Machine Learning & AI Innovator",
                "🔹 Full-Stack Development Mastery",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="text-cyan-400 flex-shrink-0">{item.split(' ')[0]}</span>
                  <span>{item.substring(2)}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-400 text-sm pt-4 border-t border-cyan-500/20 leading-relaxed">
              Beyond development, I am deeply curious about emerging technologies and actively explore advancements in AI, cloud computing, and system design. I regularly contribute to open-source projects, experiment with new tools, and stay updated with the latest industry trends to ensure my skills remain cutting-edge.
            </p>

            <p className="text-gray-400 text-sm leading-relaxed">
              I am driven by a mindset of continuous learning and innovation, always aiming to build products that not only work efficiently but also create meaningful impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
