import { useEffect, useState } from 'react';
import { fetchRepos, type GitHubRepo } from '../lib/github';
import { hiddenRepos } from '../data/projects';

interface State {
  repos: GitHubRepo[];
  loading: boolean;
  error: string | null;
}

/**
 * Carga los repos públicos del usuario, oculta forks y los repos
 * de `hiddenRepos`, y los ordena por estrellas y fecha de push.
 */
export function useGitHubRepos(user: string): State {
  const [state, setState] = useState<State>({ repos: [], loading: true, error: null });

  useEffect(() => {
    let active = true;
    setState({ repos: [], loading: true, error: null });

    fetchRepos(user)
      .then((repos) => {
        if (!active) return;
        const filtered = repos
          .filter((r) => !r.fork && !hiddenRepos.includes(r.name))
          .sort(
            (a, b) =>
              (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0) ||
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          );
        setState({ repos: filtered, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!active) return;
        const msg =
          err instanceof Error ? err.message : 'Error desconocido al cargar GitHub';
        setState({ repos: [], loading: false, error: msg });
      });

    return () => {
      active = false;
    };
  }, [user]);

  return state;
}
