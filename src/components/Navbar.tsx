import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { MenuIcon, CloseIcon } from './icons';

const links = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#skills', label: 'Skills' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'bg-slate-900/80 shadow-lg backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="font-orbitron text-lg font-bold text-white">
          Victor<span className="text-brand">Codificando</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-300 transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.cvUrl}
              download
              className="rounded-md border border-brand px-4 py-1.5 text-sm font-medium text-brand transition-colors hover:bg-brand hover:text-slate-900"
            >
              CV
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="text-slate-200 md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-slate-800 bg-slate-900/95 px-6 py-4 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-slate-300 transition-colors hover:text-brand"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={profile.cvUrl}
              download
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-md border border-brand px-4 py-2 text-sm font-medium text-brand"
            >
              Descargar CV
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
