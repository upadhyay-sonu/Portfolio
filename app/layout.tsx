import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TreeBackground } from '@/components/TreeBackground';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sonu Kumar - Full Stack Developer & AI/ML Specialist',
  description: 'Portfolio of Sonu Kumar - Expert in Python, React, Machine Learning, and Full-Stack Development',
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        <TreeBackground />
        {children}
      </body>
    </html>
  );
}
