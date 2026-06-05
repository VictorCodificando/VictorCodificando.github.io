import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

/**
 * Fondo animado de red de partículas (portado del index.html original).
 * Respeta prefers-reduced-motion: si el usuario lo pide, no anima.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles: Particle[] = [];
    let rafId = 0;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      // Menos densidad en pantallas pequeñas
      const divisor = window.innerWidth < 768 ? 16000 : 10000;
      const count = Math.min((canvas.height * canvas.width) / divisor, 160);
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.5 + 0.5;
        particles.push({
          x: Math.random() * (canvas.width - size * 2) + size,
          y: Math.random() * (canvas.height - size * 2) + size,
          dx: Math.random() * 0.4 - 0.2,
          dy: Math.random() * 0.4 - 0.2,
          size,
        });
      }
    };

    const connect = () => {
      const maxDist = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const opacity = (1 - Math.sqrt(d2) / maxDist) * 0.2;
            if (opacity > 0) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        if (p.x + p.size > canvas.width || p.x - p.size < 0) p.dx = -p.dx;
        if (p.y + p.size > canvas.height || p.y - p.size < 0) p.dy = -p.dy;
        p.x += p.dx;
        p.y += p.dy;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.fill();
      }
      connect();
    };

    const animate = () => {
      draw();
      rafId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      setSize();
      init();
    };

    setSize();
    init();
    if (reduceMotion) {
      draw(); // dibujo estático
    } else {
      animate();
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
