'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGameMenu, setShowGameMenu] = useState(false);
  console.log("NAVBAR ACTIVE");

  useEffect(() => {
    document.body.style.overflow = showGameMenu ? "hidden" : "auto";
  }, [showGameMenu]);

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          SK
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: '#00d9ff' }}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {item}
            </motion.a>
          ))}
          <button
            onClick={() => {
              console.log("OPENING GAME MENU");
              setShowGameMenu(true);
            }}
            className="ml-4 px-3 py-1.5 text-xs rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition"
          >
            Play Game
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-white/10 rounded-lg transition text-gray-300 hover:text-cyan-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-cyan-500/20 bg-black/50 backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-cyan-400 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => {
                setShowGameMenu(true);
                setIsOpen(false);
              }}
              className="mt-4 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 font-medium text-center"
            >
              Play Game
            </button>
          </div>
        </motion.div>
      )}

      {showGameMenu && (
        <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl mb-10">Choose Your Game</h1>

          <div className="flex gap-10">
            <button className="bg-green-500 px-8 py-4 rounded-xl">
              Ludo 🎲
            </button>

            <button className="bg-purple-500 px-8 py-4 rounded-xl">
              Sudoku 🧩
            </button>
          </div>

          <button
            onClick={() => setShowGameMenu(false)}
            className="absolute top-6 right-6 text-3xl"
          >
            ✕
          </button>
        </div>
      )}
    </motion.nav>
  );
}
