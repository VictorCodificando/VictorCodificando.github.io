// Datos personales centralizados. Edita aquí para actualizar todo el sitio.

export const profile = {
  name: 'Víctor González Cobos',
  shortName: 'Víctor González',
  title: 'AI Engineer | Python Engineer',
  tagline: 'Desarrollador de Inteligencia Artificial',
  location: 'Valladolid, España',
  email: 'victorcodificando@gmail.com',
  phone: '+34 678 128 713',
  githubUser: 'VictorCodificando',
  avatarUrl: 'https://avatars.githubusercontent.com/u/104581008?v=4',
  cvUrl: '/CV.pdf',
  social: {
    github: 'https://github.com/VictorCodificando',
    linkedin: 'https://www.linkedin.com/in/víctor-gonzález-cobos/',
  },
  // Bio en 1ª persona (antes estaba en 3ª persona).
  bioShort:
    'Ingeniero de software especializado en Inteligencia Artificial y Big Data, con sólida experiencia en Python y C++.',
  bioLong: [
    'Soy Víctor, ingeniero de software especializado en Inteligencia Artificial y Big Data, con sólida experiencia en el ecosistema de Python y C++. Mi enfoque se centra en optimizar flujos de trabajo y automatizar procesos internos en entornos corporativos complejos, transformando tareas repetitivas en soluciones eficientes y escalables.',
    'Diseño, entreno y optimizo modelos de Machine Learning y Deep Learning con PyTorch, TensorFlow, scikit-learn y MLflow, y proceso grandes volúmenes de datos (ETL) con Pandas y PySpark. Actualmente busco nuevos retos en el ámbito de la IA y el procesamiento de datos a gran escala.',
  ],
} as const;

// Servicio de formulario de contacto (estático, sin backend).
// Sustituye este endpoint por el tuyo de Formspree: https://formspree.io/f/XXXXXXXX
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/REEMPLAZA_ESTE_ID';
