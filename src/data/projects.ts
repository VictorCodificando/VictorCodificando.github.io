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
      'Generador de subtítulos automáticos a partir de un archivo de vídeo en cualquier idioma, usando modelos de IA de reconocimiento de voz (ASR). Transcribe, segmenta y sincroniza el texto para producir archivos de subtítulos listos para usar.',
    tech: ['Python', 'Deep Learning', 'Speech-to-Text', 'IA Generativa'],
    repoUrl: 'https://github.com/VictorCodificando/AutoSub-AI',
    featured: true,
  },
];

// Repos que NO quieres mostrar en el listado automático traído de GitHub.
export const hiddenRepos: string[] = [
  'VictorCodificando',
  'VictorCodificando.github.io',
];
