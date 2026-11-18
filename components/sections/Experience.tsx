'use client';

import { motion } from 'framer-motion';
import { workExperience, education, certifications } from '@/lib/data';
import { Briefcase, Calendar, CheckCircle, ChevronRight, GraduationCap, MapPin } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Experience & Education
            </span>
          </h2>
        </motion.div>

        {/* Work Experience */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <Briefcase className="text-cyan-400 w-5 h-5 transition-all duration-200" />
            Work Experience
          </h3>
          <div className="relative space-y-6 before:hidden md:before:block before:absolute before:left-5 before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-cyan-400/60 before:via-blue-500/40 before:to-purple-600/20">
            {workExperience.map((exp, i) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative md:pl-14"
              >
                {/* Timeline dot */}
                <span className="hidden md:flex absolute left-3 top-7 w-4 h-4 rounded-full bg-black border-2 border-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </span>

                <div className="p-6 md:p-7 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md hover:border-cyan-500/50 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white">{exp.role}</h4>
                      <p className="text-cyan-400 font-semibold text-base">{exp.company}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1 text-sm text-gray-300">
                      <span className="inline-flex items-center gap-1.5 text-cyan-300 font-medium">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-gray-400">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-5">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-gray-300 text-sm md:text-base leading-relaxed">
                        <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-cyan-500/15">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/25"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <GraduationCap className="text-cyan-400 w-5 h-5 transition-all duration-200" />
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
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <CheckCircle className="text-cyan-400 w-5 h-5 transition-all duration-200" />
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
                  <cert.icon 
                    className="w-5 h-5 flex-shrink-0 transition-all duration-200" 
                    style={{ color: cert.color }} 
                  />
                  <span className="font-medium text-white text-sm">{cert.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
