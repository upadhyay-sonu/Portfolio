'use client';

import { motion } from 'framer-motion';
import { hardSkills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {hardSkills.map((skill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md hover:border-cyan-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <skill.icon className="text-2xl" style={{ color: skill.color }} />
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                </div>
                <span className="text-2xl font-black text-transparent bg-clip-text" style={{
                  backgroundImage: `linear-gradient(135deg, ${skill.color}, #ffffff)`
                }}>
                  {skill.percent}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percent}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${skill.color}, #ffffff)`,
                    boxShadow: `0 0 10px ${skill.color}`,
                  }}
                />
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                background: `radial-gradient(circle at center, ${skill.color}20, transparent 70%)`,
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
