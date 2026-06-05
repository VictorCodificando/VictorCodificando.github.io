import { useState, type FormEvent } from 'react';
import { profile, FORMSPREE_ENDPOINT } from '../data/profile';
import SectionHeading from './SectionHeading';
import { GitHubIcon, LinkedInIcon, MailIcon, CopyIcon } from './icons';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard no disponible */
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          title="Contacto"
          subtitle="¿Tienes un proyecto o una oferta? Hablemos."
        />

        {/* Atajos de contacto */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-brand hover:text-brand"
          >
            <CopyIcon className="h-4 w-4" />
            {copied ? '¡Copiado!' : profile.email}
          </button>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Enviar email"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-brand hover:text-brand"
          >
            <MailIcon className="h-4 w-4" /> Email
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-brand hover:text-brand"
          >
            <LinkedInIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-brand hover:text-brand"
          >
            <GitHubIcon className="h-4 w-4" /> GitHub
          </a>
        </div>

        {/* Formulario (Formspree, sin backend) */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Honeypot anti-spam */}
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm text-slate-400">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-100 outline-none transition-colors focus:border-brand"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-slate-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-100 outline-none transition-colors focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm text-slate-400">
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-md border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-100 outline-none transition-colors focus:border-brand"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded-md bg-brand px-6 py-3 font-medium text-slate-900 transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
          </button>

          {status === 'success' && (
            <p className="text-center text-green-400">
              ¡Gracias! Tu mensaje se ha enviado correctamente.
            </p>
          )}
          {status === 'error' && (
            <p className="text-center text-red-400">
              Hubo un problema al enviar. Escríbeme directamente a {profile.email}.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
