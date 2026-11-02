import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, HelpCircle, Mail } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import { Button, Container, IconTile } from '../components/ui';
import { Link } from '../lib/router';
import { SERVICES } from '../data/site';

export default function NotFoundPage() {
  useEffect(() => {
    // Notify window or server of 404 state if applicable
    if (typeof window !== 'undefined') window.__IS_404__ = true;
  }, []);

  return (
    <SiteLayout
      seo={{
        title: '404: Page Not Found | Simplifyl Compliance Solutions',
        description:
          'The page you are looking for does not exist or has been moved. Explore Simplifyl GST filing, company registrations, and trademark services or return to the homepage.',
        canonicalUrl: 'https://simplifyl.com/404',
        noIndex: true,
      }}
    >
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="bg-glow pointer-events-none absolute inset-0" aria-hidden="true" />
        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip">
              <HelpCircle className="h-3.5 w-3.5 text-brand" /> Error 404 · Resource not found
            </span>
            <p className="mt-8 font-mono text-[96px] font-medium leading-none tracking-tighter text-fg sm:text-[128px]" aria-hidden="true">
              4<span className="text-brand">0</span>4
            </p>
            <h1 className="mt-6 text-h2 font-semibold">Page not found</h1>
            <p className="mx-auto mt-4 max-w-lg text-[17px] leading-7 text-fg-muted">
              The page or resource you requested does not exist, has been removed, or is temporarily unavailable.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" to="/">
                <ArrowLeft className="h-4 w-4" /> Return to homepage
              </Button>
              <Button size="lg" variant="secondary" to="/contact">
                <Mail className="h-4 w-4" /> Contact support
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <p className="mb-4 text-center font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">Popular practice areas</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <Link key={s.href} to={s.href} className="card card-hover group flex items-center gap-4 p-4">
                  <IconTile icon={s.icon} size="sm" />
                  <span className="flex-1 text-sm font-medium text-fg">{s.name}</span>
                  <ArrowUpRight className="h-4 w-4 text-fg-subtle transition-colors group-hover:text-brand" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
