import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

/** Halos de color difuminados tras el contenido: dan profundidad al fondo. */
function AmbientGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/10 blur-[130px]" />
      <div className="absolute -right-40 top-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[130px]" />
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-brand/5 blur-[130px]" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <AmbientGlow />
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
