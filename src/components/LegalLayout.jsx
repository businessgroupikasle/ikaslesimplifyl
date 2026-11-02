import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Cookie, FileText, Mail, Phone, Shield } from 'lucide-react';
import SiteLayout from './SiteLayout';
import PageHeader from './PageHeader';
import { Container } from './ui';
import { Link } from '../lib/router';
import { CONTACT } from '../data/site';
import { cn } from '../lib/utils';

const LEGAL_DOCS = [
  { name: 'Privacy Policy', path: '/privacy-policy', icon: Shield },
  { name: 'Terms & Conditions', path: '/terms-and-conditions', icon: FileText },
  { name: 'Disclaimer', path: '/disclaimer', icon: AlertCircle },
  { name: 'Cookie Policy', path: '/cookie-policy', icon: Cookie },
];

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function LegalLayout({ title, subtitle, lastUpdated = 'April 15, 2025', currentPath, children }) {
  const articleRef = useRef(null);
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState('');

  // Build a table of contents from the document's <h2> headings.
  useEffect(() => {
    const headings = Array.from(articleRef.current?.querySelectorAll('h2') || []);
    headings.forEach((h) => {
      if (!h.id) h.id = slug(h.textContent || '');
    });
    setToc(headings.map((h) => ({ id: h.id, text: h.textContent })));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-90px 0px -70% 0px' },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [currentPath]);

  return (
    <SiteLayout>
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Legal' }, { label: title }]}
        eyebrow="Legal"
        title={title}
        description={subtitle}
      >
        <div className="mt-6 flex flex-wrap items-center gap-2 text-[13px] text-fg-subtle">
          <span className="chip">
            Last updated <strong className="font-medium text-fg">{lastUpdated}</strong>
          </span>
          <span className="chip">
            Governing law <strong className="font-medium text-fg">Republic of India</strong>
          </span>
        </div>
      </PageHeader>

      <Container className="grid gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
        <aside className="min-w-0 lg:col-span-3">
          <div className="space-y-8 lg:sticky lg:top-[calc(var(--header-h)+32px)]">
            <nav aria-label="Legal documents">
              <p className="mb-3 font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">Documents</p>
              <ul className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
                {LEGAL_DOCS.map((doc) => {
                  const Icon = doc.icon;
                  const active = currentPath === doc.path;
                  return (
                    <li key={doc.path} className="shrink-0">
                      <Link
                        to={doc.path}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                          active ? 'bg-sunken text-fg ring-1 ring-line' : 'text-fg-muted hover:bg-sunken hover:text-fg',
                        )}
                      >
                        <Icon className={cn('h-4 w-4', active ? 'text-brand' : 'text-fg-subtle')} strokeWidth={1.75} />
                        {doc.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {toc.length > 0 && (
              <nav aria-label="On this page" className="hidden lg:block">
                <p className="mb-3 font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">On this page</p>
                <ul className="space-y-0.5 border-l border-line">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          '-ml-px block border-l py-1.5 pl-4 text-[13px] leading-5 transition-colors',
                          activeId === item.id ? 'border-brand font-medium text-fg' : 'border-transparent text-fg-subtle hover:text-fg',
                        )}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-9">
          <article ref={articleRef} className="prose-legal max-w-3xl">
            {children}
          </article>

          <aside className="mt-14 flex max-w-3xl flex-col gap-5 rounded-xl border border-line bg-sunken p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="text-base font-semibold">Questions regarding this policy?</h3>
              <p className="mt-1 text-sm text-fg-muted">Contact the Simplifyl compliance and legal advisory desk directly.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={`mailto:${CONTACT.email}`} className="btn btn-md btn-primary">
                <Mail className="h-4 w-4" /> {CONTACT.email}
              </a>
              <a href={CONTACT.phoneHref} className="btn btn-md btn-secondary">
                <Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </SiteLayout>
  );
}
