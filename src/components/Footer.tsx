import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowUpIcon } from './icons';

/** Botón flotante "volver arriba"; aparece tras pasar el primer scroll. */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#inicio"
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-brand/50 bg-slate-900/80 text-brand shadow-[0_0_15px_rgba(56,189,248,0.25)] backdrop-blur transition-all hover:bg-brand hover:text-slate-900 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUpIcon className="h-5 w-5" />
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-6 py-10">
      <BackToTop />
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-6">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-400 transition-all hover:-translate-y-1 hover:text-brand"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 transition-all hover:-translate-y-1 hover:text-brand"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-slate-400 transition-all hover:-translate-y-1 hover:text-brand"
          >
            <MailIcon className="h-5 w-5" />
          </a>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Diseñado y desarrollado con React,
          TypeScript y Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
