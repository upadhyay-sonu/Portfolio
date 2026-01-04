import React, { useMemo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Icons using Lucide React
import {
  Github, Linkedin, Code, Terminal, CheckCircle, GraduationCap,
  Award, Briefcase, ChevronRight, Zap, Globe, Download, TrendingUp, Cpu
} from 'lucide-react';

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
 
   { title: "💼 Data Science Salary Predictor", desc: "Predicts DS salaries using XGBoost model. Input job details, get instant salary estimates.", tech: "Python, Pandas, XGBoost, Streamlit", live: "https://salary-predictor-vykduych8bxqrq8t69szrm.streamlit.app/", github: "https://github.com/sonuupahyaya/Salary-Predictor", icon: Briefcase },
  { title: "📊 Demand Forecasting Web App", desc: "Forecasts demand with Prophet/ARIMA & interactive dashboards for inventory optimization.", tech: "Streamlit, Prophet, ARIMA, Pandas", live: "https://demandforecastproject-thqparu4ibghczx4ooxpmc.streamlit.app/", github: "https://github.com/sonuupahyaya/demand_forecast_project", icon: TrendingUp },
  { title: "🚢 Titanic Survival Predictor", desc: "Predicts passenger survival using Logistic Regression with Streamlit interface.", tech: "Python, Scikit-learn, Streamlit", live: "https://titanic-survival-predictor-l6szzooityaqk5jdyqn9pt.streamlit.app/", github: "https://github.com/sonuupahyaya/titanic-survival-predictor", icon: Terminal },
  { title: "🍽️ Restaurant Management System", desc: "Django-based restaurant management app with menu, booking, and order tracking.", tech: "Django, Python, SQLite", github: "https://github.com/sonuupahyaya/restaurant_management_project", icon: Code },
  { title: "💳 Credit Card Fraud Detection", desc: "ML model for detecting fraudulent transactions with SMOTE and classifiers.", tech: "Python, Pandas, Scikit-learn", github: "https://github.com/sonuupahyaya/Credit-Card-Fraud-Detection-Model", icon: Award },
  { title: "⚖️ Legal Aid App", desc: "A web platform to connect users with lawyers and get AI-based legal suggestions.", tech: "React, Django, REST API, CSS", live: "https://legal-aid-app-three.vercel.app/", github: "https://github.com/sonuupahyaya/legal-aid-app", icon: Code },
  { title: "📝 Note App Project", desc: "Full-stack note management web app for creating, updating, and deleting notes.", tech: "Flask, HTML, CSS, SQLite", live: "https://note-app-project-1.onrender.com/", github: "https://github.com/sonuupahyaya/note_app_project", icon: Code },
  { title: "🛍️ Gatsby E-commerce Theme", desc: "A sleek, fast, and customizable e-commerce template built with Gatsby and GraphQL.", tech: "Gatsby, React, GraphQL, CSS", live: "https://frabjous-rolypoly-228243.netlify.app/", github: "https://github.com/sonuupahyaya/gatsby-ecommerce-theme", icon: Code },
  { title: "💡 JobQuest – Smart Job Finder", desc: "A React-based platform that fetches live job data via REST API for smart job searching.", tech: "React, REST API, Vite", live: "https://sprightly-gumdrop-f69acc.netlify.app/", github: "https://github.com/sonuupahyaya/jobquest-smart-job-finder", icon: Briefcase },
  { title: "🔐 SecureVault Password Manager", desc: "Password Manager with encryption, CRUD, and hashing using Flask and Cryptography.", tech: "Flask, SQLite, Cryptography, Bcrypt", github: "https://github.com/sonuupahyaya/SecureVault", icon: Code },
  { title: "📈 Crypto Trading Strategy App", desc: "Tracks lagged correlations between coins and executes strategy-based insights.", tech: "Python, Pandas, NumPy, Plotly", github: "https://github.com/sonuupahyaya/crypto-correlation-strategy", icon: TrendingUp },
  { title: "💪 AI Fitness & Nutrition Planner", desc: "AI-powered fitness, nutrition, meal, and workout planning system with ML calorie prediction and dynamic splits.", tech: "Python, Flask, Machine Learning, HTML, CSS, Chart.js", live: "https://fitness-planner-xxj8.onrender.com/", github: "https://github.com/sonuupahyaya/fitness_planner", icon: Code },
  { title: "🏏 Bat-Ball RL Agent", desc: "Reinforcement Learning cricket simulation where an AI-controlled bat learns timing and accuracy through Q-Learning.", tech: "Python, Streamlit, NumPy, Matplotlib, RL", live: "https://bat-ballrl-frvu6awc3p9gwegjidjqzy.streamlit.app/", github: "https://github.com/sonuupahyaya/bat-ballRL", icon: Terminal },
  { title: "📇 MERN Contact Manager", desc: "A full-stack contact management application that allows users to create, update, delete, and manage contacts with secure authentication and cloud database support.", tech: "React, Node.js, Express, MongoDB, JWT, Tailwind", live: "https://mern-contact-manager-9no3n13bq-sonuupahyayas-projects.vercel.app/", github: "https://github.com/sonuupahyaya/mern-contact-manager", icon: Terminal },

  
];



// --- Utility Components ---

// Star Colors reflecting stellar classification: O/B (Blue), A (White), G (Yellow), K/M (Orange/Red)
const STAR_COLORS = [
    '#FFFFFF', // White/A-type star
    '#ADD8E6', // Light Blue/B-type star
    '#FFA07A', // Light Salmon/Orange/K-type star
    '#FFD700', // Gold/Yellow/G-type star
    '#FF4500', // Orange-Red/M-type star
];

/**
 * 🌠 Star Component (The actual twinkle dot)
 */
const Star = ({ top, left, size, color, animationDelay, duration }) => (
    <div
        className="absolute rounded-full star-twinkle"
        style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 2}px ${color}`,
            animationDelay: `${animationDelay}s`,
            animationDuration: `${duration}s`,
        }}
    />
);

/**
 * 🌌 Background Component (Generates the star field)
 */
const StarsBackground = ({ numStars = 150 }) => {
    // Generate stars only once on mount
    const stars = useMemo(() => {
        const generatedStars = [];
        for (let i = 0; i < numStars; i++) {
            generatedStars.push({
                top: Math.random() * 100, // 0 to 100%
                left: Math.random() * 100, // 0 to 100%
                size: Math.random() * 4 + 2, // ✨ Changed: 2px to 6px (previously 1px to 3px) ✨
                color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
                // Varying delay and duration for a more natural twinkle effect
                animationDelay: Math.random() * 4, // 0 to 4s
                duration: Math.random() * 3 + 1, // 1s to 4s
            });
        }
        return generatedStars;
    }, [numStars]);

    return (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            {stars.map((star, index) => (
                <Star key={index} {...star} />
            ))}
        </div>
    );
};


// Skill Item component with 3D animation effect
const SkillBar3D = ({ skill, delay }) => {
  const { name, percent, color } = skill;
  
  // Dynamic tailwind class mapping for colors and glow
  const colorMap = {
    cyan: { text: 'text-cyan-400', bar: 'bg-cyan-500', glow: 'shadow-cyan-900/50' },
    magenta: { text: 'text-fuchsia-400', bar: 'bg-fuchsia-500', glow: 'shadow-fuchsia-900/50' },
    blue: { text: 'text-indigo-400', bar: 'bg-indigo-500', glow: 'shadow-indigo-900/50' },
    pink: { text: 'text-pink-400', bar: 'bg-pink-500', glow: 'shadow-pink-900/50' },
    green: { text: 'text-green-400', bar: 'bg-green-500', glow: 'shadow-green-900/50' },
    yellow: { text: 'text-yellow-400', bar: 'bg-yellow-500', glow: 'shadow-yellow-900/50' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      className="mb-4 bg-gray-800/50 p-3 rounded-xl border border-gray-700/50 transition-all duration-200"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: delay }}
      
      // Stronger 3D Hover Effect
      whileHover={{ 
        scale: 1.05,
        rotateY: 4,
        rotateX: 4,
        boxShadow: `0 15px 40px ${c.bar.replace('bg-', 'rgba(').replace('-500', ', 0.6').replace('cyan', '52, 211, 255').replace('fuchsia', '232, 121, 220').replace('indigo', '99, 102, 241').replace('pink', '236, 72, 153').replace('green', '16, 185, 129').replace('yellow', '250, 204, 21')}')`,
        y: -5, // Lift off the surface
        transition: { duration: 0.2 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-semibold ${c.text}`}>{name}</span>
        <span className={`text-xs font-bold text-gray-300`}>{percent}%</span>
      </div>
      <div className="w-full bg-gray-900 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full shadow-lg ${c.bar} ${c.glow}`}
          initial={{ width: '0%' }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: delay + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

// Project Card Component with Code/Terminal Aesthetic
const ProjectCard = ({ proj, i }) => {
  const Icon = proj.icon;
  
  return (
    <motion.div
      key={i}
      className="project-card p-6 rounded-2xl shadow-2xl flex flex-col justify-between border border-gray-700/50 hover:border-cyan-500/50"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05, 
        y: -8, // Stronger lift
        boxShadow: '0 0 50px rgba(52, 211, 255, 0.4)', // Cyan glow
        transition: { duration: 0.3 }
      }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <div className='relative'>
        <Icon className="w-8 h-8 mb-4 text-cyan-400/90" />
        <h5 className="text-2xl font-bold mb-3 text-white">{proj.title}</h5>
        <p className="mb-4 text-gray-400 text-sm italic">{proj.desc}</p>
        <p className="text-magenta-400 font-medium text-xs rounded-full inline-block p-1 px-3 bg-gray-800/80 border border-magenta-500/30">Tech: {proj.tech}</p>
      </div>

      <div className="flex gap-4 mt-6">
        {proj.live && (
          <a
            href={proj.live}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 text-sm font-bold rounded-full text-white btn-live-glow transition"
          >
            <Globe className="w-4 h-4 inline mr-1" /> View Live
          </a>
        )}
        <a
          href={proj.github}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 text-sm font-bold rounded-full border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition"
        >
          <Github className="w-4 h-4 inline mr-1" /> Codebase
        </a>
      </div>
    </motion.div>
  );
};


// --- Main App Component ---

const App = () => {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });

  // Mouse tilt effect logic
  const handleMouseMove = (e) => {
    // Get viewport dimensions
    const { innerWidth: width, innerHeight: height } = window;
    
    // Normalize mouse position to range [-1, 1]
    const x = (e.clientX / width) * 2 - 1;
    const y = (e.clientY / height) * 2 - 1;

    // Apply a subtle rotation amount (max 2 degrees)
    const tiltX = -y * 2; // Invert Y for a natural feel (pulling the top edge closer)
    const tiltY = x * 2; 

    setRotation({ x: tiltX, y: tiltY }); 
  };

  React.useEffect(() => {
    // Only apply the mouse move listener in the client environment
    if (typeof window !== 'undefined') {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-inter main-grid-background relative overflow-x-hidden">
      
      {/* 🌠 ADD THE TWINKLING STAR BACKGROUND HERE 🌠 */}
      <StarsBackground numStars={250} />

      {/* GLOBAL STYLES (CRITICAL FOR VISUAL EFFECTS) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          
        .font-inter { font-family: 'Inter', sans-serif; }

        /* Animated Grid Background */
        .main-grid-background {
          background-color: #000000;
          background-image: linear-gradient(to right, rgba(50, 50, 50, 0.06) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(50, 50, 50, 0.06) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: background-pan 90s linear infinite;
          background-blend-mode: overlay;
        }
        @keyframes background-pan {
          from { background-position: 0% 0%; }
          to { background-position: 500px 500px; }
        }

        /* 🌠 TWINKLE ANIMATION FOR STARS 🌠 */
        @keyframes twinkle {
            0% { opacity: 0.5; }
            50% { opacity: 1; transform: scale(1.1); }
            100% { opacity: 0.5; }
        }
        .star-twinkle {
            opacity: 0.5;
            transition: all 0.3s ease;
            animation-name: twinkle;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
            animation-direction: alternate;
        }


        /* Hero Section Gradient - Atmospheric Glow */
        .hero-section {
          background-image: radial-gradient(at 10% 80%, rgba(30, 27, 75, 0.4) 0%, transparent 60%),
                            radial-gradient(at 90% 20%, rgba(76, 29, 149, 0.3) 0%, transparent 60%),
                            linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0));
          min-height: 100vh;
        }

        /* Neon/Holographic Text Glow */
        .neon-glow-heading {
          text-shadow: 0 0 10px rgba(52, 211, 255, 0.8), 0 0 35px rgba(236, 72, 153, 0.5);
          animation: glitch-text 4s infinite linear alternate;
        }
        
        /* Subtle Glitch Text Effect */
        @keyframes glitch-text {
          0%, 100% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(3% 0 3% 0); }
          40% { clip-path: inset(1% 0 1% 0); }
          60% { clip-path: inset(5% 0 5% 0); }
          80% { clip-path: inset(0.5% 0 0.5% 0); }
        }

        /* Profile Image - Holographic Ring */
        .profile-image {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #06b6d4; /* Cyan-500 */
          box-shadow: 0 0 30px rgba(6, 182, 212, 1), inset 0 0 15px rgba(236, 72, 153, 0.5);
          transition: all 0.5s ease;
        }
        .profile-image:hover {
            box-shadow: 0 0 50px rgba(236, 72, 153, 1), inset 0 0 15px rgba(6, 182, 212, 0.5); 
            transform: scale(1.05);
        }

        /* Project Card Styling - Frosted Glass Effect */
        .project-card {
          background: rgba(17, 24, 39, 0.8); /* Darker, slightly transparent */
          backdrop-filter: blur(10px); /* Frosted glass */
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Live Demo Button Glow */
        .btn-live-glow {
          background: linear-gradient(90deg, #06b6d4, #ec4899); /* Cyan to Pink */
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.6);
          transition: all 0.3s ease;
        }
        .btn-live-glow:hover {
          box-shadow: 0 0 30px #ec4899, 0 0 20px #06b6d4;
          transform: translateY(-4px);
        }

        /* Contact Button Glowing Border (Conic Gradient) */
        .btn-contact {
            background-color: #000000;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        .btn-contact::before {
            content: '';
            position: absolute;
            top: -50%; left: -50%; width: 200%; height: 200%;
            background: conic-gradient(transparent 0deg, transparent 180deg, #06b6d4 180deg, #ec4899 360deg);
            z-index: -1;
            animation: rotate 4s linear infinite;
        }
        @keyframes rotate { to { transform: rotate(1turn); } }
        .btn-contact:hover::before { animation: rotate 1s linear infinite; }
        .btn-contact::after {
            content: '';
            position: absolute;
            inset: 3px;
            background-color: #000000;
            border-radius: 0.75rem; /* rounded-xl */
            z-index: -1;
        }
      `}</style>

      {/* MAIN CONTENT WRAPPER FOR 3D MOUSE TILT */}
      <div 
        className="transform-gpu will-change-transform relative z-10" // Added z-10 here
        style={{
            transform: `perspective(1500px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.5s ease-out',
        }}
      >

        {/* HEADER: HERO SECTION */}
        <header className="hero-section flex flex-col items-center justify-center pt-32 pb-20 px-4 relative z-10">
          <div className="max-w-6xl w-full flex flex-col items-center justify-center relative z-20">
            <motion.img
              src="/photo.jpg"
              alt="Sonu Kumar Photo"
              className="profile-image mb-8"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
              onError={(e) => { e.target.onerror = null; e.target.src = "/photo.jpg"; }}
            />

            {/* Name and Title */}
            <div className="text-center mb-6">
              <motion.h1
                className="text-6xl lg:text-9xl font-black mb-4 leading-tight neon-glow-heading"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">
                  Sonu Kumar
                </span>
              </motion.h1>
              <motion.p
                className="text-2xl lg:text-4xl text-gray-300 font-extralight max-w-4xl mx-auto tracking-wider flex items-center justify-center"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                 <Cpu className='w-6 h-6 mr-3 text-cyan-400'/> AI, ML & Full-Stack Development //
              </motion.p>
            </div>

            {/* Social Icons & CTA */}
            <div className="flex flex-col items-center gap-8 mt-10">
              <div className="flex gap-8">
                <motion.a whileHover={{ scale: 1.5, color: '#06b6d4' }} href="https://github.com/sonuupahyaya" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition duration-300">
                  <Github className="w-8 h-8" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.5, color: '#ec4899' }} href="https://www.linkedin.com/in/sonukumar102/" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition duration-300">
                  <Linkedin className="w-8 h-8" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.5, color: '#34d399' }} href="https://leetcode.com/u/Sonu_upadhyaya/" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition duration-300">
                  <Code className="w-8 h-8" />
                </motion.a>
                <motion.a whileHover={{ scale: 1.5, color: '#facc15' }} href="https://www.hackerrank.com/profile/sonujack102" target="_blank" rel="noopener noreferrer" className="text-gray-500 transition duration-300">
                  <Terminal className="w-8 h-8" />
                </motion.a>
              </div>

              <motion.a
                href="mailto:upadhyayasonu41@gmail.com"
                className="btn-contact px-12 py-4 text-xl font-extrabold rounded-xl text-white shadow-2xl shadow-cyan-900/50"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
              >
                <Zap className="w-5 h-5 inline mr-3 text-cyan-400" />
                INITIATE CONNECTION
              </motion.a>
            </div>
          </div>
        </header>

        {/* --- ABOUT & 3D SKILLS SECTION --- */}
        <section className="relative py-20 lg:py-32 bg-black border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6 relative z-10">

            <motion.h2
              className="text-5xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-magenta-400"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              // SKILL MATRIX & CREDENTIALS
            </motion.h2>

            <div className="grid lg:grid-cols-12 gap-10">

              {/* Left Column: Skills Display - Perspective parent container */}
              <motion.div
                className="lg:col-span-7 p-8 rounded-3xl project-card border border-cyan-500/20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ perspective: 1200 }} // Enable strong 3D transform on children
              >
                <h3 className="text-3xl font-bold mb-8 text-cyan-400 flex items-center">
                  <Code className="w-6 h-6 mr-3" /> Core Technical Proficiencies 
                </h3>
                {hardSkills.map((skill, index) => (
                  <SkillBar3D key={skill.name} skill={skill} delay={index * 0.1} />
                ))}
              </motion.div>

              {/* Right Column: Credentials/Certs */}
              <motion.div
                className="lg:col-span-5 p-8 rounded-3xl project-card border border-magenta-500/20"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-3xl font-bold mb-8 text-magenta-400 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3" /> Trajectory & Degrees
                </h3>
                
                <ul className="space-y-4 mb-8 border-l-4 border-gray-700 pl-4">
                  <li className="text-lg text-gray-200">
                    <span className="font-bold text-white">MCA, Lovely Professional University</span>
                    <p className="text-sm text-gray-400">Master of Computer Applications</p>
                  </li>
                  <li className="text-lg text-gray-200">
                    <span className="font-bold text-white">BCA, Lovely Professional University</span>
                    <p className="text-sm text-gray-400">Bachelor of Computer Applications</p>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold mb-4 text-cyan-400 flex items-center mt-8">
                  <Award className="w-5 h-5 mr-3" /> Certifications
                </h3>
                <div className="flex flex-wrap gap-3 ml-4">
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Python (GFG)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Java (GFG)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Django (BI)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> UI/UX Design Fundamentals (Google)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> React.js (Coursera)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Angular.js (Udemy)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> ionic (Skillshare)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> node.js (Google UX)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> react native (Coursera)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Vue.js (LinkedIn)
  </span>
  <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Next.js (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Bootstrap (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Tailwind CSS (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Render (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> vercel (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> GitHub (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> Scikit-learn (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> XGBoost (Coursera)
  </span>
   <span className="px-3 py-1 text-xs font-medium bg-green-900/50 text-green-300 rounded-full flex items-center">
    <CheckCircle className="w-3 h-3 mr-1" /> LightGBM (Coursera)
  </span>
</div>

              </motion.div>
            </div>
          </div>
        </section>
        {/* --- END ABOUT & 3D SKILLS SECTION --- */}


        {/* PROJECTS */}
        <section className="py-20 bg-black border-t border-gray-900">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-5xl font-black text-white mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-magenta-400 to-cyan-400">
              PROJECTS
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((proj, i) => (
                <ProjectCard key={i} proj={proj} i={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CV SECTION */}
        <section className="relative py-20 text-center bg-black border-t border-gray-900">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-magenta-400 bg-clip-text text-transparent">
              [ACCESS_FILE] Download CV
            </h3>

            <p className="text-gray-400 mb-10 text-lg max-w-2xl mx-auto">
              Retrieve detailed experience files. Specialized versions available for focused roles.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.a
                href="https://drive.google.com/file/d/1kiMoKhL7t9U-j6wgYVJSn6-1MyqxJM3X/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="relative px-8 py-3 rounded-xl font-bold text-lg text-white transition-all duration-300
                  bg-gradient-to-r from-indigo-600 to-purple-700 shadow-xl shadow-indigo-900/40
                  hover:shadow-indigo-500/60 hover:scale-[1.05] flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Download className="w-5 h-5 mr-3" />
                <span>AI / Data Science CV</span>
              </motion.a>

              <motion.a
                href="https://drive.google.com/file/d/1GkJ-iJ_l6PLyvyWsSDn4N6t3fMWOdhMl/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="relative px-8 py-3 rounded-xl font-bold text-lg text-white transition-all duration-300
                  bg-gradient-to-r from-teal-500 to-blue-600 shadow-xl shadow-teal-900/40
                  hover:shadow-teal-500/60 hover:scale-[1.05] flex items-center justify-center"
                whileHover={{ scale: 1.05, y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Download className="w-5 h-5 mr-3" />
                <span>Software Development CV</span>
              </motion.a>
              
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 text-center bg-black border-t border-gray-900">
          <p className="text-sm text-gray-600">
            INTERFACE DESIGNED BY <span className="text-cyan-400 font-semibold">SONU KUMAR</span>
          </p>
          <p className="text-xs text-gray-700 mt-2">
            copy; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;