export interface TimelineItem {
  title: string;
  org: string;
  period: string;
  client?: string;
  highlights: string[];
  grade?: string;
}

export const experience: TimelineItem[] = [
  {
    title: 'QA Automation & Python Engineer',
    org: 'Exceltic',
    period: 'Ago 2025 — Actualidad',
    client: 'Cliente final: INDRA',
    highlights: [
      'Diseño y desarrollo de una suite avanzada en Python para la decodificación de protocolos de red en tiempo real con Scapy y análisis de tráfico para sistemas críticos de tráfico aéreo.',
      'Suite de automatización integrada con la API REST de Jira (ecosistema Atlassian) para el volcado automático de resultados de QA, reduciendo drásticamente el tiempo de gestión de bugs.',
      'Implementación de iniciativas de Agentes de IA (Claude, Gemini, GPT) para optimizar procesos y flujos de trabajo internos del cliente.',
    ],
  },
  {
    title: 'Desarrollador de Software',
    org: 'GMV',
    period: 'Jun 2023 — Feb 2025',
    highlights: [
      'Scripts de automatización en Python (Pandas) para la ingesta, limpieza y transformación ETL de grandes volúmenes de datos heterogéneos de clientes.',
      'Pipelines de monitorización y sistemas de alerta automatizados para la detección y reporte de errores críticos en exportaciones masivas de datos.',
      'Desarrollo de microservicios robustos con C#, C++ y React (TypeScript) sobre bases de datos SQL en entornos Agile.',
      'Logro: script de parsing y normalización en Python que resolvió un conflicto crítico de solapamiento de rangos, eliminando ajustes manuales previos a la ingesta.',
    ],
  },
];

export const education: TimelineItem[] = [
  {
    title: 'Máster en Inteligencia Artificial y Big Data',
    org: 'IES Ribera de Castilla',
    period: 'Ene 2025 — Jun 2025',
    grade: 'Nota: 9,2',
    highlights: [
      'Diseño, entrenamiento y optimización de modelos de Machine Learning y Deep Learning con PyTorch, TensorFlow y scikit-learn, gestionando el ciclo de vida con MLflow.',
      'Procesamiento, limpieza y análisis avanzado de grandes volúmenes de datos (ETL / Big Data) con técnicas estadísticas y análisis predictivo.',
      'Asistentes virtuales y chatbots inteligentes con tecnología cognitiva de IBM Watson.',
    ],
  },
  {
    title: 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
    org: 'IES Julián Marías',
    period: 'Sep 2021 — Jun 2023',
    grade: 'Nota: 9,23',
    highlights: [
      'Fundamentos de ingeniería de software, POO y diseño de bases de datos relacionales con Java y C# (.NET).',
      'Desarrollo de aplicaciones móviles nativas Android y soluciones de escritorio multiplataforma.',
      'Bases de datos SQL y NoSQL (MongoDB); administración básica de sistemas Linux.',
    ],
  },
];
