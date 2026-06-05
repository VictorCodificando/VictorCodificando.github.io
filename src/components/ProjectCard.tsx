import type { GitHubRepo } from '../lib/github';
import { GitHubIcon, ExternalIcon, StarIcon, ForkIcon } from './icons';

// Colores aproximados por lenguaje (estilo GitHub).
const langColors: Record<string, string> = {
  Python: '#3572A5',
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'C#': '#178600',
  'C++': '#f34b7d',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

export default function ProjectCard({ repo }: { repo: GitHubRepo }) {
  const demo = repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : null;

  return (
    <article className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:-translate-y-1 hover:border-brand/50">
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="font-semibold text-white">{repo.name}</h3>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <StarIcon className="h-3.5 w-3.5 text-yellow-400" />
            {repo.stargazers_count}
          </span>
          {repo.forks_count > 0 && (
            <span className="flex items-center gap-1">
              <ForkIcon className="h-3.5 w-3.5" />
              {repo.forks_count}
            </span>
          )}
        </div>
      </div>

      <p className="flex-grow text-sm text-slate-400">
        {repo.description ?? 'Sin descripción disponible.'}
      </p>

      <div className="mt-4 flex items-center justify-between">
        {repo.language ? (
          <span className="flex items-center gap-1.5 text-xs text-slate-400">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: langColors[repo.language] ?? '#94a3b8' }}
            />
            {repo.language}
          </span>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-3">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Demo de ${repo.name}`}
              className="text-slate-400 transition-colors hover:text-brand"
            >
              <ExternalIcon className="h-5 w-5" />
            </a>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Código de ${repo.name} en GitHub`}
            className="text-slate-400 transition-colors hover:text-brand"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
