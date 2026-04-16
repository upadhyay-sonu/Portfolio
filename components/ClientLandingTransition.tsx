"use client";

import React, { useState, useEffect } from "react";
import Landing3D from "./Landing3D";

export default function ClientLandingTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLanding, setShowLanding] = useState(true);

  const handleLandingExit = (sectionId: string) => {
    setShowLanding(false);
    
    // Smooth scroll to the requested section shortly after the transition
    if (sectionId) {
      setTimeout(() => {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Allow DOM to render the standard portfolio sections
    }
  };

  return (
    <>
      {showLanding ? (
        <Landing3D onEnter={handleLandingExit} />
      ) : (
        <div className="portfolio-wrapper fade-in-section">
          {children}
        </div>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in-section {
          animation: sectionFadeIn 0.5s ease-out forwards;
        }
        @keyframes sectionFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </>
  );
}
