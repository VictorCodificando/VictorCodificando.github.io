import { skillGroups, certifications } from '../data/skills';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading title="Skills & Stack" subtitle="Tecnologías con las que trabajo a diario" />

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={(i % 2) * 120} className="h-full">
              <TiltCard className="h-full rounded-xl">
                <div className="h-full rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-brand/50">
                  <h3 className="mb-4 font-orbitron text-lg text-brand">{group.category}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-transparent bg-slate-800 px-3 py-1.5 text-sm text-slate-200 transition-all hover:-translate-y-0.5 hover:border-brand/50 hover:text-brand"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10" delay={100}>
          <TiltCard className="rounded-xl" maxTilt={4}>
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-brand/50">
              <h3 className="mb-4 font-orbitron text-lg text-brand">Certificaciones</h3>
              <ul className="space-y-2">
                {certifications.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-slate-300">
                    <span className="mt-1 text-brand">▹</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}
