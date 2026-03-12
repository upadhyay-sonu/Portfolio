'use client';

import { motion } from 'framer-motion';
import { education, certifications } from '@/lib/data';
import { CheckCircle, GraduationCap } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Education & Certifications
            </span>
          </h2>
        </motion.div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-cyan-400" size={28} />
            Degrees
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md hover:border-cyan-500/50 transition-all"
              >
                <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                <p className="text-cyan-400 font-medium mb-1">{edu.school}</p>
                <p className="text-gray-400 text-sm">{edu.year}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <CheckCircle className="text-cyan-400" size={28} />
            Professional Certifications
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-md hover:border-cyan-500/50 transition-all text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span className="font-medium text-white text-sm">{cert}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
