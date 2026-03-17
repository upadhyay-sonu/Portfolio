'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '@/lib/data';
import { Github, Globe, Briefcase, TrendingUp, Terminal, Code, Award, Rocket, ShoppingCart, CheckSquare, BarChart, Brain, Factory } from 'lucide-react';

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      briefcase: <Briefcase />,
      trendingup: <TrendingUp />,
      terminal: <Terminal />,
      code: <Code />,
      award: <Award />,
      rocket: <Rocket />,
      shoppingcart: <ShoppingCart />,
      checksquare: <CheckSquare />,
      barchart: <BarChart />,
      brain: <Brain />,
      factory: <Factory />,
    };
    return iconMap[iconName] || <Code />;
  };

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Explore a collection of innovative projects showcasing my expertise in full-stack development,
            machine learning, and cutting-edge technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              onClick={() => setExpandedId(expandedId === i ? null : i)}
              className="group relative cursor-pointer"
            >
              <div className="relative p-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-md hover:border-cyan-500/50 transition-all h-full flex flex-col justify-between">
                {/* Icon */}
                <div className="w-5 h-5 mb-4 text-cyan-400 transition-all duration-200 group-hover:scale-110">
                  {getIcon(project.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <p className="text-xs text-cyan-400 mb-4 line-clamp-2">
                  {project.tech}
                </p>

                {/* Links */}
                <div className="flex gap-3 mt-4 pt-4 border-t border-cyan-500/20">
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.1 }}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                    >
                      <Globe className="w-3.5 h-3.5" /> Live
                    </motion.a>
                  )}
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.1 }}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-cyan-500/50 text-cyan-400 text-xs font-bold hover:bg-cyan-500/10 transition-all"
                  >
                    <Github className="w-3.5 h-3.5" /> Code
                  </motion.a>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
                  background: 'radial-gradient(circle at center, rgba(0, 217, 255, 0.15), transparent 70%)',
                }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
