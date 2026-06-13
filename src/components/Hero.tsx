import { lazy, Suspense, useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { GitHubIcon, LinkedInIcon, DownloadIcon } from './icons';

// three.js va en su propio chunk: no bloquea el primer render
const Hero3D = lazy(() => import('./Hero3D'));

const roles = [
  'AI Engineer',
  'Python Engineer',
  'Machine Learning',
  'Big Data & ETL',
] as const;

/** Efecto máquina de escribir rotando entre roles. Estático con reduced-motion. */
function useTypewriter(words: readonly string[]) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0]);
      return;
    }
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer = 0;

    const tick = () => {
      const current = words[word];
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 2200); // pausa con la palabra completa
          return;
        }
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
      }
      timer = window.setTimeout(tick, deleting ? 45 : 95);
    };

    timer = window.setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [words]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24"
    >
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      <div className="relative mx-auto max-w-3xl text-center">
        {/* Avatar con anillo orbital animado */}
        <div className="mx-auto mb-8 h-32 w-32 opacity-0 animate-fade-in">
          <div className="relative h-full w-full animate-float">
            <div
              aria-hidden="true"
              className="avatar-ring absolute -inset-1.5 animate-spin-slow rounded-full"
            />
            <img
              src={profile.avatarUrl}
              alt={`Foto de ${profile.name}`}
              width={128}
              height={128}
              loading="eager"
              className="relative h-32 w-32 rounded-full border-2 border-slate-900 object-cover shadow-[0_0_35px_rgba(56,189,248,0.35)]"
            />
          </div>
        </div>

        {/* Rol con efecto typewriter */}
        <p className="mb-3 h-6 font-orbitron text-sm uppercase tracking-[0.3em] text-brand opacity-0 animate-fade-in-up [animation-delay:150ms]">
          {typed}
          <span aria-hidden="true" className="ml-0.5 animate-blink">
            ▌
          </span>
        </p>

        <h1 className="mb-4 text-4xl font-bold sm:text-6xl">
          <span className="text-gradient inline-block opacity-0 animate-fade-in-up [animation-delay:300ms]">
            {profile.name}
          </span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 opacity-0 animate-fade-in-up [animation-delay:450ms]">
          {profile.bioShort}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 opacity-0 animate-fade-in-up [animation-delay:600ms]">
          <a
            href="#proyectos"
            className="btn-shine rounded-md bg-brand px-6 py-3 font-medium text-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all hover:scale-105 hover:bg-brand-dark hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="rounded-md border border-slate-600 bg-slate-900/40 px-6 py-3 font-medium text-slate-200 backdrop-blur transition-all hover:scale-105 hover:border-brand hover:text-brand"
          >
            Contacto
          </a>
          <a
            href={profile.cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border border-slate-600 bg-slate-900/40 px-6 py-3 font-medium text-slate-200 backdrop-blur transition-all hover:scale-105 hover:border-brand hover:text-brand"
          >
            <DownloadIcon className="h-4 w-4" /> Descargar CV
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 opacity-0 animate-fade-in-up [animation-delay:750ms]">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-400 transition-all hover:-translate-y-1 hover:text-brand"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 transition-all hover:-translate-y-1 hover:text-brand"
          >
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#sobre-mi"
        aria-label="Bajar a la sección Sobre mí"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 opacity-0 animate-fade-in [animation-delay:1200ms] sm:block"
      >
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-slate-600 p-1.5 transition-colors hover:border-brand">
          <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-brand" />
        </span>
      </a>
    </section>
  );
}
