'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative border-t border-cyan-500/20 bg-black/50 backdrop-blur-md py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8"
        >
          {/* Logo/Name */}
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            SK
          </div>

          {/* Links */}
          <div className="flex gap-8">
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ color: '#00d9ff' }}
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="border-t border-cyan-500/20 pt-8 text-center text-gray-500 text-sm space-y-2"
        >
          <p>INTERFACE DESIGNED & DEVELOPED BY <span className="text-cyan-400 font-semibold">SONU KUMAR</span></p>
          <p>© {new Date().getFullYear()} Sonu Kumar. All rights reserved.</p>
          <p className="text-xs text-gray-600">Built with Next.js, React, Tailwind CSS, and Framer Motion</p>
        </motion.div>
      </div>
    </footer>
  );
}
