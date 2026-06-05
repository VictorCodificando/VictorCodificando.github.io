import { experience, education, type TimelineItem } from '../data/experience';
import SectionHeading from './SectionHeading';

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-slate-700">
      {items.map((item, i) => (
        <li key={i} className="mb-10 ml-6">
          <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-brand" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h4 className="text-lg font-semibold text-white">{item.title}</h4>
            <span className="text-sm text-slate-500">{item.period}</span>
          </div>
          <p className="text-brand">
            {item.org}
            {item.grade && <span className="ml-2 text-slate-400">· {item.grade}</span>}
          </p>
          {item.client && <p className="text-sm text-slate-500">{item.client}</p>}
          <ul className="mt-3 space-y-2">
            {item.highlights.map((h, j) => (
              <li key={j} className="flex items-start gap-2 text-slate-300">
                <span className="mt-1 text-brand">▹</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

export default function Experience() {
  return (
    <section id="experiencia" className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Experiencia & Formación" />

        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-6 font-orbitron text-xl text-white">Experiencia</h3>
            <Timeline items={experience} />
          </div>
          <div>
            <h3 className="mb-6 font-orbitron text-xl text-white">Formación</h3>
            <Timeline items={education} />
          </div>
        </div>
      </div>
    </section>
  );
}
