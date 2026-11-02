import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Compass, Shield, ShieldCheck, Target, Users } from 'lucide-react';
import SiteLayout from '../components/SiteLayout';
import PageHeader from '../components/PageHeader';
import CTABanner from '../components/CTABanner';
import { Button, Card, Eyebrow, IconTile, Reveal, Section, SectionHeader } from '../components/ui';
import { useContact } from '../lib/contact';
import receptionImg from '../assets/office_reception.jpg';

const FOUNDATIONS = [
  {
    title: 'Our Mission',
    icon: Compass,
    desc: 'To provide structured, dependable, and affordable business registration and statutory compliance advisory that empowers Indian enterprises to operate with confidence.',
  },
  {
    title: 'Our Vision',
    icon: Target,
    desc: "To be recognized as India's most client-centric and transparent business consultancy, distinguished by accuracy, responsiveness, and ethical practice.",
  },
  {
    title: 'Our Core Values',
    icon: Shield,
    desc: 'Uncompromising integrity, statutory accuracy, upfront fee transparency with zero hidden charges, and absolute confidentiality of all commercial documentation.',
  },
];

const DIFFERENCE = [
  { title: 'Fee Clarity', icon: CheckCircle2, desc: 'Government statutory fees and professional charges are clearly distinguished upfront with zero surprises.' },
  { title: 'Dedicated Point of Contact', icon: Users, desc: 'You work directly with an assigned compliance professional familiar with your operational context.' },
  { title: 'Proactive Due Dates', icon: Clock, desc: 'Automated intimation of GST return dates, annual ROC timelines, and Director KYC deadlines.' },
  { title: 'Encrypted Data Vault', icon: ShieldCheck, desc: 'All incorporation records, PAN details, and financial files are handled under strict confidentiality protocols.' },
];

export default function AboutPage() {
  const { openContact } = useContact();

  return (
    <SiteLayout
      seo={{
        title: 'About Us | Simplifyl Business & Compliance Solutions',
        description:
          'Learn about Simplifyl Compliance Solutions, our mission, vision, and core values. We provide dependable GST filing, company registrations, and statutory compliance assistance across India.',
        canonicalUrl: 'https://simplifyl.com/about',
      }}
    >
      <PageHeader
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        eyebrow="Our story & philosophy"
        title="About Simplifyl Compliance Solutions"
        description="An independent business consultancy committed to making company registration, GST compliance, and trademark protection straightforward, transparent, and dependable."
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow className="mb-4">Who we are</Eyebrow>
            <h2 className="text-h2 font-semibold">Demystifying corporate regulatory frameworks</h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-fg-muted sm:text-[17px]">
              <p>
                Simplifyl was founded on a simple principle: regulatory compliance should not be an impediment to enterprise growth. While
                Indian statutory frameworks provide robust legal protections, the operational complexities of GST returns, ROC annual filings,
                and intellectual property registrations can distract founders from core business objectives.
              </p>
              <p>
                Our consultancy operates as a strategic execution bridge between growing businesses and statutory requirements. We translate
                dense procedural directives into clear, actionable checklists, ensuring zero missed due dates and complete transparency at every
                stage.
              </p>
            </div>
            <Button className="mt-8" onClick={() => openContact()}>
              Connect with our team <ArrowRight className="h-4 w-4" />
            </Button>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-md">
              <img
                src={receptionImg}
                alt="Simplifyl advisory workspace"
                width="800"
                height="500"
                loading="lazy"
                decoding="async"
                className="h-[340px] w-full rounded-xl object-cover sm:h-[440px]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="sunken">
        <SectionHeader
          align="center"
          eyebrow="Foundations"
          title="Our guiding foundations"
          description="Core principles driving every document we draft and client relationship we build."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {FOUNDATIONS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <Card interactive className="h-full p-7">
                <IconTile icon={f.icon} />
                <h3 className="mt-6 text-h3 font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-fg-muted">{f.desc}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Client experience"
          title="The Simplifyl difference"
          description="What clients experience when partnering with our professional consultancy."
        />
        <div className="grid overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" style={{ gap: '1px' }}>
          {DIFFERENCE.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.title} delay={i * 0.05} className="bg-surface p-6">
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.75} />
                <h3 className="mt-5 text-[15px] font-semibold text-fg">{d.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">{d.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CTABanner
        eyebrow="Work with us"
        title="Let’s simplify your compliance"
        description="Tell us where your business is today and we’ll map out the registrations and filings you need next."
      />
    </SiteLayout>
  );
}
