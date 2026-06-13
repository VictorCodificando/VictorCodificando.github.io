import Reveal from './Reveal';

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  return (
    <Reveal className="mb-12 text-center">
      <h2 className="font-orbitron text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-20 rounded bg-gradient-to-r from-brand to-indigo-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
      {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
    </Reveal>
  );
}
