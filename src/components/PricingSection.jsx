import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button, Notice, Reveal, Section, SectionHeader } from './ui';
import { useContact } from '../lib/contact';
import { cn } from '../lib/utils';

const PLANS = [
  {
    category: 'GST Filing',
    badge: 'Tax Advisory',
    description: 'Monthly and quarterly GST return filing, reconciliations, and compliance advisory.',
    professionalFee: 'Configurable by turnover / volume',
    governmentFee: 'Nil (Statutory late fee at actuals if overdue)',
    included: ['Monthly GSTR-1 & GSTR-3B filings', '2A / 2B Input Tax Credit reconciliation', 'HSN summary & invoice validation', 'Quarterly compliance review'],
  },
  {
    category: 'Business Registration',
    badge: 'Company Incorporation',
    description: 'Complete assistance for Private Limited, LLP, OPC, and Partnership setup.',
    professionalFee: 'Consultation-based package',
    governmentFee: 'MCA & Name approval fees at actuals by State',
    included: ['RUN Name reservation filing', 'Digital Signature Certificates (DSC)', 'Drafting MOA & AOA charters', 'PAN, TAN & Certificate of Incorporation'],
    popular: true,
  },
  {
    category: 'Trademark Registration',
    badge: 'IP Protection',
    description: 'End-to-end brand protection across relevant commercial Nice classes.',
    professionalFee: 'Standard professional fee per mark',
    governmentFee: '₹4,500 (Individual/Startup) or ₹9,000 (Others) at actuals',
    included: ['Comprehensive trademark registry search', 'Class classification & specification', 'Filing Form TM-A with IP India', 'Application tracking & ™ usage intimation'],
  },
  {
    category: 'Compliance Support',
    badge: 'Secretarial Care',
    description: 'Statutory annual ROC returns, Director KYC, and secretarial documentation.',
    professionalFee: 'Annual retainer / customized scope',
    governmentFee: 'MCA filing fees as per authorized share capital slab',
    included: ['Annual AOC-4 & MGT-7/7A preparation', 'Annual Director KYC (DIR-3 KYC)', 'Board & AGM minutes documentation', 'Statutory register maintenance'],
  },
];

export default function PricingSection() {
  const { openContact } = useContact();

  return (
    <Section id="pricing" tone="sunken">
      <SectionHeader
        align="center"
        eyebrow="Transparent structure"
        title="Transparent pricing for your business needs"
        description="We maintain total fee clarity. Government statutory fees are always separated from our professional consultancy charges with zero hidden surprises."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.category} delay={i * 0.06}>
            <div
              className={cn(
                'relative flex h-full flex-col rounded-xl border bg-surface p-6 transition-shadow duration-200 hover:shadow-md',
                plan.popular ? 'border-brand shadow-md ring-4 ring-brand/10' : 'border-line shadow-xs',
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand-solid px-2.5 py-1 text-[11px] font-medium text-white shadow-sm">
                  Popular choice
                </span>
              )}
              <span className="font-mono text-2xs uppercase tracking-[0.14em] text-fg-subtle">{plan.badge}</span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">{plan.category}</h3>
              <p className="mt-2 text-sm leading-6 text-fg-muted">{plan.description}</p>

              <dl className="mt-6 divide-y divide-line rounded-lg border border-line bg-sunken text-sm">
                <div className="p-3.5">
                  <dt className="text-xs text-fg-subtle">Professional service fee</dt>
                  <dd className="mt-1 font-medium text-fg">{plan.professionalFee}</dd>
                </div>
                <div className="p-3.5">
                  <dt className="text-xs text-fg-subtle">Government statutory fee</dt>
                  <dd className="mt-1 text-fg-muted">{plan.governmentFee}</dd>
                </div>
              </dl>

              <p className="mt-6 text-xs font-medium text-fg">What’s included</p>
              <ul className="mt-3 flex-1 space-y-2.5">
                {plan.included.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.25} />
                    {inc}
                  </li>
                ))}
              </ul>

              <Button variant={plan.popular ? 'primary' : 'secondary'} className="mt-7 w-full" onClick={() => openContact(plan.category)}>
                Enquire now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      <Notice title="Fee transparency policy:" className="mx-auto mt-10 max-w-3xl">
        Government fees, stamp duties, and registration charges are determined strictly by official statutory portals (MCA, GSTN, Trademark
        Registry) and billed at exact actuals. Professional advisory fees are shared upfront before commencing any work with zero hidden
        additions.
      </Notice>
    </Section>
  );
}
