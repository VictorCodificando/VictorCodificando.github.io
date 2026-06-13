import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  /** Profundidad 0 (lejos) → 1 (cerca). Controla tamaño, opacidad y parallax. */
  z: number;
}

/**
 * Fondo de red de partículas con profundidad: cada partícula tiene una
 * coordenada Z que escala su tamaño, opacidad, velocidad y cuánto se
 * desplaza con el parallax del ratón, creando sensación de capas 3D.
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
    // Desplazamiento de parallax actual y objetivo (se interpola para suavidad)
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    const PARALLAX_STRENGTH = 26; // px máximos de desplazamiento en la capa más cercana

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
        const z = Math.random() * 0.8 + 0.2;
        const size = (Math.random() * 1.2 + 0.6) * (0.5 + z);
        // Las capas cercanas se mueven más rápido que las lejanas
        const speed = 0.15 + z * 0.35;
        particles.push({
          x: Math.random() * (canvas.width - size * 2) + size,
          y: Math.random() * (canvas.height - size * 2) + size,
          dx: (Math.random() - 0.5) * speed,
          dy: (Math.random() - 0.5) * speed,
          size,
          z,
        });
      }
    };

    const connect = (px: Float64Array, py: Float64Array) => {
      const maxDist = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = px[a] - px[b];
          const dy = py[a] - py[b];
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const depth = (particles[a].z + particles[b].z) / 2;
            const opacity = (1 - Math.sqrt(d2) / maxDist) * (0.08 + depth * 0.18);
            if (opacity > 0.01) {
              ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
              ctx.lineWidth = 0.7;
              ctx.beginPath();
              ctx.moveTo(px[a], py[a]);
              ctx.lineTo(px[b], py[b]);
              ctx.stroke();
            }
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      parallax.x += (parallax.tx - parallax.x) * 0.05;
      parallax.y += (parallax.ty - parallax.y) * 0.05;

      const px = new Float64Array(particles.length);
      const py = new Float64Array(particles.length);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.x + p.size > canvas.width || p.x - p.size < 0) p.dx = -p.dx;
        if (p.y + p.size > canvas.height || p.y - p.size < 0) p.dy = -p.dy;
        p.x += p.dx;
        p.y += p.dy;

        // Posición proyectada con parallax proporcional a la profundidad
        px[i] = p.x + parallax.x * p.z;
        py[i] = p.y + parallax.y * p.z;

        ctx.beginPath();
        ctx.arc(px[i], py[i], p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${0.25 + p.z * 0.45})`;
        ctx.fill();
      }
      connect(px, py);
    };

    const animate = () => {
      draw();
      rafId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      setSize();
      init();
      if (reduceMotion) draw();
    };

    const onPointerMove = (e: PointerEvent) => {
      parallax.tx = (e.clientX / window.innerWidth - 0.5) * 2 * PARALLAX_STRENGTH;
      parallax.ty = (e.clientY / window.innerHeight - 0.5) * 2 * PARALLAX_STRENGTH;
    };

    setSize();
    init();
    if (reduceMotion) {
      draw(); // dibujo estático
    } else {
      animate();
      window.addEventListener('pointermove', onPointerMove, { passive: true });
    }
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
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
