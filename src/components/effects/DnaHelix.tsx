"use client";

import React, { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  z: number;
  type: "A" | "T" | "C" | "G";
  color: string;
  partner: number; // Index of the connected node
}

export default function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredBase, setHoveredBase] = useState<string | null>(null);
  const [clickedBases, setClickedBases] = useState<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, hoverNodeIdx: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400; // Fixed height for DNA container
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const colors = {
      A: "#f43f5e", // Rose (Adenine)
      T: "#a855f7", // Purple (Thymine)
      G: "#3b82f6", // Blue (Guanine)
      C: "#10b981", // Green (Cytosine)
    };

    const numBasePairs = 18;
    const helixRadius = 55;
    const ySpacing = 18;

    const getHelixNodes = (currentAngle: number): Node[] => {
      const nodes: Node[] = [];
      const startY = (canvas.height - numBasePairs * ySpacing) / 2;

      for (let i = 0; i < numBasePairs; i++) {
        const nodeAngle = currentAngle + i * 0.45;
        const y = startY + i * ySpacing;

        // Strand 1
        const x1 = canvas.width / 2 + Math.cos(nodeAngle) * helixRadius;
        const z1 = Math.sin(nodeAngle) * helixRadius;

        // Strand 2 (180 degrees offset)
        const x2 = canvas.width / 2 + Math.cos(nodeAngle + Math.PI) * helixRadius;
        const z2 = Math.sin(nodeAngle + Math.PI) * helixRadius;

        // Base types (A-T, G-C pairs)
        const pairType = i % 2 === 0 ? ("A" as const) : ("G" as const);
        const partnerType = pairType === "A" ? ("T" as const) : ("C" as const);

        nodes.push({
          x: x1,
          y: y,
          z: z1,
          type: pairType,
          color: colors[pairType],
          partner: i * 2 + 1,
        });

        nodes.push({
          x: x2,
          y: y,
          z: z2,
          type: partnerType,
          color: colors[partnerType],
          partner: i * 2,
        });
      }

      return nodes;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mX = e.clientX - rect.left;
      const mY = e.clientY - rect.top;
      mouseRef.current.x = mX;
      mouseRef.current.y = mY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.hoverNodeIdx = -1;
      setHoveredBase(null);
    };

    const handleCanvasClick = () => {
      if (mouseRef.current.hoverNodeIdx !== -1) {
        setClickedBases((prev) => prev + 1);
        triggerBurst(mouseRef.current.x, mouseRef.current.y);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleCanvasClick);

    interface BurstParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
      maxLife: number;
    }

    let burstParticles: BurstParticle[] = [];

    const triggerBurst = (x: number, y: number) => {
      const particleColors = [colors.A, colors.T, colors.G, colors.C];
      for (let i = 0; i < 15; i++) {
        burstParticles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          size: Math.random() * 3 + 1,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          life: 0,
          maxLife: Math.random() * 20 + 15,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slow rotation
      angle += 0.015;

      const nodes = getHelixNodes(angle);

      // Sort nodes by Z value so back nodes draw first (3D layering)
      const sortedPairs: { n1: Node; n2: Node; idx1: number; idx2: number }[] = [];
      for (let i = 0; i < numBasePairs; i++) {
        const idx1 = i * 2;
        const idx2 = i * 2 + 1;
        sortedPairs.push({
          n1: nodes[idx1],
          n2: nodes[idx2],
          idx1,
          idx2,
        });
      }

      // Sort base pairs by average Z depth (ascending Z means further back, so draw them first)
      sortedPairs.sort((a, b) => (a.n1.z + a.n2.z) - (b.n1.z + b.n2.z));

      let currentHoverIdx = -1;
      let hoveredNodeName = "";

      // Draw lines and nodes based on depth sorting
      sortedPairs.forEach(({ n1, n2, idx1, idx2 }) => {
        const radiusScale1 = (n1.z + helixRadius) / (helixRadius * 2) * 0.6 + 0.4;
        const radiusScale2 = (n2.z + helixRadius) / (helixRadius * 2) * 0.6 + 0.4;

        const size1 = (n1.z > 0 ? 8 : 5) * radiusScale1;
        const size2 = (n2.z > 0 ? 8 : 5) * radiusScale2;

        // Check hover for node 1
        const dist1 = Math.sqrt((mouseRef.current.x - n1.x) ** 2 + (mouseRef.current.y - n1.y) ** 2);
        const dist2 = Math.sqrt((mouseRef.current.x - n2.x) ** 2 + (mouseRef.current.y - n2.y) ** 2);

        if (dist1 < size1 + 5) {
          currentHoverIdx = idx1;
          hoveredNodeName = `${n1.type} (Adenine/Thymine/Guanine/Cytosine) - click to spark`;
        } else if (dist2 < size2 + 5) {
          currentHoverIdx = idx2;
          hoveredNodeName = `${n2.type} (Adenine/Thymine/Guanine/Cytosine) - click to spark`;
        }

        // Draw connection ladder bar (hydrogen bond)
        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);
        const lineGradient = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
        lineGradient.addColorStop(0, n1.color);
        lineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
        lineGradient.addColorStop(1, n2.color);
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 1.5 * ((n1.z + n2.z) / 2 + helixRadius) / (helixRadius * 2) + 0.5;
        ctx.stroke();

        // Node 1 (Strand A)
        ctx.shadowBlur = currentHoverIdx === idx1 ? 15 : 4;
        ctx.shadowColor = n1.color;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, size1 + (currentHoverIdx === idx1 ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = n1.color;
        ctx.fill();

        // Node 2 (Strand B)
        ctx.shadowBlur = currentHoverIdx === idx2 ? 15 : 4;
        ctx.shadowColor = n2.color;
        ctx.beginPath();
        ctx.arc(n2.x, n2.y, size2 + (currentHoverIdx === idx2 ? 2 : 0), 0, Math.PI * 2);
        ctx.fillStyle = n2.color;
        ctx.fill();

        ctx.shadowBlur = 0; // Reset
      });

      mouseRef.current.hoverNodeIdx = currentHoverIdx;
      if (currentHoverIdx !== -1) {
        const hoveredNode = nodes[currentHoverIdx];
        const names = {
          A: "Adenine — Forms 2 hydrogen bonds with Thymine. Essential coding block in DNA replication.",
          T: "Thymine — Pairs with Adenine. Stabilizes DNA structure.",
          G: "Guanine — Forms 3 strong hydrogen bonds with Cytosine. Critical for structural resilience.",
          C: "Cytosine — Pairs with Guanine. Highly active in biotech methylation studies."
        };
        setHoveredBase(names[hoveredNode.type]);
      }

      // Draw burst particles
      burstParticles = burstParticles.filter((p) => {
        p.life++;
        if (p.life >= p.maxLife) return false;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Gravity
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
        canvas.removeEventListener("click", handleCanvasClick);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center select-none py-6">
      <div className="w-full max-w-[500px] h-[400px] relative border border-white/5 rounded-2xl bg-slate-950/20 backdrop-blur-md overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
        
        {/* Floating instructions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400/80">
          <span>GENOME ANALYSIS VIEW</span>
          <span className="animate-pulse text-rose-400">● INTERACTIVE</span>
        </div>

        <div className="absolute bottom-4 left-4 text-[10px] font-mono text-slate-500">
          Sparks Generated: <span className="text-rose-400 font-bold">{clickedBases}</span>
        </div>
      </div>

      {/* Info panel displaying active base pair details */}
      <div className="h-16 w-full max-w-[500px] mt-4 px-4 flex items-center justify-center text-center">
        {hoveredBase ? (
          <p className="text-xs md:text-sm font-mono text-rose-200/90 animate-fade-in py-2 px-3 rounded bg-rose-500/10 border border-rose-500/20">
            {hoveredBase}
          </p>
        ) : (
          <p className="text-xs md:text-sm font-mono text-slate-400 italic">
            Hover over a base pair (A, T, C, G) node to analyze molecular structure
          </p>
        )}
      </div>
    </div>
  );
}
