import { Metadata } from 'next';
import PremiumHero from '@/components/sections/PremiumHero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Sonu Kumar - Full Stack Developer & AI/ML Specialist',
  description: 'Portfolio of Sonu Kumar - Expert in Python, React, Machine Learning, and Full-Stack Development',
};

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden bg-black text-white">
      <Navigation />
      <PremiumHero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
