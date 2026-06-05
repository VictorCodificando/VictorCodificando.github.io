export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  pushed_at: string;
}

const API = 'https://api.github.com';
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

interface CacheEntry {
  ts: number;
  data: GitHubRepo[];
}

function cacheKey(user: string) {
  return `gh-repos:${user}`;
}

function readCache(user: string): GitHubRepo[] | null {
  try {
    const raw = localStorage.getItem(cacheKey(user));
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry;
    if (Date.now() - entry.ts > CACHE_TTL) return null;
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(user: string, data: GitHubRepo[]) {
  try {
    localStorage.setItem(cacheKey(user), JSON.stringify({ ts: Date.now(), data }));
  } catch {
    /* almacenamiento lleno o no disponible: ignorar */
  }
}

/**
 * Trae los repos públicos del usuario. Usa caché en localStorage (TTL 1h)
 * para no agotar el límite de 60 peticiones/hora de la API anónima.
 */
export async function fetchRepos(user: string): Promise<GitHubRepo[]> {
  const cached = readCache(user);
  if (cached) return cached;

  const res = await fetch(`${API}/users/${user}/repos?sort=pushed&per_page=100`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) {
    throw new Error(`GitHub API respondió ${res.status}`);
  }
  const repos = (await res.json()) as GitHubRepo[];
  writeCache(user, repos);
  return repos;
}
