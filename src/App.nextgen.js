import React, { useMemo, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './global.css';

// Icons using Lucide React
import {
  Github, Linkedin, Code, Terminal, CheckCircle, GraduationCap,
  Award, Briefcase, ChevronRight, Zap, Globe, Download, TrendingUp, Cpu,
  Rocket, ShoppingCart, CheckSquare, BarChart, Brain, Factory, Mail, FileText,
  Menu, X, ArrowRight, Sparkles, ChevronDown
} from 'lucide-react';

// Navigation Components
import FloatingNavBox from './FloatingNavBox';

// --- Data Definitions ---
// --- Data Definitions ---
// --- Data Definitions ---

const hardSkills = [
  { name: "Python / Data Science", percent: 95, color: "cyan" },
  { name: "AI/ML (XGBoost, Pytorch)", percent: 90, color: "magenta" },
  { name: "React / Frontend Dev", percent: 85, color: "blue" },
  { name: "Web Frameworks (Django/Flask)", percent: 80, color: "pink" },
  { name: "Databases (SQL/NoSQL)", percent: 75, color: "green" },
  { name: "DevOps/Cloud (Git, Docker)", percent: 70, color: "yellow" },
];

const projects = [
  { title: "Data Science Salary Predictor", desc: "Predicts DS salaries using XGBoost model. Input job details, get instant salary estimates.", tech: "Python, Pandas, XGBoost, Streamlit", live: "https://salary-predictor-vykduych8bxqrq8t69szrm.streamlit.app/", github: "https://github.com/sonuupahyaya/Salary-Predictor", icon: Briefcase },
  { title: "Demand Forecasting Web App", desc: "Forecasts demand with Prophet/ARIMA & interactive dashboards for inventory optimization.", tech: "Streamlit, Prophet, ARIMA, Pandas", live: "https://demandforecastproject-thqparu4ibghczx4ooxpmc.streamlit.app/", github: "https://github.com/sonuupahyaya/demand_forecast_project", icon: TrendingUp },
  { title: "Titanic Survival Predictor", desc: "Predicts passenger survival using Logistic Regression with Streamlit interface.", tech: "Python, Scikit-learn, Streamlit", live: "https://titanic-survival-predictor-l6szzooityaqk5jdyqn9pt.streamlit.app/", github: "https://github.com/sonuupahyaya/titanic-survival-predictor", icon: Terminal },
  { title: "Restaurant Management System", desc: "Django-based restaurant management app with menu, booking, and order tracking.", tech: "Django, Python, SQLite", github: "https://github.com/sonuupahyaya/restaurant_management_project", icon: Code },
  { title: "Credit Card Fraud Detection", desc: "ML model for detecting fraudulent transactions with SMOTE and classifiers.", tech: "Python, Pandas, Scikit-learn", github: "https://github.com/sonuupahyaya/Credit-Card-Fraud-Detection-Model", icon: Award },
  { title: "Legal Aid App", desc: "A web platform to connect users with lawyers and get AI-based legal suggestions.", tech: "React, Django, REST API, CSS", live: "https://legal-aid-app-three.vercel.app/", github: "https://github.com/sonuupahyaya/legal-aid-app", icon: Code },
  { title: "Note App Project", desc: "Full-stack note management web app for creating, updating, and deleting notes.", tech: "Flask, HTML, CSS, SQLite", live: "https://note-app-project-1.onrender.com/", github: "https://github.com/sonuupahyaya/note_app_project", icon: Code },
  { title: "Gatsby E-commerce Theme", desc: "A sleek, fast, and customizable e-commerce template built with Gatsby and GraphQL.", tech: "Gatsby, React, GraphQL, CSS", live: "https://frabjous-rolypoly-228243.netlify.app/", github: "https://github.com/sonuupahyaya/gatsby-ecommerce-theme", icon: Code },
  { title: "JobQuest – Smart Job Finder", desc: "A React-based platform that fetches live job data via REST API for smart job searching.", tech: "React, REST API, Vite", live: "https://sprightly-gumdrop-f69acc.netlify.app/", github: "https://github.com/sonuupahyaya/jobquest-smart-job-finder", icon: Briefcase },
  { title: "SecureVault Password Manager", desc: "Password Manager with encryption, CRUD, and hashing using Flask and Cryptography.", tech: "Flask, SQLite, Cryptography, Bcrypt", github: "https://github.com/sonuupahyaya/SecureVault", icon: Code },
  { title: "Crypto Trading Strategy App", desc: "Tracks lagged correlations between coins and executes strategy-based insights.", tech: "Python, Pandas, NumPy, Plotly", github: "https://github.com/sonuupahyaya/crypto-correlation-strategy", icon: TrendingUp },
  { title: "AI Fitness & Nutrition Planner", desc: "AI-powered fitness, nutrition, meal, and workout planning system with ML calorie prediction and dynamic splits.", tech: "Python, Flask, Machine Learning, HTML, CSS, Chart.js", live: "https://fitness-planner-xxj8.onrender.com/", github: "https://github.com/sonuupahyaya/fitness_planner", icon: Code },
  { title: "Bat-Ball RL Agent", desc: "Reinforcement Learning cricket simulation where an AI-controlled bat learns timing and accuracy through Q-Learning.", tech: "Python, Streamlit, NumPy, Matplotlib, RL", live: "https://bat-ballrl-frvu6awc3p9gwegjidjqzy.streamlit.app/", github: "https://github.com/sonuupahyaya/bat-ballRL", icon: Terminal },
  { title: "MERN Contact Manager", desc: "A full-stack contact management application that allows users to create, update, delete, and manage contacts with secure authentication and cloud database support.", tech: "React, Node.js, Express, MongoDB, JWT, Tailwind", live: "https://mern-contact-manager-9no3n13bq-sonuupahyayas-projects.vercel.app/", github: "https://github.com/sonuupahyaya/mern-contact-manager", icon: Terminal },
  { title: "StartupVault", desc: "A startup deals and discovery platform where users can explore, manage, and track startup deals with a clean UI and full-stack functionality.", tech: "React, Next.js, Node.js, MongoDB, Tailwind", live: "https://startup-vault-five.vercel.app/deals", github: "https://github.com/upadhyay-sonu/StartupVault", icon: Rocket },
  { title: "Mini Grocery Store", desc: "A simple grocery store application that allows users to browse products, add items to cart, and simulate an online shopping experience.", tech: "HTML, CSS, JavaScript", live: "", github: "https://github.com/upadhyay-sonu/Mini-grocery-store", icon: ShoppingCart },
  { title: "Task Manager", desc: "A task management application to create, update, delete, and track daily tasks with an intuitive and minimal interface.", tech: "React, JavaScript, CSS", live: "", github: "https://github.com/upadhyay-sonu/Task-Manager", icon: CheckSquare },
  { title: "Data Explorer", desc: "A data exploration tool that helps visualize, filter, and analyze datasets interactively for better insights and understanding.", tech: "Python, Pandas, Data Visualization", live: "", github: "https://github.com/upadhyay-sonu/data-explorer", icon: BarChart },
  { title: "Super Vision AI", desc: "An AI-powered computer vision project focused on image analysis and intelligent visual recognition using deep learning models.", tech: "Python, OpenCV, Deep Learning", live: "", github: "https://github.com/upadhyay-sonu/super-vision-ai", icon: Brain },
  { title: "Shopfloor Lite", desc: "A lightweight shopfloor management system designed to track operations, workflows, and basic production data efficiently.", tech: "React, JavaScript, CSS", live: "", github: "https://github.com/upadhyay-sonu/shopfloor-lite", icon: Factory },
];

// --- Utility Components ---

// Animated particles background
const ParticleField = ({ count = 50 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 20 + 20,
        delay: Math.random() * 5,
      })),
    [count]
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
};

// Animated blob background
const GradientBlobs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        style={{ top: '10%', left: '10%' }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20 blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 1 }}
        style={{ bottom: '10%', right: '10%' }}
      />
    </div>
  );
};

// Glassmorphic card
const GlassmorphicCard = ({ children, className = '', ...props }) => (
  <motion.div
    className={`relative backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl overflow-hidden ${className}`}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-600/5 pointer-events-none" />
    {children}
  </motion.div>
);

// Premium button
const PremiumButton = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20',
    outline: 'border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/10',
  };

  return (
    <motion.button
      className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${variants[variant]}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Section heading
const SectionHeading = ({ children, subtitle }) => (
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <motion.div className="flex justify-center mb-4">
      <motion.div
        className="flex items-center gap-2 text-cyan-400 text-sm font-bold tracking-widest uppercase"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles size={16} />
        Featured Section
      </motion.div>
    </motion.div>
    <h2 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
      {children}
    </h2>
    {subtitle && <p className="text-gray-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </motion.div>
);

// Skill bar 3D
const SkillBar3D = ({ skill, delay }) => {
  const { name, percent, color } = skill;

  const colorMap = {
    cyan: { text: 'text-cyan-400', bar: 'bg-gradient-to-r from-cyan-400 to-cyan-500', glow: 'shadow-cyan-500/40' },
    magenta: { text: 'text-fuchsia-400', bar: 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-500', glow: 'shadow-fuchsia-500/40' },
    blue: { text: 'text-blue-400', bar: 'bg-gradient-to-r from-blue-400 to-blue-500', glow: 'shadow-blue-500/40' },
    pink: { text: 'text-pink-400', bar: 'bg-gradient-to-r from-pink-400 to-pink-500', glow: 'shadow-pink-500/40' },
    green: { text: 'text-green-400', bar: 'bg-gradient-to-r from-green-400 to-green-500', glow: 'shadow-green-500/40' },
    yellow: { text: 'text-yellow-400', bar: 'bg-gradient-to-r from-yellow-400 to-yellow-500', glow: 'shadow-yellow-500/40' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <GlassmorphicCard
      className="p-6 mb-4"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="flex justify-between items-center mb-3">
        <span className={`text-sm font-bold ${c.text}`}>{name}</span>
        <span className="text-xs font-bold text-gray-300 px-3 py-1 bg-white/5 rounded-full">{percent}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden backdrop-blur-sm">
        <motion.div
          className={`h-3 rounded-full ${c.bar} ${c.glow} shadow-lg`}
          initial={{ width: '0%' }}
          whileInView={{ width: `${percent}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: delay + 0.3 }}
          viewport={{ once: true }}
        />
      </div>
    </GlassmorphicCard>
  );
};

// Project card 3D
const ProjectCard3D = ({ proj, i }) => {
  const Icon = proj.icon;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <GlassmorphicCard
      className="p-8 group h-full flex flex-col justify-between cursor-pointer relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -12 }}
    >
      {/* Animated gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-600/10 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{ rotate: isHovered ? 12 : 0, scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Icon className="w-10 h-10 text-cyan-400/90" />
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {proj.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 leading-relaxed">{proj.desc}</p>

        <motion.div
          className="inline-block px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-400/30"
          whileHover={{ scale: 1.05 }}
        >
          {proj.tech}
        </motion.div>
      </div>

      <div className="flex gap-4 mt-8 flex-wrap relative z-10">
        {proj.live && (
          <motion.a
            href={proj.live}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/40 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Globe size={14} /> View Live
          </motion.a>
        )}
        <motion.a
          href={proj.github}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 text-sm font-bold rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 hover:text-cyan-400 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <Github size={14} /> Code
        </motion.a>
      </div>
    </GlassmorphicCard>
  );
};

// Navigation with glassmorphic design
const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ['About', 'Skills', 'Projects', 'Education', 'Contact'];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassmorphicCard className="px-8 py-4 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          SK
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-semibold relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 w-0 group-hover:w-full transition-all"
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </GlassmorphicCard>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden mt-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navItems.map((item, i) => (
              <GlassmorphicCard
                key={i}
                className="px-6 py-3 block text-center text-gray-300 hover:text-cyan-400 cursor-pointer"
                onClick={() => setMenuOpen(false)}
                whileHover={{ scale: 1.02 }}
              >
                {item}
              </GlassmorphicCard>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Hero section with cinematic design
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/30 to-transparent blur-3xl"
          animate={{
            x: [-200 + mousePosition.x * 100, -150 + mousePosition.x * 100],
            y: [-200 + mousePosition.y * 100, -150 + mousePosition.y * 100],
          }}
          transition={{ duration: 0.5 }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-bl from-purple-500/30 to-transparent blur-3xl"
          animate={{
            x: [200 - mousePosition.x * 100, 150 - mousePosition.x * 100],
            y: [200 - mousePosition.y * 100, 150 - mousePosition.y * 100],
          }}
          transition={{ duration: 0.5 }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Floating label */}
        <motion.div
          className="flex justify-center mb-8"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <GlassmorphicCard className="px-6 py-3 inline-flex items-center gap-2">
            <Sparkles size={18} className="text-cyan-400" />
            <span className="text-cyan-400 font-bold text-sm">Next-Generation Portfolio</span>
          </GlassmorphicCard>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6">
            <motion.span
              className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
              animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{
                backgroundSize: '200% 200%',
              }}
            >
              Sonu Kumar
            </motion.span>
            <span className="text-white">Full-Stack Developer & AI/ML Specialist</span>
          </h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Building innovative applications with cutting-edge technologies. Passionate about Python, React, Machine Learning, and creating world-class digital experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-6 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PremiumButton variant="primary">
            Explore My Work <ArrowRight size={18} className="ml-2" />
          </PremiumButton>
          <PremiumButton variant="outline">
            Get in Touch
          </PremiumButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-gray-400 text-sm mb-3">Scroll to explore</p>
          <ChevronDown className="text-cyan-400" size={24} />
        </motion.div>
      </div>
    </section>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <div className="min-h-full bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-100 overflow-x-hidden">
      {/* Background effects */}
      <GradientBlobs />
      <ParticleField count={40} />

      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>About Me</SectionHeading>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard className="p-8 h-80 flex items-center justify-center">
                <motion.div
                  className="text-9xl"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  💻
                </motion.div>
              </GlassmorphicCard>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <GlassmorphicCard className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-cyan-400">Full-Stack Developer & AI/ML Specialist</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Full-stack developer with expertise in Python, React, and Machine Learning. Passionate about building innovative solutions and scalable applications.
                </p>

                <div className="space-y-4">
                  <motion.div className="flex items-center gap-3" whileHover={{ x: 10 }}>
                    <CheckCircle className="text-cyan-400" size={24} />
                    <span className="text-gray-300">Python & Data Science Expert</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{ x: 10 }}>
                    <CheckCircle className="text-cyan-400" size={24} />
                    <span className="text-gray-300">React & Frontend Specialist</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-3" whileHover={{ x: 10 }}>
                    <CheckCircle className="text-cyan-400" size={24} />
                    <span className="text-gray-300">Machine Learning & AI Innovator</span>
                  </motion.div>
                </div>

                <motion.a
                  href="#education"
                  className="inline-block mt-8 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/40 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  View Qualifications →
                </motion.a>
              </GlassmorphicCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading>
            Core Competencies
            <br />
            <span className="text-4xl">Expert Level Skills</span>
          </SectionHeading>

          <div className="grid md:grid-cols-2 gap-8">
            {hardSkills.map((skill, i) => (
              <SkillBar3D key={i} skill={skill} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading>
            Featured Projects
            <br />
            <span className="text-4xl">Innovative Solutions</span>
          </SectionHeading>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj, i) => (
              <ProjectCard3D key={i} proj={proj} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>
            Education & Certifications
            <br />
            <span className="text-4xl">Learning Journey</span>
          </SectionHeading>

          <div className="space-y-8">
            {/* Degrees */}
            <GlassmorphicCard className="p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <div className="flex items-start gap-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }}>
                  <GraduationCap className="text-cyan-400" size={32} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Master of Computer Applications</h3>
                  <p className="text-cyan-400 font-semibold mb-1">Lovely Professional University</p>
                  <p className="text-gray-400">MCA - Advanced degree in Computer Science</p>
                </div>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard className="p-8" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <div className="flex items-start gap-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity }}>
                  <GraduationCap className="text-purple-400" size={32} />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Computer Applications</h3>
                  <p className="text-purple-400 font-semibold mb-1">Lovely Professional University</p>
                  <p className="text-gray-400">BCA - Comprehensive undergraduate program</p>
                </div>
              </div>
            </GlassmorphicCard>

            {/* Certifications Grid */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Award className="text-cyan-400" size={28} />
                Professional Certifications
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  'Python (GFG)',
                  'Java (GFG)',
                  'Django (BI)',
                  'UI/UX Design Fundamentals (Google)',
                  'React.js (Coursera)',
                  'Angular.js (Udemy)',
                  'ionic (Skillshare)',
                  'node.js (Google UX)',
                  'react native (Coursera)',
                  'Vue.js (LinkedIn)',
                  'Next.js (Coursera)',
                  'Bootstrap (Coursera)',
                  'Tailwind CSS (Coursera)',
                  'Render (Coursera)',
                  'vercel (Coursera)',
                  'GitHub (Coursera)',
                  'Scikit-learn (Coursera)',
                  'XGBoost (Coursera)',
                  'LightGBM (Coursera)',
                ].map((cert, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 hover:border-cyan-400/60"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                    <span className="text-gray-300 font-semibold">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Let's Connect</SectionHeading>

          <GlassmorphicCard className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-6 text-white">Ready to Build Something Amazing?</h3>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Let's collaborate and create something amazing together. Find me on LinkedIn or reach out via email.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
              <motion.a
                href="https://www.linkedin.com/in/sonukumar102/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <PremiumButton variant="primary">
                  <Linkedin size={20} className="inline mr-2" />
                  Connect on LinkedIn
                </PremiumButton>
              </motion.a>

              <motion.a
                href="mailto:upadhyayasonu41@gmail.com"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <PremiumButton variant="secondary">
                  <Mail size={20} className="inline mr-2" />
                  Send Email
                </PremiumButton>
              </motion.a>
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      {/* CV Section */}
      <section id="cv" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading>Download CV</SectionHeading>

          <GlassmorphicCard className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-6 text-white">[ACCESS_FILE] Download CV</h3>
            <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Retrieve detailed experience files. Specialized versions available for focused roles.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap">
              <motion.a
                href="https://drive.google.com/file/d/1kiMoKhL7t9U-j6wgYVJSn6-1MyqxJM3X/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <PremiumButton variant="primary">
                  <Download size={20} className="inline mr-2" />
                  AI / Data Science CV
                </PremiumButton>
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1GkJ-iJ_l6PLyvyWsSDn4N6t3fMWOdhMl/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <PremiumButton variant="secondary">
                  <Download size={20} className="inline mr-2" />
                  Software Development CV
                </PremiumButton>
              </motion.a>
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            className="text-gray-400 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            INTERFACE DESIGNED BY <span className="text-cyan-400 font-semibold">SONU KUMAR</span>
          </motion.p>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
