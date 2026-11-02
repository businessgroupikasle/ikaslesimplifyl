import React from 'react';
import { CheckCircle2, FileCheck2, Headphones, HeartHandshake, MessageSquare, ShieldCheck, UserCheck } from 'lucide-react';
import { Reveal, Section, SectionHeader } from './ui';
import meetingImg from '../assets/consultation_meeting.jpg';

const HIGHLIGHTS = [
  { title: 'Expert Guidance', desc: 'Clear, reliable advisory from experienced corporate tax & legal consultants.', icon: UserCheck },
  { title: 'Transparent Communication', desc: 'Straightforward procedural updates with zero ambiguous jargon or surprise costs.', icon: MessageSquare },
  { title: 'Simplified Documentation', desc: 'Structured checklists designed to minimize paperwork and eliminate delays.', icon: FileCheck2 },
  { title: 'Customer-Focused Approach', desc: 'Attentive service customized to the unique scale and structure of your enterprise.', icon: HeartHandshake },
  { title: 'Secure Document Handling', desc: 'Confidential handling protocols to safeguard your personal & commercial records.', icon: ShieldCheck },
  { title: 'Dedicated Support', desc: 'Direct communication channels and prompt support throughout the filing lifecycle.', icon: Headphones },
];

export default function WhyUs() {
  return (
    <Section id="why-us" tone="sunken">
      <SectionHeader
        eyebrow="The Simplifyl advantage"
        title="Why businesses choose us"
        description="We focus on precision, prompt communication, and complete transparency to provide dependable corporate compliance services."
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <div className="relative h-full min-h-[360px] overflow-hidden rounded-xl border border-line">
            <img
              src={meetingImg}
              alt="Simplifyl specialist explaining a compliance roadmap"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5" />
            <div className="absolute inset-x-5 bottom-5 flex items-start gap-3 rounded-lg border border-white/15 bg-black/35 p-4 text-white backdrop-blur-md">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#8FA8FF]" />
              <div>
                <p className="text-sm font-semibold">1-on-1 specialist advisory</p>
                <p className="mt-0.5 text-xs leading-5 text-white/75">Tailored compliance roadmap for your specific business structure</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:col-span-7" style={{ gap: '1px' }}>
          {HIGHLIGHTS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.04} className="group bg-surface p-6 transition-colors hover:bg-canvas">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-brand transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
                  <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 text-[15px] font-semibold text-fg">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-muted">{item.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
