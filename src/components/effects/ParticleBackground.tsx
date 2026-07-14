"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const colors = [
      "rgba(244, 63, 94, 0.4)", // Rose
      "rgba(168, 85, 247, 0.4)", // Purple
      "rgba(236, 72, 153, 0.4)", // Pink
      "rgba(129, 140, 248, 0.3)", // Indigo
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 25000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4 - 0.2, // Slightly float upwards
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    resizeCanvas();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Draw active mouse glow (ambient follow)
      if (mouse.x > 0 && mouse.y > 0) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          200
        );
        glowGradient.addColorStop(0, "rgba(244, 63, 94, 0.08)");
        glowGradient.addColorStop(0.5, "rgba(168, 85, 247, 0.04)");
        glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Draw particle glow
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace("0.4", p.opacity.toFixed(2));
        ctx.fill();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Interaction with mouse (gentle push away)
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Float wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Gentle breathing opacity
        p.opacity += (Math.random() - 0.5) * 0.02;
        if (p.opacity < 0.1) p.opacity = 0.1;
        if (p.opacity > 0.8) p.opacity = 0.8;
      });

      // Reset shadow blur
      ctx.shadowBlur = 0;

      // Draw a subtle, rare shooting star
      if (Math.random() < 0.0006) {
        createShootingStar(canvas.width, canvas.height);
      }

      updateShootingStars(ctx);

      animationFrameId = requestAnimationFrame(draw);
    };

    interface ShootingStar {
      x: number;
      y: number;
      dx: number;
      dy: number;
      length: number;
      life: number;
      maxLife: number;
    }

    let shootingStars: ShootingStar[] = [];

    const createShootingStar = (w: number, h: number) => {
      shootingStars.push({
        x: Math.random() * w * 0.6,
        y: Math.random() * h * 0.4,
        dx: Math.random() * 4 + 4,
        dy: Math.random() * 2 + 2,
        length: Math.random() * 80 + 50,
        life: 0,
        maxLife: Math.random() * 30 + 20,
      });
    };

    const updateShootingStars = (c: CanvasRenderingContext2D) => {
      shootingStars = shootingStars.filter((star) => {
        star.life++;
        if (star.life >= star.maxLife) return false;

        const ratio = star.life / star.maxLife;
        const opacity = Math.sin(ratio * Math.PI); // Fade in and out

        const endX = star.x + star.dx * star.life;
        const endY = star.y + star.dy * star.life;
        const startX = endX - (star.length * star.dx) / 10;
        const startY = endY - (star.length * star.dy) / 10;

        const starGradient = c.createLinearGradient(startX, startY, endX, endY);
        starGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
        starGradient.addColorStop(1, `rgba(255, 244, 244, ${opacity * 0.4})`);

        c.beginPath();
        c.moveTo(startX, startY);
        c.lineTo(endX, endY);
        c.lineWidth = 1.5;
        c.strokeStyle = starGradient;
        c.stroke();

        return true;
      });
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="aurora-container">
      <div className="aurora-glow aurora-1" />
      <div className="aurora-glow aurora-2" />
      <div className="aurora-glow aurora-3" />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full block"
      />
    </div>
  );
}
