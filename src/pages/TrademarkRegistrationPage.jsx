import React from 'react';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import CTABanner from '../components/CTABanner';
import { Button, Notice, Section, SectionHeader } from '../components/ui';
import { FeatureGrid, GlanceCard, RelatedServices, StepTimeline } from '../components/ServiceBlocks';
import { useContact } from '../lib/contact';
import { CONTACT } from '../data/site';

const SERVICE = 'Trademark Registration';

const SERVICES = [
  {
    title: 'Trademark Search & Class Audit',
    desc: 'Rigorous investigation across 45 Nice classes on the official IP India registry to detect phonetic, visual, or semantic similarities before application.',
  },
  {
    title: 'Filing Form TM-A Application',
    desc: 'Preparation and filing of wordmark, device, or logo trademark applications with the Controller General of Patents, Designs and Trademarks.',
  },
  {
    title: '™ Symbol Legal Authorization',
    desc: 'Receive immediate government acknowledgement number and guidance allowing lawful commercial display of the ™ symbol on your products and branding.',
  },
  {
    title: 'Examination Objection Replies',
    desc: 'Drafting structured legal responses to Section 9 (Absolute Grounds) and Section 11 (Relative Grounds) objections issued by trademark examiners.',
  },
  {
    title: 'Opposition & Hearing Support',
    desc: 'Preparation of counter-statements to third-party opposition notices and advocate coordination for Registry show-cause hearings.',
  },
  {
    title: 'Trademark Renewal & Portfolio Watch',
    desc: 'Timely filing of renewal applications every 10 years to preserve legal monopoly and ongoing brand watch to flag infringing marks.',
  },
];

const STEPS = [
  { num: '01', title: 'Public Search Report', desc: 'Evaluating similarity risks and confirming Nice classification.' },
  { num: '02', title: 'Filing Form TM-A', desc: 'Official submission with application number allowing ™ symbol usage.' },
  { num: '03', title: 'Registry Examination', desc: 'Handling examination reports, formalities, and objection replies.' },
  { num: '04', title: 'Journal Publication & ®', desc: '4-month journal advertisement followed by final registration certificate.' },
];

export default function TrademarkRegistrationPage() {
  const { openContact } = useContact();

  return (
    <SiteLayout
      seo={{
        title: 'Trademark Registration Online India | Brand & Logo Protection | Simplifyl',
        description:
          'Protect your brand name, logo and identity with Simplifyl: trademark search, Form TM-A application filing, examination objection handling, and trademark renewal in India.',
        canonicalUrl: 'https://simplifyl.com/trademark-registration',
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: 'Trademark Registration' }]}
        eyebrow="Intellectual property practice"
        title="Trademark registration & brand protection"
        description="Shield your brand identity, business name, and logo across India. Establish nationwide legal exclusivity and deter copycat competitors from day one."
        actions={
          <>
            <Button size="lg" onClick={() => openContact(SERVICE)}>
              Request trademark search <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary" href={CONTACT.phoneHref}>
              <Phone className="h-4 w-4" /> Call us
            </Button>
          </>
        }
        aside={
          <GlanceCard
            icon={ShieldCheck}
            service={SERVICE}
            items={['45-class trademark search', 'Form TM-A filing with IP India', '™ usage from application date', 'Objection, opposition & renewal support']}
          />
        }
      />

      <Section>
        <SectionHeader
          eyebrow="Trademark services"
          title="Comprehensive brand protection lifecycle"
          description="From pre-filing risk assessment to final certificate issuance and ongoing surveillance."
        />
        <FeatureGrid items={SERVICES} icon={ShieldCheck} />
      </Section>

      <Section tone="sunken">
        <SectionHeader
          eyebrow="Process"
          title="The trademark lifecycle"
          description="How an application moves from filing to official registration under the Trade Marks Act, 1999."
        />
        <StepTimeline steps={STEPS} />
        <Notice className="mt-12 max-w-3xl">
          Trademark registration is subject to statutory examination and third-party opposition periods mandated by the Trade Marks Registry. We
          guide you proactively through every query.
        </Notice>
      </Section>

      <RelatedServices current="trademark" />

      <CTABanner
        eyebrow="Intellectual property desk"
        title="Protect your brand identity today"
        description="Consult with our trademark attorneys, conduct class audits, and file Form TM-A with IP India."
        service={SERVICE}
        primaryLabel="Request trademark search"
      />
    </SiteLayout>
  );
}
