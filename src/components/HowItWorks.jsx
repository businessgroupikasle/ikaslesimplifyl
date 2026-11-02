import React from 'react';
import { ArrowRight, FileCheck2, Headphones, MessageSquare, UploadCloud } from 'lucide-react';
import { Button, Section, SectionHeader } from './ui';
import { StepTimeline } from './ServiceBlocks';
import { useContact } from '../lib/contact';

const STEPS = [
  {
    num: '01',
    title: 'Share Your Requirements',
    desc: 'Tell us about your business and specific service requirements through our enquiry form or consultation call.',
    icon: MessageSquare,
  },
  {
    num: '02',
    title: 'Get Consultation',
    desc: 'Understand the applicable regulatory process, eligibility criteria, document checklists, and estimated fee costs.',
    icon: Headphones,
  },
  {
    num: '03',
    title: 'Submit Documents',
    desc: 'Share the required information and statutory documents securely for preliminary review by our specialists.',
    icon: UploadCloud,
  },
  {
    num: '04',
    title: 'Application & Assistance',
    desc: 'Receive hands-on guidance throughout the applicable registration or filing process until successful completion.',
    icon: FileCheck2,
  },
];

export default function HowItWorks() {
  const { openContact } = useContact();

  return (
    <Section id="how-it-works">
      <SectionHeader
        eyebrow="Procedural timeline"
        title="A simple process. Professional support."
        description="We guide you step-by-step through registrations and compliance with clarity and structured timelines."
        action={
          <Button onClick={() => openContact()}>
            Start step 01 today <ArrowRight className="h-4 w-4" />
          </Button>
        }
      />
      <StepTimeline steps={STEPS} />
    </Section>
  );
}
