import { profile } from '../data/profile';
import { GitHubIcon, LinkedInIcon, DownloadIcon } from './icons';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center px-6 pt-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <img
          src={profile.avatarUrl}
          alt={`Foto de ${profile.name}`}
          width={128}
          height={128}
          loading="eager"
          className="mx-auto mb-8 h-32 w-32 rounded-full border-2 border-brand object-cover shadow-[0_0_25px_rgba(56,189,248,0.4)]"
        />

        <p className="mb-3 font-orbitron text-sm uppercase tracking-[0.3em] text-brand">
          {profile.title}
        </p>

        <h1 className="mb-4 text-4xl font-bold text-white sm:text-6xl">
          {profile.name}
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
          {profile.bioShort}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#proyectos"
            className="rounded-md bg-brand px-6 py-3 font-medium text-slate-900 transition-transform hover:scale-105 hover:bg-brand-dark"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="rounded-md border border-slate-600 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-brand hover:text-brand"
          >
            Contacto
          </a>
          <a
            href={profile.cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-brand hover:text-brand"
          >
            <DownloadIcon className="h-4 w-4" /> Descargar CV
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-400 transition-colors hover:text-brand"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 transition-colors hover:text-brand"
          >
            <LinkedInIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
