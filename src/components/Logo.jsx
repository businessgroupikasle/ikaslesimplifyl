import React from 'react';
import { Link } from '../lib/router';
import { cn } from '../lib/utils';

export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path d="M20 20C20 12.268 13.732 6 6 6C6 13.732 12.268 20 20 20Z" className="fill-navy dark:fill-brand-ink" />
      <path d="M20 20C27.732 20 34 13.732 34 6C26.268 6 20 12.268 20 20Z" className="fill-brand" />
      <path d="M20 20C12.268 20 6 26.268 6 34C13.732 34 20 27.732 20 20Z" className="fill-brand/70" />
      <path d="M20 20C20 27.732 26.268 34 34 34C34 26.268 27.732 20 20 20Z" className="fill-navy dark:fill-brand-ink" />
      <circle cx="20" cy="20" r="2.5" className="fill-canvas" />
    </svg>
  );
}

export default function Logo({ className, showTagline = true }) {
  return (
    <Link to="/" aria-label="Simplifyl home" className={cn('group inline-flex items-center gap-2.5 rounded-md', className)}>
      <LogoMark className="h-8 w-8 transition-transform duration-300 ease-out group-hover:rotate-45" />
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-semibold tracking-tight text-fg">Simplifyl</span>
        {showTagline && <span className="mt-1 text-[11px] font-medium text-fg-subtle">Business &amp; Compliance Solutions</span>}
      </span>
    </Link>
  );
}
