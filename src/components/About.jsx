import React from 'react';
import { ArrowRight, Compass, Shield, Target } from 'lucide-react';
import { Button, Card, CheckList, Eyebrow, IconTile, Reveal, Section } from './ui';
import { useContact } from '../lib/contact';
import receptionImg from '../assets/office_reception.jpg';

const PILLARS = [
  {
    title: 'Who We Are',
    desc: 'A dedicated business consultancy facilitating registrations, tax filings, and legal compliances across India.',
    icon: Compass,
  },
  {
    title: 'Our Mission',
    desc: 'To remove bureaucratic friction so entrepreneurs can focus completely on growing their commercial ventures.',
    icon: Target,
  },
  {
    title: 'Our Vision',
    desc: 'To be the most reliable, transparent, and approachable corporate compliance partner for businesses of all sizes.',
    icon: Shield,
  },
];

const REASONS = [
  'Transparent fee structure with zero ambiguity',
  'Dedicated professional assigned to your filing',
  'End-to-end guidance from start to completion',
  'Confidential and encrypted document handling',
];

export default function About() {
  const { openContact } = useContact();

  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-md">
            <img
              src={receptionImg}
              alt="Simplifyl professional consultancy workspace"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              className="h-[380px] w-full rounded-xl object-cover sm:h-[480px]"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-lg border border-line bg-surface/95 p-4 shadow-md backdrop-blur">
              <p className="text-sm font-semibold text-fg">Corporate advisory &amp; practice</p>
              <p className="mt-1 text-xs leading-5 text-fg-muted">
                Assisting entrepreneurs, startups, and growing enterprises with dependable statutory guidance.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <Eyebrow className="mb-4">About the company</Eyebrow>
          <h2 className="text-h2 font-semibold">Your trusted partner for business growth &amp; compliance</h2>
          <p className="mt-5 text-base leading-7 text-fg-muted sm:text-[17px]">
            We help entrepreneurs, startups and growing businesses navigate important business registrations, taxation and compliance
            requirements. Our goal is to simplify complex processes through professional guidance, clear communication and reliable
            assistance.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {PILLARS.map((p) => (
              <Card key={p.title} interactive className="p-5">
                <IconTile icon={p.icon} size="sm" />
                <h3 className="mt-4 text-[15px] font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">{p.desc}</p>
              </Card>
            ))}
          </div>

          <div className="mt-8">
            <p className="mb-4 text-sm font-medium text-fg">Why choose us</p>
            <CheckList items={REASONS} columns={2} />
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button to="/about" variant="secondary">
              Know more about us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={() => openContact()}>
              Schedule a consultation
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
