import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  time: number;
  width: number;
}

interface HandwrittenTrailProps {
  containerRef: React.RefObject<HTMLElement | null>;
}

export const HandwrittenTrail: React.FC<HandwrittenTrailProps> = ({ containerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion or is on mobile/coarse pointer
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchOnly = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isTouchOnly) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let points: Point[] = [];
    const MAX_POINTS = 160;
    const LIFETIME = 1500; // 1.5 seconds ink persistence

    // Smoothed pen position to create organic delayed stroke
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isMouseInside = false;

    // Resize canvas with pixel ratio scaling
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse movement listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!isMouseInside) {
        isMouseInside = true;
        currentX = targetX;
        currentY = targetY;
      }

      if (!animId) {
        animId = requestAnimationFrame(render);
      }
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop
    const render = () => {
      const now = performance.now();
      const rect = container.getBoundingClientRect();

      // Smooth interpolation towards target with organic spring delay
      if (isMouseInside) {
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const dist = Math.hypot(dx, dy);

        // Fluid organic smoothing factor
        const ease = 0.28;
        currentX += dx * ease;
        currentY += dy * ease;

        // If pen moved significantly, add a stroke point
        const lastPoint = points[points.length - 1];
        const stepDist = lastPoint ? Math.hypot(currentX - lastPoint.x, currentY - lastPoint.y) : dist;

        if (!lastPoint || stepDist > 3) {
          // Calculate dynamic fountain pen stroke width based on speed:
          // Faster movement produces delicate fine line; slow pauses produce fuller ink
          const speed = Math.min(stepDist, 35);
          const dynamicWidth = Math.max(1.1, Math.min(2.4, 2.3 - (speed / 35) * 1.0));

          points.push({
            x: currentX,
            y: currentY,
            time: now,
            width: dynamicWidth,
          });

          if (points.length > MAX_POINTS) {
            points.shift();
          }
        }
      }

      // Filter out expired points
      points = points.filter((p) => now - p.time < LIFETIME);

      // Clear canvas
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Render the handwritten ink trail
      if (points.length > 2) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Draw bezier curves between consecutive points
        for (let i = 1; i < points.length - 1; i++) {
          const p0 = points[i - 1];
          const p1 = points[i];
          const p2 = points[i + 1];

          // Compute midpoint for quadratic bezier curve
          const midX = (p1.x + p2.x) / 2;
          const midY = (p1.y + p2.y) / 2;

          // Calculate age and fade-out opacity
          const age = now - p1.time;
          const lifeProgress = 1 - age / LIFETIME; // 1 (new) to 0 (old)
          const alpha = Math.max(0, Math.pow(lifeProgress, 1.4) * 0.92);

          if (alpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
            ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);

            // Subtle warm cream/off-white ink (#F2EDE3 / #FAF7F0)
            ctx.strokeStyle = `rgba(242, 237, 227, ${alpha})`;
            ctx.lineWidth = p1.width;
            ctx.stroke();

            // Sutil núcleo central de caneta de tinta (pena fina e delicada)
            ctx.beginPath();
            ctx.moveTo((p0.x + p1.x) / 2, (p0.y + p1.y) / 2);
            ctx.quadraticCurveTo(p1.x, p1.y, midX, midY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
            ctx.lineWidth = Math.max(0.7, p1.width * 0.55);
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      // Keep rendering as long as there are points to fade out or mouse is active
      if (points.length > 0 || isMouseInside) {
        animId = requestAnimationFrame(render);
      } else {
        animId = null;
      }
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[12] w-full h-full"
      aria-hidden="true"
    />
  );
};
