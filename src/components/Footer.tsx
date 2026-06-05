import { profile } from '../data/profile';
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-6">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-slate-400 transition-colors hover:text-brand"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-slate-400 transition-colors hover:text-brand"
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-slate-400 transition-colors hover:text-brand"
          >
            <MailIcon className="h-5 w-5" />
          </a>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Diseñado y desarrollado con React,
          TypeScript y Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
