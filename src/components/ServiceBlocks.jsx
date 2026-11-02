import React from 'react';
import { ArrowRight, ArrowUpRight, FileCheck } from 'lucide-react';
import { Button, Card, CheckList, IconTile, Notice, Reveal, Section, SectionHeader } from './ui';
import { Link } from '../lib/router';
import { useContact } from '../lib/contact';
import { SERVICES } from '../data/site';
import { cn } from '../lib/utils';

/** "At a glance" card shown beside a service page's hero. */
export function GlanceCard({ title = 'At a glance', items, service, icon }) {
  const { openContact } = useContact();
  return (
    <Card className="p-6 shadow-md sm:p-7">
      <div className="mb-5 flex items-center justify-between">
        <p className="font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">{title}</p>
        {icon && <IconTile icon={icon} size="sm" />}
      </div>
      <CheckList items={items} />
      <div className="mt-6 border-t border-line pt-5">
        <Button className="w-full" onClick={() => openContact(service)}>
          Talk to a specialist <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}

/** Grid of service inclusions / filings. */
export function FeatureGrid({ items, icon: Icon = FileCheck, columns = 3 }) {
  return (
    <div className={cn('grid gap-4 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3')}>
      {items.map((item, i) => (
        <Reveal key={item.title} delay={(i % 3) * 0.05}>
          <Card interactive className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <IconTile icon={item.icon || Icon} />
              <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="mt-5 text-h3 font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-fg-muted">{item.desc}</p>
          </Card>
        </Reveal>
      ))}
    </div>
  );
}

/** Numbered process steps with a connecting rail. */
export function StepTimeline({ steps, orientation = 'horizontal' }) {
  if (orientation === 'vertical') {
    return (
      <ol className="relative space-y-3">
        {steps.map((st, i) => (
          <li key={st.title} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <span className="z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface font-mono text-xs font-medium text-fg shadow-xs">
                {st.num || String(i + 1).padStart(2, '0')}
              </span>
              {i < steps.length - 1 && <span className="mt-1 w-px flex-1 bg-line-strong" aria-hidden="true" />}
            </div>
            <div className="pb-6 pt-1.5">
              <h4 className="text-[15px] font-semibold text-fg">{st.title}</h4>
              <p className="mt-1 text-sm leading-6 text-fg-muted">{st.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
      <span className="absolute left-[18px] right-[18px] top-[18px] hidden h-px bg-line-strong lg:block" aria-hidden="true" />
      {steps.map((st, i) => {
        const Icon = st.icon;
        return (
          <Reveal as="li" key={st.title} delay={i * 0.06} className="relative">
            <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line-strong bg-canvas font-mono text-xs font-medium text-fg shadow-xs">
              {st.num || String(i + 1).padStart(2, '0')}
            </span>
            <div className="mt-5 lg:pr-4">
              <div className="flex items-center gap-2">
                {Icon && <Icon className="h-4 w-4 text-brand" strokeWidth={1.75} />}
                <h3 className="text-[15px] font-semibold text-fg">{st.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{st.desc}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

/** Documents checklist panel. */
export function DocumentsPanel({ eyebrow = 'Checklist', title, items, note, className }) {
  return (
    <Card className={cn('p-6 sm:p-8', className)}>
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-brand">{eyebrow}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{title}</h3>
      <CheckList items={items} className="mt-6" />
      {note && (
        <Notice tone="warn" className="mt-6">
          {note}
        </Notice>
      )}
    </Card>
  );
}

/** Cross-links to the other three practice areas. */
export function RelatedServices({ current }) {
  const others = SERVICES.filter((s) => s.key !== current);
  return (
    <Section tone="sunken">
      <SectionHeader
        eyebrow="Explore more"
        title="Related services"
        description="Most businesses need more than one of these. We can coordinate them together."
        action={
          <Button variant="secondary" to="/services">
            All services <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {others.map((s) => (
          <Link key={s.href} to={s.href} className="card card-hover group flex items-start gap-4 p-5">
            <IconTile icon={s.icon} />
            <span className="flex-1">
              <span className="flex items-center justify-between gap-2 text-[15px] font-semibold text-fg">
                {s.name}
                <ArrowUpRight className="h-4 w-4 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
              </span>
              <span className="mt-1 block text-sm leading-6 text-fg-muted">{s.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
