export interface FeaturedProject {
  name: string;
  description: string;
  tech: string[];
  repoUrl: string;
  demoUrl?: string;
  featured?: boolean;
  // Repos que quieres ocultar del listado automático de GitHub.
}

// Proyectos destacados (curados a mano). El primero se muestra en grande.
export const featuredProjects: FeaturedProject[] = [
  {
    name: 'AutoSub-AI',
    description:
      'Generador de subtítulos automáticos a partir de un archivo de vídeo a cualquier idioma. Traducción avanzada de subtitulos.',
    tech: ['Python', 'Deep Learning', 'Speech-to-Text', 'IA Generativa', 'LLMs'],
    repoUrl: 'https://github.com/VictorCodificando/AutoSub-AI',
    featured: true,
  },
];

// Repos que NO quieres mostrar en el listado automático traído de GitHub.
export const hiddenRepos: string[] = [
  'VictorCodificando',
  'VictorCodificando.github.io',
];
