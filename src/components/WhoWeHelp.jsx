import React from 'react';
import { ArrowRight, Building2, Layers, Lightbulb, Rocket, Store, TrendingUp, User } from 'lucide-react';
import { Card, IconTile, Reveal, Section, SectionHeader } from './ui';
import { useContact } from '../lib/contact';

const SEGMENTS = [
  { title: 'Startups', desc: 'Early-stage ventures needing incorporation, founder agreements, and Startup India tax recognition.', icon: Rocket, highlight: 'SPICe+ & DPIIT' },
  { title: 'Entrepreneurs', desc: 'Visionary founders converting novel concepts into formal, compliant legal business structures.', icon: Lightbulb, highlight: 'Entity Setup' },
  { title: 'Small Businesses', desc: 'Retailers, traders, and local enterprises requiring GST filings, MSME benefits, and routine renewals.', icon: Store, highlight: 'GST & Udyam' },
  { title: 'Private Limited Companies', desc: 'Corporations needing diligent ROC annual filings, board minutes, and secretarial compliance.', icon: Building2, highlight: 'ROC & Annual Filings' },
  { title: 'Limited Liability Partnerships', desc: 'LLP partners requiring annual Form 11 and Form 8 returns, partnership deed amendments, and tax audits.', icon: Layers, highlight: 'Form 8 & 11' },
  { title: 'Freelancers & Consultants', desc: 'Independent professionals requiring GST registration, LUT filing for export income, and tax filing.', icon: User, highlight: 'Export LUT & Tax' },
  { title: 'Growing Enterprises', desc: 'Scaling organizations expanding into multiple states, needing trademark security and compliance audits.', icon: TrendingUp, highlight: 'Multi-State GST' },
];

export default function WhoWeHelp() {
  const { openContact } = useContact();

  return (
    <Section tone="sunken">
      <SectionHeader
        align="center"
        eyebrow="Client diversity"
        title="Business support for every stage of growth"
        description="Whether launching your first venture or managing an established corporate enterprise, our advisory scales with you."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SEGMENTS.map((seg, i) => (
          <Reveal key={seg.title} delay={(i % 4) * 0.05}>
            <Card
              as="button"
              type="button"
              interactive
              onClick={() => openContact(seg.title)}
              className="group flex h-full w-full flex-col p-5 text-left"
            >
              <div className="flex w-full items-start justify-between gap-3">
                <IconTile icon={seg.icon} size="sm" />
                <span className="rounded-md border border-line bg-sunken px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-fg-subtle">
                  {seg.highlight}
                </span>
              </div>
              <h3 className="mt-5 text-[15px] font-semibold text-fg">{seg.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-fg-muted">{seg.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                Get advisory <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Card>
          </Reveal>
        ))}

        {/* Fills the 8th grid slot with a useful action instead of leaving a hole */}
        <Reveal delay={0.15}>
          <div className="flex h-full flex-col justify-between rounded-xl border border-dashed border-line-strong p-5">
            <div>
              <h3 className="text-[15px] font-semibold text-fg">Not sure where you fit?</h3>
              <p className="mt-1.5 text-sm leading-6 text-fg-muted">Tell us about your business and we’ll recommend the right structure and filings.</p>
            </div>
            <button type="button" onClick={() => openContact()} className="btn btn-secondary btn-sm mt-5 self-start">
              Ask a consultant
            </button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
