import React from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Logo from './Logo';
import { Link } from '../lib/router';
import { CONTACT, LEGAL_LINKS, SERVICES, whatsappLink } from '../data/site';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    path: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.39 9.74v-8.37H5.07v8.37h2.78Z',
  },
  {
    label: 'X (Twitter)',
    href: 'https://twitter.com',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.775 0-1.423.21-1.847.601-.423.392-.619 1.054-.619 2.052v1.332h3.945l-.468 3.667h-3.477v7.98h-4.664Z',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
];

const COMPANY = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'All Services', href: '/services' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

function Column({ title, children }) {
  return (
    <div>
      <p className="mb-4 font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">{title}</p>
      <ul className="space-y-3 text-sm">{children}</ul>
    </div>
  );
}

const linkCls = 'text-fg-muted transition-colors hover:text-fg';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-sunken">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-fg-muted">
            Simplifyl Compliance Solutions is an independent business consultancy providing advisory and documentation assistance for GST
            filing, company registrations, trademark security, and corporate compliance across India.
          </p>
          <div className="mt-6 flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-surface text-fg-subtle transition-colors hover:border-line-strong hover:text-fg"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          <Column title="Company">
            {COMPANY.map((l) => (
              <li key={l.href}>
                <Link to={l.href} className={linkCls}>
                  {l.name}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Services">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className={linkCls}>
                  {s.name}
                </Link>
              </li>
            ))}
          </Column>

          <div className="col-span-2 sm:col-span-1">
            <Column title="Contact">
              <li>
                <a href={CONTACT.phoneHref} className={`inline-flex items-center gap-2.5 ${linkCls}`}>
                  <Phone className="h-4 w-4 text-fg-subtle" /> {CONTACT.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2.5 ${linkCls}`}>
                  <MessageCircle className="h-4 w-4 text-fg-subtle" /> WhatsApp support
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className={`inline-flex items-center gap-2.5 ${linkCls}`}>
                  <Mail className="h-4 w-4 text-fg-subtle" /> {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-fg-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle" />
                <span className="leading-6">{CONTACT.address}</span>
              </li>
            </Column>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-[13px] text-fg-subtle sm:flex-row">
          <p className="text-center sm:text-left">© {year} Simplifyl Compliance Solutions. Independent consultancy.</p>
          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} to={l.href} className="transition-colors hover:text-fg">
                {l.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
