import { profile } from '../data/profile';
import { featuredProjects } from '../data/projects';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import SectionHeading from './SectionHeading';
import ProjectCard from './ProjectCard';
import { GitHubIcon, ExternalIcon } from './icons';

function FeaturedProjectCard() {
  const p = featuredProjects[0];
  if (!p) return null;
  return (
    <div className="mb-12 overflow-hidden rounded-2xl border border-brand/40 bg-gradient-to-br from-slate-900 to-slate-800/60 p-8 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
      <span className="mb-3 inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-brand">
        Proyecto destacado
      </span>
      <h3 className="mb-3 font-orbitron text-2xl text-white">{p.name}</h3>
      <p className="mb-5 max-w-2xl text-slate-300">{p.description}</p>
      <ul className="mb-6 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <li key={t} className="rounded-md bg-slate-800 px-3 py-1 text-sm text-slate-200">
            {t}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-4">
        <a
          href={p.repoUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-brand px-5 py-2.5 font-medium text-slate-900 transition-colors hover:bg-brand-dark"
        >
          <GitHubIcon className="h-5 w-5" /> Ver código
        </a>
        {p.demoUrl && (
          <a
            href={p.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-600 px-5 py-2.5 font-medium text-slate-200 transition-colors hover:border-brand hover:text-brand"
          >
            <ExternalIcon className="h-5 w-5" /> Demo
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const { repos, loading, error } = useGitHubRepos(profile.githubUser);
  const featuredNames = new Set(featuredProjects.map((p) => p.name));
  const otherRepos = repos.filter((r) => !featuredNames.has(r.name));

  return (
    <section id="proyectos" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title="Mis Proyectos"
          subtitle="Una selección de mi trabajo, sincronizada en vivo con GitHub"
        />

        <FeaturedProjectCard />

        {loading && (
          <p className="text-center text-slate-400">Cargando proyectos…</p>
        )}

        {error && !loading && (
          <p className="text-center text-slate-400">
            No se pudieron cargar los datos de GitHub. Inténtalo de nuevo más tarde.
          </p>
        )}

        {!loading && !error && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-brand transition-colors hover:text-brand-dark"
          >
            <GitHubIcon className="h-5 w-5" /> Ver todo en GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
