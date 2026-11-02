import React from 'react';
import { ArrowRight, Building2, Check, Phone } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import CTABanner from '../components/CTABanner';
import { Button, Reveal, Section, SectionHeader } from '../components/ui';
import { DocumentsPanel, GlanceCard, RelatedServices } from '../components/ServiceBlocks';
import { useContact } from '../lib/contact';
import { CONTACT } from '../data/site';
import { cn } from '../lib/utils';

const SERVICE = 'Business Registration';

const STRUCTURES = [
  {
    title: 'Private Limited Company (Pvt Ltd)',
    badge: 'Most Popular',
    desc: 'The gold standard for startups and scaling businesses seeking limited liability, foreign investment, and venture capital.',
    features: ['2+ Directors & Shareholders', 'Distinct Legal Entity & Perpetual Succession', 'Eligible for Startup India 80-IAC Tax Exemption'],
  },
  {
    title: 'Limited Liability Partnership (LLP)',
    badge: 'Low Compliance',
    desc: 'Blends limited liability protection with internal partnership operational flexibility. Lower annual audit requirements for early revenue stages.',
    features: ['2+ Designated Partners', 'No Minimum Capital Requirement', 'Governed by Mutual LLP Agreement'],
  },
  {
    title: 'One Person Company (OPC)',
    badge: 'Solo Founder',
    desc: 'Allows a single entrepreneur to operate an incorporated corporate company with limited liability while appointing a nominee.',
    features: ['1 Sole Director & Shareholder', 'Nominee Director Required', 'Limited Liability for Solo Ventures'],
  },
  {
    title: 'MSME / Udyam & Startup India',
    badge: 'Govt Benefits',
    desc: 'Official registration with the Ministry of MSME granting priority bank lending, collateral-free credit, and 50% discount on government trademark fees.',
    features: ['Lifetime Valid Udyam Certificate', 'DPIIT Recognition for Startups', 'Exemption from Public Tender EMD Fees'],
  },
];

const DOCUMENTS = [
  'PAN Card of all Directors / Partners / Shareholders',
  'Voter ID / Passport / Driving License (Government Identity Proof)',
  'Latest Bank Statement / Utility Bill (Address Proof not older than 2 months)',
  'Passport-size photographs of all proposed promoters',
  'Registered Office Proof (Electricity Bill + NOC signed by Property Owner)',
];

export default function BusinessRegistrationPage() {
  const { openContact } = useContact();

  return (
    <SiteLayout
      seo={{
        title: 'Business Registration Services | Private Limited, LLP, OPC | Simplifyl',
        description:
          'Register your business in India with expert assistance: Private Limited company incorporation, LLP registration, One Person Company (OPC), and MSME Udyam setup.',
        canonicalUrl: 'https://simplifyl.com/business-registration',
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Business Registrations' }]}
        eyebrow="Corporate incorporation practice"
        title="Business & company registration services"
        description="Set up your business with full regulatory compliance. We handle naming reservation (RUN), SPICe+ drafting, PAN/TAN generation, and Certificate of Incorporation issuance."
        actions={
          <>
            <Button size="lg" onClick={() => openContact(SERVICE)}>
              Start incorporation consultation <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" href={CONTACT.phoneHref}>
              <Phone className="h-4 w-4" /> Call us
            </Button>
          </>
        }
        aside={
          <GlanceCard
            icon={Building2}
            service={SERVICE}
            items={['Name reservation (RUN)', 'DSC & Director Identification', 'MOA & AOA drafting', 'PAN, TAN & Certificate of Incorporation']}
          />
        }
      />

      <Section>
        <SectionHeader
          eyebrow="Entity options"
          title="Choose the right entity structure"
          description="Our consultants evaluate your capital needs, founder shareholding, and risk exposure to recommend the optimal legal form."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {STRUCTURES.map((st, i) => {
            const popular = st.badge === 'Most Popular';
            return (
              <Reveal key={st.title} delay={(i % 2) * 0.06}>
                <div
                  className={cn(
                    'flex h-full flex-col rounded-xl border bg-surface p-7 transition-shadow duration-200 hover:shadow-md',
                    popular ? 'border-brand ring-4 ring-brand/10' : 'border-line shadow-xs',
                  )}
                >
                  <span className={cn('chip self-start', popular && 'chip-brand')}>{st.badge}</span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{st.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-fg-muted">{st.desc}</p>
                  <ul className="mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
                    {st.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-fg-muted">
                        <Check className="h-4 w-4 shrink-0 text-brand" strokeWidth={2.25} /> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openContact(SERVICE)}
                    className="group mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand hover:text-brand-hover"
                  >
                    Inquire about {st.title.split('(')[0].trim()}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="sunken">
        <div className="mx-auto max-w-3xl">
          <DocumentsPanel
            eyebrow="Documentation"
            title="What you need for company incorporation"
            items={DOCUMENTS}
            note="Incorporation approvals are granted solely by the Registrar of Companies (MCA). Simplifyl manages end-to-end documentation, filing, and defect resolution."
          />
        </div>
      </Section>

      <RelatedServices current="business" />

      <CTABanner
        eyebrow="Company incorporation desk"
        title="Ready to register your business entity?"
        description="Consult with our company formation specialists, verify business names, and initiate SPICe+ MCA filing."
        service={SERVICE}
        primaryLabel="Start incorporation consultation"
      />
    </SiteLayout>
  );
}
