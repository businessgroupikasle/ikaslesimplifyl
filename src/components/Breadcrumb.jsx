import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '../lib/router';

/**
 * Site-wide breadcrumb. Every page uses this so the trail looks identical:
 * top-left of the page banner, small text, chevron separators, current page in bold.
 *
 *   <Breadcrumb items={[{ label: 'Services', to: '/services' }, { label: 'GST Filing' }]} />
 *
 * The last item is the current page. Middle items without `to` render as plain text.
 * `variant="dark"` is for dark banners, `variant="light"` for light ones.
 */
export default function Breadcrumb({ items, variant = 'dark', className = '' }) {
  const dark = variant === 'dark';

  const linkClass = dark
    ? 'text-slate-300 hover:text-white'
    : 'text-slate-500 hover:text-[#1C6FA5] dark:text-slate-400 dark:hover:text-white';
  const textClass = dark ? 'text-slate-300' : 'text-slate-500 dark:text-slate-400';
  const currentClass = dark ? 'text-white' : 'text-[#10364E] dark:text-slate-200';
  const chevronClass = dark ? 'text-slate-500' : 'text-slate-400 dark:text-slate-500';

  const trail = [{ label: 'Home', to: '/' }, ...items];

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1.5 text-xs ${className}`}
    >
      {trail.map((item, i) => {
        const isLast = i === trail.length - 1;
        return (
          <React.Fragment key={`${item.label}-${i}`}>
            {i > 0 && <ChevronRight className={`w-3 h-3 shrink-0 ${chevronClass}`} aria-hidden="true" />}
            {isLast ? (
              <span
                aria-current="page"
                className={`font-semibold truncate max-w-[16rem] sm:max-w-md ${currentClass}`}
              >
                {item.label}
              </span>
            ) : item.to ? (
              <Link to={item.to} className={`${linkClass} transition-colors`}>
                {item.label}
              </Link>
            ) : (
              <span className={textClass}>{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
