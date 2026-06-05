import { profile } from '../data/profile';
import { languages } from '../data/skills';
import SectionHeading from './SectionHeading';

export default function About() {
  return (
    <section id="sobre-mi" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Sobre mí" />

        <div className="space-y-5 text-lg leading-relaxed text-slate-300">
          {profile.bioLong.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <dt className="text-sm uppercase tracking-wide text-slate-500">Ubicación</dt>
            <dd className="mt-1 text-slate-200">{profile.location}</dd>
          </div>
          <div>
            <dt className="text-sm uppercase tracking-wide text-slate-500">Rol</dt>
            <dd className="mt-1 text-slate-200">AI / Python Engineer</dd>
          </div>
          {languages.map((l) => (
            <div key={l.name}>
              <dt className="text-sm uppercase tracking-wide text-slate-500">{l.name}</dt>
              <dd className="mt-1 text-slate-200">{l.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
