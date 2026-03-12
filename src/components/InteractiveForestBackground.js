import React, { useEffect, useRef, useState } from 'react';

/**
 * Interactive Forest Background Component
 * Renders animated tree structures that disappear on cursor contact and regrow
 */
export function InteractiveForestBackground() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const treesRef = useRef([]);
  const cursorRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Tree structure
  class Tree {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.rootX = x;
      this.rootY = y;
      this.age = 0;
      this.isGrowing = true;
      this.height = Math.random() * 80 + 40;
      this.branches = this.generateBranches();
      this.opacity = 1;
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
    }

    generateBranches() {
      const branches = [];
      const branchCount = Math.random() * 3 + 3;
      
      for (let i = 0; i < branchCount; i++) {
        const angle = (Math.PI / branchCount) * i + Math.random() * 0.3 - 0.15;
        const length = this.height * (Math.random() * 0.3 + 0.5);
        const x = Math.cos(angle) * length;
        const y = -Math.sin(angle) * length;
        
        branches.push({
          x,
          y,
          length,
          angle,
          subbranches: this.generateSubBranches(x, y, length * 0.7),
        });
      }
      
      return branches;
    }

    generateSubBranches(startX, startY, length) {
      const subbranches = [];
      const count = Math.random() * 2 + 1;
      
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI - Math.PI / 2;
        const subLength = length * (Math.random() * 0.4 + 0.4);
        const x = Math.cos(angle) * subLength;
        const y = -Math.sin(angle) * subLength;
        
        subbranches.push({
          x: startX + x,
          y: startY + y,
          length: subLength,
        });
      }
      
      return subbranches;
    }

    update(cursorX, cursorY) {
      // Check cursor collision
      const dx = this.x - cursorX;
      const dy = this.y - cursorY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80 && this.isGrowing) {
        this.isGrowing = false;
        this.age = 0;
      }

      // Handle regrowth timer
      if (!this.isGrowing) {
        this.age++;
        if (this.age > 60) {
          this.isGrowing = true;
          this.opacity = 0;
          this.age = 0;
          // Respawn nearby
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 100 + 50;
          this.x = this.rootX + Math.cos(angle) * dist;
          this.y = this.rootY + Math.sin(angle) * dist;
        } else {
          // Fade out
          this.opacity = 1 - this.age / 60;
        }
      } else if (this.opacity < 1) {
        // Fade in
        this.opacity = Math.min(this.opacity + 0.02, 1);
      }

      // Sway animation
      this.sway += this.swaySpeed;
    }

    draw(ctx, swayAmount) {
      if (this.opacity === 0) return;

      ctx.save();
      ctx.globalAlpha = this.opacity * 0.6;
      ctx.translate(this.x, this.y);
      
      const swayOffset = Math.sin(this.sway) * swayAmount;
      ctx.translate(swayOffset, 0);

      // Draw main trunk
      ctx.strokeStyle = `rgba(100, 200, 150, ${this.opacity})`;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -this.height);
      ctx.stroke();

      // Draw branches with glow
      ctx.strokeStyle = `rgba(100, 255, 180, ${this.opacity * 0.8})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = `rgba(100, 255, 180, ${this.opacity})`;
      ctx.shadowBlur = 15;

      this.branches.forEach((branch) => {
        ctx.beginPath();
        ctx.moveTo(0, -this.height * 0.3);
        ctx.lineTo(branch.x, -this.height * 0.3 + branch.y);
        ctx.stroke();

        // Draw subbranches
        ctx.strokeStyle = `rgba(80, 220, 160, ${this.opacity * 0.6})`;
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;

        branch.subbranches.forEach((subbranch) => {
          ctx.beginPath();
          ctx.moveTo(branch.x, -this.height * 0.3 + branch.y);
          ctx.lineTo(subbranch.x, -this.height * 0.3 + subbranch.y);
          ctx.stroke();
        });
      });

      ctx.shadowColor = 'transparent';
      ctx.restore();
    }
  }

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      contextRef.current = canvas.getContext('2d', { alpha: true });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize trees
    const treeCount = Math.max(8, Math.floor(window.innerWidth / 200));
    treesRef.current = Array.from({ length: treeCount }, () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      return new Tree(x, y);
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!contextRef.current) return;

    const animate = () => {
      const ctx = contextRef.current;
      const { width, height } = dimensions;

      // Clear canvas
      ctx.fillStyle = 'rgba(3, 7, 30, 0)';
      ctx.fillRect(0, 0, width, height);

      // Update and draw trees
      treesRef.current.forEach((tree) => {
        tree.update(cursorRef.current.x, cursorRef.current.y);
        tree.draw(ctx, 8);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundColor: 'transparent',
        mixBlendMode: 'screen',
      }}
    />
  );
}
