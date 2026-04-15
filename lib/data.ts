import {
  Github, Linkedin, Code, Terminal, CheckCircle, GraduationCap,
  Award, Briefcase, ChevronRight, Zap, Globe, Download, TrendingUp, Cpu,
  Rocket, ShoppingCart, CheckSquare, BarChart, Brain, Factory, Mail, FileText
} from 'lucide-react';
import {
  SiPython, SiTensorflow, SiReact, SiDjango, SiDocker,
  SiAngular, SiIonic, SiNodedotjs, SiVuedotjs, SiNextdotjs,
  SiBootstrap, SiTailwindcss, SiRender, SiVercel, SiScikitlearn
} from 'react-icons/si';
import { FaDatabase, FaJava, FaGithub, FaBrain, FaPenNib } from 'react-icons/fa';

export const hardSkills = [
  { name: "Python / Data Science", percent: 95, color: "#00d9ff", icon: SiPython },
  { name: "AI/ML (XGBoost, Pytorch)", percent: 90, color: "#ff006e", icon: SiTensorflow },
  { name: "React / Frontend Dev", percent: 85, color: "#4d5aff", icon: SiReact },
  { name: "Web Frameworks (Django/Flask)", percent: 85, color: "#ff4d94", icon: SiDjango },
  { name: "Databases (SQL/NoSQL)", percent: 85, color: "#00d080", icon: FaDatabase },
  { name: "DevOps/Cloud (Git, Docker)", percent: 80, color: "#ffd60a", icon: SiDocker },
];

export const projects = [
  {
    title: "Data Science Salary Predictor",
    desc: "Predicts DS salaries using XGBoost model. Input job details, get instant salary estimates.",
    tech: "Python, Pandas, XGBoost, Streamlit",
    live: "https://salary-predictor-vykduych8bxqrq8t69szrm.streamlit.app/",
    github: "https://github.com/sonuupahyaya/Salary-Predictor",
    icon: "briefcase"
  },
  {
    title: "Demand Forecasting Web App",
    desc: "Forecasts demand with Prophet/ARIMA & interactive dashboards for inventory optimization.",
    tech: "Streamlit, Prophet, ARIMA, Pandas",
    live: "https://demandforecastproject-thqparu4ibghczx4ooxpmc.streamlit.app/",
    github: "https://github.com/sonuupahyaya/demand_forecast_project",
    icon: "trendingup"
  },
  {
    title: "Titanic Survival Predictor",
    desc: "Predicts passenger survival using Logistic Regression with Streamlit interface.",
    tech: "Python, Scikit-learn, Streamlit",
    live: "https://titanic-survival-predictor-l6szzooityaqk5jdyqn9pt.streamlit.app/",
    github: "https://github.com/sonuupahyaya/titanic-survival-predictor",
    icon: "terminal"
  },
  {
    title: "Restaurant Management System",
    desc: "Django-based restaurant management app with menu, booking, and order tracking.",
    tech: "Django, Python, SQLite",
    live: "",
    github: "https://github.com/sonuupahyaya/restaurant_management_project",
    icon: "code"
  },
  {
    title: "Credit Card Fraud Detection",
    desc: "ML model for detecting fraudulent transactions with SMOTE and classifiers.",
    tech: "Python, Pandas, Scikit-learn",
    live: "",
    github: "https://github.com/sonuupahyaya/Credit-Card-Fraud-Detection-Model",
    icon: "award"
  },
  {
    title: "Legal Aid App",
    desc: "A web platform to connect users with lawyers and get AI-based legal suggestions.",
    tech: "React, Django, REST API, CSS",
    live: "https://legal-aid-app-three.vercel.app/",
    github: "https://github.com/sonuupahyaya/legal-aid-app",
    icon: "code"
  },
  {
    title: "Note App Project",
    desc: "Full-stack note management web app for creating, updating, and deleting notes.",
    tech: "Flask, HTML, CSS, SQLite",
    live: "https://note-app-project-1.onrender.com/",
    github: "https://github.com/sonuupahyaya/note_app_project",
    icon: "code"
  },
  {
    title: "Gatsby E-commerce Theme",
    desc: "A sleek, fast, and customizable e-commerce template built with Gatsby and GraphQL.",
    tech: "Gatsby, React, GraphQL, CSS",
    live: "https://frabjous-rolypoly-228243.netlify.app/",
    github: "https://github.com/sonuupahyaya/gatsby-ecommerce-theme",
    icon: "code"
  },
  {
    title: "JobQuest – Smart Job Finder",
    desc: "A React-based platform that fetches live job data via REST API for smart job searching.",
    tech: "React, REST API, Vite",
    live: "https://sprightly-gumdrop-f69acc.netlify.app/",
    github: "https://github.com/sonuupahyaya/jobquest-smart-job-finder",
    icon: "briefcase"
  },
  {
    title: "SecureVault Password Manager",
    desc: "Password Manager with encryption, CRUD, and hashing using Flask and Cryptography.",
    tech: "Flask, SQLite, Cryptography, Bcrypt",
    live: "",
    github: "https://github.com/sonuupahyaya/SecureVault",
    icon: "code"
  },
  {
    title: "Crypto Trading Strategy App",
    desc: "Tracks lagged correlations between coins and executes strategy-based insights.",
    tech: "Python, Pandas, NumPy, Plotly",
    live: "",
    github: "https://github.com/sonuupahyaya/crypto-correlation-strategy",
    icon: "trendingup"
  },
  {
    title: "AI Fitness & Nutrition Planner",
    desc: "AI-powered fitness, nutrition, meal, and workout planning system with ML calorie prediction and dynamic splits.",
    tech: "Python, Flask, Machine Learning, HTML, CSS, Chart.js",
    live: "https://fitness-planner-xxj8.onrender.com/",
    github: "https://github.com/sonuupahyaya/fitness_planner",
    icon: "code"
  },
  {
    title: "Bat-Ball RL Agent",
    desc: "Reinforcement Learning cricket simulation where an AI-controlled bat learns timing and accuracy through Q-Learning.",
    tech: "Python, Streamlit, NumPy, Matplotlib, RL",
    live: "https://bat-ballrl-frvu6awc3p9gwegjidjqzy.streamlit.app/",
    github: "https://github.com/sonuupahyaya/bat-ballRL",
    icon: "terminal"
  },
  {
    title: "MERN Contact Manager",
    desc: "A full-stack contact management application that allows users to create, update, delete, and manage contacts with secure authentication and cloud database support.",
    tech: "React, Node.js, Express, MongoDB, JWT, Tailwind",
    live: "https://mern-contact-manager-9no3n13bq-sonuupahyayas-projects.vercel.app/",
    github: "https://github.com/sonuupahyaya/mern-contact-manager",
    icon: "terminal"
  },
  {
    title: "StartupVault",
    desc: "A startup deals and discovery platform where users can explore, manage, and track startup deals with a clean UI and full-stack functionality.",
    tech: "React, Next.js, Node.js, MongoDB, Tailwind",
    live: "https://startup-vault-five.vercel.app/deals",
    github: "https://github.com/upadhyay-sonu/StartupVault",
    icon: "rocket"
  },
  {
    title: "Mini Grocery Store",
    desc: "A simple grocery store application that allows users to browse products, add items to cart, and simulate an online shopping experience.",
    tech: "HTML, CSS, JavaScript",
    live: "",
    github: "https://github.com/upadhyay-sonu/Mini-grocery-store",
    icon: "shoppingcart"
  },
  {
    title: "Task Manager",
    desc: "A task management application to create, update, delete, and track daily tasks with an intuitive and minimal interface.",
    tech: "React, JavaScript, CSS",
    live: "",
    github: "https://github.com/upadhyay-sonu/Task-Manager",
    icon: "checksquare"
  },
  {
    title: "Data Explorer",
    desc: "A data exploration tool that helps visualize, filter, and analyze datasets interactively for better insights and understanding.",
    tech: "Python, Pandas, Data Visualization",
    live: "",
    github: "https://github.com/upadhyay-sonu/data-explorer",
    icon: "barchart"
  },
  {
    title: "Super Vision AI",
    desc: "An AI-powered computer vision project focused on image analysis and intelligent visual recognition using deep learning models.",
    tech: "Python, OpenCV, Deep Learning",
    live: "",
    github: "https://github.com/upadhyay-sonu/super-vision-ai",
    icon: "brain"
  },
  {
    title: "Shopfloor Lite",
    desc: "A lightweight shopfloor management system designed to track operations, workflows, and basic production data efficiently.",
    tech: "React, JavaScript, CSS",
    live: "",
    github: "https://github.com/upadhyay-sonu/shopfloor-lite",
    icon: "factory"
  },
  {
    title: "NISKAUPS",
    desc: "A full-stack e-commerce web application with modern UI and scalable backend architecture. It supports product listings, news integration, and dynamic API-driven data handling with smooth user experience.",
    tech: "React, Node.js, MongoDB, Express, Redux, Tailwind",
    live: "https://niskaups.pages.dev/",
    github: "https://github.com/upadhyay-sonu/NISKAUPS",
    icon: "shoppingcart"
  },
  ];

export const education = [
  { degree: "MCA", school: "Lovely Professional University", year: "2026" },
  { degree: "BCA", school: "Lovely Professional University", year: "2024" },
];


export const certifications = [
  { name: "Python (GFG)", icon: SiPython, color: "#3776AB" },
  { name: "Java (GFG)", icon: FaJava, color: "#007396" },
  { name: "Django (BI)", icon: SiDjango, color: "#092E20" },
  { name: "UI/UX Design Fundamentals (Google)", icon: FaPenNib, color: "#F24E1E" },
  { name: "React.js (Coursera)", icon: SiReact, color: "#61DAFB" },
  { name: "Angular.js (Udemy)", icon: SiAngular, color: "#DD0031" },
  { name: "ionic (Skillshare)", icon: SiIonic, color: "#3880FF" },
  { name: "node.js (Google UX)", icon: SiNodedotjs, color: "#339933" },
  { name: "react native (Coursera)", icon: SiReact, color: "#61DAFB" },
  { name: "Vue.js (LinkedIn)", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Next.js (Coursera)", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Bootstrap (Coursera)", icon: SiBootstrap, color: "#7952B3" },
  { name: "Tailwind CSS (Coursera)", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Render (Coursera)", icon: SiRender, color: "#46E3B7" },
  { name: "vercel (Coursera)", icon: SiVercel, color: "#ffffff" },
  { name: "GitHub (Coursera)", icon: FaGithub, color: "#ffffff" },
  { name: "Scikit-learn (Coursera)", icon: SiScikitlearn, color: "#F7931E" },
  { name: "XGBoost (Coursera)", icon: FaBrain, color: "#8A2BE2" },
  { name: "LightGBM (Coursera)", icon: FaBrain, color: "#8A2BE2" },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/sonukumar102/",
  github: "https://github.com/upadhyay-sonu",
  email: "upadhyayasonu41@gmail.com",
  cvDataScience: "https://drive.google.com/file/d/1kiMoKhL7t9U-j6wgYVJSn6-1MyqxJM3X/view?usp=sharing",
  cvSoftware: "https://drive.google.com/file/d/1GkJ-iJ_l6PLyvyWsSDn4N6t3fMWOdhMl/view?usp=sharing",
};
