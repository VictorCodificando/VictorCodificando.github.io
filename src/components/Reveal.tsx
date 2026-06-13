import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'scale';

interface Props {
  children: ReactNode;
  className?: string;
  /** Retardo de la transición en ms (para escalonar elementos). */
  delay?: number;
  direction?: Direction;
}

/**
 * Envoltorio de animación de entrada al hacer scroll.
 * El elemento aparece (fade + desplazamiento) la primera vez que entra
 * en el viewport. Con prefers-reduced-motion la transición es instantánea
 * (regla global en index.css).
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
