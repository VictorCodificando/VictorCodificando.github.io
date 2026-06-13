import { useRef, type MouseEvent, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados. */
  maxTilt?: number;
}

/**
 * Tarjeta con efecto tilt 3D: se inclina siguiendo al ratón y muestra un
 * brillo radial en el punto del cursor. En dispositivos táctiles o con
 * prefers-reduced-motion simplemente no se inclina.
 */
export default function TiltCard({ children, className = '', maxTilt = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty('--rx', `${((0.5 - py) * maxTilt).toFixed(2)}deg`);
    el.style.setProperty('--ry', `${((px - 0.5) * maxTilt).toFixed(2)}deg`);
    el.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`);
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card ${className}`}
    >
      {children}
      <div className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
