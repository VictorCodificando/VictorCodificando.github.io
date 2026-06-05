export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Lenguajes',
    items: ['Python', 'C#', 'C++', 'TypeScript', 'Java'],
  },
  {
    category: 'IA y Datos',
    items: [
      'PyTorch',
      'TensorFlow',
      'scikit-learn',
      'MLflow',
      'Pandas',
      'PySpark',
      'SQL',
      'Power BI',
    ],
  },
  {
    category: 'DevOps & Cloud',
    items: ['Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Git', 'Linux'],
  },
  {
    category: 'Arquitectura',
    items: ['SOLID', 'POO', 'Microservicios', 'Agile', 'REST APIs'],
  },
];

export const certifications: string[] = [
  'SOLID Principles of Object-Oriented Design and Architecture',
  'Modern React with Redux (2024 Update)',
];

export const languages: { name: string; level: string }[] = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'C1' },
];
