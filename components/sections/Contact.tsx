'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/lib/data';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            I'm always open to new opportunities and interesting projects.
            Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* LinkedIn */}
          <motion.a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-md hover:border-cyan-500/50 transition-all flex items-center gap-4"
          >
            <Linkedin className="text-cyan-400 w-5 h-5 transition-all duration-200 group-hover:scale-105" />
            <div>
              <h3 className="text-xl font-bold text-white">LinkedIn</h3>
              <p className="text-gray-400">Connect with me on LinkedIn</p>
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-500/50 transition-all flex items-center gap-4"
          >
            <Github className="text-cyan-400 w-5 h-5 transition-all duration-200 group-hover:scale-105" />
            <div>
              <h3 className="text-xl font-bold text-white">GitHub</h3>
              <p className="text-gray-400">Check out my repositories</p>
            </div>
          </motion.a>

          {/* Email */}
          <motion.a
            href={`mailto:${socialLinks.email}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-md hover:border-cyan-500/50 transition-all flex items-center gap-4"
          >
            <Mail className="text-cyan-400 w-5 h-5 transition-all duration-200 group-hover:scale-105" />
            <div>
              <h3 className="text-xl font-bold text-white">Email</h3>
              <p className="text-gray-400">upadhyayasonu41@gmail.com</p>
            </div>
          </motion.a>

          {/* CV */}
          <motion.a
            href={socialLinks.cvDataScience}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-md hover:border-cyan-500/50 transition-all flex items-center gap-4"
          >
            <Download className="text-cyan-400 w-5 h-5 transition-all duration-200 group-hover:scale-105" />
            <div>
              <h3 className="text-xl font-bold text-white">Download CV</h3>
              <p className="text-gray-400">View my resume</p>
            </div>
          </motion.a>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 backdrop-blur-md"
        >
          <p className="text-gray-300 mb-6 text-lg">
            Let's build something amazing together. Reach out anytime!
          </p>
          <motion.a
            href={`mailto:${socialLinks.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
          >
            Start a Conversation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
