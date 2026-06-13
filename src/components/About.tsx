import { profile } from '../data/profile';
import { languages } from '../data/skills';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="sobre-mi" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Sobre mí" />

        <div className="space-y-5 text-lg leading-relaxed text-slate-300">
          {profile.bioLong.map((p, i) => (
            <Reveal key={i} delay={i * 120}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: 'Ubicación', value: profile.location },
            { label: 'Rol', value: 'AI / Python Engineer' },
            ...languages.map((l) => ({ label: l.name, value: l.level })),
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 100} direction="scale">
              <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 transition-colors hover:border-brand/40">
                <dt className="text-sm uppercase tracking-wide text-slate-500">
                  {item.label}
                </dt>
                <dd className="mt-1 text-slate-200">{item.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
